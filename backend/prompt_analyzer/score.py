import re
import math
import pickle
import sys
from pathlib import Path

try:
    from sklearn.base import BaseEstimator, TransformerMixin
    import numpy as np

    class HandcraftedFeatureExtractor(BaseEstimator, TransformerMixin):
        def fit(self, X, y=None):
            return self

        def transform(self, X):
            return np.array([extract_features(text) for text in X])
except ImportError:
    pass

MODEL_FILE = Path(__file__).parent / "model/prompt_quality_model.pkl"


def load_model(filepath: Path = MODEL_FILE):
    if not filepath.exists():
        print(f"[!] Model file not found: {filepath}")
        print("    Train the model first: python train_model.py")
        sys.exit(1)
    with open(filepath, "rb") as f:
        data = pickle.load(f)
    return data["features"], data["model"]


def extract_features(prompt: str) -> list:
    text = prompt.strip()
    words = text.split()
    sentences = re.split(r'[.!?]+', text)
    sentences = [s for s in sentences if s.strip()]

    char_len = len(text)
    word_count = len(words)
    sent_count = max(len(sentences), 1)
    avg_word_len = sum(len(w) for w in words) / max(word_count, 1)
    avg_sent_len = word_count / sent_count

    unique_words = len(set(w.lower() for w in words))
    lexical_diversity = unique_words / max(word_count, 1)

    has_question = 1 if "?" in text else 0
    question_count = text.count("?")
    has_code = 1 if any(kw in text for kw in [
        "```", "def ", "function", "class ", "import ", "SELECT ", "print(", "#include"
    ]) else 0
    has_numbered_list = 1 if re.search(r'\n\s*\d+[.)]\s', text) else 0
    has_bullet_list = 1 if re.search(r'\n\s*[-*•]\s', text) else 0
    has_context = 1 if any(kw in text.lower() for kw in [
        "context:", "background:", "given:", "based on"
    ]) else 0
    has_explicit_task = 1 if any(kw in text.lower() for kw in [
        "write", "explain", "describe", "analyze", "translate", "summarize",
        "list", "create", "generate", "calculate", "solve", "identify",
        "provide", "compare", "evaluate", "define"
    ]) else 0
    has_formatting_req = 1 if any(kw in text.lower() for kw in [
        "json", "csv", "yaml", "xml", "markdown", "table", "bullet",
        "numbered", "format", "step-by-step"
    ]) else 0
    has_role_play = 1 if any(kw in text.lower() for kw in [
        "you are", "act as", "pretend", "imagine you", "role"
    ]) else 0
    has_constraints = 1 if any(kw in text.lower() for kw in [
        "must", "should", "do not", "don't", "only", "without", "at least", "at most"
    ]) else 0
    has_examples = 1 if any(kw in text.lower() for kw in [
        "for example", "e.g.", "such as", "like:", "example:"
    ]) else 0

    log_char_len = math.log1p(char_len)
    log_word_count = math.log1p(word_count)
    optimal_distance = abs(word_count - 200) / 200.0
    optimal_score = max(0.0, 1.0 - optimal_distance)

    bad_signal = 1 if re.search(
        r'\b(wtf|fuck|shit|dick|pussy|bitch|retard|nigger|nazi|kill yourself)\b',
        text.lower()
    ) else 0

    too_short = 1 if word_count < 5 else 0
    too_vague = 1 if (word_count < 10 and not has_explicit_task) else 0

    instruction_words = [
        "write", "explain", "describe", "analyze", "translate", "summarize",
        "list", "create", "generate", "calculate", "solve", "identify",
        "provide", "compare", "evaluate", "define", "classify", "outline"
    ]
    instruction_count = sum(1 for w in words if w.lower() in instruction_words)
    instruction_density = instruction_count / max(word_count, 1)

    constraint_words = [
        "must", "should", "only", "without", "do not", "don't",
        "at least", "at most", "exactly", "limit", "maximum", "minimum"
    ]
    constraint_count = sum(1 for w in words if w.lower() in constraint_words)
    constraint_density = constraint_count / max(word_count, 1)

    structure_score = sum([
        has_numbered_list, has_bullet_list, has_examples,
        has_formatting_req, has_context
    ]) / 5

    return [
        char_len, word_count, sent_count,
        avg_word_len, avg_sent_len,
        unique_words, lexical_diversity,
        has_question, question_count,
        has_code, has_numbered_list, has_bullet_list,
        has_context, has_explicit_task, has_formatting_req,
        has_role_play, has_constraints, has_examples,
        log_char_len, log_word_count, optimal_score,
        bad_signal, too_short, too_vague,
        instruction_density, constraint_density, structure_score
    ]


def score_prompt(prompt: str, feature_union, regressor) -> dict:
    import numpy as np

    raw_score = float(regressor.predict(feature_union.transform([prompt]))[0])
    score = max(0.0, min(1.0, raw_score))

    if score >= 0.85:
        label = "Excellent"
    elif score >= 0.60:
        label = "Good"
    elif score >= 0.45:
        label = "Average"
    elif score >= 0.30:
        label = "Low"
    else:
        label = "Very Low"

    feats = extract_features(prompt)
    word_count      = feats[1]
    has_explicit_task = feats[13]
    has_constraints = feats[16]
    has_examples    = feats[17]
    bad_signal      = feats[21]
    too_short       = feats[22]

    tips = []
    if too_short:
        tips.append("Prompt is too short — add more context")
    if not has_explicit_task:
        tips.append("Clearly state the task (write, explain, analyze...)")
    if not has_constraints:
        tips.append("Add constraints or requirements (length, format, tone...)")
    if not has_examples:
        tips.append("Adding an example can improve quality")
    if bad_signal:
        tips.append("Inappropriate content detected")
    if word_count < 10:
        tips.append("Using at least 10-20 words is recommended")
    elif word_count > 2000:
        tips.append("Prompt is very long — focus on essential information")

    return {
        "score": round(score, 5),
        "label": label,
        "word_count": word_count,
        "tips": tips,
    }


# Lazy loading — model is loaded on first call, not at import time.
# This avoids crashes when score.py is imported by train.py before
# the model file exists.
_feature_union = None
_regressor = None


def score(prompt: str) -> dict:
    """Public interface: score a single prompt string."""
    global _feature_union, _regressor
    if _feature_union is None:
        _feature_union, _regressor = load_model()
    return score_prompt(prompt, _feature_union, _regressor)