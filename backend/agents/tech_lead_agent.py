"""
Tech Lead Agent - Technical Evaluation
Evaluates projects, tech stack, engineering quality, scalability, and real-world value
"""

import re
from typing import Dict, List, Any

class TechLeadAgent:
    """Agent that evaluates technical competency and project quality"""
    
    # Technical skill categories with weights
    TECH_STACK_TIERS = {
        "tier_1": {  # High-demand, modern technologies
            "languages": ["python", "javascript", "typescript", "go", "rust"],
            "frameworks": ["react", "next.js", "fastapi", "django", "spring boot"],
            "cloud": ["aws", "kubernetes", "docker", "terraform", "microservices"],
            "databases": ["postgresql", "mongodb", "redis", "elasticsearch"],
            "ml_ai": ["tensorflow", "pytorch", "transformers", "mlflow"]
        },
        "tier_2": {  # Still relevant, good foundations
            "languages": ["java", "c#", "php", "ruby"],
            "frameworks": ["angular", "vue", "flask", "express"],
            "tools": ["jenkins", "gitlab ci", "ansible", "prometheus"]
        }
    }
    
    # Project quality indicators
    QUALITY_INDICATORS = [
        "deployed", "production", "scale", "users", "performance",
        "optimization", "architecture", "design pattern", "testing",
        "ci/cd", "monitoring", "security", "scalability"
    ]
    
    def __init__(self):
        self.name = "TECH_LEAD_AGENT"
    
    def analyze(self, resume_text: str) -> Dict[str, Any]:
        """
        Evaluate technical competency and project quality
        
        Args:
            resume_text: Extracted text from resume
            
        Returns:
            Dictionary with tech score and detailed analysis
        """
        resume_lower = resume_text.lower()
        
        # 1. Tech stack evaluation
        stack_analysis = self._evaluate_tech_stack(resume_lower)
        
        # 2. Project depth analysis
        project_score = self._analyze_projects(resume_text)
        
        # 3. Engineering practices
        practices_score = self._check_engineering_practices(resume_lower)
        
        # 4. Real-world impact
        impact_score = self._evaluate_impact(resume_text)
        
        # 5. Calculate overall tech score
        tech_score = self._calculate_score(stack_analysis, project_score, practices_score, impact_score)
        
        return {
            "agent": self.name,
            "score": tech_score,
            "stack_analysis": stack_analysis,
            "project_score": project_score,
            "practices_score": practices_score,
            "impact_score": impact_score,
            "strengths": self._identify_strengths(stack_analysis, project_score),
            "gaps": self._identify_gaps(stack_analysis),
            "recommendations": self._generate_recommendations(stack_analysis)
        }
    
    def _evaluate_tech_stack(self, text: str) -> Dict[str, Any]:
        """Evaluate breadth and depth of tech stack"""
        tier_1_found = []
        tier_2_found = []
        
        # Check tier 1 technologies
        for category, techs in self.TECH_STACK_TIERS["tier_1"].items():
            for tech in techs:
                if tech in text:
                    tier_1_found.append(tech)
        
        # Check tier 2 technologies
        for category, techs in self.TECH_STACK_TIERS["tier_2"].items():
            for tech in techs:
                if tech in text:
                    tier_2_found.append(tech)
        
        # Check for full-stack capability
        has_frontend = any(tech in text for tech in ["react", "angular", "vue", "next.js"])
        has_backend = any(tech in text for tech in ["fastapi", "django", "flask", "spring", "express"])
        has_database = any(tech in text for tech in ["postgresql", "mongodb", "mysql", "redis"])
        has_cloud = any(tech in text for tech in ["aws", "azure", "gcp", "docker", "kubernetes"])
        
        return {
            "tier_1_count": len(tier_1_found),
            "tier_2_count": len(tier_2_found),
            "tier_1_techs": tier_1_found,
            "tier_2_techs": tier_2_found,
            "full_stack": has_frontend and has_backend and has_database,
            "cloud_native": has_cloud
        }
    
    def _analyze_projects(self, text: str) -> int:
        """Analyze project depth and quality (0-100)"""
        score = 0
        text_lower = text.lower()
        
        # Check for project section
        if "project" in text_lower:
            score += 20
        
        # Check for quality indicators
        quality_count = sum(1 for indicator in self.QUALITY_INDICATORS if indicator in text_lower)
        score += min(40, quality_count * 5)
        
        # Check for GitHub/portfolio links
        if "github.com" in text_lower or "portfolio" in text_lower:
            score += 15
        
        # Check for quantified project metrics
        metrics = re.findall(r'\d+\+?\s*(users|requests|ms|mb|gb|%\s*improvement)', text_lower)
        score += min(25, len(metrics) * 5)
        
        return min(100, score)
    
    def _check_engineering_practices(self, text: str) -> int:
        """Check for modern engineering practices (0-100)"""
        score = 0
        
        practices = {
            "version_control": ["git", "github", "gitlab", "bitbucket"],
            "testing": ["test", "jest", "pytest", "junit", "tdd", "unit test"],
            "ci_cd": ["ci/cd", "jenkins", "github actions", "gitlab ci", "travis"],
            "agile": ["agile", "scrum", "kanban", "jira"],
            "code_quality": ["code review", "refactor", "clean code", "solid"],
            "documentation": ["documentation", "api docs", "swagger", "openapi"]
        }
        
        for category, keywords in practices.items():
            if any(keyword in text for keyword in keywords):
                score += 17  # ~6 categories, each worth 17 points
        
        return min(100, score)
    
    def _evaluate_impact(self, text: str) -> int:
        """Evaluate real-world impact and business value (0-100)"""
        score = 50  # Base score
        
        # Look for impact metrics
        impact_patterns = [
            r'(\d+)%\s*(improvement|increase|reduction|faster|decrease)',
            r'(\d+)x\s*(faster|improvement|increase)',
            r'saved\s*\$?(\d+)',
            r'(\d+)\+?\s*(users|customers|clients)',
            r'reduced.*by\s*(\d+)%',
            r'increased.*by\s*(\d+)%'
        ]
        
        impact_count = 0
        for pattern in impact_patterns:
            matches = re.findall(pattern, text.lower())
            impact_count += len(matches)
        
        score += min(50, impact_count * 10)
        
        return min(100, score)
    
    def _calculate_score(self, stack_analysis: Dict, project_score: int, 
                         practices_score: int, impact_score: int) -> int:
        """Calculate overall technical competency score"""
        # Tech stack breadth: 30%
        stack_score = min(100, (stack_analysis["tier_1_count"] * 10) + (stack_analysis["tier_2_count"] * 5))
        if stack_analysis["full_stack"]:
            stack_score += 15
        if stack_analysis["cloud_native"]:
            stack_score += 10
        stack_score = min(100, stack_score)
        
        # Projects: 30%
        # (already 0-100)
        
        # Engineering practices: 20%
        # (already 0-100)
        
        # Impact: 20%
        # (already 0-100)
        
        final_score = int(
            stack_score * 0.30 +
            project_score * 0.30 +
            practices_score * 0.20 +
            impact_score * 0.20
        )
        
        return min(100, final_score)
    
    def _identify_strengths(self, stack_analysis: Dict, project_score: int) -> List[str]:
        """Identify technical strengths"""
        strengths = []
        
        if stack_analysis["tier_1_count"] >= 8:
            strengths.append("Strong modern tech stack with high-demand skills")
        
        if stack_analysis["full_stack"]:
            strengths.append("Full-stack development capability")
        
        if stack_analysis["cloud_native"]:
            strengths.append("Cloud-native and DevOps experience")
        
        if project_score >= 80:
            strengths.append("Well-documented projects with measurable impact")
        
        return strengths if strengths else ["Solid technical foundation"]
    
    def _identify_gaps(self, stack_analysis: Dict) -> List[str]:
        """Identify missing skills or gaps"""
        gaps = []
        
        if not stack_analysis["cloud_native"]:
            gaps.append("Cloud platforms (AWS, Docker, Kubernetes)")
        
        if stack_analysis["tier_1_count"] < 5:
            gaps.append("Modern frameworks and languages")
        
        return gaps
    
    def _generate_recommendations(self, stack_analysis: Dict) -> List[str]:
        """Generate technical improvement recommendations"""
        recommendations = []
        
        if not stack_analysis["full_stack"]:
            recommendations.append("Add full-stack projects (frontend + backend + database)")
        
        if not stack_analysis["cloud_native"]:
            recommendations.append("Deploy projects on cloud platforms (AWS free tier, Vercel)")
        
        recommendations.append("Include GitHub links with well-documented repositories")
        recommendations.append("Add system design and architecture experience")
        recommendations.append("Quantify technical impact (performance improvements, scalability metrics)")
        
        return recommendations
