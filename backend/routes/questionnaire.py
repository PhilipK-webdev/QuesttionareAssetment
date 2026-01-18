"""Questionnaire routes"""
import random
from datetime import datetime
from flask import Blueprint, request, jsonify
from utils.questionnaire_loader import load_questionnaire
from utils.sessions import sessions

questionnaire_bp = Blueprint('questionnaire', __name__)


@questionnaire_bp.route('/api/questionnaire', methods=['GET'])
def get_questionnaire():
    """
    Get questionnaire with shuffled questions
    
    Query params:
    - session_id: Optional session ID to get consistent shuffled order
    """
    session_id = request.args.get('session_id')
    
    questionnaire_data = load_questionnaire()
    
    # Flatten all questions from all sections
    all_questions = []
    for section in questionnaire_data['sections']:
        for question in section['questions']:
            # Add section info to each question for reference
            question_copy = question.copy()
            question_copy['section'] = section['name']
            question_copy['section_id'] = section['id']
            all_questions.append(question_copy)
    
    # Shuffle questions
    # Use session_id as seed for consistent ordering per session
    if session_id and session_id in sessions:
        random.seed(session_id)
    
    random.shuffle(all_questions)
    
    return jsonify({
        'questions': all_questions,
        'answers': questionnaire_data['answers'],
        'total_questions': len(all_questions)
    })


@questionnaire_bp.route('/api/save-progress', methods=['POST'])
def save_progress():
    """
    Save questionnaire progress for later
    
    Expected payload:
    {
        "session_id": "uuid",
        "answers": {"RS1": 3, "VC2": 2, ...},
        "current_question_index": 15
    }
    """
    data = request.get_json()
    
    session_id = data.get('session_id')
    if not session_id or session_id not in sessions:
        return jsonify({'error': 'Invalid session ID'}), 400
    
    # Update session data
    sessions[session_id]['answers'] = data.get('answers', {})
    sessions[session_id]['current_question_index'] = data.get('current_question_index', 0)
    sessions[session_id]['last_saved'] = datetime.now().isoformat()
    
    return jsonify({
        'message': 'Progress saved successfully',
        'saved_at': sessions[session_id]['last_saved']
    })


@questionnaire_bp.route('/api/load-progress/<session_id>', methods=['GET'])
def load_progress(session_id):
    """
    Load saved questionnaire progress
    """
    if session_id not in sessions:
        return jsonify({'error': 'Session not found'}), 404
    
    session_data = sessions[session_id]
    
    if session_data.get('completed'):
        return jsonify({'error': 'Questionnaire already completed'}), 400
    
    return jsonify({
        'user': session_data['user'],
        'answers': session_data['answers'],
        'current_question_index': session_data['current_question_index'],
        'last_saved': session_data.get('last_saved')
    })
