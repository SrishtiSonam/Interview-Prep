import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import ResumeChecker from './pages/ResumeChecker';
import AptitudeTest from './pages/AptitudeTest';
import CodingRound from './pages/CodingRound';
import TechnicalInterview from './pages/TechnicalInterview';
import Dashboard from './pages/Dashboard';
import VoiceGreeting from './components/VoiceGreeting';

function App() {
  const [user, setUser] = useState(null);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('mockAiUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('mockAiUser', JSON.stringify(userData));
    setShowGreeting(true);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mockAiUser');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800 relative overflow-hidden transition-colors duration-300">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 dark:from-cyan-500/10 dark:to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-400/15 dark:from-purple-500/5 dark:to-pink-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <Router>
          <Navbar user={user} onLogout={handleLogout} />
          {showGreeting && user && (
            <VoiceGreeting 
              userName={user.name} 
              onComplete={() => setShowGreeting(false)} 
            />
          )}
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/resume-checker" element={<ResumeChecker user={user} />} />
            <Route path="/aptitude-test" element={<AptitudeTest user={user} />} />
            <Route path="/coding-round" element={<CodingRound user={user} />} />
            <Route path="/technical-interview" element={<TechnicalInterview user={user} />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;