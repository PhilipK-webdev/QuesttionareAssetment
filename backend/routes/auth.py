"""Authentication and registration routes"""
import uuid
from datetime import datetime
from flask import Blueprint, request, jsonify
from utils.storage import StorageService
from utils.sessions import sessions

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/api/register', methods=['POST'])
def register():
    """
    Register a new user and create a session
    
    Expected payload:
    {
        "full_name": "John Doe",
        "email": "john@example.com",
        "gender": "Male",
        "age_group": "26-35"
    }
    """
    data = request.get_json()
    
    # Validate required fields
    required_fields = ['full_name', 'email', 'gender', 'age_group']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    # Generate unique session ID
    session_id = str(uuid.uuid4())
    
    # Store session data
    sessions[session_id] = {
        'user': data,
        'created_at': datetime.now().isoformat(),
        'answers': {},
        'current_question_index': 0,
        'completed': False
    }
    
    # Track that a new questionnaire was started
    StorageService.increment_started_count()
    
    return jsonify({
        'session_id': session_id,
        'message': 'Registration successful'
    }), 201
