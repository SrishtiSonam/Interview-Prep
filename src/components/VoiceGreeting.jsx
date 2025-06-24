import React, { useEffect, useState } from 'react';
import { Volume2, X, Zap } from 'lucide-react';

const VoiceGreeting = ({ userName, onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [animationPhase, setAnimationPhase] = useState('entering');

  useEffect(() => {
    const greetingText = `${userName}, access granted. Welcome to Mock AI interview platform.`;
    
    setAnimationPhase('speaking');
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(greetingText);
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setAnimationPhase('completing');
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500);
        }, 2000);
      };
      
      speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => {
        setAnimationPhase('completing');
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 500);
        }, 1000);
      }, 3000);
    }
  }, [userName, onComplete]);

  const handleClose = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setAnimationPhase('exiting');
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300);
    }, 200);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-50 animate-fadeIn">
      <div className={`bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-slate-600/50 max-w-md mx-4 relative shadow-2xl transform transition-all duration-500 ${
        animationPhase === 'entering' ? 'scale-95 opacity-0' : 
        animationPhase === 'speaking' ? 'scale-100 opacity-100' :
        animationPhase === 'completing' ? 'scale-105 opacity-100' : 'scale-95 opacity-0'
      }`}>
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-slate-700/50"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="text-center">
          <div className="relative w-20 h-20 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-lg shadow-cyan-500/30">
            <Volume2 className="h-10 w-10 text-white animate-bounce" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-ping opacity-20"></div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
              <h2 className="text-2xl font-bold text-white">Access Granted</h2>
              <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
            </div>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto animate-pulse"></div>
          </div>
          
          <p className="text-cyan-400 text-xl font-semibold mb-2">Welcome, {userName}!</p>
          <p className="text-slate-300 text-sm mb-6 leading-relaxed">
            Your session has been authenticated.<br />
            Preparing your personalized experience...
          </p>
          
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-bounce"
                  style={{animationDelay: `${i * 0.1}s`}}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceGreeting;