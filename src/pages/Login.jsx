import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail } from 'lucide-react';
import PasswordInput from '../components/PasswordInput';
import { validatePassword } from '../utils/passwordValidation';

const Login = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    
    // Validate name for signup
    if (isSignUp && !formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = 'Please enter your password';
    } else if (isSignUp) {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors[0];
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Create user object
    const userData = {
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      loginTime: new Date().toISOString(),
      totalPoints: 0,
      completedChallenges: []
    };

    onLogin(userData);
    navigate('/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handlePasswordChange = (e) => {
    handleChange(e);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/95 dark:bg-gradient-to-br dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-lg border border-gray-200/80 dark:border-white/10 rounded-2xl p-8 shadow-2xl dark:shadow-none">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <User className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600 dark:text-white/60">
              {isSignUp ? 'Join Mock AI to track your progress' : 'Sign in to continue your journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div>
                <label className="block text-gray-800 dark:text-white/80 text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-gray-50 dark:bg-white/5 border ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-white/10'
                    } rounded-lg pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:border-cyan-600 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-gray-800 dark:text-white/80 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-gray-50 dark:bg-white/5 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300 dark:border-white/10'
                  } rounded-lg pl-10 pr-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:border-cyan-600 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-gray-800 dark:text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <PasswordInput
                value={formData.password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                showValidation={isSignUp}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-500 dark:to-purple-500 text-white py-3 rounded-lg hover:from-cyan-700 hover:to-purple-700 dark:hover:from-cyan-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-white/60">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrors({});
                  setFormData({ name: '', email: '', password: '' });
                }}
                className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium ml-2 transition-colors"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link 
              to="/"
              className="text-gray-500 dark:text-white/60 hover:text-gray-700 dark:hover:text-white/80 text-sm transition-colors"
            >
              Continue without account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;