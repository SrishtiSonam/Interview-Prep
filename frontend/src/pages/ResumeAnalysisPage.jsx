import { useState } from 'react';
import api from '../services/api';
import AgentOutput from '../components/AgentOutput';
import MasterOrchestrator from '../components/MasterOrchestrator';

function ResumeAnalysisPage({ onNavigate }) {
    const [file, setFile] = useState(null);
    const [jobKeywords, setJobKeywords] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setError(null);
        } else {
            setError('Please select a PDF file');
        }
    };

    const handleAnalyze = async () => {
        if (!file) {
            setError('Please upload a resume PDF first');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await api.analyzeResume(file, jobKeywords || null);
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="resume-analysis-page">
            <section style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <button className="btn btn-outline" onClick={() => onNavigate('home')}>
                        ← Back
                    </button>
                    <h1 className="gradient-text">Resume Analysis</h1>
                </div>
                <p className="text-secondary">
                    Upload your resume and let 5 specialized AI agents analyze it from different perspectives
                </p>
            </section>

            {/* Upload Section */}
            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <h3>📄 Upload Resume</h3>

                <div style={{
                    border: '2px dashed var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '2rem',
                    textAlign: 'center',
                    marginTop: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                        e.preventDefault();
                        const droppedFile = e.dataTransfer.files[0];
                        if (droppedFile && droppedFile.type === 'application/pdf') {
                            setFile(droppedFile);
                            setError(null);
                        }
                    }}
                    onClick={() => document.getElementById('file-input').click()}
                >
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
                    {file ? (
                        <div>
                            <p style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>
                                ✅ {file.name}
                            </p>
                            <p className="text-tertiary" style={{ fontSize: '0.875rem' }}>
                                Click to change file
                            </p>
                        </div>
                    ) : (
                        <div>
                            <p style={{ marginBottom: '0.5rem' }}>
                                Drag & drop your resume PDF here
                            </p>
                            <p className="text-tertiary" style={{ fontSize: '0.875rem' }}>
                                or click to browse
                            </p>
                        </div>
                    )}
                    <input
                        id="file-input"
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                        Job Keywords (Optional)
                    </label>
                    <input
                        type="text"
                        className="input"
                        placeholder="e.g., Python, React, AWS, Machine Learning"
                        value={jobKeywords}
                        onChange={(e) => setJobKeywords(e.target.value)}
                    />
                    <p className="text-tertiary" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        Comma-separated keywords to match against
                    </p>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={handleAnalyze}
                    disabled={!file || loading}
                    style={{ marginTop: '1.5rem', width: '100%' }}
                >
                    {loading ? '🔄 Analyzing...' : '🚀 Analyze Resume'}
                </button>
            </div>

            {/* Error Display */}
            {error && (
                <div className="glass-card" style={{
                    background: 'linear-gradient(135deg, rgba(245, 87, 108, 0.2) 0%, rgba(240, 147, 251, 0.2) 100%)',
                    borderColor: 'var(--accent-pink)',
                    marginBottom: '2rem'
                }}>
                    <h4>❌ Error</h4>
                    <p>{error}</p>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="glass-card text-center" style={{ padding: '3rem' }}>
                    <div className="loader" style={{ margin: '0 auto 1rem' }}></div>
                    <p>Activating AI agents...</p>
                    <p className="text-tertiary" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        ATS_AGENT, HR_AGENT, TECH_LEAD_AGENT, HIRING_MANAGER_AGENT, RESUME_COACH_AGENT
                    </p>
                </div>
            )}

            {/* Results Display */}
            {result && !loading && (
                <div>
                    <h2 className="gradient-text" style={{ marginBottom: '2rem' }}>
                        Multi-Agent Analysis Results
                    </h2>

                    {/* Agent Outputs */}
                    {result.agent_outputs && result.agent_outputs.map((agentData, index) => (
                        <AgentOutput
                            key={index}
                            agentName={agentData.agent}
                            output={agentData.output}
                            delay={index * 150}
                        />
                    ))}

                    {/* Final Response */}
                    {result.final_response && (
                        <MasterOrchestrator response={result.final_response} />
                    )}
                </div>
            )}
        </div>
    );
}

export default ResumeAnalysisPage;
