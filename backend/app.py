"""Main Flask application"""
from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from utils.storage import StorageService
from routes.health import health_bp
from routes.auth import auth_bp
from routes.questionnaire import questionnaire_bp
from routes.results import results_bp

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Register blueprints
app.register_blueprint(health_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(questionnaire_bp)
app.register_blueprint(results_bp)


@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    # Ensure data directories exist
    StorageService.ensure_directories()
    
    # Run the application
    app.run(
        host=Config.HOST,
        port=Config.PORT,
        debug=Config.DEBUG
    )
