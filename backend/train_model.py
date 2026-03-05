import json
import re
import math
import argparse
import os
import pickle
import sys
from pathlib import Path

# just forn testing

DATA_FILE = Path(__file__).parent / "quality.jsonl"
MODEL_FILE = Path(__file__).parent / "./prompt_quality_model.pkl"

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

def load_data(filepath: Path, limit: int = None):
    prompts = []
    scores = []
    with open(filepath, "r", encoding="utf-8") as f:
        for i, line in enumerate(f):
            if limit and i >= limit:
                break
            try:
                obj = json.loads(line)
                if "prompt" in obj and "transformed_quality" in obj:
                    prompts.append(obj["prompt"])
                    scores.append(float(obj["transformed_quality"]))
            except (json.JSONDecodeError, ValueError):
                continue
    print(f"[✓] {len(prompts):,} prompts loaded.")
    return prompts, scores

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
    has_code = 1 if any(kw in text for kw in ["```", "def ", "function", "class ", "import ", "SELECT ", "print(", "#include", "```python", "```js"]) else 0
    has_numbered_list = 1 if re.search(r'\n\s*\d+[.)]\s', text) else 0
    has_bullet_list = 1 if re.search(r'\n\s*[-*•]\s', text) else 0
    has_context = 1 if any(kw in text.lower() for kw in ["context:", "background:", "given:", "based on"]) else 0

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

    return [
        char_len, word_count, sent_count,
        avg_word_len, avg_sent_len,
        unique_words, lexical_diversity,
        has_question, question_count,
        has_code, has_numbered_list, has_bullet_list,
        has_context, has_explicit_task, has_formatting_req,
        has_role_play, has_constraints, has_examples,
        log_char_len, log_word_count, optimal_score,
        bad_signal, too_short, too_vague
    ]

def extract_feature_matrix(prompts: list) -> list:
    return [extract_features(p) for p in prompts]

def train_model(prompts: list, scores: list):
    try:
        from sklearn.pipeline import Pipeline, FeatureUnion
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.preprocessing import StandardScaler
        from sklearn.ensemble import GradientBoostingRegressor, RandomForestRegressor
        from sklearn.linear_model import Ridge
        from sklearn.model_selection import train_test_split
        import numpy as np
    except ImportError:
        print("[!] scikit-learn not found. Install it with: pip install scikit-learn")
        sys.exit(1)

    print("[...] Extracting features...")

    print("[...] Building model pipeline...")

    feature_union = FeatureUnion([
        ("tfidf", TfidfVectorizer(
            max_features=10000,
            ngram_range=(1, 2),
            sublinear_tf=True,
            min_df=3,
            strip_accents="unicode",
            analyzer="word"
        )),
        ("handcrafted", HandcraftedFeatureExtractor())
    ])

    X_train, X_test, y_train, y_test = train_test_split(
        prompts, scores, test_size=0.1, random_state=42
    )
    print(f"[✓] Train: {len(X_train):,} | Test: {len(X_test):,}")

    print("[...] Computing TF-IDF and features (this may take a moment)...")
    X_train_feat = feature_union.fit_transform(X_train)
    X_test_feat = feature_union.transform(X_test)

    print("[...] Training model (Ridge Regression)...")
    regressor = Ridge(alpha=1.0)
    regressor.fit(X_train_feat, y_train)

    y_pred = np.clip(regressor.predict(X_test_feat), 0.0, 1.0)

    mae = np.mean(np.abs(y_pred - y_test))
    rmse = np.sqrt(np.mean((y_pred - np.array(y_test)) ** 2))
    ss_res = np.sum((np.array(y_test) - y_pred) ** 2)
    ss_tot = np.sum((np.array(y_test) - np.mean(y_test)) ** 2)
    r2 = 1 - ss_res / ss_tot if ss_tot > 0 else 0.0

    print(f"\n{'='*50}")
    print(f"  Model Performance (Test Set)")
    print(f"{'='*50}")
    print(f"  MAE  : {mae:.4f}")
    print(f"  RMSE : {rmse:.4f}")
    print(f"  R²   : {r2:.4f}")
    print(f"{'='*50}\n")

    return feature_union, regressor

def save_model(feature_union, regressor, filepath: Path):
    tmp_path = filepath.with_suffix(".pkl.tmp")
    with open(tmp_path, "wb") as f:
        pickle.dump({"features": feature_union, "model": regressor}, f)
    tmp_path.replace(filepath)
    print(f"[✓] Model saved: {filepath}")

def load_model(filepath: Path):
    if not filepath.exists():
        print(f"[!] Model file not found: {filepath}")
        print("    Train the model first by running: python analyzer.py")
        sys.exit(1)
    try:
        with open(filepath, "rb") as f:
            data = pickle.load(f)
        return data["features"], data["model"]
    except (EOFError, pickle.UnpicklingError, KeyError) as e:
        print(f"[!] Model file is corrupted ({e}). Deleting and retraining...")
        filepath.unlink()
        prompts, scores = load_data(DATA_FILE)
        feature_union, regressor = train_model(prompts, scores)
        save_model(feature_union, regressor, filepath)
        return feature_union, regressor

def score_prompt(prompt: str, feature_union, regressor) -> dict:
    import numpy as np

    X = feature_union.transform([prompt])
    raw_score = float(regressor.predict(X)[0])
    score = max(0.0, min(1.0, raw_score))

    if score >= 0.65:
        label = "🟢 Excellent"
        description = "Very high quality — clear, detailed, and well-structured prompt"
    elif score >= 0.50:
        label = "🔵 Good"
        description = "Good quality — clear and understandable prompt"
    elif score >= 0.35:
        label = "🟡 Average"
        description = "Average quality — could be made more specific"
    elif score >= 0.20:
        label = "🟠 Low"
        description = "Low quality — vague or too short"
    else:
        label = "🔴 Very Low"
        description = "Very low quality — consider rewriting the prompt"

    feats = extract_features(prompt)
    word_count = feats[1]
    has_explicit_task = feats[13]
    has_constraints = feats[17]
    has_examples = feats[18]
    bad_signal = feats[21]
    too_short = feats[22]

    tips = []
    if too_short:
        tips.append("⚠️  Prompt is too short — add more context")
    if not has_explicit_task:
        tips.append("💡 Clearly state the task (write, explain, analyze, list...)")
    if not has_constraints:
        tips.append("💡 Add constraints or requirements (length, format, tone...)")
    if not has_examples:
        tips.append("💡 Adding an example can improve quality")
    if bad_signal:
        tips.append("❌ Inappropriate content detected")
    if word_count < 10:
        tips.append("⚠️  Using at least 10-20 words is recommended")
    elif word_count > 2000:
        tips.append("⚠️  Prompt is very long — focus on essential information")

    return {
        "score": round(score, 5),
        "label": label,
        "description": description,
        "tips": tips,
        "word_count": word_count
    }

def print_result(result: dict, prompt: str = None):
    print("\n" + "=" * 60)
    if prompt:
        preview = prompt[:100] + "..." if len(prompt) > 100 else prompt
        print(f"  Prompt : {preview!r}")
        print("-" * 60)
    print(f"  Score  : {result['score']:.5f}  ({result['score']*100:.1f}/100)")
    print(f"  Quality: {result['label']}")
    print(f"  Info   : {result['description']}")
    print(f"  Words  : {result['word_count']}")
    if result["tips"]:
        print("\n  Improvement Tips:")
        for tip in result["tips"]:
            print(f"    {tip}")
    print("=" * 60 + "\n")

def interactive_mode(feature_union, regressor):
    print("\n" + "=" * 60)
    print("  Prompt Quality Analyzer — Interactive Mode")
    print("  Type 'quit' or 'exit' to stop")
    print("=" * 60)

    while True:
        try:
            prompt = input("\nEnter your prompt:\n> ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\nGoodbye!")
            break

        if prompt.lower() in ("quit", "exit", "q"):
            print("Goodbye!")
            break

        if not prompt:
            print("Empty input — please try again.")
            continue

        result = score_prompt(prompt, feature_union, regressor)
        print_result(result, prompt)

def main():
    parser = argparse.ArgumentParser(
        description="Prompt Quality Analysis Model"
    )
    parser.add_argument("--score", type=str, help="Prompt text to score")
    parser.add_argument("--interactive", "-i", action="store_true", help="Interactive mode")
    parser.add_argument("--retrain", action="store_true", help="Re-train the model")
    args = parser.parse_args()

    if MODEL_FILE.exists() and not args.retrain:
        if args.score or args.interactive:
            print(f"[✓] Loading saved model: {MODEL_FILE}")
            feature_union, regressor = load_model(MODEL_FILE)
        else:
            print(f"[i] Model already exists: {MODEL_FILE}")
            print("    Use: --score or --interactive to run")
            print("    Use: --retrain to re-train")
            return
    else:
        print("[...] Loading data...")
        prompts, scores = load_data(DATA_FILE)
        feature_union, regressor = train_model(prompts, scores)
        save_model(feature_union, regressor, MODEL_FILE)

    if args.score:
        result = score_prompt(args.score, feature_union, regressor)
        print_result(result, args.score)
    elif args.interactive:
        interactive_mode(feature_union, regressor)
    else:
        print("\n[Demo] Scoring example prompts...\n")
        examples = [
            "hi",
            "what is ai",
            "Write a detailed Python function that reads a CSV file, handles missing values, and plots a bar chart using matplotlib. Include error handling and comments.",
            "Explain the difference between supervised and unsupervised learning with examples.",
            "asdfjkl;",
            "You are an expert data scientist. Analyze the following dataset and identify the top 3 trends. Provide your answer in JSON format with keys: trend, description, confidence_score.",
        ]
        for ex in examples:
            result = score_prompt(ex, feature_union, regressor)
            preview = ex[:60] + "..." if len(ex) > 60 else ex
            print(f"  [{result['score']:.3f}] {result['label']}  ← {preview!r}")

        print(f"\n[✓] Model is ready! Use it with:")
        print(f"    python analyzer.py --score \"Your prompt here\"")
        print(f"    python analyzer.py --interactive")

if __name__ == "__main__":
    main()
