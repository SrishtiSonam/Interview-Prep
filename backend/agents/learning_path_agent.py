"""
Learning Path Agent - Personalized Learning Roadmaps
Creates structured learning plans and career roadmaps for students
"""

from typing import Dict, List, Any
from datetime import datetime, timedelta

class LearningPathAgent:
    """Agent that creates personalized learning roadmaps"""
    
    def __init__(self):
        self. name = "LEARNING_PATH_AGENT"
        self.learning_database = self._load_learning_paths()
    
    def create_roadmap(self, skill: str, level: str = "beginner", duration_weeks: int = 12) -> Dict[str, Any]:
        """
        Create personalized learning roadmap
        
        Args:
            skill: Target skill or domain (e.g., "full-stack development", "machine learning")
            level: Current level (beginner, intermediate, advanced)
            duration_weeks: Desired learning duration in weeks
            
        Returns:
            Structured learning roadmap with timeline and resources
        """
        skill_lower = skill.lower()
        
        # Find matching learning path
        roadmap = None
        for key, path in self.learning_database.items():
            if key in skill_lower or any(keyword in skill_lower for keyword in path.get("keywords", [])):
                roadmap = path
                break
        
        if not roadmap:
            roadmap = self._generate_generic_roadmap(skill)
        
        # Customize based on level
        customized = self._customize_for_level(roadmap, level)
        
        # Create timeline
        timeline = self._create_timeline(customized, duration_weeks)
        
        return {
            "agent": self.name,
            "skill": skill,
            "level": level,
            "duration_weeks": duration_weeks,
            "phases": customized["phases"],
            "timeline": timeline,
            "resources": customized.get("resources", []),
            "projects": customized.get("projects", []),
            "milestones": self._generate_milestones(customized),
            "tips": self._get_learning_tips(level)
        }
    
    def _load_learning_paths(self) -> Dict[str, Any]:
        """Load predefined learning paths"""
        return {
            "full_stack_web": {
                "keywords": ["full stack", "web development", "web dev"],
                "phases": [
                    {
                        "name": "Frontend Fundamentals",
                        "duration_weeks": 3,
                        "topics": ["HTML5", "CSS3", "JavaScript ES6+", "Responsive Design"],
                        "goals": ["Build static websites", "Understand DOM manipulation", "Create responsive layouts"]
                    },
                    {
                        "name": "Frontend Framework",
                        "duration_weeks": 3,
                        "topics": ["React.js", "Component Architecture", "State Management", "React Hooks"],
                        "goals": ["Build interactive UIs", "Manage application state", "Create reusable components"]
                    },
                    {
                        "name": "Backend Development",
                        "duration_weeks": 3,
                        "topics": ["Node.js/Python", "RESTful APIs", "Database (PostgreSQL/MongoDB)", "Authentication"],
                        "goals": ["Create APIs", "Handle databases", "Implement auth"]
                    },
                    {
                        "name": "Full-Stack Integration",
                        "duration_weeks": 3,
                        "topics": ["API Integration", "Deployment", "DevOps Basics", "Testing"],
                        "goals": ["Deploy full applications", "Connect frontend to backend", "Understand CI/CD"]
                    }
                ],
                "resources": [
                    {"name": "FreeCodeCamp", "type": "Course", "url": "https://www.freecodecamp.org", "cost": "Free"},
                    {"name": "MDN Web Docs", "type": "Documentation", "url": "https://developer.mozilla.org", "cost": "Free"},
                    {"name": "The Odin Project", "type": "Curriculum", "url": "https://www.theodinproject.com", "cost": "Free"}
                ],
                "projects": [
                    "Personal portfolio website",
                    "Todo app with backend",
                    "Blog platform with authentication",
                    "E-commerce site (frontend + backend)"
                ]
            },
            "machine_learning": {
                "keywords": ["machine learning", "ml", "ai", "data science"],
                "phases": [
                    {
                        "name": "Python & Math Foundations",
                        "duration_weeks": 3,
                        "topics": ["Python Programming", "NumPy", "Pandas", "Statistics", "Linear Algebra"],
                        "goals": ["Master Python", "Understand data manipulation", "Learn math basics"]
                    },
                    {
                        "name": "Traditional ML",
                        "duration_weeks": 4,
                        "topics": ["Scikit-learn", "Regression", "Classification", "Clustering", "Model Evaluation"],
                        "goals": ["Build ML models", "Evaluate performance", "Understand algorithms"]
                    },
                    {
                        "name": "Deep Learning",
                        "duration_weeks": 3,
                        "topics": ["Neural Networks", "TensorFlow/PyTorch", "CNNs", "RNNs"],
                        "goals": ["Build neural networks", "Understand deep learning", "Work with images/text"]
                    },
                    {
                        "name": "Real-World Projects",
                        "duration_weeks": 2,
                        "topics": ["End-to-end ML Projects", "Model Deployment", "MLOps Basics"],
                        "goals": ["Deploy ML models", "Build portfolio projects"]
                    }
                ],
                "resources": [
                    {"name": "Andrew Ng's ML Course", "type": "Course", "url": "https://www.coursera.org", "cost": "Free (audit)"},
                    {"name": "Fast.ai", "type": "Course", "url": "https://www.fast.ai", "cost": "Free"},
                    {"name": "Kaggle Learn", "type": "Platform", "url": "https://www.kaggle.com/learn", "cost": "Free"}
                ],
                "projects": [
                    "House price prediction",
                    "Image classifier (cats vs dogs)",
                    "Sentiment analysis on tweets",
                    "Recommendation system"
                ]
            },
            "data_structures_algorithms": {
                "keywords": ["dsa", "data structures", "algorithms", "competitive programming"],
                "phases": [
                    {
                        "name": "Fundamentals",
                        "duration_weeks": 2,
                        "topics": ["Arrays", "Strings", "Hash Maps", "Two Pointers", "Sliding Window"],
                        "goals": ["Solve easy problems", "Understand time complexity", "Master basic patterns"]
                    },
                    {
                        "name": "Intermediate Structures",
                        "duration_weeks": 3,
                        "topics": ["Linked Lists", "Stacks", "Queues", "Trees", "Graphs"],
                        "goals": ["Implement data structures", "Solve medium problems"]
                    },
                    {
                        "name": "Advanced Algorithms",
                        "duration_weeks": 4,
                        "topics": ["Dynamic Programming", "Backtracking", "Greedy", "Binary Search", "Graph Algorithms"],
                        "goals": ["Solve hard problems", "Optimize solutions", "Interview readiness"]
                    },
                    {
                        "name": "Interview Prep",
                        "duration_weeks": 3,
                        "topics": ["System Design Basics", "Mock Interviews", "Problem-Solving Patterns"],
                        "goals": ["Get interview-ready", "Build confidence"]
                    }
                ],
                "resources": [
                    {"name": "LeetCode", "type": "Practice", "url": "https://leetcode.com", "cost": "Free + Premium"},
                    {"name": "NeetCode", "type": "Course", "url": "https://neetcode.io", "cost": "Free"},
                    {"name": "AlgoExpert", "type": "Platform", "url": "https://www.algoexpert.io", "cost": "Paid"}
                ],
                "projects": [
                    "Implement all major data structures from scratch",
                    "Solve 200+ LeetCode problems",
                    "Build a problem-solving tracker app"
                ]
            }
        }
    
    def _generate_generic_roadmap(self, skill: str) -> Dict[str, Any]:
        """Generate generic roadmap for unknown skills"""
        return {
            "phases": [
                {
                    "name": "Foundation",
                    "duration_weeks": 4,
                    "topics": [f"Learn {skill} basics", "Core concepts", "Best practices"],
                    "goals": ["Understand fundamentals"]
                },
                {
                    "name": "Practice",
                    "duration_weeks": 4,
                    "topics": ["Hands-on projects", "Build real applications"],
                    "goals": ["Apply knowledge"]
                },
                {
                    "name": "Advanced Topics",
                    "duration_weeks": 4,
                    "topics": ["Advanced concepts", "Industry practices"],
                    "goals": ["Master the skill"]
                }
            ],
            "resources": [
                {"name": "Official Documentation", "type": "Docs", "cost": "Free"},
                {"name": "YouTube Tutorials", "type": "Video", "cost": "Free"}
            ],
            "projects": [f"Build projects related to {skill}"]
        }
    
    def _customize_for_level(self, roadmap: Dict, level: str) -> Dict:
        """Customize roadmap based on user's current level"""
        if level == "intermediate":
            # Skip first phase
            roadmap["phases"] = roadmap["phases"][1:]
        elif level == "advanced":
            # Focus on advanced topics only
            roadmap["phases"] = roadmap["phases"][-2:]
        
        return roadmap
    
    def _create_timeline(self, roadmap: Dict, total_weeks: int) -> List[Dict]:
        """Create week-by-week timeline"""
        timeline = []
        start_date = datetime.now()
        current_week = 0
        
        for phase in roadmap["phases"]:
            phase_weeks = phase.get("duration_weeks", 2)
            
            for week in range(phase_weeks):
                current_week += 1
                if current_week > total_weeks:
                    break
                
                week_date = start_date + timedelta(weeks=current_week - 1)
                timeline.append({
                    "week": current_week,
                    "date_range": f"{week_date.strftime('%b %d')} - {(week_date + timedelta(days=6)).strftime('%b %d')}",
                    "phase": phase["name"],
                    "focus": phase["topics"][min(week, len(phase["topics"]) - 1)]
                })
        
        return timeline
    
    def _generate_milestones(self, roadmap: Dict) -> List[str]:
        """Generate learning milestones"""
        milestones = []
        for i, phase in enumerate(roadmap["phases"], 1):
            milestones.append(f"Phase {i}: {phase['name']} - {', '.join(phase['goals'])}")
        return milestones
    
    def _get_learning_tips(self, level: str) -> List[str]:
        """Get personalized learning tips"""
        base_tips = [
            "Code every single day, even if just for 30 minutes",
            "Build projects - don't just watch tutorials",
            "Join developer communities (Discord, Reddit)",
            "Document your learning journey (blog, GitHub)",
            "Don't rush - understanding > speed"
        ]
        
        if level == "beginner":
            base_tips.extend([
                "Start with one technology and master it before jumping to others",
                "Don't get overwhelmed by the number of technologies",
                "Focus on fundamentals before frameworks"
            ])
        
        return base_tips
