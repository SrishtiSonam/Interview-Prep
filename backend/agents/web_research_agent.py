"""
Web Research Agent - Online Content Research
Searches and summarizes blogs, documentation, and tutorials
"""

import requests
from bs4 import BeautifulSoup
from typing import Dict, List, Any
import re

class WebResearchAgent:
    """Agent that performs web research and summarization"""
    
    def __init__(self):
        self.name = "WEB_RESEARCH_AGENT"
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    
    def research(self, query: str, max_sources: int = 5) -> Dict[str, Any]:
        """
        Research a topic using web sources
        
        Args:
            query: Search query or topic
            max_sources: Maximum number of sources to analyze
            
        Returns:
            Dictionary with research results and summary
        """
        # Note: This is a simplified version. In practice, you'd integrate with
        # a search API (DuckDuckGo, SerpAPI free tier) or scrape search results
        
        # For now, we'll use curated educational sources
        sources = self._get_curated_sources(query)
        
        # Fetch and analyze content
        analyzed_sources = []
        for source in sources[:max_sources]:
            try:
                content = self._fetch_content(source["url"])
                if content:
                    summary = self._summarize_content(content, query)
                    analyzed_sources.append({
                        "title": source["title"],
                        "url": source["url"],
                        "summary": summary,
                        "relevance": self._calculate_relevance(content, query)
                    })
            except Exception as e:
                # Skip sources that fail to fetch
                continue
        
        # Sort by relevance
        analyzed_sources.sort(key=lambda x: x["relevance"], reverse=True)
        
        # Generate overall summary
        overall_summary = self._generate_summary(analyzed_sources, query)
        
        return {
            "agent": self.name,
            "query": query,
            "sources_analyzed": len(analyzed_sources),
            "sources": analyzed_sources,
            "summary": overall_summary,
            "recommendations": self._generate_recommendations(query)
        }
    
    def _get_curated_sources(self, query: str) -> List[Dict[str, str]]:
        """Get curated educational sources based on query"""
        query_lower = query.lower()
        
        # Tech documentation and learning resources
        sources = []
        
        # Programming languages
        if any(lang in query_lower for lang in ["python", "javascript", "java", "c++"]):
            sources.extend([
                {"title": "Official Documentation", "url": f"https://docs.python.org" if "python" in query_lower else "https://developer.mozilla.org"},
                {"title": "Real Python Tutorials", "url": "https://realpython.com"},
                {"title": "W3Schools", "url": "https://www.w3schools.com"}
            ])
        
        # Frameworks
        if any(fw in query_lower for fw in ["react", "django", "fastapi", "flask"]):
            sources.extend([
                {"title": "Official Framework Docs", "url": "https://react.dev" if "react" in query_lower else "https://fastapi.tiangolo.com"},
                {"title": "Framework Tutorial", "url": "https://www.freecodecamp.org"}
            ])
        
        # General tech topics
        sources.extend([
            {"title": "FreeCodeCamp", "url": "https://www.freecodecamp.org"},
            {"title": "MDN Web Docs", "url": "https://developer.mozilla.org"},
            {"title": "DevDocs", "url": "https://devdocs.io"}
        ])
        
        return sources
    
    def _fetch_content(self, url: str) -> str:
        """Fetch content from URL"""
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Remove script and style tags
                for tag in soup(['script', 'style', 'nav', 'footer', 'header']):
                    tag.decompose()
                
                # Get text content
                text = soup.get_text(separator=' ', strip=True)
                return text[:5000]  # Limit to first 5000 chars
            return ""
        except:
            return ""
    
    def _summarize_content(self, content: str, query: str) -> str:
        """Summarize content relevant to query"""
        # Simple extractive summarization: find sentences containing query terms
        query_terms = query.lower().split()
        sentences = re.split(r'[.!?]\s+', content)
        
        relevant_sentences = []
        for sentence in sentences:
            sentence_lower = sentence.lower()
            if any(term in sentence_lower for term in query_terms):
                relevant_sentences.append(sentence)
                if len(relevant_sentences) >= 3:
                    break
        
        return ' '.join(relevant_sentences) if relevant_sentences else content[:300]
    
    def _calculate_relevance(self, content: str, query: str) -> float:
        """Calculate relevance score (0-100)"""
        query_terms = query.lower().split()
        content_lower = content.lower()
        
        # Count query term occurrences
        term_count = sum(content_lower.count(term) for term in query_terms)
        
        # Normalize by content length
        relevance = min(100, (term_count / max(1, len(content) / 100)) * 10)
        return relevance
    
    def _generate_summary(self, sources: List[Dict], query: str) -> str:
        """Generate overall research summary"""
        if not sources:
            return f"No comprehensive sources found for '{query}'. Consider checking official documentation or community forums."
        
        top_source = sources[0]
        return (
            f"Based on {len(sources)} sources, {query} is a topic with strong community support and documentation. "
            f"The most relevant resource is '{top_source['title']}' which provides detailed information. "
            f"Recommended to start with official documentation and hands-on tutorials."
        )
    
    def _generate_recommendations(self, query: str) -> List[str]:
        """Generate learning recommendations"""
        return [
            "Start with official documentation for authoritative information",
            "Follow hands-on tutorials to build practical understanding",
            "Join community forums (Reddit, Stack Overflow) for Q&A",
            "Build a small project to apply concepts",
            "Review real-world examples on GitHub"
        ]
