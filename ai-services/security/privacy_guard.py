# ai-services/security/privacy_guard.py

import re
from typing import Dict

def anonymize_text(text: str) -> str:
    """
    Mask sensitive information in text (emails, phone numbers, IDs).
    """
    # Mask emails
    text = re.sub(r'[\w\.-]+@[\w\.-]+', '[EMAIL]', text)

    # Mask phone numbers (Kenya + international formats)
    text = re.sub(r'\+?\d{10,15}', '[PHONE]', text)

    # Mask ID numbers (simple numeric sequences of 6+ digits)
    text = re.sub(r'\b\d{6,}\b', '[ID]', text)

    return text

def detect_sensitive(text: str) -> Dict:
    """
    Detect presence of sensitive information in text.
    """
    emails = re.findall(r'[\w\.-]+@[\w\.-]+', text)
    phones = re.findall(r'\+?\d{10,15}', text)
    ids = re.findall(r'\b\d{6,}\b', text)

    return {
        "emails_found": emails,
        "phones_found": phones,
        "ids_found": ids,
        "has_sensitive": bool(emails or phones or ids)
    }

def privacy_guard(text: str) -> Dict:
    """
    Run full privacy guard: detect and anonymize sensitive info.
    """
    detected = detect_sensitive(text)
    anonymized = anonymize_text(text)

    return {
        "original": text,
        "anonymized": anonymized,
        "detected": detected
    }
