# ai-services/voice/text_to_speech.py

import pyttsx3
from typing import Dict

def text_to_speech(text: str, output_file: str = "output.wav") -> Dict:
    """
    Convert text to speech and save as an audio file.
    :param text: The text to convert into speech
    :param output_file: Path to save the audio file (default: output.wav)
    :return: Dict with success status and file path
    """
    try:
        engine = pyttsx3.init()
        engine.save_to_file(text, output_file)
        engine.runAndWait()

        return {
            "success": True,
            "file": output_file,
            "engine": "pyttsx3"
        }
    except Exception as e:
        return {
            "success": False,
            "error": f"Text-to-speech error: {str(e)}"
        }
