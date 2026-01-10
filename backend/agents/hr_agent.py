"""
HR Agent - Human Resources Communication Analysis
Evaluates clarity, grammar, tone, professionalism, and communication quality
"""

import re
from typing import Dict, List, Any

class HRAgent:
    """Agent that evaluates resume communication and professionalism"""
    
    # Weak/passive phrases to avoid
    WEAK_PHRASES = [
        "responsible for", "duties included", "worked on", "helped with",
        "assisted in", "involved in", "participated in", "contributed to"
    ]
    
    # Strong action verbs
    STRONG_VERBS = [
        "led", "developed", "created", "implemented", "designed", "built",
        "launched", "achieved", "increased", "reduced", "improved", "optimized",
        "architected", "engineered", "delivered", "managed", "coordinated"
    ]
    
    # Professional red flags
    RED_FLAGS = [
        "i", "me", "my", "we", "our"  # First/second person pronouns
    ]
    
    def __init__(self):
        self.name = "HR_AGENT"
    
    def analyze(self, resume_text: str) -> Dict[str, Any]:
        """
        Analyze resume communication quality
        
        Args:
            resume_text: Extracted text from resume
            
        Returns:
            Dictionary with HR score and detailed feedback
        """
        # 1. Grammar and spelling checks (basic)
        grammar_issues = self._check_grammar(resume_text)
        
        # 2. Tone and professionalism
        tone_score = self._analyze_tone(resume_text)
        
        # 3. Action verb usage
        verb_analysis = self._analyze_verbs(resume_text)
        
        # 4. Clarity and conciseness
        clarity_score = self._check_clarity(resume_text)
        
        # 5. Calculate overall HR score
        hr_score = self._calculate_score(grammar_issues, tone_score, verb_analysis, clarity_score)
        
        return {
            "agent": self.name,
            "score": hr_score,
            "grammar_issues": grammar_issues,
            "tone_score": tone_score,
            "verb_analysis": verb_analysis,
            "clarity_score": clarity_score,
            "strengths": self._identify_strengths(resume_text),
            "improvements": self._generate_improvements(grammar_issues, verb_analysis)
        }
    
    def _check_grammar(self, text: str) -> List[str]:
        """Basic grammar and formatting checks"""
        issues = []
        
        # Check for inconsistent capitalization in sentences
        sentences = re.split(r'[.!?]\s+', text)
        for sentence in sentences:
            if sentence and sentence[0].islower() and sentence[0].isalpha():
                issues.append("Inconsistent capitalization detected")
                break
        
        # Check for double spaces
        if "  " in text:
            issues.append("Multiple consecutive spaces found")
        
        # Check for missing periods at end of bullet points
        lines = text.split('\n')
        bullets = [line for line in lines if line.strip().startswith(('•', '-', '*'))]
        if bullets:
            no_period = sum(1 for bullet in bullets if bullet.strip() and not bullet.strip()[-1] in '.!?')
            if no_period > len(bullets) / 2:
                issues.append("Inconsistent punctuation at end of bullet points")
        
        return issues
    
    def _analyze_tone(self, text: str) -> int:
        """Analyze professional tone (0-100)"""
        score = 100
        text_lower = text.lower()
        
        # Penalize first-person pronouns
        pronoun_count = sum(text_lower.count(f" {word} ") for word in self.RED_FLAGS)
        score -= min(30, pronoun_count * 5)
        
        # Check for informal language
        informal_words = ["stuff", "things", "got", "gonna", "wanna", "kinda", "sorta"]
        informal_count = sum(text_lower.count(word) for word in informal_words)
        score -= min(20, informal_count * 10)
        
        # Check for professional formatting
        if not any(section in text_lower for section in ["experience", "education", "skills"]):
            score -= 15
        
        return max(0, score)
    
    def _analyze_verbs(self, text: str) -> Dict[str, Any]:
        """Analyze action verb usage"""
        text_lower = text.lower()
        
        weak_count = sum(text_lower.count(phrase) for phrase in self.WEAK_PHRASES)
        strong_count = sum(text_lower.count(verb) for verb in self.STRONG_VERBS)
        
        return {
            "weak_phrases_count": weak_count,
            "strong_verbs_count": strong_count,
            "ratio": strong_count / max(1, weak_count + strong_count)
        }
    
    def _check_clarity(self, text: str) -> int:
        """Check for clarity and conciseness (0-100)"""
        score = 100
        
        # Check average sentence length
        sentences = re.split(r'[.!?]\s+', text)
        if sentences:
            avg_length = sum(len(s.split()) for s in sentences) / len(sentences)
            if avg_length > 30:
                score -= 20  # Too wordy
            elif avg_length < 8:
                score -= 10  # Too choppy
        
        # Check for jargon overload (too many technical terms without explanation)
        words = text.split()
        if words:
            acronym_count = sum(1 for word in words if word.isupper() and len(word) > 1)
            acronym_ratio = acronym_count / len(words)
            if acronym_ratio > 0.05:
                score -= 15
        
        return max(0, score)
    
    def _calculate_score(self, grammar_issues: List[str], tone_score: int, 
                         verb_analysis: Dict, clarity_score: int) -> int:
        """Calculate overall HR communication score"""
        # Grammar: 25%
        grammar_score = max(0, 100 - (len(grammar_issues) * 15))
        
        # Tone: 25%
        # (already 0-100)
        
        # Verb usage: 25%
        verb_score = int(verb_analysis["ratio"] * 100)
        
        # Clarity: 25%
        # (already 0-100)
        
        final_score = int(
            grammar_score * 0.25 +
            tone_score * 0.25 +
            verb_score * 0.25 +
            clarity_score * 0.25
        )
        
        return min(100, max(0, final_score))
    
    def _identify_strengths(self, text: str) -> List[str]:
        """Identify communication strengths"""
        strengths = []
        text_lower = text.lower()
        
        # Check for quantified achievements
        numbers = re.findall(r'\d+%|\d+x|\d+\+', text)
        if len(numbers) >= 5:
            strengths.append("Strong use of metrics and quantified achievements")
        
        # Check for action verbs
        strong_verb_count = sum(text_lower.count(verb) for verb in self.STRONG_VERBS)
        if strong_verb_count >= 8:
            strengths.append("Excellent use of action verbs")
        
        # Check for professional structure
        if all(section in text_lower for section in ["experience", "education", "skills"]):
            strengths.append("Well-structured with standard sections")
        
        return strengths if strengths else ["Clear and professional presentation"]
    
    def _generate_improvements(self, grammar_issues: List[str], verb_analysis: Dict) -> List[str]:
        """Generate improvement suggestions"""
        improvements = []
        
        if grammar_issues:
            improvements.extend(grammar_issues)
        
        if verb_analysis["weak_phrases_count"] > 3:
            improvements.append("Replace weak phrases ('responsible for', 'helped with') with strong action verbs")
        
        improvements.append("Start each bullet with a strong action verb (Led, Developed, Created)")
        improvements.append("Quantify every achievement with specific metrics")
        improvements.append("Keep bullets concise (1-2 lines max)")
        
        return improvements
