"""
Master Orchestrator - Multi-Agent Coordinator
Determines which agents to activate and merges their outputs
"""

from typing import Dict, List, Any
from .ats_agent import ATSAgent
from .hr_agent import HRAgent
from .tech_lead_agent import TechLeadAgent
from .hiring_manager_agent import HiringManagerAgent
from .resume_coach_agent import ResumeCoachAgent
from .web_research_agent import WebResearchAgent
from .github_agent import GitHubAgent
from .paper_research_agent import PaperResearchAgent
from .comparison_agent import ComparisonAgent
from .learning_path_agent import LearningPathAgent

class MasterOrchestrator:
    """Master agent that coordinates all other agents"""
    
    def __init__(self):
        self.name = "MASTER_ORCHESTRATOR"
        
        # Initialize all agents
        self.ats_agent = ATSAgent()
        self.hr_agent = HRAgent()
        self.tech_lead_agent = TechLeadAgent()
        self.hiring_manager_agent = HiringManagerAgent()
        self.resume_coach_agent = ResumeCoachAgent()
        self.web_research_agent = WebResearchAgent()
        self.github_agent = GitHubAgent()
        self.paper_research_agent = PaperResearchAgent()
        self.comparison_agent = ComparisonAgent()
        self.learning_path_agent = LearningPathAgent()
    
    def process_request(self, request_type: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process user request and coordinate agents
        
        Args:
            request_type: Type of request (resume_analysis, technical_research, career_guidance)
            data: Request data
            
        Returns:
            Structured multi-agent response
        """
        if request_type == "resume_analysis":
            return self._handle_resume_analysis(data)
        elif request_type == "technical_research":
            return self._handle_technical_research(data)
        elif request_type == "career_guidance":
            return self._handle_career_guidance(data)
        elif request_type == "comparison":
            return self._handle_comparison(data)
        else:
            return {
                "error": "Unknown request type",
                "supported_types": ["resume_analysis", "technical_research", "career_guidance", "comparison"]
            }
    
    def _handle_resume_analysis(self, data: Dict) -> Dict[str, Any]:
        """
        Handle resume analysis - activate all resume agents
        
        Expected data: {"resume_text": str, "job_keywords": List[str] (optional)}
        """
        resume_text = data.get("resume_text", "")
        job_keywords = data.get("job_keywords", None)
        
        # Activate Resume Analysis Suite
        agent_outputs = []
        
        # 1. ATS Agent
        ats_result = self.ats_agent.analyze(resume_text, job_keywords)
        agent_outputs.append(self._format_agent_output("ATS_AGENT", ats_result))
        
        # 2. HR Agent
        hr_result = self.hr_agent.analyze(resume_text)
        agent_outputs.append(self._format_agent_output("HR_AGENT", hr_result))
        
        # 3. Tech Lead Agent
        tech_result = self.tech_lead_agent.analyze(resume_text)
        agent_outputs.append(self._format_agent_output("TECH LEAD_AGENT", tech_result))
        
        # 4. Resume Coach Agent (early for feature extraction)
        coach_result = self.resume_coach_agent.improve_resume(resume_text)
        agent_outputs.append(self._format_agent_output("RESUME_COACH_AGENT", coach_result))
        
        # 5. Hiring Manager Agent (uses scores AND full outputs for ML)
        # Prepare agent outputs dict for ML feature extraction
        ml_agent_outputs = {
            'ats': ats_result,
            'hr': hr_result,
            'tech': tech_result,
            'coach': coach_result
        }
        
        decision_result = self.hiring_manager_agent.make_decision(
            ats_score=ats_result["score"],
            hr_score=hr_result["score"],
            tech_score=tech_result["score"],
            agent_outputs=ml_agent_outputs  # Pass full outputs for ML
        )
        agent_outputs.append(self._format_agent_output("HIRING_MANAGER_AGENT", decision_result))
        
        # Generate final orchestrator response
        final_response = self._generate_resume_final_response(
            ats_result, hr_result, tech_result, decision_result, coach_result
        )
        
        return {
            "request_type": "resume_analysis",
            "agent_outputs": agent_outputs,
            "final_response": final_response
        }
    
    def _handle_technical_research(self, data: Dict) -> Dict[str, Any]:
        """
        Handle technical research - activate research agents
        
        Expected data: {"query": str, "include_github": bool, "include_papers": bool}
        """
        query = data.get("query", "")
        include_github = data.get("include_github", True)
        include_papers = data.get("include_papers", False)
        
        agent_outputs = []
        
        # 1. Web Research Agent
        web_result = self.web_research_agent.research(query)
        agent_outputs.append(self._format_agent_output("WEB_RESEARCH_AGENT", web_result))
        
        # 2. GitHub Agent (if requested)
        github_result = None
        if include_github:
            github_result = self.github_agent.search_repos(query)
            agent_outputs.append(self._format_agent_output("GITHUB_AGENT", github_result))
        
        # 3. Paper Research Agent (if PDF provided or requested)
        paper_result = None
        if include_papers and data.get("pdf_path"):
            paper_result = self.paper_research_agent.analyze_paper(data["pdf_path"])
            agent_outputs.append(self._format_agent_output("PAPER_RESEARCH_AGENT", paper_result))
        
        # 4. Learning Path Agent (always provide roadmap)
        learning_result = self.learning_path_agent.create_roadmap(query, level=data.get("level", "beginner"))
        agent_outputs.append(self._format_agent_output("LEARNING_PATH_AGENT", learning_result))
        
        # Generate final response
        final_response = self._generate_research_final_response(
            query, web_result, github_result, learning_result
        )
        
        return {
            "request_type": "technical_research",
            "agent_outputs": agent_outputs,
            "final_response": final_response
        }
    
    def _handle_career_guidance(self, data: Dict) -> Dict[str, Any]:
        """
        Handle career guidance - activate learning path agent
        
        Expected data: {"skill": str, "level": str, "duration_weeks": int}
        """
        skill = data.get("skill", "")
        level = data.get("level", "beginner")
        duration = data.get("duration_weeks", 12)
        
        agent_outputs = []
        
        # Learning Path Agent
        learning_result = self.learning_path_agent.create_roadmap(skill, level, duration)
        agent_outputs.append(self._format_agent_output("LEARNING_PATH_AGENT", learning_result))
        
        # Generate final response
        final_response = self._generate_career_final_response(learning_result)
        
        return {
            "request_type": "career_guidance",
            "agent_outputs": agent_outputs,
            "final_response": final_response
        }
    
    def _handle_comparison(self, data: Dict) -> Dict[str, Any]:
        """
        Handle tool/framework comparison
        
        Expected data: {"item1": str, "item2": str}
        """
        item1 = data.get("item1", "")
        item2 = data.get("item2", "")
        
        agent_outputs = []
        
        # Comparison Agent
        comparison_result = self.comparison_agent.compare(item1, item2)
        agent_outputs.append(self._format_agent_output("COMPARISON_AGENT", comparison_result))
        
        # Generate final response
        final_response = self._generate_comparison_final_response(comparison_result)
        
        return {
            "request_type": "comparison",
            "agent_outputs": agent_outputs,
            "final_response": final_response
        }
    
    def _format_agent_output(self, agent_name: str, result: Dict) -> Dict[str, Any]:
        """Format individual agent output for display"""
        return {
            "agent": agent_name,
            "output": result
        }
    
    def _generate_resume_final_response(self, ats_result: Dict, hr_result: Dict, 
                                       tech_result: Dict, decision_result: Dict, 
                                       coach_result: Dict) -> str:
        """Generate final orchestrator response for resume analysis"""
        decision = decision_result["decision"]
        overall_score = decision_result["overall_score"]
        
        response = f"## Overall Assessment: {decision} ({overall_score}/100)\n\n"
        
        if decision == "STRONG_HIRE":
            response += "🎉 **Excellent resume!** You have a strong profile that will stand out to recruiters.\n\n"
        elif decision == "SHORTLIST":
            response += "✅ **Good resume with room for improvement.** You're on the right track but can optimize further.\n\n"
        elif decision == "MAYBE":
            response += "⚠️ **Borderline resume.** Significant improvements needed to be competitive.\n\n"
        else:
            response += "❌ **Resume needs major improvements** before you can be competitive.\n\n"
        
        response += "### Score Breakdown:\n"
        response += f"- **ATS Compatibility:** {ats_result['score']}/100\n"
        response += f"- **Communication Quality:** {hr_result['score']}/100\n"
        response += f"- **Technical Skills:** {tech_result['score']}/100\n\n"
        
        response += "### Key Issues to Address:\n"
        
        # Collect recommendations
        all_recommendations = []
        if ats_result.get("recommendations"):
            all_recommendations.extend(ats_result["recommendations"][:2])
        if hr_result.get("improvements"):
            all_recommendations.extend(hr_result["improvements"][:2])
        if tech_result.get("recommendations"):
            all_recommendations.extend(tech_result["recommendations"][:2])
        
        for i, rec in enumerate(all_recommendations[:5], 1):
            response += f"{i}. {rec}\n"
        
        response += "\n### Next Steps:\n"
        for step in decision_result.get("next_steps", []):
            response += f"- {step}\n"
        
        if coach_result.get("bullet_improvements"):
            response += "\n💡 **See Resume Coach output above for specific bullet point rewrites.**"
        
        return response
    
    def _generate_research_final_response(self, query: str, web_result: Dict, 
                                         github_result: Dict, learning_result: Dict) -> str:
        """Generate final orchestrator response for technical research"""
        response = f"## Research Summary: {query}\n\n"
        
        response += "### What I Found:\n"
        response += f"- Analyzed {web_result.get('sources_analyzed', 0)} web sources\n"
        
        if github_result:
            response += f"- Discovered {github_result.get('total_found', 0)} GitHub repositories\n"
        
        response += f"\n### Learning Recommendation:\n"
        response += f"{learning_result.get('summary', 'Check the learning path above for detailed roadmap.')}\n\n"
        
        response += "### Best Resources to Start:\n"
        for resource in learning_result.get("resources", [])[:3]:
            response += f"- **{resource.get('name')}** ({resource.get('type')}) - {resource.get('cost', 'Free')}\n"
        
        response += "\n### Next Steps:\n"
        response += "1. Follow the learning path outlined above\n"
        response += "2. Study the GitHub repositories for real-world examples\n"
        response += "3. Build the suggested projects to apply your knowledge\n"
        
        return response
    
    def _generate_career_final_response(self, learning_result: Dict) -> str:
        """Generate final orchestrator response for career guidance"""
        skill = learning_result.get("skill", "")
        duration = learning_result.get("duration_weeks", 12)
        
        response = f"## Learning Roadmap: {skill}\n\n"
        response += f"**Duration:** {duration} weeks\n"
        response += f"**Phases:** {len(learning_result.get('phases', []))}\n\n"
        
        response += "### Your Journey:\n"
        for milestone in learning_result.get("milestones", []):
            response += f"✓ {milestone}\n"
        
        response += "\n### Key Projects to Build:\n"
        for project in learning_result.get("projects", [])[:4]:
            response += f"- {project}\n"
        
        response += "\n### Pro Tips:\n"
        for tip in learning_result.get("tips", [])[:3]:
            response += f"💡 {tip}\n"
        
        return response
    
    def _generate_comparison_final_response(self, comparison_result: Dict) -> str:
        """Generate final orchestrator response for comparison"""
        item1 = comparison_result.get("item1", "")
        item2 = comparison_result.get("item2", "")
        
        response = f"## Comparison: {item1} vs {item2}\n\n"
        
        comparison = comparison_result.get("comparison", {})
        recommendation = comparison.get("student_recommendation", "")
        
        if recommendation:
            response += f"### 🎓 Student Recommendation:\n{recommendation}\n\n"
        
        response += "**See detailed comparison table above for criteria scores and pros/cons.**\n"
        
        return response
