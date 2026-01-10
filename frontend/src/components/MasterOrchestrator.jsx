import React from 'react';

function MasterOrchestrator({ response }) {
    // Convert markdown-like text to HTML
    const renderMarkdown = (text) => {
        // Split by lines
        const lines = text.split('\n');
        const elements = [];
        let inList = false;

        lines.forEach((line, idx) => {
            // Headers
            if (line.startsWith('## ')) {
                elements.push(<h2 key={idx} className="gradient-text" style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>{line.replace('## ', '')}</h2>);
            } else if (line.startsWith('### ')) {
                elements.push(<h3 key={idx} style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>{line.replace('### ', '')}</h3>);
            }
            // List items
            else if (line.trim().startsWith('-') || line.trim().match(/^\d+\./)) {
                if (!inList) {
                    inList = true;
                }
                const content = line.replace(/^[-*]\s*/, '').replace(/^\d+\.\s*/, '');
                elements.push(
                    <li key={idx} className="text-secondary" style={{ marginBottom: '0.5rem' }}>
                        {content}
                    </li>
                );
            }
            // Bold text
            else if (line.includes('**')) {
                const parts = line.split('**');
                const formatted = parts.map((part, i) =>
                    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                );
                elements.push(<p key={idx} className="text-secondary">{formatted}</p>);
            }
            // Regular text
            else if (line.trim()) {
                elements.push(<p key={idx} className="text-secondary">{line}</p>);
            }
            // Empty line
            else {
                if (inList) {
                    inList = false;
                }
            }
        });

        return elements;
    };

    return (
        <div className="glass-card" style={{
            background: 'var(--primary-gradient)',
            padding: '2rem',
            marginTop: '2rem',
            animation: 'slideIn 0.5s ease forwards'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{
                    width: '64px',
                    height: '64px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                }}>
                    🤖
                </div>
                <div>
                    <h2 style={{ margin: 0 }}>MASTER_ORCHESTRATOR</h2>
                    <p style={{ margin: 0, opacity: 0.9 }}>Final Response</p>
                </div>
            </div>

            <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                backdropFilter: 'blur(8px)'
            }}>
                {renderMarkdown(response)}
            </div>
        </div>
    );
}

export default MasterOrchestrator;
