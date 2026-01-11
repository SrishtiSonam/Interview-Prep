# ScholarAI - Complete System Workflow

## 📋 Table of Contents
1. [System Architecture Overview](#system-architecture-overview)
2. [Resume Analysis Workflow](#resume-analysis-workflow)
3. [Technical Research Workflow](#technical-research-workflow)
4. [Career Guidance Workflow](#career-guidance-workflow)
5. [Agent Coordination System](#agent-coordination-system)
6. [Data Flow Diagrams](#data-flow-diagrams)
7. [API Communication](#api-communication)

---

## System Architecture Overview

### Technology Stack
```
┌─────────────────────────────────────────┐
│         User Browser Interface          │
│    React 18 + Vite (Port 5173)         │
│    Premium Glassmorphism UI             │
└──────────────┬──────────────────────────┘
               │ HTTP/REST API
               │ JSON Payloads
               ▼
┌─────────────────────────────────────────┐
│        FastAPI Backend Server           │
│         Python (Port 8000)              │
│    ┌─────────────────────────────┐     │
│    │   Master Orchestrator       │     │
│    └─────────────────────────────┘     │
│              │                          │
│    ┌─────────┴─────────┐               │
│    │                   │               │
│    ▼                   ▼               │
│ Resume Suite      Research Suite       │
│ (5 Agents)        (3 Agents)           │
│                                         │
│ Utility Suite (3 Agents)               │
└─────────────────────────────────────────┘
```

### Component Layers

**Frontend Layer (React)**
- UI Components (Pages, Forms, Visualizations)
- API Service (HTTP client)
- State Management (useState hooks)
- Routing (Page navigation)

**Backend Layer (FastAPI)**
- REST API Endpoints
- Request Validation (Pydantic)
- File Upload Handling
- CORS Middleware

**Agent Layer (Python)**
- 11 Specialized Agents
- Master Orchestrator
- Scoring Algorithms
- Heuristic Analysis

**Utility Layer**
- PDF Parser (pdfplumber, PyPDF2)
- Web Scraper (BeautifulSoup)
- GitHub API Client (requests)

---

## Resume Analysis Workflow

### 1. User Interaction Flow

```
User uploads PDF → File validation → API request → Agent processing → Results display
```

### Step-by-Step Process

#### **Step 1: File Upload (Frontend)**
**File:** `ResumeAnalysisPage.jsx`

```javascript
// User drags & drops or selects PDF
handleFileChange(e) {
  selectedFile = e.target.files[0]
  if (file.type === 'application/pdf') {
    setFile(selectedFile) // Store in state
  }
}
```

**Validation:**
- File type must be `.pdf`
- Frontend validates before allowing upload
- Error displayed if invalid

#### **Step 2: API Request (Frontend → Backend)**
**File:** `src/services/api.js`

```javascript
// Prepare multipart/form-data request
FormData {
  file: <PDF binary>,
  job_keywords: "Python, React, AWS" (optional)
}

POST http://localhost:8000/api/resume/analyze
```

#### **Step 3: Request Handling (Backend)**
**File:** `backend/routes/resume_routes.py`

```python
@router.post("/analyze")
async def analyze_resume(file: UploadFile, job_keywords: Optional[str]):
    # 1. Save uploaded file temporarily
    temp_path = save_to_temp(file)
    
    # 2. Extract text from PDF
    resume_text = extract_text_from_pdf(temp_path)
    
    # 3. Parse keywords
    keywords_list = job_keywords.split(',') if job_keywords else None
    
    # 4. Send to Master Orchestrator
    result = orchestrator.process_request("resume_analysis", {
        "resume_text": resume_text,
        "job_keywords": keywords_list
    })
    
    return result
```

#### **Step 4: PDF Text Extraction**
**File:** `backend/utils/pdf_parser.py`

```python
def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text
```

**Output:** Plain text string with all resume content

#### **Step 5: Master Orchestrator Decision**
**File:** `backend/agents/master_orchestrator.py`

```python
def process_request(request_type, data):
    if request_type == "resume_analysis":
        return self._handle_resume_analysis(data)
```

**Orchestrator Logic:**
```python
def _handle_resume_analysis(data):
    resume_text = data["resume_text"]
    job_keywords = data.get("job_keywords")
    
    # Activate all 5 resume agents
    agents = [
        ats_agent,
        hr_agent,
        tech_lead_agent,
        hiring_manager_agent,
        resume_coach_agent
    ]
    
    # Collect outputs
    outputs = []
    for agent in agents:
        result = agent.analyze(resume_text, job_keywords)
        outputs.append(format_output(agent.name, result))
    
    # Generate final response
    final = generate_final_response(outputs)
    
    return {
        "agent_outputs": outputs,
        "final_response": final
    }
```

#### **Step 6: Agent Execution (Parallel)**

**6a. ATS_AGENT**
**File:** `backend/agents/ats_agent.py`

```python
def analyze(resume_text, job_keywords):
    # 1. Keyword matching
    found_keywords = []
    missing_keywords = []
    for keyword in TECH_KEYWORDS:
        if keyword in resume_text.lower():
            found_keywords.append(keyword)
        else:
            missing_keywords.append(keyword)
    
    # 2. Formatting analysis
    formatting_issues = check_formatting(resume_text)
    # - Check for tables (ATS can't parse)
    # - Verify bullet points exist
    # - Check for excessive special characters
    
    # 3. Structure analysis
    structure_score = check_structure(resume_text)
    # - Word count (200-1000 optimal)
    # - Email present?
    # - Phone number present?
    # - Quantifiable metrics (numbers)?
    
    # 4. Calculate ATS score (0-100)
    ats_score = (
        keyword_score * 0.5 +
        formatting_score * 0.25 +
        structure_score * 0.25
    )
    
    return {
        "score": ats_score,
        "found_keywords": found_keywords,
        "missing_keywords": missing_keywords,
        "formatting_issues": formatting_issues,
        "recommendations": generate_recommendations()
    }
```

**6b. HR_AGENT**
**File:** `backend/agents/hr_agent.py`

```python
def analyze(resume_text):
    # 1. Grammar checks
    grammar_issues = check_grammar(resume_text)
    # - Inconsistent capitalization
    # - Double spaces
    # - Missing periods
    
    # 2. Tone analysis
    tone_score = analyze_tone(resume_text)
    # - Penalize first-person pronouns (I, me, my)
    # - Check for informal language
    # - Verify professional sections exist
    
    # 3. Action verb usage
    weak_count = count_weak_phrases(resume_text)
    strong_count = count_strong_verbs(resume_text)
    
    # 4. Clarity check
    clarity_score = check_clarity(resume_text)
    # - Average sentence length
    # - Acronym overload
    
    # 5. Calculate HR score
    hr_score = (
        grammar_score * 0.25 +
        tone_score * 0.25 +
        verb_score * 0.25 +
        clarity_score * 0.25
    )
    
    return {
        "score": hr_score,
        "grammar_issues": grammar_issues,
        "strengths": identify_strengths(),
        "improvements": generate_improvements()
    }
```

**6c. TECH_LEAD_AGENT**
**File:** `backend/agents/tech_lead_agent.py`

```python
def analyze(resume_text):
    # 1. Tech stack evaluation
    tier_1_techs = find_modern_tech(resume_text)
    # React, Python, TypeScript, Kubernetes, etc.
    
    tier_2_techs = find_legacy_tech(resume_text)
    # Java, PHP, jQuery, etc.
    
    full_stack = has_frontend AND has_backend AND has_database
    cloud_native = has_cloud_tech
    
    # 2. Project depth analysis
    project_score = analyze_projects(resume_text)
    # - Has "project" section?
    # - Quality indicators (deployed, production, scale)
    # - GitHub/portfolio links?
    # - Quantified metrics?
    
    # 3. Engineering practices
    practices_score = check_practices(resume_text)
    # - Version control (git)
    # - Testing (jest, pytest, TDD)
    # - CI/CD
    # - Agile/Scrum
    
    # 4. Real-world impact
    impact_score = evaluate_impact(resume_text)
    # - Performance improvements (%)
    # - User counts
    # - Cost savings
    
    # 5. Calculate tech score
    tech_score = (
        stack_score * 0.30 +
        project_score * 0.30 +
        practices_score * 0.20 +
        impact_score * 0.20
    )
    
    return {
        "score": tech_score,
        "stack_analysis": {...},
        "strengths": [...],
        "gaps": [...],
        "recommendations": [...]
    }
```

**6d. HIRING_MANAGER_AGENT**
**File:** `backend/agents/hiring_manager_agent.py`

```python
def make_decision(ats_score, hr_score, tech_score, agent_outputs):
    # 1. Calculate weighted overall score (Rule-Based Fallback)
    overall_score = (
        ats_score * 0.20 +   # 20% weight
        hr_score * 0.25 +    # 25% weight
        tech_score * 0.55    # 55% weight (most important)
    )
    
    # 2. Try ML Prediction (Primary)
    if ml_model_loaded:
        # Extract 16 features from all agent outputs
        features = feature_extractor.extract(agent_outputs)
        
        # Get prediction
        decision, confidence, top_factors = ml_model.predict(features)
        
        return {
            "decision": decision,
            "ml_confidence": confidence,
            "ml_enabled": True,
            "top_contributing_factors": top_factors,
            "reasoning": generate_ml_reasoning()
        }
    
    # 3. Fallback to Rule-Based Logic (if ML fails/missing)
    # Deal-breaker checks
    if ats_score < 50: return "REJECT"
    if tech_score < 50: return "REJECT"
    if hr_score < 40: return "REJECT"
    
    # Decision based on overall score
    if overall_score >= 85: decision = "STRONG_HIRE"
    elif overall_score >= 70: decision = "SHORTLIST"
    elif overall_score >= 60: decision = "MAYBE"
    else: decision = "REJECT"
    
    return {
        "decision": decision,
        "overall_score": overall_score,
        "ml_enabled": False,
        "reasoning": generate_rule_based_reasoning(),
        "next_steps": generate_next_steps(decision)
    }
```

**6e. RESUME_COACH_AGENT**
**File:** `backend/agents/resume_coach_agent.py`

```python
def improve_resume(resume_text):
    # 1. Extract bullet points
    bullets = extract_bullets(resume_text)
    
    # 2. Identify weak bullets
    improvements = []
    for bullet in bullets:
        issues = []
        
        # Check for passive starts
        if starts_with_weak_phrase(bullet):
            issues.append("passive_start")
        
        # Check for lowercase start
        if bullet[0].islower():
            issues.append("lowercase_start")
        
        # Check for missing metrics
        if not has_numbers(bullet):
            issues.append("no_metrics")
        
        if issues:
            improved = improve_bullet(bullet, issues)
            improvements.append({
                "original": bullet,
                "improved": improved,
                "issues": issues
            })
    
    # 3. Suggest missing sections
    missing = find_missing_sections(resume_text)
    
    # 4. Provide templates
    templates = {
        "impact": "[Action Verb] + [What] + [How] + [Result]",
        "leadership": "[Led] + [Team Size] + [What] + [Outcome]"
    }
    
    # 5. Keyword suggestions
    keywords = suggest_keywords(resume_text)
    
    return {
        "bullet_improvements": improvements,
        "missing_sections": missing,
        "templates": templates,
        "keyword_suggestions": keywords,
        "quick_wins": [...]
    }

def improve_bullet(bullet, issues):
    # Remove weak phrases
    bullet = remove_weak_phrases(bullet)
    
    # Capitalize first letter
    bullet = capitalize_first(bullet)
    
    # Add strong action verb if needed
    if not has_action_verb(bullet):
        bullet = f"Developed {bullet.lower()}"
    
    # Suggest metric addition
    if "no_metrics" in issues:
        bullet += " [Add metric: e.g., '40% faster']"
    
    return bullet
```

#### **Step 7: Output Merging (Master Orchestrator)**

```python
def _generate_resume_final_response(ats, hr, tech, decision, coach):
    # Extract key information
    overall_score = decision["overall_score"]
    decision_text = decision["decision"]
    
    # Build response
    response = f"""
## Overall Assessment: {decision_text} ({overall_score}/100)

### Score Breakdown:
- **ATS Compatibility:** {ats['score']}/100
- **Communication Quality:** {hr['score']}/100
- **Technical Skills:** {tech['score']}/100

### Key Issues to Address:
1. {ats['recommendations'][0]}
2. {hr['improvements'][0]}
3. {tech['recommendations'][0]}

### Next Steps:
{format_list(decision['next_steps'])}
"""
    
    return response
```

#### **Step 8: Response to Frontend**

**Response JSON Structure:**
```json
{
  "request_type": "resume_analysis",
  "agent_outputs": [
    {
      "agent": "ATS_AGENT",
      "output": {
        "score": 78,
        "found_keywords": ["python", "react", "fastapi"],
        "missing_keywords": ["kubernetes", "aws"],
        "formatting_issues": ["Use consistent bullets"],
        "recommendations": [...]
      }
    },
    {
      "agent": "HR_AGENT",
      "output": {
        "score": 85,
        "strengths": ["Clear professional tone"],
        "improvements": ["Add more action verbs"]
      }
    },
    // ... 3 more agents
  ],
  "final_response": "## Overall Assessment: SHORTLIST (78/100)..."
}
```

#### **Step 9: Frontend Display**
**File:** `ResumeAnalysisPage.jsx`

```javascript
// Render agent outputs
{result.agent_outputs.map((agentData, index) => (
  <AgentOutput
    agentName={agentData.agent}
    output={agentData.output}
    delay={index * 150}  // Staggered animation
  />
))}

// Render final orchestrator response
<MasterOrchestrator response={result.final_response} />
```

**File:** `AgentOutput.jsx` - Custom rendering per agent type
```javascript
// ATS Agent: Show keyword badges
{output.found_keywords.map(keyword => (
  <span className="score-badge score-high">{keyword}</span>
))}

// Hiring Manager: Show decision with color
<div style={{
  background: decision === 'STRONG_HIRE' ? 'green-gradient' : 'red-gradient'
}}>
  Decision: {decision}
</div>

// Resume Coach: Before/after bullets
<div>
  <p>Original: {original}</p>
  <p className="improved">✨ Improved: {improved}</p>
</div>
```

---

## Technical Research Workflow

### Process Flow

```
User Query → API Request → Orchestrator → Research Agents → Merged Results
```

### Step-by-Step Process

#### **Step 1: User Input**
**File:** `TechnicalResearchPage.jsx`

```javascript
// User enters query
query = "React hooks tutorial"
level = "beginner"
includeGithub = true

// Submit
POST /api/research/topic
Body: {
  query: "React hooks tutorial",
  include_github: true,
  include_papers: false,
  level: "beginner"
}
```

#### **Step 2: Backend Routing**
**File:** `backend/routes/research_routes.py`

```python
@router.post("/topic")
async def research_topic(request: ResearchRequest):
    result = orchestrator.process_request("technical_research", {
        "query": request.query,
        "include_github": request.include_github,
        "level": request.level
    })
    return result
```

#### **Step 3: Agent Activation**
**File:** `master_orchestrator.py`

```python
def _handle_technical_research(data):
    query = data["query"]
    
    # Activate research agents
    outputs = []
    
    # 1. Web Research Agent
    web_result = web_research_agent.research(query)
    outputs.append(format_output("WEB_RESEARCH_AGENT", web_result))
    
    # 2. GitHub Agent (if requested)
    if data.get("include_github"):
        github_result = github_agent.search_repos(query)
        outputs.append(format_output("GITHUB_AGENT", github_result))
    
    # 3. Learning Path Agent (always)
    learning_result = learning_path_agent.create_roadmap(
        query, 
        level=data.get("level", "beginner")
    )
    outputs.append(format_output("LEARNING_PATH_AGENT", learning_result))
    
    # Generate final response
    final = generate_research_final_response(web_result, github_result, learning_result)
    
    return {
        "agent_outputs": outputs,
        "final_response": final
    }
```

#### **Step 4: Web Research Agent**
**File:** `backend/agents/web_research_agent.py`

```python
def research(query):
    # 1. Get curated sources based on query
    sources = get_curated_sources(query)
    # Example: If "python" in query → python.org, realpython.com
    
    # 2. Fetch and analyze each source
    analyzed_sources = []
    for source in sources:
        try:
            # Fetch content
            response = requests.get(source["url"], timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Remove nav, footer, scripts
            for tag in soup(['script', 'style', 'nav', 'footer']):
                tag.decompose()
            
            # Extract text
            text = soup.get_text(separator=' ', strip=True)[:5000]
            
            # Summarize (find relevant sentences)
            summary = summarize_content(text, query)
            
            # Calculate relevance
            relevance = calculate_relevance(text, query)
            
            analyzed_sources.append({
                "title": source["title"],
                "url": source["url"],
                "summary": summary,
                "relevance": relevance
            })
        except:
            continue
    
    # 3. Sort by relevance
    analyzed_sources.sort(key=lambda x: x["relevance"], reverse=True)
    
    # 4. Generate overall summary
    summary = f"Based on {len(analyzed_sources)} sources, {query} is a topic with strong community support..."
    
    return {
        "query": query,
        "sources_analyzed": len(analyzed_sources),
        "sources": analyzed_sources,
        "summary": summary,
        "recommendations": [
            "Start with official documentation",
            "Follow hands-on tutorials"
        ]
    }
```

#### **Step 5: GitHub Agent**
**File:** `backend/agents/github_agent.py`

```python
def search_repos(query, max_results=10):
    # 1. Call GitHub Search API
    url = "https://api.github.com/search/repositories"
    params = {
        "q": query,
        "sort": "stars",
        "order": "desc",
        "per_page": max_results
    }
    
    response = requests.get(url, params=params)
    repos = response.json().get("items", [])
    
    # 2. Analyze each repository
    analyzed_repos = []
    for repo in repos:
        analyzed = {
            "name": repo["name"],
            "full_name": repo["full_name"],
            "url": repo["html_url"],
            "description": repo["description"],
            "stars": repo["stargazers_count"],
            "forks": repo["forks_count"],
            "language": repo["language"],
            "quality_score": calculate_quality_score(repo)
        }
        analyzed_repos.append(analyzed)
    
    # 3. Generate insights
    languages = [r["language"] for r in analyzed_repos if r.get("language")]
    popular_languages = Counter(languages).most_common(5)
    avg_stars = sum(r["stars"] for r in analyzed_repos) / len(analyzed_repos)
    
    return {
        "query": query,
        "total_found": len(analyzed_repos),
        "repositories": analyzed_repos,
        "insights": {
            "popular_languages": [lang for lang, _ in popular_languages],
            "average_stars": int(avg_stars)
        },
        "recommendations": [
            f"⭐ {repo['full_name']} - {repo['description']}"
            for repo in analyzed_repos[:3]
        ]
    }

def calculate_quality_score(repo):
    score = 0
    
    # Stars (40 points)
    stars = repo["stargazers_count"]
    if stars > 10000:
        score += 40
    elif stars > 1000:
        score += 30
    else:
        score += min(20, stars // 50)
    
    # Forks (20 points)
    forks = repo["forks_count"]
    score += min(20, forks // 50)
    
    # Has description (10 points)
    if repo.get("description"):
        score += 10
    
    # Topics/tags (10 points)
    topics = repo.get("topics", [])
    score += min(10, len(topics) * 2)
    
    # Recently updated (20 points)
    if is_recently_updated(repo.get("updated_at")):
        score += 20
    
    return min(100, score)
```

#### **Step 6: Learning Path Agent**
**File:** `backend/agents/learning_path_agent.py`

```python
def create_roadmap(skill, level="beginner", duration_weeks=12):
    # 1. Find matching learning path from database
    roadmap = learning_database.get(skill.lower())
    
    # Example for "full-stack web development"
    roadmap = {
        "phases": [
            {
                "name": "Frontend Fundamentals",
                "duration_weeks": 3,
                "topics": ["HTML5", "CSS3", "JavaScript ES6+"],
                "goals": ["Build static websites"]
            },
            {
                "name": "Frontend Framework",
                "duration_weeks": 3,
                "topics": ["React.js", "State Management"],
                "goals": ["Build interactive UIs"]
            },
            {
                "name": "Backend Development",
                "duration_weeks": 3,
                "topics": ["Node.js", "RESTful APIs", "Database"],
                "goals": ["Create APIs"]
            },
            {
                "name": "Full-Stack Integration",
                "duration_weeks": 3,
                "topics": ["Deployment", "DevOps Basics"],
                "goals": ["Deploy full applications"]
            }
        ],
        "resources": [
            {"name": "FreeCodeCamp", "type": "Course", "cost": "Free"},
            {"name": "MDN Web Docs", "type": "Docs", "cost": "Free"}
        ],
        "projects": [
            "Personal portfolio website",
            "Todo app with backend",
            "E-commerce site"
        ]
    }
    
    # 2. Customize for level
    if level == "intermediate":
        roadmap["phases"] = roadmap["phases"][1:]  # Skip basics
    
    # 3. Create week-by-week timeline
    timeline = []
    current_week = 0
    for phase in roadmap["phases"]:
        for week in range(phase["duration_weeks"]):
            current_week += 1
            timeline.append({
                "week": current_week,
                "phase": phase["name"],
                "focus": phase["topics"][week % len(phase["topics"])]
            })
    
    return {
        "skill": skill,
        "level": level,
        "duration_weeks": duration_weeks,
        "phases": roadmap["phases"],
        "timeline": timeline,
        "resources": roadmap["resources"],
        "projects": roadmap["projects"],
        "tips": [
            "Code every single day",
            "Build projects, don't just watch tutorials"
        ]
    }
```

#### **Step 7: Results Display**
Frontend renders all agent outputs with custom visualizations

---

## Career Guidance Workflow

### Two Modes

#### **Mode 1: Learning Path**
```
User Input (skill, level, duration) → Learning Path Agent → Roadmap with Timeline
```

Same as Learning Path Agent in Technical Research workflow

#### **Mode 2: Technology Comparison**

**User Input:**
```javascript
item1 = "React"
item2 = "Vue"
```

**Backend Processing:**
```python
# comparison_agent.py
def compare(item1, item2):
    # Look up in predefined database
    comparison_key = f"{item1.lower()}_vs_{item2.lower()}"
    
    if comparison_key in tech_database:
        data = tech_database[comparison_key]
        # Example: "react_vs_vue"
        return {
            "criteria": {
                "Learning Curve": {"react": 7, "vue": 9},
                "Performance": {"react": 8, "vue": 8},
                "Job Market": {"react": 10, "vue": 7},
                ...
            },
            "pros_cons": {
                "react": {
                    "pros": ["Massive ecosystem", "React Native"],
                    "cons": ["Steeper learning curve"]
                },
                "vue": {
                    "pros": ["Easier to learn", "Great docs"],
                    "cons": ["Smaller job market"]
                }
            },
            "student_recommendation": "For students: Start with React - better job market"
        }
```

**Frontend Display:**
```javascript
// Render comparison table
<table>
  <tr>
    <th>Criterion</th>
    <th>{item1}</th>
    <th>{item2}</th>
  </tr>
  {criteria.map(criterion => (
    <tr>
      <td>{criterion.name}</td>
      <td><ScoreBadge score={criterion[item1]} /></td>
      <td><ScoreBadge score={criterion[item2]} /></td>
    </tr>
  ))}
</table>
```

---

## Agent Coordination System

### Master Orchestrator Logic

```python
class MasterOrchestrator:
    def process_request(self, request_type, data):
        # Routing logic
        if request_type == "resume_analysis":
            # Activate 5 resume agents
            agents = [ats, hr, tech_lead, hiring_manager, coach]
            
        elif request_type == "technical_research":
            # Activate 3 research agents
            agents = [web_research, github, learning_path]
            
        elif request_type == "career_guidance":
            # Activate 1 utility agent
            agents = [learning_path] or [comparison]
        
        # Execute agents
        outputs = []
        for agent in agents:
            result = agent.analyze(data)
            outputs.append(format_output(agent.name, result))
        
        # Merge outputs
        final_response = self._merge_outputs(outputs, request_type)
        
        return {
            "agent_outputs": outputs,
            "final_response": final_response
        }
```

### Output Format Standardization

```python
def format_output(agent_name, result):
    return {
        "agent": agent_name,
        "output": result  # Agent-specific structure
    }
```

---

## Data Flow Diagrams

### Resume Analysis Data Flow

```
PDF File (Binary)
    ↓ [File Upload]
FormData (multipart/form-data)
    ↓ [POST /api/resume/analyze]
Temporary File Storage
    ↓ [PDF Parser]
Plain Text String (resume content)
    ↓ [Master Orchestrator]
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│   ATS   │   HR    │  Tech   │  Hiring │  Coach  │
│  Agent  │  Agent  │  Lead   │ Manager │  Agent  │
└────┬────┴────┬────┴────┬────┴────┬────┴────┬────┘
     │         │         │         │         │
     ▼         ▼         ▼         ▼         ▼
  Score    Score    Score    Decision  Improvements
  (0-100)  (0-100)  (0-100)  (String)  (List)
     │         │         │         │         │
     └─────────┴─────────┴─────────┴─────────┘
                    ↓ [Output Merger]
            JSON Response Object
                    ↓ [HTTP Response]
            Frontend State Update
                    ↓ [React Rendering]
        Visual Agent Cards Display
```

### GitHub Search Data Flow

```
Query String ("React hooks")
    ↓ [API Request]
GitHub API Call
    ↓ [HTTP GET]
JSON Response (repository list)
    ↓ [Quality Scoring]
Enhanced Repository Objects
    {
      name, stars, forks,
      quality_score (0-100),
      language, description
    }
    ↓ [Sorting by Stars]
Ordered Repository List
    ↓ [Insights Generation]
Aggregated Statistics
    {
      popular_languages,
      average_stars,
      active_repos_count
    }
    ↓ [Response]
Complete GitHub Analysis
```

---

## API Communication

### Request/Response Patterns

#### **Pattern 1: File Upload**
```http
POST /api/resume/analyze
Content-Type: multipart/form-data

--boundary
Content-Disposition: form-data; name="file"; filename="resume.pdf"
Content-Type: application/pdf

<PDF binary data>
--boundary
Content-Disposition: form-data; name="job_keywords"

Python, React, AWS
--boundary--
```

#### **Pattern 2: JSON Request**
```http
POST /api/research/topic
Content-Type: application/json

{
  "query": "React hooks tutorial",
  "include_github": true,
  "include_papers": false,
  "level": "beginner"
}
```

#### **Pattern 3: Standard JSON Response**
```json
{
  "request_type": "resume_analysis",
  "agent_outputs": [
    {
      "agent": "ATS_AGENT",
      "output": { "score": 78, ... }
    },
    ...
  ],
  "final_response": "markdown string"
}
```

### Error Handling

```python
# Backend
try:
    result = process_request(...)
    return result
except Exception as e:
    raise HTTPException(
        status_code=500,
        detail=f"Error: {str(e)}"
    )

# Frontend
try {
    const data = await api.analyzeResume(file);
    setResult(data);
} catch (err) {
    setError(err.message);
}
```

---

## Performance Considerations

### Backend Optimizations
- **PDF Parsing**: Limit to first 50 pages
- **Web Scraping**: 10-second timeout per source
- **GitHub API**: Rate limited (60 requests/hour)
- **Temporary Files**: Auto-cleanup after processing

### Frontend Optimizations
- **Lazy Loading**: Pages loaded on demand
- **Staggered Animations**: 150ms delay between agent cards
- **Memoization**: API service singleton pattern
- **Form Validation**: Client-side before API calls

---

## Security Measures

1. **CORS Configuration**: Whitelist localhost origins only
2. **File Validation**: Only allow `.pdf` files
3. **File Size Limits**: Implicit via multipart handling
4. **Temporary File Cleanup**: Delete after processing
5. **No Persistent Storage**: No user data retention
6. **API Rate Limiting**: GitHub API respects rate limits

---

## Summary

ScholarAI implements a sophisticated multi-agent architecture where:

1. **User submits request** via React frontend
2. **FastAPI backend** validates and routes request
3. **Master Orchestrator** determines which agents to activate
4. **Specialized agents** analyze data independently using rule-based algorithms
5. **Outputs are merged** into a unified final response
6. **Frontend displays** individual agent analyses + orchestrator summary

The system operates **100% locally** with **no paid APIs**, making it perfect for students to get expert-level feedback on resumes, research technical topics, and plan their learning journeys.

