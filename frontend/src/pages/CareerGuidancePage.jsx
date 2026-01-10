import { useState } from 'react';
import api from '../services/api';
import AgentOutput from '../components/AgentOutput';
import MasterOrchestrator from '../components/MasterOrchestrator';

function CareerGuidancePage({ onNavigate }) {
    const [skill, setSkill] = useState('');
    const [level, setLevel] = useState('beginner');
    const [duration, setDuration] = useState(12);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [mode, setMode] = useState('learning'); // 'learning' or 'comparison'

    // Comparison states
    const [item1, setItem1] = useState('');
    const [item2, setItem2] = useState('');

    const handleLearningPath = async () => {
        if (!skill.trim()) {
            setError('Please enter a skill to learn');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await api.createLearningPath(skill, level, duration);
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleComparison = async () => {
        if (!item1.trim() || !item2.trim()) {
            setError('Please enter both technologies to compare');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const data = await api.compareTechnologies(item1, item2);
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="career-guidance-page">
            <section style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <button className="btn btn-outline" onClick={() => onNavigate('home')}>
                        ← Back
                    </button>
                    <h1 className="gradient-text">Career Guidance</h1>
                </div>
                <p className="text-secondary">
                    Get personalized learning roadmaps and technology comparisons
                </p>
            </section>

            {/* Mode Selector */}
            <div style={{
                display: 'flex',
                gap: '1rem',
                marginBottom: '2rem',
                justifyContent: 'center'
            }}>
                <button
                    className={mode === 'learning' ? 'btn btn-primary' : 'btn btn-outline'}
                    onClick={() => { setMode('learning'); setResult(null); setError(null); }}
                >
                    🗺️ Learning Path
                </button>
                <button
                    className={mode === 'comparison' ? 'btn btn-primary' : 'btn btn-outline'}
                    onClick={() => { setMode('comparison'); setResult(null); setError(null); }}
                >
                    ⚖️ Compare Technologies
                </button>
            </div>

            {/* Learning Path Form */}
            {mode === 'learning' && (
                <div className="glass-card" style={{ marginBottom: '2rem' }}>
                    <h3>🗺️ Create Learning Roadmap</h3>

                    <div style={{ marginTop: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                            What skill do you want to learn?
                        </label>
                        <input
                            type="text"
                            className="input"
                            placeholder="e.g., Full-stack web development, Machine Learning, Data Structures"
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleLearningPath()}
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
                                Current Level
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
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                                Duration (weeks)
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={duration}
                                onChange={(e) => setDuration(parseInt(e.target.value))}
                                min="4"
                                max="52"
                            />
                        </div>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleLearningPath}
                        disabled={!skill.trim() || loading}
                        style={{ marginTop: '1.5rem', width: '100%' }}
                    >
                        {loading ? '🔄 Creating Roadmap...' : '🚀 Create Roadmap'}
                    </button>
                </div>
            )}

            {/* Comparison Form */}
            {mode === 'comparison' && (
                <div className="glass-card" style={{ marginBottom: '2rem' }}>
                    <h3>⚖️ Compare Technologies</h3>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '1rem',
                        marginTop: '1.5rem'
                    }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                                Technology 1
                            </label>
                            <input
                                type="text"
                                className="input"
                                placeholder="e.g., React"
                                value={item1}
                                onChange={(e) => setItem1(e.target.value)}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
                                Technology 2
                            </label>
                            <input
                                type="text"
                                className="input"
                                placeholder="e.g., Vue"
                                value={item2}
                                onChange={(e) => setItem2(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={handleComparison}
                        disabled={!item1.trim() || !item2.trim() || loading}
                        style={{ marginTop: '1.5rem', width: '100%' }}
                    >
                        {loading ? '🔄 Comparing...' : '🚀 Compare'}
                    </button>

                    {/* Quick Examples */}
                    <div style={{ marginTop: '1.5rem' }}>
                        <p className="text-tertiary" style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                            Quick examples:
                        </p>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {[
                                { a: 'React', b: 'Vue' },
                                { a: 'Python', b: 'JavaScript' },
                                { a: 'PostgreSQL', b: 'MongoDB' }
                            ].map((example, idx) => (
                                <button
                                    key={idx}
                                    className="btn btn-outline"
                                    onClick={() => {
                                        setItem1(example.a);
                                        setItem2(example.b);
                                    }}
                                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                                >
                                    {example.a} vs {example.b}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Error Display */}
            {error && (
                <div className="glass-card" style={{
                    background: 'linear-gradient(135deg, rgba(245, 87, 108, 0.2) 0%, rgba(240, 147, 251, 0.2) 100%)',
                    borderColor: 'var(--accent-pink)'
                }}>
                    <h4>❌ Error</h4>
                    <p>{error}</p>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="glass-card text-center" style={{ padding: '3rem' }}>
                    <div className="loader" style={{ margin: '0 auto 1rem' }}></div>
                    <p>Activating {mode === 'learning' ? 'Learning Path' : 'Comparison'} Agent...</p>
                </div>
            )}

            {/* Results */}
            {result && !loading && (
                <div>
                    <h2 className="gradient-text" style={{ marginBottom: '2rem' }}>
                        {mode === 'learning' ? 'Your Learning Roadmap' : 'Technology Comparison'}
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

export default CareerGuidancePage;
