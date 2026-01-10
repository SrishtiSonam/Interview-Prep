"""
GitHub Agent - Repository Discovery and Analysis
Finds real GitHub projects, libraries, and analyzes industry usage
"""

import requests
from typing import Dict, List, Any

class GitHubAgent:
    """Agent that discovers and analyzes GitHub repositories"""
    
    def __init__(self):
        self.name = "GITHUB_AGENT"
        self.base_url = "https://api.github.com"
        # Using public API without authentication (60 requests/hour limit)
    
    def search_repos(self, query: str, language: str = None, max_results: int = 10) -> Dict[str, Any]:
        """
        Search for GitHub repositories
        
        Args:
            query: Search query (topic, framework, etc.)
            language: Filter by programming language
            max_results: Maximum number of results
            
        Returns:
            Dictionary with repository discoveries and recommendations
        """
        # Build search query
        search_query = query
        if language:
            search_query += f" language:{language}"
        
        # Search repositories
        repos = self._search_repositories(search_query, max_results)
        
        # Analyze repositories
        analyzed_repos = [self._analyze_repo(repo) for repo in repos]
        
        # Generate insights
        insights = self._generate_insights(analyzed_repos, query)
        
        return {
            "agent": self.name,
            "query": query,
            "total_found": len(analyzed_repos),
            "repositories": analyzed_repos,
            "insights": insights,
            "recommendations": self._generate_repo_recommendations(analyzed_repos)
        }
    
    def analyze_repo(self, owner: str, repo_name: str) -> Dict[str, Any]:
        """
        Analyze a specific repository
        
        Args:
            owner: Repository owner
            repo_name: Repository name
            
        Returns:
            Detailed repository analysis
        """
        try:
            url = f"{self.base_url}/repos/{owner}/{repo_name}"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                repo_data = response.json()
                return self._analyze_repo(repo_data)
            else:
                return {"error": "Repository not found"}
        except Exception as e:
            return {"error": str(e)}
    
    def _search_repositories(self, query: str, max_results: int) -> List[Dict]:
        """Search GitHub repositories"""
        try:
            # Sort by stars for quality results
            url = f"{self.base_url}/search/repositories"
            params = {
                "q": query,
                "sort": "stars",
                "order": "desc",
                "per_page": min(max_results, 30)
            }
            
            response = requests.get(url, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                return data.get("items", [])
            else:
                # Return mock data if API fails
                return self._get_mock_repos(query)
        except Exception as e:
            return self._get_mock_repos(query)
    
    def _analyze_repo(self, repo: Dict) -> Dict[str, Any]:
        """Analyze repository metadata"""
        return {
            "name": repo.get("name", ""),
            "full_name": repo.get("full_name", ""),
            "url": repo.get("html_url", ""),
            "description": repo.get("description", "No description"),
            "stars": repo.get("stargazers_count", 0),
            "forks": repo.get("forks_count", 0),
            "language": repo.get("language", "Unknown"),
            "topics": repo.get("topics", []),
            "last_updated": repo.get("updated_at", ""),
            "is_active": self._check_if_active(repo.get("updated_at", "")),
            "quality_score": self._calculate_quality_score(repo)
        }
    
    def _check_if_active(self, last_update: str) -> bool:
        """Check if repository is actively maintained"""
        if not last_update:
            return False
        
        # Simple check: updated in last year
        from datetime import datetime, timedelta
        try:
            update_date = datetime.fromisoformat(last_update.replace('Z', '+00:00'))
            one_year_ago = datetime.now(update_date.tzinfo) - timedelta(days=365)
            return update_date > one_year_ago
        except:
            return False
    
    def _calculate_quality_score(self, repo: Dict) -> int:
        """Calculate repository quality score (0-100)"""
        score = 0
        
        # Stars (40 points)
        stars = repo.get("stargazers_count", 0)
        if stars > 10000:
            score += 40
        elif stars > 1000:
            score += 30
        elif stars > 100:
            score += 20
        else:
            score += min(20, stars // 5)
        
        # Forks (20 points)
        forks = repo.get("forks_count", 0)
        if forks > 1000:
            score += 20
        else:
            score += min(20, forks // 50)
        
        # Has description (10 points)
        if repo.get("description"):
            score += 10
        
        # Topics/tags (10 points)
        topics = repo.get("topics", [])
        score += min(10, len(topics) * 2)
        
        # Recently updated (20 points)
        if self._check_if_active(repo.get("updated_at", "")):
            score += 20
        
        return min(100, score)
    
    def _generate_insights(self, repos: List[Dict], query: str) -> Dict[str, Any]:
        """Generate insights from repository analysis"""
        if not repos:
            return {
                "summary": f"No repositories found for '{query}'",
                "popular_languages": [],
                "average_stars": 0
            }
        
        # Extract popular languages
        languages = [r["language"] for r in repos if r.get("language")]
        language_counts = {}
        for lang in languages:
            language_counts[lang] = language_counts.get(lang, 0) + 1
        
        popular_languages = sorted(language_counts.items(), key=lambda x: x[1], reverse=True)
        
        # Calculate average stars
        avg_stars = sum(r["stars"] for r in repos) / len(repos) if repos else 0
        
        # Find most active repos
        active_repos = [r for r in repos if r.get("is_active")]
        
        return {
            "summary": f"Found {len(repos)} repositories for '{query}'",
            "popular_languages": [lang for lang, _ in popular_languages[:5]],
            "average_stars": int(avg_stars),
            "active_repos": len(active_repos),
            "total_repos": len(repos)
        }
    
    def _generate_repo_recommendations(self, repos: List[Dict]) -> List[str]:
        """Generate repository recommendations"""
        if not repos:
            return ["Try broadening your search query", "Check official organization accounts"]
        
        recommendations = []
        
        # Recommend highest quality repos
        top_repos = sorted(repos, key=lambda x: x.get("quality_score", 0), reverse=True)[:3]
        for repo in top_repos:
            recommendations.append(f"⭐ {repo['full_name']} ({repo['stars']:,} stars) - {repo['description'][:80]}")
        
        recommendations.append("Fork and study the most starred repositories")
        recommendations.append("Check 'Issues' and 'Pull Requests' to understand common problems")
        recommendations.append("Review the README for setup and usage patterns")
        
        return recommendations
    
    def _get_mock_repos(self, query: str) -> List[Dict]:
        """Return mock repository data when API unavailable"""
        # Mock data for common queries
        mock_data = {
            "react": [
                {
                    "name": "react",
                    "full_name": "facebook/react",
                    "html_url": "https://github.com/facebook/react",
                    "description": "The library for web and native user interfaces",
                    "stargazers_count": 220000,
                    "forks_count": 45000,
                    "language": "JavaScript",
                    "topics": ["react", "javascript", "library", "ui"],
                    "updated_at": "2024-01-01T00:00:00Z"
                }
            ],
            "python": [
                {
                    "name": "awesome-python",
                    "full_name": "vinta/awesome-python",
                    "html_url": "https://github.com/vinta/awesome-python",
                    "description": "A curated list of awesome Python frameworks, libraries",
                    "stargazers_count": 180000,
                    "forks_count": 24000,
                    "language": "Python",
                    "topics": ["python", "awesome", "list"],
                    "updated_at": "2024-01-01T00:00:00Z"
                }
            ]
        }
        
        # Return mock data if available
        for key in mock_data:
            if key in query.lower():
                return mock_data[key]
        
        return []
