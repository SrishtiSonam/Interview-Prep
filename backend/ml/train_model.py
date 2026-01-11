"""
ML Model Training Pipeline
Trains RandomForest classifier for hiring decisions
"""

import os
import pandas as pd
import numpy as np
import joblib
import json
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
from sklearn.preprocessing import StandardScaler
import warnings
warnings.filterwarnings('ignore')


class HiringModelTrainer:
    """Trains and evaluates hiring decision ML model"""
    
    def __init__(self, dataset_path: str = 'ml/datasets/hiring_training_data.csv'):
        self.dataset_path = dataset_path
        self.model = None
        self.scaler = None
        self.feature_names = None
        self.label_mapping = {
            0: 'REJECT',
            1: 'MAYBE',
            2: 'SHORTLIST',
            3: 'STRONG_HIRE'
        }
    
    def load_data(self) -> tuple:
        """Load and prepare training data"""
        print("📂 Loading training data...")
        
        if not os.path.exists(self.dataset_path):
            raise FileNotFoundError(
                f"Dataset not found at {self.dataset_path}. "
                "Run dataset_generator.py first to generate training data."
            )
        
        df = pd.read_csv(self.dataset_path)
        
        # Separate features and labels
        feature_cols = [col for col in df.columns if col not in ['label', 'label_name']]
        self.feature_names = feature_cols
        
        X = df[feature_cols].values
        y = df['label'].values
        
        print(f"   ✅ Loaded {len(df)} samples with {len(feature_cols)} features")
        print(f"   Class distribution: {dict(df['label_name'].value_counts())}")
        
        return X, y
    
    def train_model(self, X_train, y_train):
        """Train RandomForest classifier"""
        print("\n🧠 Training RandomForest classifier...")
        
        # Create and train model
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            min_samples_split=5,
            min_samples_leaf=2,
            class_weight='balanced',
            random_state=42,
            n_jobs=-1
        )
        
        self.model.fit(X_train, y_train)
        print("   ✅ Model trained successfully")
    
    def evaluate_model(self, X_test, y_test):
        """Evaluate model performance"""
        print("\n📊 Evaluating model performance...")
        
        # Predictions
        y_pred = self.model.predict(X_test)
        y_pred_proba = self.model.predict_proba(X_test)
        
        # Accuracy
        accuracy = accuracy_score(y_test, y_pred)
        print(f"\n   Overall Accuracy: {accuracy*100:.2f}%")
        
        # Classification report
        print("\n   Classification Report:")
        report = classification_report(
            y_test, y_pred,
            target_names=list(self.label_mapping.values()),
            digits=3
        )
        print(report)
        
        # Confusion matrix
        print("\n   Confusion Matrix:")
        cm = confusion_matrix(y_test, y_pred)
        print(cm)
        
        # Cross-validation score
        print("\n   Cross-Validation (5-fold):")
        cv_scores = cross_val_score(self.model, X_test, y_test, cv=5)
        print(f"   CV Scores: {cv_scores}")
        print(f"   Mean CV Score: {cv_scores.mean()*100:.2f}% (+/- {cv_scores.std()*2*100:.2f}%)")
        
        return {
            'accuracy': float(accuracy),
            'classification_report': report,
            'confusion_matrix': cm.tolist(),
            'cv_mean': float(cv_scores.mean()),
            'cv_std': float(cv_scores.std())
        }
    
    def extract_feature_importance(self):
        """Extract and display feature importance"""
        print("\n🔍 Feature Importance Analysis...")
        
        importances = self.model.feature_importances_
        indices = np.argsort(importances)[::-1]
        
        print("\n   Top 10 Most Important Features:")
        feature_importance = {}
        for i, idx in enumerate(indices[:10]):
            feature_name = self.feature_names[idx]
            importance = importances[idx]
            feature_importance[feature_name] = float(importance)
            print(f"   {i+1}. {feature_name}: {importance:.4f}")
        
        # Full feature importance
        all_importance = {
            self.feature_names[i]: float(importances[i])
            for i in range(len(self.feature_names))
        }
        
        return all_importance
    
    def save_model(self, model_dir: str = 'ml/models'):
        """Save trained model and metadata"""
        print(f"\n💾 Saving model to {model_dir}...")
        
        # Create directory if needed
        os.makedirs(model_dir, exist_ok=True)
        
        # Save model
        model_path = os.path.join(model_dir, 'hiring_model.pkl')
        joblib.dump(self.model, model_path)
        print(f"   ✅ Model saved to {model_path}")
        
        # Save metadata
        metadata = {
            'feature_names': self.feature_names,
            'label_mapping': self.label_mapping,
            'model_type': 'RandomForestClassifier',
            'n_estimators': self.model.n_estimators,
            'max_depth': self.model.max_depth
        }
        
        metadata_path = os.path.join(model_dir, 'model_metadata.json')
        with open(metadata_path, 'w') as f:
            json.dump(metadata, f, indent=2)
        print(f"   ✅ Metadata saved to {metadata_path}")
        
        return model_path
    
    def save_feature_importance(self, importance_dict: dict, model_dir: str = 'ml/models'):
        """Save feature importance to JSON"""
        importance_path = os.path.join(model_dir, 'feature_importance.json')
        with open(importance_path, 'w') as f:
            json.dump(importance_dict, f, indent=2)
        print(f"   ✅ Feature importance saved to {importance_path}")
    
    def train_and_save(self):
        """Complete training pipeline"""
        print("=" * 60)
        print("🚀 ScholarAI ML Model Training Pipeline")
        print("=" * 60)
        
        # Load data
        X, y = self.load_data()
        
        # Split data
        print("\n📊 Splitting data (80% train, 20% test)...")
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        print(f"   Train size: {len(X_train)}, Test size: {len(X_test)}")
        
        # Train model
        self.train_model(X_train, y_train)
        
        # Evaluate model
        metrics = self.evaluate_model(X_test, y_test)
        
        # Feature importance
        importance = self.extract_feature_importance()
        
        # Save everything
        model_path = self.save_model()
        self.save_feature_importance(importance)
        
        print("\n" + "=" * 60)
        print("✅ Training Complete!")
        print("=" * 60)
        print(f"\n📈 Final Metrics:")
        print(f"   - Accuracy: {metrics['accuracy']*100:.2f}%")
        print(f"   - Cross-Validation: {metrics['cv_mean']*100:.2f}% (+/- {metrics['cv_std']*2*100:.2f}%)")
        print(f"\n💡 Model ready for deployment at: {model_path}")
        
        return model_path, metrics, importance


def main():
    """Main training function"""
    trainer = HiringModelTrainer()
    trainer.train_and_save()


if __name__ == "__main__":
    main()
