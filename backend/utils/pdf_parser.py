"""
PDF Parser Utility
Extracts text from PDF files (resumes and papers)
"""

import pdfplumber
import PyPDF2
from typing import Optional

def extract_text_from_pdf(pdf_path: str, method: str = "pdfplumber") -> Optional[str]:
    """
    Extract text from PDF file
    
    Args:
        pdf_path: Path to PDF file
        method: Extraction method ("pdfplumber" or "pypdf2")
        
    Returns:
        Extracted text or None if extraction fails
    """
    try:
        if method == "pdfplumber":
            return _extract_with_pdfplumber(pdf_path)
        else:
            return _extract_with_pypdf2(pdf_path)
    except Exception as e:
        print(f"Error extracting PDF text: {e}")
        return None

def _extract_with_pdfplumber(pdf_path: str) -> str:
    """Extract text using pdfplumber (better for resumes)"""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"
    return text

def _extract_with_pypdf2(pdf_path: str) -> str:
    """Extract text using PyPDF2 (fallback method)"""
    text = ""
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page in pdf_reader.pages:
            text += page.extract_text() + "\n"
    return text
