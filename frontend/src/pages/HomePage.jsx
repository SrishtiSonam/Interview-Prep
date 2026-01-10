import React from 'react';

function HomePage({ onNavigate }) {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section style={{
                textAlign: 'center',
                padding: '4rem 0',
                marginBottom: '3rem'
            }}>
                <div style={{
                    fontSize: '5rem',
                    marginBottom: '1rem',
                    animation: 'pulse 2s ease-in-out infinite'
                }}>
                    🤖
                </div>
                <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                    ScholarAI
                </h1>
                <p style={{
                    fontSize: '1.5rem',
                    color: 'var(--text-secondary)',
                    maxWidth: '800px',
                    margin: '0 auto 2rem'
                }}>
                    Multi-Agent Autonomous AI System for Students
                </p>
                <p style={{ color: 'var(--text-tertiary)', marginBottom: '2rem' }}>
                    Get expert resume reviews, career guidance, and technical research from specialized AI agents
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <button className="btn btn-primary" onClick={() => onNavigate('resume')}>
                        📄 Analyze Resume
                    </button>
                    <button className="btn btn-secondary" onClick={() => onNavigate('research')}>
                        🔍 Research Topics
                    </button>
                    <button className="btn btn-outline" onClick={() => onNavigate('career')}>
                        🎯 Career Guidance
                    </button>
                </div>
            </section>

            {/* Features Grid */}
            <section className="container" style={{ marginBottom: '3rem' }}>
                <h2 className="text-center gradient-text" style={{ marginBottom: '2rem' }}>
                    Our AI Agent Team
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {/* Resume Suite */}
                    <div className="glass-card">
                        <div className="agent-icon" style={{ marginBottom: '1rem' }}>📊</div>
                        <h3>Resume Analysis Suite</h3>
                        <p className="text-secondary">
                            5 specialized agents (ATS, HR, Tech Lead, Hiring Manager, Resume Coach) analyze your resume from every angle
                        </p>
                        <ul style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                            <li>✅ ATS compatibility check</li>
                            <li>✅ Grammar and tone review</li>
                            <li>✅ Technical skills assessment</li>
                            <li>✅ Hire/Reject decision</li>
                            <li>✅ Bullet point rewrites</li>
                        </ul>
                    </div>

                    {/* Research Suite */}
                    <div className="glass-card">
                        <div className="agent-icon" style={{ marginBottom: '1rem', background: 'var(--secondary-gradient)' }}>🔬</div>
                        <h3>Research Suite</h3>
                        <p className="text-secondary">
                            3 research agents (Web, GitHub, Paper) gather and synthesize technical information
                        </p>
                        <ul style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                            <li>🌐 Web documentation search</li>
                            <li>💻 GitHub project discovery</li>
                            <li>📚 Research paper analysis</li>
                            <li>📊 Technology comparisons</li>
                        </ul>
                    </div>

                    {/* Career Suite */}
                    <div className="glass-card">
                        <div className="agent-icon" style={{ marginBottom: '1rem', background: 'var(--success-gradient)' }}>🎓</div>
                        <h3>Career Guidance</h3>
                        <p className="text-secondary">
                            Personalized learning paths and tech comparisons tailored for students
                        </p>
                        <ul style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                            <li>🗺️ Custom learning roadmaps</li>
                            <li>⚖️ Framework comparisons</li>
                            <li>📈 Skill progression tracking</li>
                            <li>💡 Project recommendations</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="glass-card" style={{ marginBottom: '3rem' }}>
                <h2 className="gradient-text text-center" style={{ marginBottom: '2rem' }}>
                    How It Works
                </h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            fontSize: '3rem',
                            marginBottom: '1rem',
                            background: 'var(--primary-gradient)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            1️⃣
                        </div>
                        <h4>Submit Your Request</h4>
                        <p className="text-secondary">
                            Upload a resume, enter a research query, or request a learning path
                        </p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>2️⃣</div>
                        <h4>Agents Analyze</h4>
                        <p className="text-secondary">
                            Master Orchestrator activates relevant specialized agents who work independently
                        </p>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>3️⃣</div>
                        <h4>Get Expert Insights</h4>
                        <p className="text-secondary">
                            Receive detailed analysis from each agent plus a unified final recommendation
                        </p>
                    </div>
                </div>
            </section>

            {/* Free & Local First */}
            <section className="glass-card" style={{
                background: 'var(--primary-gradient)',
                textAlign: 'center',
                padding: '3rem'
            }}>
                <h2 style={{ marginBottom: '1rem' }}>100% Free & Local-First</h2>
                <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
                    No paid APIs. No subscriptions. All processing happens locally.
                    Open-source tools only.
                </p>
                <div style={{
                    display: 'flex',
                    gap: '2rem',
                    justifyContent: 'center',
                    marginTop: '2rem',
                    flexWrap: 'wrap'
                }}>
                    <div>
                        <div style={{ fontSize: '2rem' }}>💸</div>
                        <div>Zero Cost</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem' }}>🔒</div>
                        <div>Privacy First</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem' }}>⚡</div>
                        <div>Fast & Local</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '2rem' }}>🎓</div>
                        <div>Student-Friendly</div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
