import json
from typing import Dict, Any
from openai import OpenAI
from config import Config


class LLMService:
    """Handle LLM integration for driving style analysis"""
    
    def __init__(self):
        """Initialize OpenAI client"""
        if not Config.OPENAI_API_KEY:
            raise ValueError("OPENAI_API_KEY not set in environment variables")
        
        self.client = OpenAI(api_key=Config.OPENAI_API_KEY)
        self.model = Config.OPENAI_MODEL
    
    def analyze_driving_profile(self, scores: Dict[str, Any]) -> Dict[str, str]:
        """
        Send scores to LLM and get driving style analysis
        
        Args:
            scores: Dictionary of domain scores and categories
            
        Returns:
            Dictionary with 'driving_style' and 'recommended_course'
        """
        prompt = self._create_prompt(scores)
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": "You are an expert driving instructor analyzing a driver's assessment results. "
                                 "Provide clear, constructive feedback about their driving style and recommend "
                                 "an appropriate improvement course. Return your response as JSON with two fields: "
                                 "'driving_style' (2-3 sentences) and 'recommended_course' (specific course name and brief description)."
                    },
                    {
                        "role": "user",
                        "content": prompt
                    }
                ],
                temperature=0.7,
                response_format={"type": "json_object"}
            )
            
            content = response.choices[0].message.content
            result = json.loads(content)
            
            # Validate response has required fields
            if 'driving_style' not in result or 'recommended_course' not in result:
                return self._get_fallback_response(scores)
            
            return {
                'driving_style': result['driving_style'],
                'recommended_course': result['recommended_course']
            }
            
        except Exception as e:
            print(f"Error calling LLM: {str(e)}")
            return self._get_fallback_response(scores)
    
    def _create_prompt(self, scores: Dict[str, Any]) -> str:
        """
        Create a detailed prompt for the LLM
        
        Args:
            scores: Domain scores and categories
            
        Returns:
            Formatted prompt string
        """
        prompt_parts = [
            "Analyze this driver's assessment results:\n"
        ]
        
        for domain_name, data in scores.items():
            score = data['score']
            category = data['category']
            label = data['category_label']
            prompt_parts.append(f"- {domain_name}: {score:.2f}/4.0 ({category} - {label})")
        
        prompt_parts.append(
            "\nBased on these results, provide:\n"
            "1. A clear 2-3 sentence description of their overall driving style\n"
            "2. A specific recommended improvement course with a brief description\n\n"
            "Consider their strengths and areas for improvement. Be constructive and encouraging."
        )
        
        return "\n".join(prompt_parts)
    
    def _get_fallback_response(self, scores: Dict[str, Any]) -> Dict[str, str]:
        """
        Generate a rule-based fallback response if LLM fails
        
        Args:
            scores: Domain scores
            
        Returns:
            Fallback driving style and course recommendation
        """
        # Calculate average of all domain scores
        avg_score = sum(data['score'] for data in scores.values()) / len(scores)
        
        # Identify weakest domain
        weakest = min(scores.items(), key=lambda x: x[1]['score'])
        weakest_domain = weakest[0]
        
        # Generate basic response
        if avg_score >= 3.3:
            driving_style = (
                f"You demonstrate strong driving capabilities across most areas. "
                f"Your overall performance indicates a safe and confident driver with good awareness and control."
            )
            recommended_course = (
                "Advanced Driving Techniques - A course to further refine your already strong skills "
                "and learn defensive driving strategies for challenging situations."
            )
        elif avg_score >= 2.1:
            driving_style = (
                f"You show average driving capabilities with room for improvement. "
                f"While you handle routine situations well, developing your {weakest_domain.lower()} would enhance your overall safety."
            )
            recommended_course = (
                f"Intermediate Driver Improvement Course - Focus on building confidence and skills, "
                f"with special attention to {weakest_domain.lower()}."
            )
        else:
            driving_style = (
                f"Your assessment indicates areas that need significant attention, particularly in {weakest_domain.lower()}. "
                f"Focused practice and professional instruction will help build essential driving skills."
            )
            recommended_course = (
                f"Comprehensive Driver Training Program - A structured course covering fundamental skills "
                f"with intensive practice in {weakest_domain.lower()} and other critical areas."
            )
        
        return {
            'driving_style': driving_style,
            'recommended_course': recommended_course
        }
