"""
GitHub Routes
API endpoints for GitHub repository search and analysis
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

from agents.github_agent import GitHubAgent

router = APIRouter()
github_agent = GitHubAgent()

class GitHubSearchRequest(BaseModel):
    query: str
    language: Optional[str] = None
    max_results: int = 10

class RepoAnalysisRequest(BaseModel):
    owner: str
    repo_name: str

@router.post("/search")
async def search_repositories(request: GitHubSearchRequest):
    """
    Search for GitHub repositories
    
    Args:
        request: Search request with query and filters
        
    Returns:
        List of repositories with quality scores and recommendations
    """
    try:
        result = github_agent.search_repos(
            query=request.query,
            language=request.language,
            max_results=request.max_results
        )
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching GitHub: {str(e)}")

@router.post("/analyze")
async def analyze_repository(request: RepoAnalysisRequest):
    """
    Analyze a specific GitHub repository
    
    Args:
        request: Repository owner and name
        
    Returns:
        Detailed repository analysis
    """
    try:
        result = github_agent.analyze_repo(
            owner=request.owner,
            repo_name=request.repo_name
        )
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing repository: {str(e)}")

@router.get("/health")
async def github_health():
    """Health check for GitHub routes"""
    return {"status": "healthy", "service": "GitHub API"}
