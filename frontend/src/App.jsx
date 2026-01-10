import { useState } from 'react';
import './index.css';
import HomePage from './pages/HomePage';
import ResumeAnalysisPage from './pages/ResumeAnalysisPage';
import TechnicalResearchPage from './pages/TechnicalResearchPage';
import CareerGuidancePage from './pages/CareerGuidancePage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'resume':
        return <ResumeAnalysisPage onNavigate={setCurrentPage} />;
      case 'research':
        return <TechnicalResearchPage onNavigate={setCurrentPage} />;
      case 'career':
        return <CareerGuidancePage onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar glass-card" style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        margin: '1rem auto',
        maxWidth: '1200px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'var(--primary-gradient)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            🤖
          </div>
          <h2 className="gradient-text" style={{ margin: 0 }}>ScholarAI</h2>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={currentPage === 'home' ? 'btn btn-primary' : 'btn btn-outline'}
            onClick={() => setCurrentPage('home')}
          >
            Home
          </button>
          <button
            className={currentPage === 'resume' ? 'btn btn-primary' : 'btn btn-outline'}
            onClick={() => setCurrentPage('resume')}
          >
            Resume Analysis
          </button>
          <button
            className={currentPage === 'research' ? 'btn btn-primary' : 'btn btn-outline'}
            onClick={() => setCurrentPage('research')}
          >
            Research
          </button>
          <button
            className={currentPage === 'career' ? 'btn btn-primary' : 'btn btn-outline'}
            onClick={() => setCurrentPage('career')}
          >
            Career
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        marginTop: '4rem',
        color: 'var(--text-tertiary)'
      }}>
        <p>ScholarAI - Multi-Agent Autonomous AI System</p>
        <p style={{ fontSize: '0.875rem' }}>Built with React + FastAPI | Free & Local-First</p>
      </footer>
    </div>
  );
}

export default App;
