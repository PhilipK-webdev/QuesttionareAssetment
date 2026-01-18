import json
import os
from datetime import datetime
from typing import Dict, Any
from config import Config


class StorageService:
    """Handle file-based storage for results and statistics"""
    
    @staticmethod
    def ensure_directories():
        """Create necessary directories if they don't exist"""
        os.makedirs(Config.DATA_DIR, exist_ok=True)
        os.makedirs(Config.RESULTS_DIR, exist_ok=True)
    
    @staticmethod
    def save_result(user_data: Dict[str, Any], scores: Dict[str, Any], 
                   llm_response: Dict[str, str]) -> str:
        """
        Save a completed questionnaire result
        
        Args:
            user_data: User registration information
            scores: Calculated domain scores and categories
            llm_response: LLM-generated driving style and recommendation
            
        Returns:
            Filename of the saved result
        """
        StorageService.ensure_directories()
        
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        email_safe = user_data['email'].replace('@', '_at_').replace('.', '_')
        filename = f"{timestamp}_{email_safe}.json"
        filepath = os.path.join(Config.RESULTS_DIR, filename)
        
        result_data = {
            'timestamp': datetime.now().isoformat(),
            'user': user_data,
            'scores': scores,
            'llm_analysis': llm_response
        }
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(result_data, f, indent=2, ensure_ascii=False)
        
        return filename
    
    @staticmethod
    def update_statistics(scores: Dict[str, float], driver_style: str):
        """
        Update aggregated statistics with new completion data
        
        Args:
            scores: Domain scores from the completed questionnaire
            driver_style: The driver style category from LLM
        """
        StorageService.ensure_directories()
        
        # Load existing statistics
        if os.path.exists(Config.STATISTICS_PATH):
            with open(Config.STATISTICS_PATH, 'r', encoding='utf-8') as f:
                stats = json.load(f)
        else:
            stats = {
                'total_completions': 0,
                'total_started': 0,
                'completion_rate': 0,
                'average_scores': {},
                'driver_styles': {},
                'last_updated': None
            }
        
        # Update completion count
        stats['total_completions'] += 1
        
        # Update average scores
        for domain, score in scores.items():
            if domain not in stats['average_scores']:
                stats['average_scores'][domain] = score
            else:
                # Calculate running average
                total = stats['total_completions']
                current_avg = stats['average_scores'][domain]
                new_avg = ((current_avg * (total - 1)) + score) / total
                stats['average_scores'][domain] = round(new_avg, 2)
        
        # Update driver style distribution
        if driver_style not in stats['driver_styles']:
            stats['driver_styles'][driver_style] = 0
        stats['driver_styles'][driver_style] += 1
        
        # Update completion rate (if we track started sessions)
        if stats['total_started'] > 0:
            stats['completion_rate'] = round(
                (stats['total_completions'] / stats['total_started']) * 100, 2
            )
        
        stats['last_updated'] = datetime.now().isoformat()
        
        # Save updated statistics
        with open(Config.STATISTICS_PATH, 'w', encoding='utf-8') as f:
            json.dump(stats, f, indent=2, ensure_ascii=False)
    
    @staticmethod
    def increment_started_count():
        """Increment the count of started questionnaires (for completion rate tracking)"""
        StorageService.ensure_directories()
        
        if os.path.exists(Config.STATISTICS_PATH):
            with open(Config.STATISTICS_PATH, 'r', encoding='utf-8') as f:
                stats = json.load(f)
        else:
            stats = {
                'total_completions': 0,
                'total_started': 0,
                'completion_rate': 0,
                'average_scores': {},
                'driver_styles': {},
                'last_updated': None
            }
        
        stats['total_started'] += 1
        stats['last_updated'] = datetime.now().isoformat()
        
        with open(Config.STATISTICS_PATH, 'w', encoding='utf-8') as f:
            json.dump(stats, f, indent=2, ensure_ascii=False)
    
    @staticmethod
    def get_statistics() -> Dict[str, Any]:
        """Retrieve current statistics"""
        if os.path.exists(Config.STATISTICS_PATH):
            with open(Config.STATISTICS_PATH, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}
