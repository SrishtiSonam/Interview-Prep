import React, { useState } from 'react';
import { Eye, EyeOff, Lock, CheckCircle, XCircle } from 'lucide-react';
import { validatePassword, getPasswordStrength } from '../utils/passwordValidation';

const PasswordInput = ({ value, onChange, placeholder = "Enter your password", showValidation = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  
  const validation = validatePassword(value);
  const strength = getPasswordStrength(value);

  const requirements = [
    { text: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
    { text: 'One uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
    { text: 'One lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
    { text: 'One number', test: (pwd) => /\d/.test(pwd) },
    { text: 'One special character', test: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd) }
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-500" />
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onFocus={() => setShowRequirements(true)}
          onBlur={() => setShowRequirements(false)}
          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-lg pl-10 pr-12 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:border-cyan-600 dark:focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          placeholder={placeholder}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white/60 transition-colors"
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>

      {showValidation && value && (
        <div className="space-y-2">
          {/* Password Strength Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700 dark:text-gray-400">Password Strength</span>
              <span className={`font-medium capitalize ${
                strength.color === 'red' ? 'text-red-600 dark:text-red-500' :
                strength.color === 'orange' ? 'text-orange-600 dark:text-orange-500' :
                strength.color === 'yellow' ? 'text-amber-600 dark:text-yellow-500' :
                'text-green-600 dark:text-green-500'
              }`}>
                {strength.level}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  strength.color === 'red' ? 'bg-red-500' :
                  strength.color === 'orange' ? 'bg-orange-500' :
                  strength.color === 'yellow' ? 'bg-amber-500 dark:bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${strength.percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Requirements List */}
          {(showRequirements || !validation.isValid) && (
            <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-3 space-y-2 border border-gray-200 dark:border-gray-700/50">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-300">Password Requirements:</p>
              <div className="space-y-1">
                {requirements.map((req, index) => {
                  const isValid = req.test(value);
                  return (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      {isValid ? (
                        <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600 dark:text-red-500" />
                      )}
                      <span className={isValid ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}>
                        {req.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;