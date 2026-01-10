import React from 'react';

function AgentOutput({ agentName, output, delay = 0 }) {
    const getAgentIcon = (name) => {
        const icons = {
            'ATS_AGENT': '📊',
            'HR_AGENT': '💼',
            'TECH_LEAD_AGENT': '💻',
            'HIRING_MANAGER_AGENT': '🎯',
            'RESUME_COACH_AGENT': '✏️',
            'WEB_RESEARCH_AGENT': '🌐',
            'GITHUB_AGENT': '💻',
            'PAPER_RESEARCH_AGENT': '📚',
            'COMPARISON_AGENT': '⚖️',
            'LEARNING_PATH_AGENT': '🗺️'
        };
        return icons[name] || '🤖';
    };

    const getScoreClass = (score) => {
        if (score >= 80) return 'score-high';
        if (score >= 60) return 'score-medium';
        return 'score-low';
    };

    return (
        <div className="agent-card" style={{ animationDelay: `${delay}ms` }}>
            <div className="agent-header">
                <div className="agent-icon">{getAgentIcon(agentName)}</div>
                <div>
                    <div className="agent-name">{agentName.replace(/_/g, ' ')}</div>
                    {output.score !== undefined && (
                        <div className={`score-badge ${getScoreClass(output.score)}`}>
                            {output.score}/100
                        </div>
                    )}
                </div>
            </div>

            {/* Display output based on agent type */}
            <div style={{ marginTop: '1rem' }}>
                {/* Resume Analysis Agents */}
                {agentName === 'ATS_AGENT' && (
                    <div>
                        <div style={{ marginBottom: '1rem' }}>
                            <strong>Found Keywords:</strong>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                                {output.found_keywords?.slice(0, 10).map((keyword, idx) => (
                                    <span key={idx} className="score-badge score-high" style={{ fontSize: '0.875rem', padding: '0.25rem 0.75rem' }}>
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                        {output.missing_keywords?.length > 0 && (
                            <div style={{ marginBottom: '1rem' }}>
                                <strong>Missing Keywords:</strong>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    {output.missing_keywords.slice(0, 10).map((keyword, idx) => (
                                        <span key={idx} className="score-badge score-low" style={{ fontSize: '0.875rem', padding: '0.25rem 0.75rem' }}>
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                        {output.recommendations && (
                            <div>
                                <strong>Recommendations:</strong>
                                <ul style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                                    {output.recommendations.slice(0, 3).map((rec, idx) => (
                                        <li key={idx}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {agentName === 'HR_AGENT' && (
                    <div>
                        {output.strengths && (
                            <div style={{ marginBottom: '1rem' }}>
                                <strong>✅ Strengths:</strong>
                                <ul style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                                    {output.strengths.map((s, idx) => (
                                        <li key={idx}>{s}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {output.improvements && (
                            <div>
                                <strong>💡 Improvements:</strong>
                                <ul style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                                    {output.improvements.slice(0, 3).map((i, idx) => (
                                        <li key={idx}>{i}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {agentName === 'TECH_LEAD_AGENT' && (
                    <div>
                        {output.stack_analysis && (
                            <div style={{ marginBottom: '1rem' }}>
                                <strong>Tech Stack:</strong>
                                <p className="text-secondary">
                                    {output.stack_analysis.full_stack ? '✅ Full-stack' : '⚠️ Not full-stack'} |
                                    {output.stack_analysis.cloud_native ? ' ✅ Cloud-native' : ' ⚠️ No cloud experience'}
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    {output.stack_analysis.tier_1_techs?.slice(0, 8).map((tech, idx) => (
                                        <code key={idx}>{tech}</code>
                                    ))}
                                </div>
                            </div>
                        )}
                        {output.recommendations && (
                            <div>
                                <strong>Recommendations:</strong>
                                <ul style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                                    {output.recommendations.slice(0, 3).map((rec, idx) => (
                                        <li key={idx}>{rec}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {agentName === 'HIRING_MANAGER_AGENT' && (
                    <div>
                        <div style={{
                            background: output.decision === 'STRONG_HIRE' ? 'var(--success-gradient)' :
                                output.decision === 'SHORTLIST' ? 'var(--warning-gradient)' :
                                    'var(--secondary-gradient)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '1rem'
                        }}>
                            <h4 style={{ margin: 0 }}>Decision: {output.decision}</h4>
                        </div>
                        {output.reasoning && (
                            <p className="text-secondary">{output.reasoning}</p>
                        )}
                        {output.next_steps && (
                            <div style={{ marginTop: '1rem' }}>
                                <strong>Next Steps:</strong>
                                <ul style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                                    {output.next_steps.map((step, idx) => (
                                        <li key={idx}>{step}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {agentName === 'RESUME_COACH_AGENT' && (
                    <div>
                        {output.bullet_improvements && output.bullet_improvements.length > 0 && (
                            <div>
                                <strong>Bullet Point Improvements:</strong>
                                {output.bullet_improvements.slice(0, 3).map((improvement, idx) => (
                                    <div key={idx} style={{
                                        background: 'var(--bg-tertiary)',
                                        padding: '1rem',
                                        borderRadius: 'var(--radius-md)',
                                        marginTop: '1rem'
                                    }}>
                                        <div style={{ color: 'var(--text-tertiary)', marginBottom: '0.5rem' }}>
                                            <strong>Original:</strong>
                                        </div>
                                        <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                                            {improvement.original}
                                        </p>
                                        <div style={{ color: 'var(--accent-cyan)', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                                            <strong>✨ Improved:</strong>
                                        </div>
                                        <p style={{ color: 'var(--text-primary)' }}>
                                            {improvement.improved}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {output.quick_wins && (
                            <div style={{ marginTop: '1rem' }}>
                                <strong>Quick Wins:</strong>
                                <ul style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                                    {output.quick_wins.slice(0, 3).map((tip, idx) => (
                                        <li key={idx}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Research Agents */}
                {agentName === 'WEB_RESEARCH_AGENT' && (
                    <div>
                        <p className="text-secondary">{output.summary}</p>
                        {output.sources && (
                            <div style={{ marginTop: '1rem' }}>
                                <strong>Sources ({output.sources_analyzed}):</strong>
                                {output.sources.slice(0, 3).map((source, idx) => (
                                    <div key={idx} style={{ marginTop: '0.75rem' }}>
                                        <a href={source.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
                                            {source.title}
                                        </a>
                                        <p className="text-tertiary" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                            {source.summary}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {agentName === 'GITHUB_AGENT' && (
                    <div>
                        {output.insights && (
                            <p className="text-secondary">{output.insights.summary}</p>
                        )}
                        {output.repositories && (
                            <div style={{ marginTop: '1rem' }}>
                                <strong>Top Repositories:</strong>
                                {output.repositories.slice(0, 5).map((repo, idx) => (
                                    <div key={idx} className="glass-card-sm" style={{ marginTop: '0.75rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                            <div>
                                                <a href={repo.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600 }}>
                                                    {repo.full_name}
                                                </a>
                                                <p className="text-tertiary" style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                                                    {repo.description}
                                                </p>
                                            </div>
                                            <div className={`score-badge ${getScoreClass(repo.quality_score)}`} style={{ marginLeft: '1rem' }}>
                                                {repo.quality_score}
                                            </div>
                                        </div >
                                        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
                                            <span>⭐ {repo.stars?.toLocaleString()}</span>
                                            <span>🍴 {repo.forks?.toLocaleString()}</span>
                                            {repo.language && <span>{repo.language}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {agentName === 'LEARNING_PATH_AGENT' && (
                    <div>
                        {output.phases && (
                            <div>
                                <strong>Learning Phases ({output.duration_weeks} weeks):</strong>
                                {output.phases.map((phase, idx) => (
                                    <div key={idx} className="glass-card-sm" style={{ marginTop: '0.75rem' }}>
                                        <h4 style={{ marginBottom: '0.5rem' }}>
                                            Phase {idx + 1}: {phase.name} ({phase.duration_weeks} weeks)
                                        </h4>
                                        <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                                            Topics: {phase.topics.join(', ')}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                        {output.resources && (
                            <div style={{ marginTop: '1rem' }}>
                                <strong>Resources:</strong>
                                <div style={{ marginTop: '0.5rem' }}>
                                    {output.resources.slice(0, 3).map((resource, idx) => (
                                        <div key={idx} style={{ marginBottom: '0.5rem' }}>
                                            <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                                {resource.name}
                                            </a>
                                            <span className="text-tertiary" style={{ marginLeft: '0.5rem', fontSize: '0.875rem' }}>
                                                ({resource.type} - {resource.cost})
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {agentName === 'COMPARISON_AGENT' && output.comparison && (
                    <div>
                        {output.comparison.student_recommendation && (
                            <div style={{
                                background: 'var(--success-gradient)',
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '1rem'
                            }}>
                                <strong>🎓 Student Recommendation:</strong>
                                <p style={{ marginTop: '0.5rem' }}>{output.comparison.student_recommendation}</p>
                            </div>
                        )}
                        {output.comparison.criteria && (
                            <div>
                                <strong>Comparison Criteria:</strong>
                                <div style={{ marginTop: '0.75rem', overflowX: 'auto' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead>
                                            <tr style={{ background: 'var(--bg-tertiary)' }}>
                                                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Criterion</th>
                                                <th style={{ padding: '0.75rem', textAlign: 'center' }}>{output.item1}</th>
                                                <th style={{ padding: '0.75rem', textAlign: 'center' }}>{output.item2}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(output.comparison.criteria).map(([criterion, scores], idx) => (
                                                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                                    <td style={{ padding: '0.75rem' }}>{criterion}</td>
                                                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                                        <span className={`score-badge ${getScoreClass(scores[output.item1.toLowerCase()] * 10)}`}>
                                                            {scores[output.item1.toLowerCase()]}/10
                                                        </span>
                                                    </td>
                                                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                                                        <span className={`score-badge ${getScoreClass(scores[output.item2.toLowerCase()] * 10)}`}>
                                                            {scores[output.item2.toLowerCase()]}/10
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AgentOutput;
