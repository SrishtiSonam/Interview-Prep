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
    
    def make_decision(self, ats_score: int, hr_score: int, tech_score: int, 
                     agent_outputs: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Make final hiring decision using ML model (with rule-based fallback)
        
        Args:
            ats_score: Score from ATS Agent (0-100)
            hr_score: Score from HR Agent (0-100)
            tech_score: Score from Tech Lead Agent (0-100)
            agent_outputs: Full agent outputs for ML feature extraction (optional)
            
        Returns:
            Dictionary with decision and detailed reasoning
        """
        # Calculate weighted overall score (for backward compatibility)
        # ATS: 20%, HR: 25%, Tech: 55% (tech skills most important)
        overall_score = int(
            ats_score * 0.20 +
            hr_score * 0.25 +
            tech_score * 0.55
        )
        
        # Try ML-based decision first
        ml_decision = None
        ml_confidence = None
        ml_top_factors = []
        use_ml = False
        
        if agent_outputs:
            try:
                from ml.inference_service import get_inference_service
                
                inference_service = get_inference_service()
                if inference_service.is_loaded:
                    decision, confidence, top_factors = inference_service.predict_from_agent_outputs(
                        agent_outputs
                    )
                    ml_decision = decision
                    ml_confidence = confidence
                    ml_top_factors = top_factors
                    use_ml = True
            except Exception as e:
                print(f"⚠️ ML prediction failed, using rule-based fallback: {e}")
        
        # Fallback to rule-based decision
        if not use_ml:
            decision = self._determine_decision(overall_score, ats_score, hr_score, tech_score)
            ml_confidence = overall_score  # Use overall score as confidence
        else:
            decision = ml_decision
        
        # Generate reasoning
        if use_ml:
            reasoning = self._generate_ml_reasoning(
                decision, ml_confidence, ml_top_factors, 
                ats_score, hr_score, tech_score
            )
        else:
            reasoning = self._generate_reasoning(
                decision, overall_score, ats_score, hr_score, tech_score
            )
        
        # Identify deal-breakers
        deal_breakers = self._check_deal_breakers(ats_score, hr_score, tech_score)
        
        # Generate next steps
        next_steps = self._generate_next_steps(decision, deal_breakers)
        
        result = {
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
        
        # Add ML-specific fields if ML was used
        if use_ml:
            result["ml_confidence"] = round(ml_confidence, 2)
            result["ml_enabled"] = True
            result["top_contributing_factors"] = [
                {"feature": factor[0], "contribution": factor[1]}
                for factor in ml_top_factors
            ]
        else:
            result["ml_enabled"] = False
        
        return result

    
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
    
    def _generate_ml_reasoning(self, decision: str, ml_confidence: float,
                              top_factors: List, ats_score: int, hr_score: int, 
                              tech_score: int) -> str:
        """Generate ML-powered reasoning with feature importance"""
        reasoning = f"**ML-Powered Decision: {decision}** (Confidence: {ml_confidence:.1f}%)\n\n"
        
        if decision == "STRONG_HIRE":
            reasoning += (
                f"🎯 Exceptional candidate identified by ML model with {ml_confidence:.1f}% confidence. "
                f"Strong performance across all evaluation criteria: "
                f"ATS ({ats_score}/100), HR ({hr_score}/100), Tech ({tech_score}/100). "
            )
        elif decision == "SHORTLIST":
            reasoning += (
                f"✅ Solid candidate with good potential (ML Confidence: {ml_confidence:.1f}%). "
                f"Meets key requirements with room for improvement in specific areas. "
            )
        elif decision == "MAYBE":
            reasoning += (
                f"⚠️ Borderline candidate (ML Confidence: {ml_confidence:.1f}%). "
                f"Shows promise but has notable gaps: "
                f"ATS ({ats_score}/100), HR ({hr_score}/100), Tech ({tech_score}/100). "
            )
        else:  # REJECT
            reasoning += (
                f"❌ Not recommended (ML Confidence: {ml_confidence:.1f}%). "
                f"Significant gaps in critical areas. "
            )
        
        # Add top contributing factors
        if top_factors:
            reasoning += "\n\n**Top Contributing Factors:**\n"
            for i, (feature_name, contribution) in enumerate(top_factors, 1):
                readable_name = feature_name.replace('_', ' ').title()
                reasoning += f"{i}. {readable_name} (contribution: {contribution:.4f})\n"
        
        return reasoning
