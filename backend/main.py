"""
ScholarAI Backend - Multi-Agent Autonomous AI System
Main FastAPI application entry point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import resume_routes, research_routes, github_routes

app = FastAPI(
    title="ScholarAI API",
    description="Multi-agent autonomous AI system for resume review, career guidance, and technical research",
    version="1.0.0"
)

# CORS configuration for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include route modules
app.include_router(resume_routes.router, prefix="/api/resume", tags=["Resume Analysis"])
app.include_router(research_routes.router, prefix="/api/research", tags=["Research"])
app.include_router(github_routes.router, prefix="/api/github", tags=["GitHub"])

@app.get("/")
async def root():
    return {
        "message": "Welcome to ScholarAI API",
        "version": "1.0.0",
        "agents": {
            "resume_suite": ["ATS", "HR", "Tech Lead", "Hiring Manager", "Resume Coach"],
            "research_suite": ["Web Research", "Paper Research", "GitHub"],
            "utility_suite": ["Comparison", "Learning Path", "Master Orchestrator"]
        }
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ScholarAI"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
