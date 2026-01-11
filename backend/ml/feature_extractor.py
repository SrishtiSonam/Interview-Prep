"""
Feature Extraction Module
Converts agent outputs into numerical features for ML model
"""

from typing import Dict, List, Any
import numpy as np


class FeatureExtractor:
    """Extracts numerical features from agent outputs for ML training"""
    
    # Feature names in order (for consistent feature vector)
    FEATURE_NAMES = [
        # ATS Features (4)
        'keyword_match_ratio',
        'formatting_score',
        'section_completeness',
        'ats_risk_score',
        
        # HR Features (4)
        'grammar_error_rate',
        'clarity_score',
        'action_verb_ratio',
        'professional_tone_score',
        
        # Tech Features (6)
        'project_count',
        'github_links',
        'tech_stack_score',
        'cloud_experience',
        'ci_cd_experience',
        'impact_score',
        
        # Coach Features (2)
        'weak_bullets_count',
        'missing_sections_count',
    ]
    
    def __init__(self):
        self.feature_count = len(self.FEATURE_NAMES)
    
    def extract_ats_features(self, ats_output: Dict[str, Any]) -> Dict[str, float]:
        """
        Extract features from ATS Agent output
        
        Returns normalized features (0-1 scale):
        - keyword_match_ratio: Ratio of found keywords
        - formatting_score: Normalized formatting score
        - section_completeness: Normalized structure score
        - ats_risk_score: Risk of ATS rejection (inverse of score)
        """
        # Get raw values
        found_keywords = ats_output.get('found_keywords', [])
        missing_keywords = ats_output.get('missing_keywords', [])
        formatting_issues = ats_output.get('formatting_issues', [])
        structure_score = ats_output.get('structure_score', 0)
        ats_score = ats_output.get('score', 0)
        
        # Calculate derived features
        total_keywords = len(found_keywords) + len(missing_keywords)
        keyword_match_ratio = len(found_keywords) / max(total_keywords, 1)
        
        # Formatting score (inverse of issues)
        formatting_score = max(0, 1 - (len(formatting_issues) * 0.2))
        
        # Section completeness (normalize structure score from 0-100 to 0-1)
        section_completeness = structure_score / 100.0
        
        # ATS risk score (inverse of ATS score, higher = more risky)
        ats_risk_score = 1 - (ats_score / 100.0)
        
        return {
            'keyword_match_ratio': round(keyword_match_ratio, 3),
            'formatting_score': round(formatting_score, 3),
            'section_completeness': round(section_completeness, 3),
            'ats_risk_score': round(ats_risk_score, 3),
        }
    
    def extract_hr_features(self, hr_output: Dict[str, Any]) -> Dict[str, float]:
        """
        Extract features from HR Agent output
        
        Returns normalized features (0-1 scale):
        - grammar_error_rate: Rate of grammar issues (inverse quality)
        - clarity_score: Communication clarity
        - action_verb_ratio: Proportion of strong action verbs
        - professional_tone_score: Professional tone quality
        """
        hr_score = hr_output.get('score', 0)
        grammar_issues = hr_output.get('grammar_issues', [])
        strengths = hr_output.get('strengths', [])
        improvements = hr_output.get('improvements', [])
        
        # Grammar error rate (inverse - more errors = higher rate)
        grammar_error_rate = min(1.0, len(grammar_issues) * 0.1)
        
        # Clarity score (based on HR score component)
        clarity_score = hr_score / 100.0
        
        # Action verb ratio (estimate from strengths/improvements balance)
        # More strengths relative to improvements = higher action verb usage
        total_mentions = len(strengths) + len(improvements)
        action_verb_ratio = len(strengths) / max(total_mentions, 1)
        
        # Professional tone score (based on overall HR score)
        professional_tone_score = hr_score / 100.0
        
        return {
            'grammar_error_rate': round(grammar_error_rate, 3),
            'clarity_score': round(clarity_score, 3),
            'action_verb_ratio': round(action_verb_ratio, 3),
            'professional_tone_score': round(professional_tone_score, 3),
        }
    
    def extract_tech_features(self, tech_output: Dict[str, Any]) -> Dict[str, float]:
        """
        Extract features from Tech Lead Agent output
        
        Returns normalized features (0-1 scale):
        - project_count: Normalized project count
        - github_links: Binary (has GitHub links)
        - tech_stack_score: Quality of tech stack
        - cloud_experience: Has cloud technology
        - ci_cd_experience: Has CI/CD experience
        - impact_score: Real-world impact metrics
        """
        tech_score = tech_output.get('score', 0)
        stack_analysis = tech_output.get('stack_analysis', {})
        strengths = tech_output.get('strengths', [])
        gaps = tech_output.get('gaps', [])
        
        # Project count (estimate from strengths, cap at 5 projects)
        project_mentions = sum(1 for s in strengths if 'project' in s.lower())
        project_count = min(1.0, project_mentions / 5.0)
        
        # GitHub links (binary feature based on strengths)
        github_links = 1.0 if any('github' in s.lower() or 'git' in s.lower() for s in strengths) else 0.0
        
        # Tech stack score (from overall tech score)
        tech_stack_score = tech_score / 100.0
        
        # Cloud experience (check for cloud keywords in stack analysis)
        cloud_keywords = ['aws', 'azure', 'gcp', 'cloud', 'docker', 'kubernetes']
        cloud_experience = 1.0 if any(
            keyword in str(stack_analysis).lower() or 
            keyword in ' '.join(strengths).lower()
            for keyword in cloud_keywords
        ) else 0.0
        
        # CI/CD experience
        cicd_keywords = ['ci/cd', 'jenkins', 'github actions', 'gitlab ci', 'pipeline']
        ci_cd_experience = 1.0 if any(
            keyword in str(stack_analysis).lower() or 
            keyword in ' '.join(strengths).lower()
            for keyword in cicd_keywords
        ) else 0.0
        
        # Impact score (presence of quantifiable metrics)
        impact_score = min(1.0, len([s for s in strengths if any(c.isdigit() for c in s)]) / 3.0)
        
        return {
            'project_count': round(project_count, 3),
            'github_links': round(github_links, 3),
            'tech_stack_score': round(tech_stack_score, 3),
            'cloud_experience': round(cloud_experience, 3),
            'ci_cd_experience': round(ci_cd_experience, 3),
            'impact_score': round(impact_score, 3),
        }
    
    def extract_coach_features(self, coach_output: Dict[str, Any]) -> Dict[str, float]:
        """
        Extract features from Resume Coach output
        
        Returns normalized features (0-1 scale):
        - weak_bullets_count: Normalized count of weak bullet points
        - missing_sections_count: Normalized count of missing sections
        """
        bullet_improvements = coach_output.get('bullet_improvements', [])
        missing_sections = coach_output.get('missing_sections', [])
        
        # Weak bullets (cap at 10)
        weak_bullets_count = min(1.0, len(bullet_improvements) / 10.0)
        
        # Missing sections (cap at 5)
        missing_sections_count = min(1.0, len(missing_sections) / 5.0)
        
        return {
            'weak_bullets_count': round(weak_bullets_count, 3),
            'missing_sections_count': round(missing_sections_count, 3),
        }
    
    def create_feature_vector(self, agent_outputs: Dict[str, Dict[str, Any]]) -> np.ndarray:
        """
        Create complete feature vector from all agent outputs
        
        Args:
            agent_outputs: Dictionary with keys 'ats', 'hr', 'tech', 'coach'
                          Each containing the respective agent's output
        
        Returns:
            numpy array of shape (16,) with all features in order
        """
        # Extract features from each agent
        ats_features = self.extract_ats_features(agent_outputs.get('ats', {}))
        hr_features = self.extract_hr_features(agent_outputs.get('hr', {}))
        tech_features = self.extract_tech_features(agent_outputs.get('tech', {}))
        coach_features = self.extract_coach_features(agent_outputs.get('coach', {}))
        
        # Combine all features in order
        all_features = {**ats_features, **hr_features, **tech_features, **coach_features}
        
        # Create ordered feature vector
        feature_vector = np.array([
            all_features[name] for name in self.FEATURE_NAMES
        ], dtype=np.float32)
        
        return feature_vector
    
    def create_feature_dict(self, agent_outputs: Dict[str, Dict[str, Any]]) -> Dict[str, float]:
        """
        Create feature dictionary (for display/debugging)
        
        Args:
            agent_outputs: Dictionary with agent outputs
        
        Returns:
            Dictionary mapping feature names to values
        """
        feature_vector = self.create_feature_vector(agent_outputs)
        return dict(zip(self.FEATURE_NAMES, feature_vector.tolist()))
    
    def get_feature_names(self) -> List[str]:
        """Return list of feature names in order"""
        return self.FEATURE_NAMES.copy()


# Singleton instance for easy importing
feature_extractor = FeatureExtractor()
