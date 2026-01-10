# ScholarAI - Multi-Agent Autonomous AI System

A sophisticated autonomous AI system that simulates a team of 11 specialized agents for resume review, career guidance, and technical research. Built for students with 100% free and local-first tools.

![ScholarAI Demo](https://img.shields.io/badge/Status-Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688)
![React](https://img.shields.io/badge/React-18-61DAFB)

## 🤖 Multi-Agent Architecture

ScholarAI operates as a coordinated team of specialized AI agents, each with specific expertise:

### Resume Analysis Suite (5 Agents)
- **ATS_AGENT** - Keyword matching, ATS compatibility scoring
- **HR_AGENT** - Grammar, tone, and communication analysis
- **TECH_LEAD_AGENT** - Technical skills and project evaluation
- **HIRING_MANAGER_AGENT** - Final hire/reject decision
- **RESUME_COACH_AGENT** - Bullet point rewrites and improvements

### Research Suite (3 Agents)
- **WEB_RESEARCH_AGENT** - Web scraping and documentation search
- **GITHUB_AGENT** - Repository discovery and quality analysis
- **PAPER_RESEARCH_AGENT** - PDF parsing and research paper summarization

### Utility Suite (3 Agents)
- **COMPARISON_AGENT** - Framework/tool comparisons with student recommendations
- **LEARNING_PATH_AGENT** - Personalized learning roadmaps
- **MASTER_ORCHESTRATOR** - Agent coordination and output merging

## ✨ Features

### 📄 Resume Analysis
- Upload PDF resumes for multi-agent analysis
- Get ATS compatibility scores (0-100)
- Receive hiring manager decisions (STRONG_HIRE/SHORTLIST/MAYBE/REJECT)
- Get rewritten bullet points with impact improvements
- Identify missing keywords and technical skills

### 🔍 Technical Research
- Research any technical topic with web + GitHub analysis
- Get curated learning resources (free only)
- Discover high-quality GitHub projects
- Receive student-focused recommendations

### 🎯 Career Guidance
- Create personalized learning roadmaps (4-52 weeks)
- Compare technologies side-by-side (React vs Vue, Python vs JavaScript, etc.)
- Get phase-by-phase learning plans
- Access free resources (FreeCodeCamp, MDN, YouTube, etc.)

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
python main.py
# Server starts at http://localhost:8000
```

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
# App opens at http://localhost:5173
```

## 📁 Project Structure

```
Interview-Prep/
├── backend/
│   ├── agents/
│   │   ├── ats_agent.py
│   │   ├── hr_agent.py
│   │   ├── tech_lead_agent.py
│   │   ├── hiring_manager_agent.py
│   │   ├── resume_coach_agent.py
│   │   ├── web_research_agent.py
│   │   ├── github_agent.py
│   │   ├── paper_research_agent.py
│   │   ├── comparison_agent.py
│   │   ├── learning_path_agent.py
│   │   └── master_orchestrator.py
│   ├── routes/
│   │   ├── resume_routes.py
│   │   ├── research_routes.py
│   │   └── github_routes.py
│   ├── utils/
│   │   └── pdf_parser.py
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ResumeAnalysisPage.jsx
│   │   │   ├── TechnicalResearchPage.jsx
│   │   │   └── CareerGuidancePage.jsx
│   │   ├── components/
│   │   │   ├── AgentOutput.jsx
│   │   │   └── MasterOrchestrator.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   └── package.json
└── README.md
```

## 🎨 Design Philosophy

- **Glassmorphism UI** - Modern frosted glass effects
- **Vibrant Gradients** - Eye-catching color schemes
- **Smooth Animations** - Micro-interactions and agent reveal animations
- **Dark Mode** - Premium dark theme by default
- **Responsive** - Works on all screen sizes

## 🔧 API Endpoints

### Resume Analysis
- `POST /api/resume/analyze` - Analyze resume with all agents
- `POST /api/resume/improve` - Get improvement suggestions

### Research
- `POST /api/research/topic` - Research technical topic
- `POST /api/research/paper` - Analyze research paper PDF
- `POST /api/research/learning-path` - Create learning roadmap
- `POST /api/research/compare` - Compare two technologies

### GitHub
- `POST /api/github/search` - Search repositories
- `POST /api/github/analyze` - Analyze specific repository

## 💡 How It Works

1. **User submits request** (resume, research query, or learning path)
2. **Master Orchestrator** determines which agents to activate
3. **Agents analyze independently** using specialized algorithms
4. **Outputs are merged** into a final recommendation
5. **User receives** individual agent analyses + unified response

## 🎓 Student-Focused Features

- **100% Free** - No paid APIs or subscriptions
- **Local-First** - All processing happens on your machine
- **Open-Source Tools** - BeautifulSoup, GitHub API, PDF parsing
- **Privacy Respect** - No data collection or external services
- **Realistic Feedback** - Honest assessments, not just encouragement

## 🛠️ Tech Stack

**Backend:**
- FastAPI (Python web framework)
- PDFPlumber (PDF text extraction)
- BeautifulSoup4 (Web scraping)
- Requests (HTTP client)

**Frontend:**
- React 18
- Vite (Build tool)
- Vanilla CSS (Premium design system)
- Google Fonts (Inter + JetBrains Mono)

## 📝 Example Use Cases

### Resume Analysis
```python
# Upload resume.pdf
# Set job keywords: "Python, React, AWS"
# Get: ATS score, tech evaluation, hiring decision, rewritten bullets
```

### Technical Research
```python
# Query: "React vs Vue for beginners"
# Get: Web sources, GitHub projects, comparison table, learning path
```

### Career Guidance
```python
# Skill: "Full-stack web development"
# Level: "Beginner"
# Duration: "12 weeks"
# Get: Week-by-week roadmap, resources, project ideas
```

## 🤝 Contributing

This is a student project. Feel free to fork and customize for your needs!

## 📄 License

MIT License - Free to use and modify

## 🙏 Acknowledgments

- Built with free and open-source tools
- Designed for students, by students
- No corporate sponsorships or paid APIs

---

**Made with ❤️ for students worldwide**
