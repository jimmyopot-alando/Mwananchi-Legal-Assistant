# ai-services/security/encryption.py

from cryptography.fernet import Fernet
from typing import Dict

# Generate a key once and store securely (e.g., in environment variable or secrets manager)
def generate_key() -> bytes:
    """Generate a new encryption key."""
    return Fernet.generate_key()

def encrypt_text(text: str, key: bytes) -> Dict:
    """
    Encrypt text using AES (Fernet).
    :param text: Plain text to encrypt
    :param key: Encryption key
    :return: Dict with encrypted data
    """
    try:
        fernet = Fernet(key)
        encrypted = fernet.encrypt(text.encode())
        return {
            "success": True,
            "encrypted": encrypted.decode()
        }
    except Exception as e:
        return {"success": False, "error": f"Encryption error: {str(e)}"}

def decrypt_text(encrypted_text: str, key: bytes) -> Dict:
    """
    Decrypt text using AES (Fernet).
    :param encrypted_text: Encrypted string
    :param key: Encryption key
    :return: Dict with decrypted data
    """
    try:
        fernet = Fernet(key)
        decrypted = fernet.decrypt(encrypted_text.encode()).decode()
        return {
            "success": True,
            "decrypted": decrypted
        }
    except Exception as e:
        return {"success": False, "error": f"Decryption error: {str(e)}"}
