"""
Paper Research Agent - Technical Paper Analysis
Reads and summarizes research papers and technical PDFs
"""

import pdfplumber
from typing import Dict, List, Any
import re

class PaperResearchAgent:
    """Agent that analyzes research papers and technical documents"""
    
    def __init__(self):
        self.name = "PAPER_RESEARCH_AGENT"
    
    def analyze_paper(self, pdf_path: str) -> Dict[str, Any]:
        """
        Analyze a research paper or technical document
        
        Args:
            pdf_path: Path to PDF file
            
        Returns:
            Dictionary with paper analysis and summary
        """
        try:
            # Extract text from PDF
            text = self._extract_pdf_text(pdf_path)
            
            # Analyze paper structure
            structure = self._analyze_structure(text)
            
            # Extract key information
            metadata = self._extract_metadata(text)
            
            # Generate summary
            summary = self._generate_summary(text, structure)
            
            # Extract key concepts
            concepts = self._extract_key_concepts(text)
            
            return {
                "agent": self.name,
                "metadata": metadata,
                "structure": structure,
                "summary": summary,
                "key_concepts": concepts,
                "readability": self._assess_readability(text),
                "recommendations": self._generate_reading_recommendations(metadata)
            }
        except Exception as e:
            return {
                "agent": self.name,
                "error": f"Failed to analyze paper: {str(e)}",
                "recommendations": ["Ensure PDF is readable and not password-protected"]
            }
    
    def _extract_pdf_text(self, pdf_path: str) -> str:
        """Extract text from PDF"""
        text = ""
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages[:50]:  # Limit to first 50 pages
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return text
    
    def _analyze_structure(self, text: str) -> Dict[str, bool]:
        """Analyze paper structure"""
        text_lower = text.lower()
        
        return {
            "has_abstract": "abstract" in text_lower,
            "has_introduction": "introduction" in text_lower,
            "has_methodology": any(word in text_lower for word in ["methodology", "methods", "approach"]),
            "has_results": "results" in text_lower or "findings" in text_lower,
            "has_conclusion": "conclusion" in text_lower,
            "has_references": any(word in text_lower for word in ["references", "bibliography"])
        }
    
    def _extract_metadata(self, text: str) -> Dict[str, Any]:
        """Extract paper metadata"""
        # Extract title (usually first significant text)
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        title = lines[0] if lines else "Unknown"
        
        # Extract authors (heuristic: look for common patterns)
        authors = self._extract_authors(text)
        
        # Extract year
        year = self._extract_year(text)
        
        # Estimate page count
        page_count = text.count('\f') + 1  # Form feed characters indicate page breaks
        
        return {
            "title": title[:200],  # Limit title length
            "authors": authors,
            "year": year,
            "estimated_pages": page_count,
            "word_count": len(text.split())
        }
    
    def _extract_authors(self, text: str) -> List[str]:
        """Extract author names (basic heuristic)"""
        # Look for patterns like "Name1, Name2, and Name3"
        # This is a simplified version
        first_500 = text[:500]
        
        # Common author patterns
        author_pattern = r'([A-Z][a-z]+ [A-Z][a-z]+(?:, [A-Z][a-z]+ [A-Z][a-z]+)*)'
        matches = re.findall(author_pattern, first_500)
        
        if matches:
            return matches[0].split(', ')[:5]  # Limit to 5 authors
        return ["Unknown"]
    
    def _extract_year(self, text: str) -> int:
        """Extract publication year"""
        # Look for 4-digit years between 1990-2030
        years = re.findall(r'\b(19[9]\d|20[0-3]\d)\b', text[:1000])
        if years:
            return int(years[0])
        return 0
    
    def _generate_summary(self, text: str, structure: Dict) -> str:
        """Generate paper summary"""
        # Extract abstract if available
        if structure["has_abstract"]:
            abstract = self._extract_section(text, "abstract")
            if abstract:
                return f"Abstract: {abstract[:500]}..."
        
        # Otherwise, use first few paragraphs
        paragraphs = [p.strip() for p in text.split('\n\n') if len(p.strip()) > 100]
        if paragraphs:
            return paragraphs[0][:500] + "..."
        
        return "Summary not available - paper structure may be non-standard"
    
    def _extract_section(self, text: str, section_name: str) -> str:
        """Extract a specific section from paper"""
        text_lower = text.lower()
        section_start = text_lower.find(section_name)
        
        if section_start == -1:
            return ""
        
        # Find next section (crude heuristic)
        next_section_keywords = ["introduction", "background", "methodology", "results"]
        section_text = text[section_start:]
        
        # Find the end of this section
        end_pos = len(section_text)
        for keyword in next_section_keywords:
            if keyword != section_name:
                pos = section_text.lower().find(keyword, 50)  # Start search after 50 chars
                if pos != -1 and pos < end_pos:
                    end_pos = pos
        
        return section_text[:end_pos].strip()
    
    def _extract_key_concepts(self, text: str) -> List[str]:
        """Extract key technical concepts"""
        # Look for capitalized technical terms and acronyms
        words = text.split()
        
        # Find acronyms (all caps, 2-6 letters)
        acronyms = list(set([word.strip('.,()') for word in words 
                            if word.isupper() and 2 <= len(word) <= 6]))
        
        # Common ML/AI concepts
        ml_concepts = ["neural network", "machine learning", "deep learning", "transformer",
                      "attention", "classification", "regression", "clustering"]
        
        found_concepts = [concept for concept in ml_concepts if concept in text.lower()]
        
        return (acronyms[:10] + found_concepts)[:15]  # Limit to 15 concepts
    
    def _assess_readability(self, text: str) -> str:
        """Assess paper readability level"""
        words = text.split()
        if not words:
            return "Unknown"
        
        # Simple heuristic based on word complexity
        avg_word_length = sum(len(word) for word in words[:1000]) / min(1000, len(words))
        
        if avg_word_length < 5:
            return "Accessible"
        elif avg_word_length < 6.5:
            return "Moderate"
        else:
            return "Advanced/Technical"
    
    def _generate_reading_recommendations(self, metadata: Dict) -> List[str]:
        """Generate reading recommendations"""
        recommendations = []
        
        if metadata.get("estimated_pages", 0) > 20:
            recommendations.append("Start with abstract and conclusion for overview")
        
        recommendations.append("Take notes on key concepts and methodology")
        recommendations.append("Look up unfamiliar terms as you read")
        recommendations.append("Try to implement or reproduce simple examples")
        
        return recommendations
