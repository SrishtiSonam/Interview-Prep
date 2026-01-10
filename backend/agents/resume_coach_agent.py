"""
Resume Coach Agent - Resume Improvement Specialist
Rewrites weak bullets, improves impact, and optimizes resume content
"""

import re
from typing import Dict, List, Any, Tuple

class ResumeCoachAgent:
    """Agent that provides concrete resume improvements"""
    
    # Action verb library by category
    ACTION_VERBS = {
        "leadership": ["Led", "Directed", "Managed", "Coordinated", "Supervised"],
        "creation": ["Developed", "Created", "Built", "Designed", "Architected"],
        "improvement": ["Optimized", "Enhanced", "Improved", "Streamlined", "Refactored"],
        "achievement": ["Achieved", "Delivered", "Launched", "Implemented", "Executed"],
        "analysis": ["Analyzed", "Evaluated", "Assessed", "Investigated", "Researched"],
        "collaboration": ["Collaborated", "Partnered", "Facilitated", "Mentored", "Trained"]
    }
    
    def __init__(self):
        self.name = "RESUME_COACH_AGENT"
    
    def improve_resume(self, resume_text: str) -> Dict[str, Any]:
        """
        Provide concrete resume improvements
        
        Args:
            resume_text: Extracted text from resume
            
        Returns:
            Dictionary with specific improvement suggestions
        """
        # 1. Extract and rewrite weak bullet points
        bullet_improvements = self._rewrite_bullets(resume_text)
        
        # 2. Suggest missing sections
        missing_sections = self._identify_missing_sections(resume_text)
        
        # 3. Provide content templates
        templates = self._provide_templates()
        
        # 4. Suggest keywords to add
        keyword_suggestions = self._suggest_keywords(resume_text)
        
        return {
            "agent": self.name,
            "bullet_improvements": bullet_improvements,
            "missing_sections": missing_sections,
            "templates": templates,
            "keyword_suggestions": keyword_suggestions,
            "quick_wins": self._generate_quick_wins()
        }
    
    def _rewrite_bullets(self, text: str) -> List[Dict[str, str]]:
        """Extract and rewrite weak bullet points"""
        improvements = []
        
        # Extract bullet points
        lines = text.split('\n')
        bullets = []
        for line in lines:
            stripped = line.strip()
            if stripped and any(stripped.startswith(char) for char in ['•', '-', '*', '◦']):
                # Remove bullet character
                bullet_text = re.sub(r'^[•\-*◦]\s*', '', stripped)
                if len(bullet_text) > 10:  # Only process substantial bullets
                    bullets.append(bullet_text)
        
        # Rewrite weak bullets
        weak_patterns = [
            (r'^(Responsible for|Duties included|Worked on|Helped with)', "passive_start"),
            (r'^[a-z]', "lowercase_start"),
            (r'.*(?<!\d)(?<!\%)$', "no_metrics")  # No numbers or percentages
        ]
        
        for bullet in bullets[:5]:  # Limit to first 5 bullets
            issues = []
            for pattern, issue_type in weak_patterns:
                if re.search(pattern, bullet):
                    issues.append(issue_type)
            
            if issues:
                improved = self._improve_bullet(bullet, issues)
                improvements.append({
                    "original": bullet,
                    "improved": improved,
                    "issues": issues
                })
        
        return improvements
    
    def _improve_bullet(self, bullet: str, issues: List[str]) -> str:
        """Improve a single bullet point"""
        improved = bullet
        
        # Fix passive starts
        if "passive_start" in issues:
            # Extract the main content after weak phrase
            improved = re.sub(
                r'^(Responsible for|Duties included|Worked on|Helped with|Assisted in)\s+',
                '',
                improved,
                flags=re.IGNORECASE
            )
        
        # Fix lowercase starts
        if "lowercase_start" in issues:
            improved = improved[0].upper() + improved[1:] if improved else improved
        
        # Add strong action verb if needed
        if not any(verb.lower() in improved.lower()[:20] for verbs in self.ACTION_VERBS.values() for verb in verbs):
            # Pick appropriate action verb
            if "develop" in improved.lower() or "build" in improved.lower() or "create" in improved.lower():
                improved = f"Developed {improved.lower()}"
            elif "improve" in improved.lower() or "optimize" in improved.lower():
                improved = f"Optimized {improved.lower()}"
            elif "lead" in improved.lower() or "manage" in improved.lower():
                improved = f"Led {improved.lower()}"
            else:
                improved = f"Implemented {improved.lower()}"
        
        # Suggest adding metrics if missing
        if "no_metrics" in issues:
            improved += " [Add metric: e.g., '40% faster', '500+ users', '$10K savings']"
        
        return improved
    
    def _identify_missing_sections(self, text: str) -> List[str]:
        """Identify missing resume sections"""
        text_lower = text.lower()
        standard_sections = {
            "experience": ["experience", "work history", "employment"],
            "education": ["education", "degree", "university"],
            "skills": ["skills", "technical skills", "technologies"],
            "projects": ["projects", "portfolio"],
            "certifications": ["certifications", "certificates", "certified"]
        }
        
        missing = []
        for section, keywords in standard_sections.items():
            if not any(keyword in text_lower for keyword in keywords):
                missing.append(section.title())
        
        return missing
    
    def _provide_templates(self) -> Dict[str, List[str]]:
        """Provide bullet point templates"""
        return {
            "impact_template": [
                "[Action Verb] + [What You Did] + [How You Did It] + [Quantifiable Result]",
                "Example: Optimized database queries using indexing and caching, reducing response time by 60%"
            ],
            "leadership_template": [
                "[Led/Managed] + [Team Size/Scope] + [What] + [Outcome/Impact]",
                "Example: Led team of 5 developers to build microservices platform, serving 10K+ daily users"
            ],
            "technical_template": [
                "[Built/Developed] + [Technology Stack] + [Purpose] + [Scale/Metrics]",
                "Example: Built RESTful API using FastAPI and PostgreSQL, handling 1M+ requests/day"
            ]
        }
    
    def _suggest_keywords(self, text: str) -> Dict[str, List[str]]:
        """Suggest missing high-value keywords"""
        text_lower = text.lower()
        
        suggestions = {
            "modern_tech": [],
            "cloud_devops": [],
            "soft_skills": []
        }
        
        # Modern tech keywords
        modern_tech = ["react", "python", "typescript", "fastapi", "next.js", "machine learning"]
        for tech in modern_tech:
            if tech not in text_lower:
                suggestions["modern_tech"].append(tech)
        
        # Cloud/DevOps keywords
        cloud_keywords = ["docker", "kubernetes", "aws", "ci/cd", "microservices"]
        for keyword in cloud_keywords:
            if keyword not in text_lower:
                suggestions["cloud_devops"].append(keyword)
        
        # Soft skills keywords
        soft_skills = ["leadership", "collaboration", "mentorship", "agile", "problem-solving"]
        for skill in soft_skills:
            if skill not in text_lower:
                suggestions["soft_skills"].append(skill)
        
        return {k: v[:3] for k, v in suggestions.items()}  # Limit to top 3 per category
    
    def _generate_quick_wins(self) -> List[str]:
        """Generate quick improvement tips"""
        return [
            "Start every bullet with a strong action verb (Led, Developed, Optimized)",
            "Add numbers to every achievement (%, $, user count, time savings)",
            "Keep bullets to 1-2 lines maximum",
            "Remove personal pronouns (I, me, my)",
            "Use present tense for current role, past tense for previous roles",
            "Include GitHub link if you have public projects",
            "Add a 'Technical Skills' section with all relevant technologies"
        ]
