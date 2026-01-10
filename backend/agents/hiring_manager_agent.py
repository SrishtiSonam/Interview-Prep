"""
Hiring Manager Agent - Final Decision Agent
Makes hire/reject decisions based on business needs and overall candidate assessment
"""

from typing import Dict, Any, List

class HiringManagerAgent:
    """Agent that makes final hire/reject decisions"""
    
    def __init__(self):
        self.name = "HIRING_MANAGER_AGENT"
        
        # Decision thresholds
        self.SHORTLIST_THRESHOLD = 70  # Overall score >= 70 -> Shortlist
        self.STRONG_HIRE_THRESHOLD = 85  # Overall score >= 85 -> Strong hire
    
    def make_decision(self, ats_score: int, hr_score: int, tech_score: int) -> Dict[str, Any]:
        """
        Make final hiring decision based on all agent scores
        
        Args:
            ats_score: Score from ATS Agent (0-100)
            hr_score: Score from HR Agent (0-100)
            tech_score: Score from Tech Lead Agent (0-100)
            
        Returns:
            Dictionary with decision and detailed reasoning
        """
        # Calculate weighted overall score
        # ATS: 20%, HR: 25%, Tech: 55% (tech skills most important)
        overall_score = int(
            ats_score * 0.20 +
            hr_score * 0.25 +
            tech_score * 0.55
        )
        
        # Make decision
        decision = self._determine_decision(overall_score, ats_score, hr_score, tech_score)
        
        # Generate reasoning
        reasoning = self._generate_reasoning(decision, overall_score, ats_score, hr_score, tech_score)
        
        # Identify deal-breakers
        deal_breakers = self._check_deal_breakers(ats_score, hr_score, tech_score)
        
        # Generate next steps
        next_steps = self._generate_next_steps(decision, deal_breakers)
        
        return {
            "agent": self.name,
            "decision": decision,
            "overall_score": overall_score,
            "individual_scores": {
                "ats": ats_score,
                "hr": hr_score,
                "tech": tech_score
            },
            "reasoning": reasoning,
            "deal_breakers": deal_breakers,
            "next_steps": next_steps
        }
    
    def _determine_decision(self, overall_score: int, ats_score: int, 
                           hr_score: int, tech_score: int) -> str:
        """Determine hiring decision"""
        # Deal-breaker checks
        if ats_score < 50:
            return "REJECT"
        if tech_score < 50:
            return "REJECT"
        if hr_score < 40:
            return "REJECT"
        
        # Overall score evaluation
        if overall_score >= self.STRONG_HIRE_THRESHOLD:
            return "STRONG_HIRE"
        elif overall_score >= self.SHORTLIST_THRESHOLD:
            return "SHORTLIST"
        elif overall_score >= 60:
            return "MAYBE"
        else:
            return "REJECT"
    
    def _generate_reasoning(self, decision: str, overall_score: int,
                           ats_score: int, hr_score: int, tech_score: int) -> str:
        """Generate detailed reasoning for the decision"""
        if decision == "STRONG_HIRE":
            return (
                f"Excellent candidate with strong performance across all areas (Overall: {overall_score}/100). "
                f"Technical skills are outstanding ({tech_score}/100), professional communication is clear ({hr_score}/100), "
                f"and resume is well-optimized for ATS systems ({ats_score}/100). "
                "Recommend fast-track to final interview rounds."
            )
        
        elif decision == "SHORTLIST":
            weak_areas = []
            if ats_score < 70:
                weak_areas.append("ATS optimization")
            if hr_score < 70:
                weak_areas.append("communication clarity")
            if tech_score < 70:
                weak_areas.append("technical depth")
            
            weak_str = ", ".join(weak_areas) if weak_areas else "minor areas"
            
            return (
                f"Good candidate with solid potential (Overall: {overall_score}/100). "
                f"Strong technical foundation but could improve in: {weak_str}. "
                "Recommend phone screen to assess further."
            )
        
        elif decision == "MAYBE":
            return (
                f"Borderline candidate (Overall: {overall_score}/100). "
                f"Has potential but needs significant improvements. "
                f"ATS: {ats_score}/100, HR: {hr_score}/100, Tech: {tech_score}/100. "
                "Consider if desperate for candidates, otherwise pass."
            )
        
        else:  # REJECT
            weak_areas = []
            if ats_score < 50:
                weak_areas.append(f"ATS compatibility ({ats_score}/100)")
            if hr_score < 40:
                weak_areas.append(f"communication quality ({hr_score}/100)")
            if tech_score < 50:
                weak_areas.append(f"technical skills ({tech_score}/100)")
            
            return (
                f"Not recommended at this time (Overall: {overall_score}/100). "
                f"Critical gaps in: {', '.join(weak_areas)}. "
                "Candidate should focus on skill development before reapplying."
            )
    
    def _check_deal_breakers(self, ats_score: int, hr_score: int, tech_score: int) -> List[str]:
        """Identify any deal-breaking issues"""
        deal_breakers = []
        
        if ats_score < 50:
            deal_breakers.append("Resume will be filtered out by ATS systems - critical formatting issues")
        
        if tech_score < 50:
            deal_breakers.append("Technical skills below minimum requirements")
        
        if hr_score < 40:
            deal_breakers.append("Poor communication clarity - may struggle in team settings")
        
        return deal_breakers
    
    def _generate_next_steps(self, decision: str, deal_breakers: List[str]) -> List[str]:
        """Generate next steps based on decision"""
        if decision == "STRONG_HIRE":
            return [
                "Schedule technical interview immediately",
                "Prepare system design questions",
                "Consider expedited interview process"
            ]
        
        elif decision == "SHORTLIST":
            return [
                "Schedule 30-minute phone screen",
                "Prepare behavioral and technical questions",
                "Review GitHub profile if available",
                "Consider resume coach improvements before interview"
            ]
        
        elif decision == "MAYBE":
            return [
                "Request additional information (portfolio, GitHub)",
                "Consider take-home coding challenge",
                "May need significant resume improvements first"
            ]
        
        else:  # REJECT
            if deal_breakers:
                return [
                    "Send rejection with constructive feedback",
                    "Recommend addressing: " + ", ".join(deal_breakers),
                    "Encourage reapplication after skill development"
                ]
            else:
                return [
                    "Send standard rejection",
                    "Keep in talent pool for future junior roles"
                ]
