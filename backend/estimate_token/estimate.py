import spacy
import tiktoken
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum

_nlp = spacy.load("en_core_web_sm")


WATER_PER_TOKEN_ML = 7.5
ENERGY_PRICE_KWH   = 0.15   

MODEL_CONFIG = {
    "llama3_70b_real": {
        "E_token": 0.4,  
        "C_Q":     70.0, 
    }
}


class TaskType(Enum):
    """(min_multiplier, max_multiplier) — output/input token oranı tahmini"""
    QUESTION_ANSWER  = (0.5, 1.5)
    SUMMARIZATION    = (0.2, 0.4)
    CODE_GENERATION  = (1.0, 3.0)
    CREATIVE_WRITING = (2.0, 5.0)
    TRANSLATION      = (0.9, 1.1)
    ANALYSIS         = (1.0, 2.0)


def estimate_output_tokens(input_tokens: int, task_type: TaskType) -> int:
    low, high = task_type.value
    return round(input_tokens * (low + high) / 2)


TASK_SIGNALS: dict = {
    TaskType.CODE_GENERATION: {
        "verbs":  {"write", "code", "implement", "build", "create", "develop",
                   "generate", "debug", "fix", "refactor", "program", "script"},
        "nouns":  {"function", "class", "algorithm", "bug", "error", "api",
                   "loop", "array", "variable", "module", "script", "code",
                   "test", "snippet", "method", "parameter"},
        "score":  {"verb": 3, "noun": 2},
    },
    TaskType.SUMMARIZATION: {
        "verbs":  {"summarize", "shorten", "condense", "outline", "brief",
                   "recap", "digest", "compress", "reduce"},
        "nouns":  {"summary", "overview", "gist", "highlight", "abstract",
                   "digest", "tldr"},
        "score":  {"verb": 3, "noun": 2},
    },
    TaskType.TRANSLATION: {
        "verbs":  {"translate", "convert", "render", "localize", "interpret"},
        "nouns":  {"translation", "language", "french", "spanish", "german",
                   "turkish", "japanese", "chinese", "english", "arabic",
                   "portuguese", "italian", "russian"},
        "score":  {"verb": 4, "noun": 2},
    },
    TaskType.CREATIVE_WRITING: {
        "verbs":  {"write", "create", "compose", "draft", "craft", "tell",
                   "narrate", "imagine", "invent", "produce"},
        "nouns":  {"story", "poem", "essay", "article", "blog", "novel",
                   "fiction", "narrative", "plot", "character", "scene",
                   "dialogue", "script", "song", "letter"},
        "score":  {"verb": 2, "noun": 3},
    },
    TaskType.ANALYSIS: {
        "verbs":  {"analyze", "compare", "evaluate", "assess", "examine",
                   "investigate", "review", "critique", "study", "explore",
                   "measure", "interpret", "diagnose"},
        "nouns":  {"analysis", "comparison", "evaluation", "difference",
                   "similarity", "pattern", "trend", "insight", "metric",
                   "performance", "result", "data", "report"},
        "score":  {"verb": 3, "noun": 2},
    },
    TaskType.QUESTION_ANSWER: {
        "verbs":  {"explain", "describe", "define", "tell", "show", "help",
                   "clarify", "elaborate", "teach", "answer"},
        "nouns":  {"explanation", "definition", "concept", "meaning",
                   "reason", "example", "detail", "information"},
        "score":  {"verb": 2, "noun": 1},
    },
}


def detect_task_type(prompt: str) -> tuple:
    doc = _nlp(prompt.lower())

    verb_lemmas = {
        token.lemma_ for token in doc
        if token.pos_ in ("VERB", "AUX") and not token.is_stop
    }
    noun_lemmas = {
        token.lemma_ for token in doc
        if token.pos_ in ("NOUN", "PROPN") and not token.is_stop
    }
    wh_lemmas = {
        token.lemma_ for token in doc
        if token.tag_ in ("WDT", "WP", "WRB")
    }

    scores: dict = {}
    for task, signals in TASK_SIGNALS.items():
        matched_verbs = verb_lemmas & signals["verbs"]
        matched_nouns = noun_lemmas & signals["nouns"]
        wh_bonus = len(wh_lemmas) * 1.5 if task == TaskType.QUESTION_ANSWER else 0
        scores[task] = (
            len(matched_verbs) * signals["score"]["verb"]
            + len(matched_nouns) * signals["score"]["noun"]
            + wh_bonus
        )

    best_task = max(scores, key=lambda t: scores[t])
    if scores[best_task] == 0:
        best_task = TaskType.QUESTION_ANSWER

    return best_task, scores


@dataclass(frozen=True)
class AIResourceResponseDTO:
    model_id:      str
    task_type:     str
    task_scores:   dict

    tokens_in:     int
    tokens_out:    int
    total_tokens:  int

    ewk_wh:        float
    joule_total:   float

    water_liters:  float
    costs_euro:    float

    timestamp:     str = field(default_factory=lambda: datetime.now().isoformat())


def calculate_ewk_dto(
    prompt:    str,
    model_key: str = "llama3_70b_real",
) -> AIResourceResponseDTO:
    """
    API'den gelen prompt'u alır, enerji & kaynak tüketimini hesaplar.

    Args:
        prompt:    Kullanıcının gönderdiği metin
        model_key: Kullanılacak model konfigürasyonu (varsayılan: llama3_70b_real)

    Returns:
        AIResourceResponseDTO
    """
    config = MODEL_CONFIG[model_key]

    task_type, scores = detect_task_type(prompt)

    encoding = tiktoken.encoding_for_model("gpt-4o")
    t_in  = len(encoding.encode(prompt))
    t_out = estimate_output_tokens(t_in, task_type)
    total = t_in + t_out

    joule_total = total * config["E_token"] * config["C_Q"]
    ewk_wh      = joule_total / 3600

    water_l = (total * WATER_PER_TOKEN_ML) / 1000
    costs   = (ewk_wh / 1000) * ENERGY_PRICE_KWH

    return AIResourceResponseDTO(
        model_id     = model_key,
        task_type    = task_type.name,
        task_scores  = {t.name: round(s, 2) for t, s in scores.items()},
        tokens_in    = t_in,
        tokens_out   = t_out,
        total_tokens = total,
        ewk_wh       = round(ewk_wh,     4),
        joule_total  = round(joule_total, 2),
        water_liters = round(water_l,     4),
        costs_euro   = round(costs,       6),
    )