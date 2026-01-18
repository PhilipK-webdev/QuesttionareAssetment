"""Results and statistics routes"""
from datetime import datetime
from flask import Blueprint, request, jsonify
from services.scoring_service import ScoringService
from services.llm_service import LLMService
from utils.storage import StorageService
from utils.questionnaire_loader import load_questionnaire
from utils.sessions import sessions

results_bp = Blueprint('results', __name__)


@results_bp.route('/api/submit', methods=['POST'])
def submit_questionnaire():
    """
    Submit completed questionnaire and get results
    
    Expected payload:
    {
        "session_id": "uuid",
        "answers": {"RS1": 3, "VC2": 2, ...}
    }
    """
    data = request.get_json()
    
    session_id = data.get('session_id')
    if not session_id or session_id not in sessions:
        return jsonify({'error': 'Invalid session ID'}), 400
    
    session_data = sessions[session_id]
    answers = data.get('answers', {})
    
    # Load questionnaire structure for validation
    questionnaire_data = load_questionnaire()
    
    # Validate answers
    is_valid, error_msg = ScoringService.validate_answers(
        answers, 
        questionnaire_data['sections']
    )
    
    if not is_valid:
        return jsonify({'error': error_msg}), 400
    
    # Calculate scores
    scores = ScoringService.calculate_scores(
        answers,
        questionnaire_data['sections']
    )
    
    # Get LLM analysis
    try:
        llm_service = LLMService()
        llm_response = llm_service.analyze_driving_profile(scores)
    except ValueError as e:
        # If OpenAI API key not set, use fallback
        print(f"LLM service error: {str(e)}")
        llm_service_fallback = LLMService.__new__(LLMService)
        llm_response = llm_service_fallback._get_fallback_response(scores)
    except Exception as e:
        print(f"Unexpected LLM error: {str(e)}")
        llm_service_fallback = LLMService.__new__(LLMService)
        llm_response = llm_service_fallback._get_fallback_response(scores)
    
    # Save results to file
    user_data = session_data['user']
    StorageService.save_result(user_data, scores, llm_response)
    
    # Update statistics
    score_values = {name: data['score'] for name, data in scores.items()}
    StorageService.update_statistics(score_values, llm_response.get('driving_style', 'Unknown'))
    
    # Mark session as completed
    session_data['completed'] = True
    session_data['completed_at'] = datetime.now().isoformat()
    
    # Prepare response
    result = {
        'user': user_data,
        'scores': scores,
        'llm_analysis': llm_response,
        'completed_at': session_data['completed_at']
    }
    
    return jsonify(result), 200


@results_bp.route('/api/statistics', methods=['GET'])
def get_statistics():
    """
    Get aggregated statistics (optional endpoint for admin/debugging)
    """
    stats = StorageService.get_statistics()
    return jsonify(stats)
