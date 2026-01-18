import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Application configuration"""
    
    # Flask settings
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('FLASK_DEBUG', 'True') == 'True'
    
    # OpenAI settings
    OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
    OPENAI_MODEL = os.getenv('OPENAI_MODEL', 'gpt-4o-mini')
    
    # Server settings
    PORT = int(os.getenv('PORT', 5001))  # Default to 5001 to avoid macOS AirPlay conflict
    HOST = os.getenv('HOST', '0.0.0.0')
    
    # Data paths
    DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
    QUESTIONNAIRE_PATH = os.path.join(DATA_DIR, 'questionnaire.json')
    RESULTS_DIR = os.path.join(DATA_DIR, 'results')
    STATISTICS_PATH = os.path.join(DATA_DIR, 'statistics.json')
    
    # Domain scoring thresholds (from Appendix A)
    DOMAIN_THRESHOLDS = {
        'reaction_speed': {
            'low': (1.0, 2.0, 'Slow'),
            'medium': (2.1, 3.2, 'Average'),
            'high': (3.3, 4.0, 'Fast')
        },
        'vehicle_control': {
            'low': (1.0, 2.0, 'Poor'),
            'medium': (2.1, 3.2, 'Average'),
            'high': (3.3, 4.0, 'Excellent')
        },
        'spatial_awareness': {
            'low': (1.0, 2.0, 'Very Low'),
            'medium': (2.1, 3.2, 'Average'),
            'high': (3.3, 4.0, 'High')
        },
        'road_behavior': {
            'low': (1.0, 2.0, 'Aggressive'),
            'medium': (2.1, 3.2, 'Cautious'),
            'high': (3.3, 4.0, 'Safe')
        }
    }
