# ai-services/reasoning/compliance.py

import re
from typing import Dict, List

# Define sensitive patterns and compliance rules
SENSITIVE_TERMS = [
    "confidential", "classified", "secret", "privileged",
    "personal data", "identity number", "passport", "bank account"
]

BIAS_TERMS = [
    "racial", "gender", "tribal", "discriminatory", "biased"
]

ETHICS_FLAGS = [
    "bribe", "corruption", "fraud", "harassment", "abuse"
]

def check_sensitive_info(text: str) -> List[str]:
    """Detect sensitive information terms in text."""
    found = []
    for term in SENSITIVE_TERMS:
        if re.search(rf"\b{term}\b", text, re.IGNORECASE):
            found.append(term)
    return found

def check_bias(text: str) -> List[str]:
    """Detect bias-related terms in text."""
    found = []
    for term in BIAS_TERMS:
        if re.search(rf"\b{term}\b", text, re.IGNORECASE):
            found.append(term)
    return found

def check_ethics(text: str) -> List[str]:
    """Detect unethical or illegal references in text."""
    found = []
    for term in ETHICS_FLAGS:
        if re.search(rf"\b{term}\b", text, re.IGNORECASE):
            found.append(term)
    return found

def check_compliance(text: str) -> Dict:
    """Run full compliance check on legal text."""
    sensitive = check_sensitive_info(text)
    bias = check_bias(text)
    ethics = check_ethics(text)

    return {
        "sensitive_terms": sensitive,
        "bias_flags": bias,
        "ethics_flags": ethics,
        "compliant": not (sensitive or bias or ethics)
    }
