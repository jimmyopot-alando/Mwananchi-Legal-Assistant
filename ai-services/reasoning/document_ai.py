# ai-services/reasoning/document_ai.py

from typing import Dict
from nlp_pipeline import extract_keywords, summarize

def draft_petition(text: str) -> str:
    """Generate a structured legal petition draft."""
    summary = summarize(text, max_sentences=3)
    keywords = ", ".join(extract_keywords(text, top_n=5))
    return f"""
    IN THE COURT OF LAW

    PETITION

    The petitioner respectfully submits the following:

    {summary}

    KEY ISSUES: {keywords}

    WHEREFORE, petitioner prays for relief as deemed just and proper.

    Signed,
    ______________________
    """

def draft_contract(text: str) -> str:
    """Generate a structured contract draft."""
    summary = summarize(text, max_sentences=3)
    keywords = ", ".join(extract_keywords(text, top_n=5))
    return f"""
    LEGAL CONTRACT AGREEMENT

    This agreement is entered into by and between the parties:

    TERMS SUMMARY:
    {summary}

    KEY TERMS: {keywords}

    Both parties agree to abide by the terms set forth herein.

    Signed,
    ______________________
    """

def draft_letter(text: str) -> str:
    """Generate a formal legal letter draft."""
    summary = summarize(text, max_sentences=2)
    return f"""
    LEGAL LETTER

    Dear Sir/Madam,

    {summary}

    Yours faithfully,
    ______________________
    """

def draft_document(text: str) -> Dict:
    """
    Draft a legal document based on input text.
    Uses heuristics to decide type and enriches with summary/keywords.
    """
    lower_text = text.lower()

    if "petition" in lower_text or "court" in lower_text:
        return {
            "type": "petition",
            "content": draft_petition(text),
            "summary": summarize(text),
            "keywords": extract_keywords(text)
        }
    elif "agreement" in lower_text or "contract" in lower_text:
        return {
            "type": "contract",
            "content": draft_contract(text),
            "summary": summarize(text),
            "keywords": extract_keywords(text)
        }
    else:
        return {
            "type": "letter",
            "content": draft_letter(text),
            "summary": summarize(text),
            "keywords": extract_keywords(text)
        }
