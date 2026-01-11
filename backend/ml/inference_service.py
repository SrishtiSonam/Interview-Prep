"""
ML Inference Service
Provides real-time hiring predictions using trained ML model
"""

import os
import joblib
import json
import numpy as np
from typing import Tuple, Dict, List
from feature_extractor import FeatureExtractor


class MLInferenceService:
    """ML inference service for hiring decisions"""
    
    def __init__(self, model_dir: str = 'ml/models'):
        self.model_dir = model_dir
        self.model = None
        self.metadata = None
        self.feature_names = None
        self.label_mapping = None
        self.feature_importance = None
        self.feature_extractor = FeatureExtractor()
        self.is_loaded = False
    
    def load_model(self):
        """Load trained model and metadata"""
        try:
            # Load model
            model_path = os.path.join(self.model_dir, 'hiring_model.pkl')
            if not os.path.exists(model_path):
                raise FileNotFoundError(
                    f"Model not found at {model_path}. "
                    "Train the model first using train_model.py"
                )
            
            self.model = joblib.load(model_path)
            
            # Load metadata
            metadata_path = os.path.join(self.model_dir, 'model_metadata.json')
            with open(metadata_path, 'r') as f:
                self.metadata = json.load(f)
            
            self.feature_names = self.metadata['feature_names']
            self.label_mapping = {
                int(k): v for k, v in self.metadata['label_mapping'].items()
            }
            
            # Load feature importance
            importance_path = os.path.join(self.model_dir, 'feature_importance.json')
            if os.path.exists(importance_path):
                with open(importance_path, 'r') as f:
                    self.feature_importance = json.load(f)
            
            self.is_loaded = True
            print(f"✅ ML model loaded successfully from {model_path}")
            
        except Exception as e:
            print(f"⚠️ Warning: Could not load ML model: {e}")
            print("   Falling back to rule-based decisions")
            self.is_loaded = False
    
    def predict(self, feature_vector: np.ndarray) -> Tuple[str, float, List[Tuple[str, float]]]:
        """
        Make hiring prediction
        
        Args:
            feature_vector: Numpy array of shape (16,) with normalized features
        
        Returns:
            (decision, confidence, top_factors)
            - decision: str (REJECT, MAYBE, SHORTLIST, STRONG_HIRE)
            - confidence: float (0-100)
            - top_factors: List of (feature_name, importance) tuples
        """
        if not self.is_loaded:
            raise RuntimeError("Model not loaded. Call load_model() first.")
        
        # Reshape if needed
        if feature_vector.ndim == 1:
            feature_vector = feature_vector.reshape(1, -1)
        
        # Get prediction and probabilities
        prediction = self.model.predict(feature_vector)[0]
        probabilities = self.model.predict_proba(feature_vector)[0]
        
        # Convert to decision label
        decision = self.label_mapping[prediction]
        
        # Confidence is the probability of the predicted class
        confidence = float(probabilities[prediction] * 100)
        
        # Get top contributing factors
        top_factors = self.get_top_contributing_factors(
            feature_vector[0], 
            top_n=3
        )
        
        return decision, confidence, top_factors
    
    def predict_from_agent_outputs(self, agent_outputs: Dict) -> Tuple[str, float, List[Tuple[str, float]]]:
        """
        Make prediction directly from agent outputs
        
        Args:
            agent_outputs: Dict with keys 'ats', 'hr', 'tech', 'coach'
        
        Returns:
            (decision, confidence, top_factors)
        """
        # Extract features
        feature_vector = self.feature_extractor.create_feature_vector(agent_outputs)
        
        # Make prediction
        return self.predict(feature_vector)
    
    def get_top_contributing_factors(self, 
                                     feature_vector: np.ndarray, 
                                     top_n: int = 3) -> List[Tuple[str, float]]:
        """
        Get top N features contributing to the decision
        
        Args:
            feature_vector: Feature values for this candidate
            top_n: Number of top features to return
        
        Returns:
            List of (feature_name, contribution_score) tuples
        """
        if self.feature_importance is None:
            return []
        
        # Calculate contribution: feature_value * feature_importance
        contributions = []
        for i, feature_name in enumerate(self.feature_names):
            value = feature_vector[i]
            importance = self.feature_importance.get(feature_name, 0)
            contribution = value * importance
            contributions.append((feature_name, contribution))
        
        # Sort by contribution and return top N
        contributions.sort(key=lambda x: x[1], reverse=True)
        
        # Return top N with rounded scores
        return [(name, round(score, 4)) for name, score in contributions[:top_n]]
    
    def get_all_probabilities(self, feature_vector: np.ndarray) -> Dict[str, float]:
        """
        Get probabilities for all classes
        
        Args:
            feature_vector: Feature vector
        
        Returns:
            Dictionary mapping decision labels to probabilities
        """
        if not self.is_loaded:
            raise RuntimeError("Model not loaded.")
        
        if feature_vector.ndim == 1:
            feature_vector = feature_vector.reshape(1, -1)
        
        probabilities = self.model.predict_proba(feature_vector)[0]
        
        return {
            self.label_mapping[i]: float(prob * 100)
            for i, prob in enumerate(probabilities)
        }
    
    def explain_decision(self, 
                        feature_vector: np.ndarray,
                        feature_dict: Dict[str, float] = None) -> Dict:
        """
        Provide detailed explanation of the decision
        
        Args:
            feature_vector: Feature vector
            feature_dict: Optional dict mapping feature names to values
        
        Returns:
            Detailed explanation dictionary
        """
        decision, confidence, top_factors = self.predict(feature_vector)
        all_probs = self.get_all_probabilities(feature_vector)
        
        # Create readable factor descriptions
        factor_descriptions = []
        for feature_name, contribution in top_factors:
            # Convert feature name to readable description
            readable_name = feature_name.replace('_', ' ').title()
            
            if feature_dict:
                value = feature_dict.get(feature_name, 0)
                factor_descriptions.append(
                    f"{readable_name}: {value:.2f} (contribution: {contribution:.4f})"
                )
            else:
                factor_descriptions.append(
                    f"{readable_name} (contribution: {contribution:.4f})"
                )
        
        return {
            'decision': decision,
            'confidence': confidence,
            'all_probabilities': all_probs,
            'top_contributing_factors': top_factors,
            'factor_descriptions': factor_descriptions,
            'explanation': self._generate_explanation(decision, confidence, factor_descriptions)
        }
    
    def _generate_explanation(self, 
                             decision: str, 
                             confidence: float,
                             factor_descriptions: List[str]) -> str:
        """Generate human-readable explanation"""
        explanation = f"ML Model Decision: **{decision}** (Confidence: {confidence:.1f}%)\n\n"
        
        if decision == 'STRONG_HIRE':
            explanation += "🎯 This candidate shows exceptional strength across all evaluation criteria. "
        elif decision == 'SHORTLIST':
            explanation += "✅ This candidate demonstrates solid potential with good fundamentals. "
        elif decision == 'MAYBE':
            explanation += "⚠️ This candidate shows promise but has areas needing improvement. "
        else:  # REJECT
            explanation += "❌ This candidate does not currently meet the minimum requirements. "
        
        explanation += "\n\n**Top Contributing Factors:**\n"
        for desc in factor_descriptions:
            explanation += f"- {desc}\n"
        
        return explanation


# Global singleton instance
_inference_service = None


def get_inference_service() -> MLInferenceService:
    """Get or create singleton inference service"""
    global _inference_service
    if _inference_service is None:
        _inference_service = MLInferenceService()
        _inference_service.load_model()
    return _inference_service


def load_model():
    """Load model (called on app startup)"""
    service = get_inference_service()
    return service.is_loaded
