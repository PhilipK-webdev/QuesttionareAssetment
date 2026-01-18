from typing import Dict, List, Any, Tuple
from config import Config


class ScoringService:
    """Handle questionnaire scoring and categorization"""
    
    # Map section names to domain keys for threshold lookup
    DOMAIN_MAP = {
        'Reaction Speed': 'reaction_speed',
        'Vehicle Control': 'vehicle_control',
        'Spatial Awareness': 'spatial_awareness',
        'Road Behavior': 'road_behavior'
    }
    
    @staticmethod
    def calculate_scores(answers: Dict[str, int], sections: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Calculate domain scores from user answers
        
        Args:
            answers: Dictionary mapping question IDs to answer values (1-4)
            sections: Questionnaire sections with questions
            
        Returns:
            Dictionary containing scores, categories, and details per domain
        """
        results = {}
        
        for section in sections:
            section_name = section['name']
            domain_key = ScoringService.DOMAIN_MAP.get(section_name)
            
            if not domain_key:
                continue
            
            # Calculate scores for this section
            question_scores = []
            for question in section['questions']:
                q_id = question['id']
                if q_id not in answers:
                    continue
                
                answer_value = answers[q_id]
                
                # Apply reverse scoring if needed
                if question.get('reverse', False):
                    score = 5 - answer_value  # 1->4, 2->3, 3->2, 4->1
                else:
                    score = answer_value
                
                question_scores.append(score)
            
            # Calculate average score for this domain
            if question_scores:
                avg_score = sum(question_scores) / len(question_scores)
                avg_score = round(avg_score, 2)
                
                # Categorize the score
                category_info = ScoringService._categorize_score(domain_key, avg_score)
                
                results[section_name] = {
                    'score': avg_score,
                    'category': category_info['category'],
                    'category_label': category_info['label'],
                    'domain_key': domain_key
                }
        
        return results
    
    @staticmethod
    def _categorize_score(domain_key: str, score: float) -> Dict[str, str]:
        """
        Categorize a score based on domain thresholds
        
        Args:
            domain_key: The domain identifier (e.g., 'reaction_speed')
            score: The calculated average score
            
        Returns:
            Dictionary with category level and label
        """
        thresholds = Config.DOMAIN_THRESHOLDS.get(domain_key, {})
        
        # Check against thresholds
        for category, (min_val, max_val, label) in thresholds.items():
            if min_val <= score <= max_val:
                return {
                    'category': category.capitalize(),
                    'label': label
                }
        
        # Default fallback
        return {
            'category': 'Unknown',
            'label': 'Unknown'
        }
    
    @staticmethod
    def validate_answers(answers: Dict[str, int], sections: List[Dict[str, Any]]) -> Tuple[bool, str]:
        """
        Validate that all questions have been answered
        
        Args:
            answers: User's answers dictionary
            sections: Questionnaire sections
            
        Returns:
            Tuple of (is_valid, error_message)
        """
        total_questions = sum(len(section['questions']) for section in sections)
        answered_questions = len(answers)
        
        if answered_questions < total_questions:
            return False, f"Only {answered_questions} of {total_questions} questions answered"
        
        # Validate answer values are in range 1-4
        for q_id, value in answers.items():
            if not isinstance(value, int) or value < 1 or value > 4:
                return False, f"Invalid answer value for question {q_id}: {value}"
        
        return True, ""
    
    @staticmethod
    def prepare_llm_input(scores: Dict[str, Any]) -> str:
        """
        Prepare a formatted string of scores for LLM input
        
        Args:
            scores: Calculated domain scores
            
        Returns:
            Formatted string describing the scores
        """
        lines = []
        for domain_name, data in scores.items():
            score = data['score']
            category = data['category']
            label = data['category_label']
            lines.append(f"{domain_name}: {score:.2f} ({category} - {label})")
        
        return "\n".join(lines)
