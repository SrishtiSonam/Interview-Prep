"""
Dataset Generator for ML Training
Generates synthetic resume analysis data for training the hiring model
"""

import random
import json
import pandas as pd
from typing import Dict, List, Tuple
import numpy as np
from feature_extractor import FeatureExtractor


class DatasetGenerator:
    """Generates synthetic training data for hiring ML model"""
    
    # Decision labels
    REJECT = 0
    MAYBE = 1
    SHORTLIST = 2
    STRONG_HIRE = 3
    
    LABEL_NAMES = {
        REJECT: 'REJECT',
        MAYBE: 'MAYBE',
        SHORTLIST: 'SHORTLIST',
        STRONG_HIRE: 'STRONG_HIRE'
    }
    
    def __init__(self):
        self.feature_extractor = FeatureExtractor()
        self.feature_names = self.feature_extractor.get_feature_names()
    
    def generate_ats_output(self, quality_level: str) -> Dict:
        """Generate simulated ATS agent output"""
        if quality_level == 'high':
            score = random.randint(75, 95)
            found_keywords = random.randint(10, 20)
            missing_keywords = random.randint(0, 3)
            formatting_issues = random.randint(0, 1)
            structure_score = random.randint(80, 100)
        elif quality_level == 'medium':
            score = random.randint(60, 75)
            found_keywords = random.randint(6, 12)
            missing_keywords = random.randint(3, 8)
            formatting_issues = random.randint(1, 3)
            structure_score = random.randint(60, 80)
        else:  # low
            score = random.randint(30, 60)
            found_keywords = random.randint(2, 8)
            missing_keywords = random.randint(8, 15)
            formatting_issues = random.randint(3, 6)
            structure_score = random.randint(30, 60)
        
        return {
            'score': score,
            'found_keywords': ['keyword'] * found_keywords,
            'missing_keywords': ['missing'] * missing_keywords,
            'formatting_issues': ['issue'] * formatting_issues,
            'structure_score': structure_score
        }
    
    def generate_hr_output(self, quality_level: str) -> Dict:
        """Generate simulated HR agent output"""
        if quality_level == 'high':
            score = random.randint(75, 95)
            grammar_issues = random.randint(0, 2)
            strengths = random.randint(5, 8)
            improvements = random.randint(0, 2)
        elif quality_level == 'medium':
            score = random.randint(55, 75)
            grammar_issues = random.randint(2, 4)
            strengths = random.randint(3, 5)
            improvements = random.randint(2, 4)
        else:  # low
            score = random.randint(30, 55)
            grammar_issues = random.randint(4, 8)
            strengths = random.randint(1, 3)
            improvements = random.randint(5, 8)
        
        return {
            'score': score,
            'grammar_issues': ['issue'] * grammar_issues,
            'strengths': ['strength'] * strengths,
            'improvements': ['improvement'] * improvements
        }
    
    def generate_tech_output(self, quality_level: str) -> Dict:
        """Generate simulated Tech Lead agent output"""
        cloud_tech = ['aws', 'azure', 'docker', 'kubernetes']
        cicd_tech = ['ci/cd', 'jenkins', 'github actions']
        
        if quality_level == 'high':
            score = random.randint(75, 95)
            strengths = [
                f"Project {i}" for i in range(random.randint(3, 5))
            ]
            # Add cloud and CI/CD mentions
            strengths.extend([
                f"Used {random.choice(cloud_tech)}",
                f"Implemented {random.choice(cicd_tech)}",
                "GitHub: github.com/user/project",
                "Improved performance by 40%",
                "Scaled to 10k users"
            ])
            gaps = random.randint(0, 2)
        elif quality_level == 'medium':
            score = random.randint(55, 75)
            strengths = [
                f"Project {i}" for i in range(random.randint(1, 3))
            ]
            # Maybe cloud, maybe not
            if random.random() > 0.5:
                strengths.append(f"Used {random.choice(cloud_tech)}")
            strengths.append("Some metrics: 20% faster")
            gaps = random.randint(2, 4)
        else:  # low
            score = random.randint(30, 55)
            strengths = ["Basic project"] if random.random() > 0.3 else []
            gaps = random.randint(5, 8)
        
        return {
            'score': score,
            'stack_analysis': {'tier_1': random.randint(1, 5)},
            'strengths': strengths,
            'gaps': ['gap'] * gaps
        }
    
    def generate_coach_output(self, quality_level: str) -> Dict:
        """Generate simulated Resume Coach output"""
        if quality_level == 'high':
            bullet_improvements = random.randint(0, 2)
            missing_sections = random.randint(0, 1)
        elif quality_level == 'medium':
            bullet_improvements = random.randint(2, 5)
            missing_sections = random.randint(1, 2)
        else:  # low
            bullet_improvements = random.randint(5, 10)
            missing_sections = random.randint(2, 4)
        
        return {
            'bullet_improvements': [{'original': 'x', 'improved': 'y'}] * bullet_improvements,
            'missing_sections': ['section'] * missing_sections
        }
    
    def generate_sample(self, label: int) -> Tuple[np.ndarray, int]:
        """
        Generate a single training sample
        
        Args:
            label: Target label (REJECT, MAYBE, SHORTLIST, STRONG_HIRE)
        
        Returns:
            (feature_vector, label)
        """
        # Define quality levels for each component based on label
        if label == self.STRONG_HIRE:
            # Strong hire: All high quality
            ats_quality = 'high'
            hr_quality = 'high'
            tech_quality = 'high'
            coach_quality = 'high'
        
        elif label == self.SHORTLIST:
            # Shortlist: Good tech, decent ATS/HR
            ats_quality = random.choice(['medium', 'high'])
            hr_quality = random.choice(['medium', 'high'])
            tech_quality = 'high'
            coach_quality = random.choice(['medium', 'high'])
        
        elif label == self.MAYBE:
            # Maybe: Mixed - some good, some weak
            qualities = ['low', 'medium']
            ats_quality = random.choice(qualities + ['medium'])
            hr_quality = random.choice(qualities)
            tech_quality = random.choice(qualities + ['medium'])
            coach_quality = random.choice(qualities)
        
        else:  # REJECT
            # Reject: At least one critical failure
            if random.random() < 0.5:
                # ATS failure
                ats_quality = 'low'
                hr_quality = random.choice(['low', 'medium'])
                tech_quality = random.choice(['low', 'medium'])
            else:
                # Tech failure
                ats_quality = random.choice(['low', 'medium'])
                hr_quality = random.choice(['low', 'medium'])
                tech_quality = 'low'
            coach_quality = 'low'
        
        # Generate agent outputs
        agent_outputs = {
            'ats': self.generate_ats_output(ats_quality),
            'hr': self.generate_hr_output(hr_quality),
            'tech': self.generate_tech_output(tech_quality),
            'coach': self.generate_coach_output(coach_quality)
        }
        
        # Extract features
        feature_vector = self.feature_extractor.create_feature_vector(agent_outputs)
        
        return feature_vector, label
    
    def generate_dataset(self, 
                        total_samples: int = 1000,
                        class_distribution: Dict[int, float] = None) -> pd.DataFrame:
        """
        Generate complete training dataset
        
        Args:
            total_samples: Total number of samples to generate
            class_distribution: Distribution of classes (defaults to balanced)
        
        Returns:
            pandas DataFrame with features and labels
        """
        if class_distribution is None:
            # Balanced distribution
            class_distribution = {
                self.REJECT: 0.30,
                self.MAYBE: 0.25,
                self.SHORTLIST: 0.30,
                self.STRONG_HIRE: 0.15
            }
        
        # Calculate samples per class
        samples_per_class = {
            label: int(total_samples * ratio)
            for label, ratio in class_distribution.items()
        }
        
        # Generate samples
        features_list = []
        labels_list = []
        
        for label, count in samples_per_class.items():
            for _ in range(count):
                feature_vector, label = self.generate_sample(label)
                features_list.append(feature_vector)
                labels_list.append(label)
        
        # Convert to DataFrame
        data = {
            name: [features[i] for features in features_list]
            for i, name in enumerate(self.feature_names)
        }
        data['label'] = labels_list
        data['label_name'] = [self.LABEL_NAMES[label] for label in labels_list]
        
        df = pd.DataFrame(data)
        
        # Shuffle
        df = df.sample(frac=1, random_state=42).reset_index(drop=True)
        
        return df
    
    def save_dataset(self, df: pd.DataFrame, filepath: str):
        """Save dataset to CSV"""
        df.to_csv(filepath, index=False)
        print(f"✅ Dataset saved to {filepath}")
        print(f"   Total samples: {len(df)}")
        print(f"   Class distribution:")
        for label_name, count in df['label_name'].value_counts().items():
            print(f"   - {label_name}: {count} ({count/len(df)*100:.1f}%)")


def main():
    """Generate and save training dataset"""
    print("🔧 Generating training dataset for ScholarAI ML model...")
    
    generator = DatasetGenerator()
    
    # Generate 1000 samples
    df = generator.generate_dataset(total_samples=1000)
    
    # Save dataset
    generator.save_dataset(df, 'ml/datasets/hiring_training_data.csv')
    
    # Display sample
    print("\n📊 Sample data (first 5 rows):")
    print(df.head())
    
    print("\n📈 Feature statistics:")
    print(df.describe())
    
    return df


if __name__ == "__main__":
    main()
