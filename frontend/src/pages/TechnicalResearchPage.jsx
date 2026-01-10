import { useState } from 'react';
import api from '../services/api';
import AgentOutput from '../components/AgentOutput';
import MasterOrchestrator from '../components/MasterOrchestrator';

function TechnicalResearchPage({ onNavigate }) {
    const [query, setQuery] = useState('');
    const [level, setLevel] = useState('beginner');
    const [includeGithub, setIncludeGithub] = useState(true);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleResearch = async () => {
        if (!query.trim()) {
            setError('Please enter a research query');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await api.researchTopic(query, {
                includeGithub,
                level
            });
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="technical-research-page">
            <section style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <button className="btn btn-outline" onClick={() => onNavigate('home')}>
                        ← Back
                    </button>
                    <h1 className="gradient-text">Technical Research</h1>
                </div>
                <p className="text-secondary">
                    Research any technical topic with help from Web Research, GitHub, and Learning Path agents
                </p>
            </section>

            {/* Query Input */}
            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <h3>🔍 What do you want to learn?</h3>

                <div style={{ marginTop: '1.5rem' }}>
                    <input
                        type="text"
                        className="input"
                        placeholder="e.g., React vs Vue for beginners, Machine Learning roadmap, FastAPI tutorial"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleResearch()}
                        style={{ fontSize: '1.125rem' }}
                    />
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginTop: '1.5rem'
                }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                            Your Level
                        </label>
                        <select
                            className="input"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                        >
                            <option value="beginner">🌱 Beginner</option>
                            <option value="intermediate">📈 Intermediate</option>
                            <option value="advanced">🚀 Advanced</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={includeGithub}
                                onChange={(e) => setIncludeGithub(e.target.checked)}
                                style={{ width: '20px', height: '20px' }}
                            />
                            <span style={{ fontWeight: 600 }}>Include GitHub Projects</span>
                        </label>
                    </div>
                </div>

                <button
                    className="btn btn-primary"
                    onClick={handleResearch}
                    disabled={!query.trim() || loading}
                    style={{ marginTop: '1.5rem', width: '100%' }}
                >
                    {loading ? '🔄 Researching...' : '🚀 Start Research'}
                </button>
            </div>

            {/* Quick Examples */}
            {!result && !loading && (
                <div className="glass-card">
                    <h4>💡 Try these examples:</h4>
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        marginTop: '1rem'
                    }}>
                        {['React hooks tutorial', 'Python vs JavaScript', 'Machine Learning roadmap', 'Docker basics'].map((example) => (
                            <button
                                key={example}
                                className="btn btn-outline"
                                onClick={() => setQuery(example)}
                                style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                            >
                                {example}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="glass-card" style={{
                    background: 'linear-gradient(135deg, rgba(245, 87, 108, 0.2) 0%, rgba(240, 147, 251, 0.2) 100%)',
                    borderColor: 'var(--accent-pink)',
                    marginTop: '2rem'
                }}>
                    <h4>❌ Error</h4>
                    <p>{error}</p>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="glass-card text-center" style={{ padding: '3rem' }}>
                    <div className="loader" style={{ margin: '0 auto 1rem' }}></div>
                    <p>Activating research agents...</p>
                    <p className="text-tertiary" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        WEB_RESEARCH_AGENT, GITHUB_AGENT, LEARNING_PATH_AGENT
                    </p>
                </div>
            )}

            {/* Results */}
            {result && !loading && (
                <div>
                    <h2 className="gradient-text" style={{ marginBottom: '2rem' }}>
                        Research Results
                    </h2>

                    {result.agent_outputs && result.agent_outputs.map((agentData, index) => (
                        <AgentOutput
                            key={index}
                            agentName={agentData.agent}
                            output={agentData.output}
                            delay={index * 150}
                        />
                    ))}

                    {result.final_response && (
                        <MasterOrchestrator response={result.final_response} />
                    )}
                </div>
            )}
        </div>
    );
}

export default TechnicalResearchPage;
