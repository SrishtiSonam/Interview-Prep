import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, User, LogOut, Home, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-slate-700/50 sticky top-0 z-50 transition-colors duration-300 shadow-sm dark:shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Bot className="h-8 w-8 text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors duration-300" />
                <Sparkles className="h-3 w-3 text-amber-500 dark:text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent group-hover:from-cyan-700 group-hover:via-blue-700 group-hover:to-purple-700 dark:group-hover:from-cyan-300 dark:group-hover:via-blue-300 dark:group-hover:to-purple-300 transition-all duration-300">
                Mock AI
              </span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-400 transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-gray-100/70 dark:hover:bg-slate-800/50"
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </Link>
            
            <ThemeToggle />
            
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-2 text-gray-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-400 transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-gray-100/70 dark:hover:bg-slate-800/50"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user.name}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 hover:scale-105 px-3 py-2 rounded-lg hover:bg-gray-100/70 dark:hover:bg-slate-800/50"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-500 dark:to-blue-600 text-white px-6 py-2 rounded-xl hover:from-cyan-700 hover:to-blue-800 dark:hover:from-cyan-600 dark:hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;