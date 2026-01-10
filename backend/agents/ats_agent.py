"""
ATS Agent - Applicant Tracking System Analysis
Analyzes resumes for keyword match, structure, ATS readability, and formatting
"""

import re
from typing import Dict, List, Any

class ATSAgent:
    """Agent that evaluates resume ATS compatibility"""
    
    # Common ATS-friendly keywords by category
    TECH_KEYWORDS = {
        "languages": ["python", "javascript", "java", "c++", "c#", "go", "rust", "typescript", "sql", "r"],
        "frameworks": ["react", "angular", "vue", "django", "flask", "fastapi", "spring", "express", "next.js"],
        "cloud": ["aws", "azure", "gcp", "docker", "kubernetes", "terraform", "jenkins", "ci/cd"],
        "databases": ["postgresql", "mongodb", "mysql", "redis", "elasticsearch", "dynamodb"],
        "ml_ai": ["machine learning", "deep learning", "tensorflow", "pytorch", "scikit-learn", "nlp", "computer vision"],
        "tools": ["git", "jira", "agile", "scrum", "rest api", "graphql", "microservices"]
    }
    
    def __init__(self):
        self.name = "ATS_AGENT"
        
    def analyze(self, resume_text: str, job_keywords: List[str] = None) -> Dict[str, Any]:
        """
        Analyze resume for ATS compatibility
        
        Args:
            resume_text: Extracted text from resume
            job_keywords: Optional list of specific job keywords to match against
            
        Returns:
            Dictionary with ATS score and detailed analysis
        """
        resume_lower = resume_text.lower()
        
        # 1. Keyword Analysis
        found_keywords, missing_keywords = self._analyze_keywords(resume_lower, job_keywords)
        
        # 2. Formatting Analysis
        formatting_issues = self._check_formatting(resume_text)
        
        # 3. Structure Analysis
        structure_score = self._check_structure(resume_text)
        
        # 4. Calculate overall ATS score
        ats_score = self._calculate_score(found_keywords, formatting_issues, structure_score)
        
        return {
            "agent": self.name,
            "score": ats_score,
            "found_keywords": found_keywords,
            "missing_keywords": missing_keywords,
            "formatting_issues": formatting_issues,
            "structure_score": structure_score,
            "recommendations": self._generate_recommendations(missing_keywords, formatting_issues)
        }
    
    def _analyze_keywords(self, resume_text: str, job_keywords: List[str] = None) -> tuple:
        """Find matching and missing keywords"""
        found = []
        missing = []
        
        # If specific job keywords provided, use those
        if job_keywords:
            for keyword in job_keywords:
                if keyword.lower() in resume_text:
                    found.append(keyword)
                else:
                    missing.append(keyword)
        else:
            # Otherwise use general tech keywords
            all_keywords = []
            for category, keywords in self.TECH_KEYWORDS.items():
                all_keywords.extend(keywords)
            
            for keyword in all_keywords:
                if keyword in resume_text:
                    found.append(keyword)
        
        return found, missing
    
    def _check_formatting(self, resume_text: str) -> List[str]:
        """Check for ATS-unfriendly formatting"""
        issues = []
        
        # Check for tables (ATS often can't parse them)
        if "|" in resume_text or "│" in resume_text:
            issues.append("Tables detected - may not parse correctly in ATS")
        
        # Check for bullet points
        if not any(char in resume_text for char in ["•", "●", "-", "*"]):
            issues.append("No bullet points found - use consistent bullet formatting")
        
        # Check for excessive special characters
        special_char_count = len(re.findall(r"[^\w\s,.@-]", resume_text))
        if special_char_count > 50:
            issues.append("Excessive special characters may confuse ATS parsers")
        
        # Check for proper section headers
        common_sections = ["experience", "education", "skills", "projects"]
        found_sections = sum(1 for section in common_sections if section in resume_text.lower())
        if found_sections < 3:
            issues.append("Missing standard resume sections (Experience, Education, Skills)")
        
        return issues
    
    def _check_structure(self, resume_text: str) -> int:
        """Evaluate resume structure (0-100)"""
        score = 100
        
        # Penalize if too short (< 200 words)
        word_count = len(resume_text.split())
        if word_count < 200:
            score -= 20
        elif word_count > 1000:
            score -= 10  # Slightly penalize if too long
        
        # Check for contact information
        if not re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', resume_text):
            score -= 15
        
        # Check for phone number
        if not re.search(r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', resume_text):
            score -= 10
        
        # Check for quantifiable achievements (numbers)
        numbers = re.findall(r'\d+%|\d+x|\d+\+', resume_text)
        if len(numbers) < 3:
            score -= 15
        
        return max(0, score)
    
    def _calculate_score(self, found_keywords: List[str], formatting_issues: List[str], structure_score: int) -> int:
        """Calculate overall ATS compatibility score (0-100)"""
        # Keyword matching: 50% weight
        keyword_score = min(100, len(found_keywords) * 5)
        
        # Formatting: 25% weight
        formatting_score = max(0, 100 - (len(formatting_issues) * 20))
        
        # Structure: 25% weight
        final_score = int(
            keyword_score * 0.5 + 
            formatting_score * 0.25 + 
            structure_score * 0.25
        )
        
        return min(100, max(0, final_score))
    
    def _generate_recommendations(self, missing_keywords: List[str], formatting_issues: List[str]) -> List[str]:
        """Generate actionable recommendations"""
        recommendations = []
        
        if missing_keywords:
            recommendations.append(f"Add relevant keywords: {', '.join(missing_keywords[:5])}")
        
        if formatting_issues:
            recommendations.extend(formatting_issues)
        
        recommendations.append("Use consistent bullet points with action verbs")
        recommendations.append("Quantify achievements with metrics and numbers")
        recommendations.append("Keep formatting simple - avoid tables and complex layouts")
        
        return recommendations
