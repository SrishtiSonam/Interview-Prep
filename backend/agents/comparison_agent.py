"""
Comparison Agent - Framework and Tool Comparison
Compares technologies, frameworks, and tools in structured tables
"""

from typing import Dict, List, Any

class ComparisonAgent:
    """Agent that compares technologies and provides recommendations"""
    
    def __init__(self):
        self.name = "COMPARISON_AGENT"
        
        # Predefined comparison data for common technologies
        self.tech_database = self._load_tech_database()
    
    def compare(self, item1: str, item2: str, category: str = None) -> Dict[str, Any]:
        """
        Compare two technologies/frameworks
        
        Args:
            item1: First item to compare
            item2: Second item to compare
            category: Category (frontend, backend, database, etc.)
            
        Returns:
            Structured comparison with recommendations
        """
        item1_lower = item1.lower()
        item2_lower = item2.lower()
        
        # Try to find in database
        comparison_key = f"{item1_lower}_vs_{item2_lower}"
        reverse_key = f"{item2_lower}_vs_{item1_lower}"
        
        if comparison_key in self.tech_database:
            comparison_data = self.tech_database[comparison_key]
        elif reverse_key in self.tech_database:
            comparison_data = self.tech_database[reverse_key]
            # Swap items
            comparison_data = self._swap_comparison(comparison_data)
        else:
            # Generate generic comparison
            comparison_data = self._generate_generic_comparison(item1, item2)
        
        # Add student recommendation
        comparison_data["student_recommendation"] = self._get_student_recommendation(comparison_data)
        
        return {
            "agent": self.name,
            "item1": item1,
            "item2": item2,
            "comparison": comparison_data
        }
    
    def _load_tech_database(self) -> Dict[str, Any]:
        """Load predefined technology comparisons"""
        return {
            "react_vs_vue": {
                "criteria": {
                    "Learning Curve": {"react": 7, "vue": 9, "desc": "Vue is easier for beginners"},
                    "Performance": {"react": 8, "vue": 8, "desc": "Both offer excellent performance"},
                    "Job Market": {"react": 10, "vue": 7, "desc": "React has more job opportunities"},
                    "Ecosystem": {"react": 10, "vue": 7, "desc": "React has larger community and libraries"},
                    "Documentation": {"react": 8, "vue": 10, "desc": "Vue has exceptional documentation"},
                    "Mobile Support": {"react": 10, "vue": 6, "desc": "React Native is industry standard"}
                },
                "pros_cons": {
                    "react": {
                        "pros": ["Massive ecosystem", "React Native for mobile", "High job demand", "Flexible"],
                        "cons": ["Steeper learning curve", "JSX syntax", "More boilerplate"]
                    },
                    "vue": {
                        "pros": ["Easier to learn", "Great documentation", "Clean syntax", "Good for small teams"],
                        "cons": ["Smaller job market", "Less mobile support", "Smaller ecosystem"]
                    }
                },
                "best_for": {
                    "react": "Large-scale applications, mobile apps, high job opportunities",
                    "vue": "Rapid prototyping, smaller projects, beginners"
                }
            },
            "python_vs_javascript": {
                "criteria": {
                    "Ease of Learning": {"python": 10, "javascript": 7, "desc": "Python has cleaner syntax"},
                    "Web Development": {"python": 7, "javascript": 10, "desc": "JavaScript dominates web"},
                    "Data Science": {"python": 10, "javascript": 5, "desc": "Python is the DS standard"},
                    "Job Market": {"python": 9, "javascript": 10, "desc": "Both have excellent demand"},
                    "Versatility": {"python": 9, "javascript": 9, "desc": "Both are highly versatile"},
                    "Performance": {"python": 6, "javascript": 8, "desc": "JavaScript (Node.js) can be faster"}
                },
                "pros_cons": {
                    "python": {
                        "pros": ["Clean syntax", "Best for ML/AI", "Great libraries", "Readable code"],
                        "cons": ["Slower runtime", "GIL for threading", "Mobile development limited"]
                    },
                    "javascript": {
                        "pros": ["Runs everywhere", "Full-stack capability", "Async by default", "Large ecosystem"],
                        "cons": ["Complex ecosystem", "Type safety issues", "Callback hell (mitigated by async/await)"]
                    }
                },
                "best_for": {
                    "python": "Data science, machine learning, automation, scientific computing",
                    "javascript": "Web development, full-stack apps, real-time applications"
                }
            },
            "postgresql_vs_mongodb": {
                "criteria": {
                    "Data Structure": {"postgresql": 10, "mongodb": 8, "desc": "PostgreSQL for structured, MongoDB for flexible"},
                    "Scalability": {"postgresql": 8, "mongodb": 9, "desc": "MongoDB scales horizontally easier"},
                    "ACID Compliance": {"postgresql": 10, "mongodb": 7, "desc": "PostgreSQL has stronger guarantees"},
                    "Query Language": {"postgresql": 10, "mongodb": 7, "desc": "SQL is more standardized"},
                    "Performance": {"postgresql": 8, "mongodb": 8, "desc": "Depends on use case"},
                    "Learning Curve": {"postgresql": 7, "mongodb": 9, "desc": "MongoDB is easier initially"}
                },
                "pros_cons": {
                    "postgresql": {
                        "pros": ["ACID compliant", "Powerful SQL", "Mature ecosystem", "Great for complex queries"],
                        "cons": ["Scaling is harder", "Schema changes can be painful", "More setup required"]
                    },
                    "mongodb": {
                        "pros": ["Flexible schema", "Easy to scale", "Fast for simple queries", "JSON-like documents"],
                        "cons": ["Weaker ACID guarantees", "Can get messy without discipline", "Not ideal for complex joins"]
                    }
                },
                "best_for": {
                    "postgresql": "Financial apps, complex relationships, ACID requirements",
                    "mongodb": "Rapid prototyping, flexible schemas, real-time analytics"
                }
            }
        }
    
    def _generate_generic_comparison(self, item1: str, item2: str) -> Dict[str, Any]:
        """Generate generic comparison when specific data not available"""
        return {
            "criteria": {
                "Popularity": {"[item1]": 8, "[item2]": 8, "desc": "Both are popular in their domains"},
                "Learning Curve": {"[item1]": 7, "[item2]": 7, "desc": "Moderate learning curve for both"},
                "Community Support": {"[item1]": 8, "[item2]": 8, "desc": "Good community support"},
                "Job Market": {"[item1]": 7, "[item2]": 7, "desc": "Good job opportunities"}
            },
            "pros_cons": {
                item1: {
                    "pros": ["Research specific pros for detailed comparison"],
                    "cons": ["Research specific cons for detailed comparison"]
                },
                item2: {
                    "pros": ["Research specific pros for detailed comparison"],
                    "cons": ["Research specific cons for detailed comparison"]
                }
            },
            "best_for": {
                item1: "Specific use cases - requires more research",
                item2: "Specific use cases - requires more research"
            },
            "note": "Generic comparison - add specific data for more detailed insights"
        }
    
    def _swap_comparison(self, data: Dict) -> Dict:
        """Swap items in comparison data"""
        # Implementation would swap all references
        return data
    
    def _get_student_recommendation(self, comparison: Dict) -> str:
        """Generate student-specific recommendation"""
        # Analyze criteria scores
        item1_key = list(comparison.get("best_for", {}).keys())[0] if comparison.get("best_for") else "item1"
        item2_key = list(comparison.get("best_for", {}).keys())[1] if len(comparison.get("best_for", {})) > 1 else "item2"
        
        # Calculate average scores
        criteria = comparison.get("criteria", {})
        if criteria:
            item1_scores = [v.get(item1_key, 0) for v in criteria.values() if isinstance(v, dict)]
            item2_scores = [v.get(item2_key, 0) for v in criteria.values() if isinstance(v, dict)]
            
            avg1 = sum(item1_scores) / len(item1_scores) if item1_scores else 0
            avg2 = sum(item2_scores) / len(item2_scores) if item2_scores else 0
            
            if avg1 > avg2 + 1:
                return f"For students: Start with {item1_key} - better learning resources and job market"
            elif avg2 > avg1 + 1:
                return f"For students: Start with {item2_key} - easier to learn and good fundamentals"
            else:
                return f"For students: Learn both - {item1_key} first for fundamentals, then {item2_key}"
        
        return "For students: Learn whichever aligns better with your career goals"
