# ai-services/voice/speech_to_text.py

import speech_recognition as sr
from typing import Dict

def transcribe_audio(file_path: str) -> Dict:
    """
    Convert speech in an audio file to text.
    :param file_path: Path to the audio file (e.g., .wav, .mp3)
    :return: Dict with transcription and metadata
    """
    recognizer = sr.Recognizer()

    try:
        with sr.AudioFile(file_path) as source:
            audio_data = recognizer.record(source)

        # Use Google Web Speech API (default in SpeechRecognition)
        text = recognizer.recognize_google(audio_data)

        return {
            "success": True,
            "transcription": text,
            "engine": "google-web-speech",
            "file": file_path
        }

    except sr.UnknownValueError:
        return {"success": False, "error": "Speech not understood"}
    except sr.RequestError as e:
        return {"success": False, "error": f"API request failed: {str(e)}"}
    except Exception as e:
        return {"success": False, "error": f"Unexpected error: {str(e)}"}
