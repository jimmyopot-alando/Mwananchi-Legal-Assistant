# ai-services/reasoning/nlp_pipeline.py

import re
from collections import Counter
from typing import Dict, List

def tokenize(text: str) -> List[str]:
    """Split text into lowercase tokens (words)."""
    tokens = re.findall(r'\b\w+\b', text.lower())
    return tokens

def extract_keywords(text: str, top_n: int = 5) -> List[str]:
    """Extract top N keywords by frequency."""
    tokens = tokenize(text)
    freq = Counter(tokens)
    return [word for word, _ in freq.most_common(top_n)]

def summarize(text: str, max_sentences: int = 3) -> str:
    """
    Frequency-based summarizer:
    Selects sentences containing the most frequent keywords.
    """
    sentences = re.split(r'(?<=[.!?]) +', text.strip())
    if len(sentences) <= max_sentences:
        return " ".join(sentences)

    keywords = extract_keywords(text, top_n=10)
    scored = []
    for sentence in sentences:
        score = sum(sentence.lower().count(k) for k in keywords)
        scored.append((score, sentence))

    # Sort by score, pick top sentences
    top_sentences = [s for _, s in sorted(scored, key=lambda x: x[0], reverse=True)[:max_sentences]]
    return " ".join(top_sentences)

def detect_entities(text: str) -> List[str]:
    """
    Improved entity detection:
    Captures multi-word capitalized entities (e.g., 'High Court of Kenya').
    """
    entities = re.findall(r'\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\b', text)
    return list(set(entities))

def analyze_text(text: str) -> Dict:
    """Perform full NLP analysis on legal text."""
    return {
        "tokens": tokenize(text),
        "keywords": extract_keywords(text),
        "summary": summarize(text),
        "entities": detect_entities(text),
        "length": len(text.split())
    }
