"""
Complete ML Setup Script
Generates training data and trains the hiring ML model
"""

import sys
import os

# Add parent directory to path so we can import ml modules
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

print("=" * 70)
print("🚀 ScholarAI ML Setup - Generating Dataset and Training Model")
print("=" * 70)

# Step 1: Generate Dataset
print("\n📊 STEP 1: Generating Training Dataset...")
print("-" * 70)

try:
    from ml.dataset_generator import DatasetGenerator
    
    generator = DatasetGenerator()
    
    # Create datasets directory if it doesn't exist
    os.makedirs('ml/datasets', exist_ok=True)
    
    # Generate 1000 samples
    df = generator.generate_dataset(total_samples=1000)
    
    # Save dataset
    generator.save_dataset(df, 'ml/datasets/hiring_training_data.csv')
    
    print("\n✅ Dataset generation complete!")
    
except Exception as e:
    print(f"\n❌ Error generating dataset: {e}")
    sys.exit(1)

# Step 2: Train Model
print("\n" + "=" * 70)
print("🧠 STEP 2: Training ML Model...")
print("-" * 70)

try:
    from ml.train_model import HiringModelTrainer
    
    # Create models directory if it doesn't exist
    os.makedirs('ml/models', exist_ok=True)
    
    trainer = HiringModelTrainer()
    model_path, metrics, importance = trainer.train_and_save()
    
    print("\n✅ Model training complete!")
    
except Exception as e:
    print(f"\n❌ Error training model: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

# Step 3: Test Inference
print("\n" + "=" * 70)
print("🧪 STEP 3: Testing ML Inference Service...")
print("-" * 70)

try:
    from ml.inference_service import MLInferenceService
    import numpy as np
    
    inference = MLInferenceService()
    inference.load_model()
    
    # Create a test feature vector (mock good candidate)
    test_features = np.array([
        0.85,  # keyword_match_ratio - high
        0.9,   # formatting_score - high  
        0.92,  # section_completeness - high
        0.15,  # ats_risk_score - low (inverse)
        0.1,   # grammar_error_rate - low
        0.88,  # clarity_score - high
        0.8,   # action_verb_ratio - high
        0.85,  # professional_tone_score - high
        0.6,   # project_count - good
        1.0,   # github_links - has links
        0.9,   # tech_stack_score - high
        1.0,   # cloud_experience - yes
        1.0,   # ci_cd_experience - yes
        0.8,   # impact_score - high
        0.2,   # weak_bullets_count - low
        0.1    # missing_sections_count - low
    ], dtype=np.float32)
    
    decision, confidence, top_factors = inference.predict(test_features)
    
    print(f"\n  Test Prediction:")
    print(f"  - Decision: {decision}")
    print(f"  - Confidence: {confidence:.2f}%")
    print(f"  - Top Factors:")
    for i, (feature, score) in enumerate(top_factors, 1):
        print(f"    {i}. {feature}: {score:.4f}")
    
    print("\n✅ ML inference service working correctly!")
    
except Exception as e:
    print(f"\n❌ Error testing inference: {e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

print("\n" + "=" * 70)
print("🎉 ML SETUP COMPLETE!")
print("=" * 70)
print("\n✅ All systems ready:")
print("  1. Training dataset generated (1000 samples)")
print("  2. ML model trained and saved")
print("  3. Inference service tested and operational")
print("\n💡 The ML-powered hiring brain is now ready to use!")
print("   Run 'python main.py' to start the backend with ML predictions.\n")
