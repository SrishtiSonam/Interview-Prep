"""
Research Routes
API endpoints for technical research and learning paths
"""

from fastapi import APIRouter, HTTPException, UploadFile, File
from pydantic import BaseModel
from typing import Optional
import tempfile
import os

from agents.master_orchestrator import MasterOrchestrator

router = APIRouter()
orchestrator = MasterOrchestrator()

class ResearchRequest(BaseModel):
    query: str
    include_github: bool = True
    include_papers: bool = False
    level: str = "beginner"  # beginner, intermediate, advanced

class CareerGuidanceRequest(BaseModel):
    skill: str
    level: str = "beginner"
    duration_weeks: int = 12

class ComparisonRequest(BaseModel):
    item1: str
    item2: str
    category: Optional[str] = None

@router.post("/topic")
async def research_topic(request: ResearchRequest):
    """
    Research a technical topic with multi-agent analysis
    
    Args:
        request: Research request with query and options
        
    Returns:
        Multi-agent research results with web sources, GitHub repos, and learning path
    """
    try:
        result = orchestrator.process_request("technical_research", {
            "query": request.query,
            "include_github": request.include_github,
            "include_papers": request.include_papers,
            "level": request.level
        })
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error researching topic: {str(e)}")

@router.post("/paper")
async def analyze_paper(file: UploadFile = File(...)):
    """
    Analyze a research paper or technical PDF
    
    Args:
        file: PDF file to analyze
        
    Returns:
        Paper analysis with summary and key concepts
    """
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
        content = await file.read()
        tmp_file.write(content)
        tmp_path = tmp_file.name
    
    try:
        from agents.paper_research_agent import PaperResearchAgent
        paper_agent = PaperResearchAgent()
        result = paper_agent.analyze_paper(tmp_path)
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing paper: {str(e)}")
    finally:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)

@router.post("/learning-path")
async def create_learning_path(request: CareerGuidanceRequest):
    """
    Create personalized learning roadmap
    
    Args:
        request: Career guidance request with skill and level
        
    Returns:
        Structured learning path with timeline and resources
    """
    try:
        result = orchestrator.process_request("career_guidance", {
            "skill": request.skill,
            "level": request.level,
            "duration_weeks": request.duration_weeks
        })
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating learning path: {str(e)}")

@router.post("/compare")
async def compare_technologies(request: ComparisonRequest):
    """
    Compare two technologies or frameworks
    
    Args:
        request: Comparison request with two items
        
    Returns:
        Detailed comparison with student recommendation
    """
    try:
        result = orchestrator.process_request("comparison", {
            "item1": request.item1,
            "item2": request.item2,
            "category": request.category
        })
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error comparing technologies: {str(e)}")

@router.get("/health")
async def research_health():
    """Health check for research routes"""
    return {"status": "healthy", "service": "Research API"}
