"""
Resume Analysis Routes
API endpoints for resume analysis and improvement
"""

from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
import tempfile

from agents.master_orchestrator import MasterOrchestrator
from utils.pdf_parser import extract_text_from_pdf

router = APIRouter()
orchestrator = MasterOrchestrator()

class ResumeAnalysisResponse(BaseModel):
    request_type: str
    agent_outputs: List[dict]
    final_response: str

@router.post("/analyze", response_model=dict)
async def analyze_resume(
    file: UploadFile = File(...),
    job_keywords: Optional[str] = Form(None)
):
    """
    Analyze uploaded resume with all resume agents
    
    Args:
        file: PDF resume file
        job_keywords: Optional comma-separated job keywords
        
    Returns:
        Multi-agent analysis with scores and recommendations
    """
    # Validate file type
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    # Save uploaded file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
        content = await file.read()
        tmp_file.write(content)
        tmp_path = tmp_file.name
    
    try:
        # Extract text from PDF
        resume_text = extract_text_from_pdf(tmp_path)
        
        if not resume_text or len(resume_text.strip()) < 50:
            raise HTTPException(status_code=400, detail="Could not extract text from PDF or resume is too short")
        
        # Parse job keywords if provided
        keywords_list = [k.strip() for k in job_keywords.split(',')] if job_keywords else None
        
        # Process with orchestrator
        result = orchestrator.process_request("resume_analysis", {
            "resume_text": resume_text,
            "job_keywords": keywords_list
        })
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing resume: {str(e)}")
    finally:
        # Clean up temporary file
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)

@router.post("/improve", response_model=dict)
async def improve_resume(file: UploadFile = File(...)):
    """
    Get resume improvement suggestions from Resume Coach
    
    Args:
        file: PDF resume file
        
    Returns:
        Detailed improvement suggestions and rewritten bullet points
    """
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
        content = await file.read()
        tmp_file.write(content)
        tmp_path = tmp_file.name
    
    try:
        resume_text = extract_text_from_pdf(tmp_path)
        
        if not resume_text:
            raise HTTPException(status_code=400, detail="Could not extract text from PDF")
        
        # Get coach improvements
        from agents.resume_coach_agent import ResumeCoachAgent
        coach = ResumeCoachAgent()
        result = coach.improve_resume(resume_text)
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error improving resume: {str(e)}")
    finally:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)

@router.get("/health")
async def resume_health():
    """Health check for resume routes"""
    return {"status": "healthy", "service": "Resume Analysis API"}
