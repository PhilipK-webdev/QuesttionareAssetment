"""Utility for loading questionnaire data"""
import json
from config import Config


def load_questionnaire():
    """Load and return questionnaire data"""
    with open(Config.QUESTIONNAIRE_PATH, 'r', encoding='utf-8') as f:
        return json.load(f)
