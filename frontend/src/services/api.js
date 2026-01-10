/**
 * API Service - ScholarAI Backend Communication
 * Handles all API requests to FastAPI backend
 */

const API_BASE_URL = 'http://localhost:8000/api';

class APIService {
    /**
     * Resume Analysis APIs
     */

    async analyzeResume(file, jobKeywords = null) {
        const formData = new FormData();
        formData.append('file', file);
        if (jobKeywords) {
            formData.append('job_keywords', jobKeywords);
        }

        const response = await fetch(`${API_BASE_URL}/resume/analyze`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to analyze resume');
        }

        return await response.json();
    }

    async improveResume(file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/resume/improve`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to improve resume');
        }

        return await response.json();
    }

    /**
     * Research APIs
     */

    async researchTopic(query, options = {}) {
        const {
            includeGithub = true,
            includePapers = false,
            level = 'beginner'
        } = options;

        const response = await fetch(`${API_BASE_URL}/research/topic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                include_github: includeGithub,
                include_papers: includePapers,
                level
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to research topic');
        }

        return await response.json();
    }

    async analyzePaper(file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${API_BASE_URL}/research/paper`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to analyze paper');
        }

        return await response.json();
    }

    async createLearningPath(skill, level = 'beginner', durationWeeks = 12) {
        const response = await fetch(`${API_BASE_URL}/research/learning-path`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                skill,
                level,
                duration_weeks: durationWeeks
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to create learning path');
        }

        return await response.json();
    }

    async compareTechnologies(item1, item2, category = null) {
        const response = await fetch(`${API_BASE_URL}/research/compare`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item1,
                item2,
                category
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to compare technologies');
        }

        return await response.json();
    }

    /**
     * GitHub APIs
     */

    async searchRepositories(query, language = null, maxResults = 10) {
        const response = await fetch(`${API_BASE_URL}/github/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                language,
                max_results: maxResults
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to search repositories');
        }

        return await response.json();
    }

    async analyzeRepository(owner, repoName) {
        const response = await fetch(`${API_BASE_URL}/github/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                owner,
                repo_name: repoName
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.detail || 'Failed to analyze repository');
        }

        return await response.json();
    }
}

export default new APIService();
