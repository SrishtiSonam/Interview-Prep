import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Brain, 
  Code, 
  MessageSquare, 
  Trophy, 
  Star,
  ArrowRight,
  Zap,
  Target,
  Sparkles
} from 'lucide-react';

const Home = ({ user }) => {
  const features = [
    {
      id: 1,
      title: 'Resume ATS Checker',
      description: 'Analyze your resume against ATS systems and get personalized feedback for improvement.',
      icon: FileText,
      color: 'from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500',
      path: '/resume-checker',
      points: 100,
      gradient: 'from-blue-500/20 to-cyan-500/20 dark:from-blue-500/20 dark:to-cyan-500/20'
    },
    {
      id: 2,
      title: 'Aptitude Test',
      description: 'Practice with timed aptitude tests. Choose between 30 or 60 question formats.',
      icon: Brain,
      color: 'from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500',
      path: '/aptitude-test',
      points: 150,
      gradient: 'from-purple-500/20 to-pink-500/20 dark:from-purple-500/20 dark:to-pink-500/20'
    },
    {
      id: 3,
      title: 'Coding Round',
      description: 'Practice coding problems with our integrated compiler and instant feedback.',
      icon: Code,
      color: 'from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500',
      path: '/coding-round',
      points: 200,
      gradient: 'from-green-500/20 to-emerald-500/20 dark:from-green-500/20 dark:to-emerald-500/20'
    },
    {
      id: 4,
      title: 'Technical Interview',
      description: 'AI-powered mock interviews tailored to your tech stack and experience level.',
      icon: MessageSquare,
      color: 'from-orange-600 to-red-600 dark:from-orange-500 dark:to-red-500',
      path: '/technical-interview',
      points: 250,
      gradient: 'from-orange-500/20 to-red-500/20 dark:from-orange-500/20 dark:to-red-500/20'
    }
  ];

  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-300/50 dark:border-slate-600/50 rounded-full px-6 py-3 mb-6 shadow-sm dark:shadow-none">
                <Sparkles className="h-5 w-5 text-amber-500 dark:text-yellow-400 animate-pulse" />
                <span className="text-gray-700 dark:text-slate-300 font-medium">AI-Powered Interview Preparation</span>
                <Sparkles className="h-5 w-5 text-amber-500 dark:text-yellow-400 animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 relative">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent animate-pulse">
                Mock AI
              </span>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400 dark:bg-yellow-400 rounded-full animate-bounce opacity-80"></div>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 dark:text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Master your interview skills with AI-powered practice sessions. 
              From resume optimization to technical interviews - we've got you covered.
            </p>
            
            {user && (
              <div className="bg-white/90 dark:bg-gradient-to-r dark:from-slate-800/60 dark:to-slate-700/60 backdrop-blur-lg border border-gray-200/80 dark:border-slate-600/50 rounded-2xl p-6 max-w-md mx-auto mb-8 transform hover:scale-105 transition-all duration-300 shadow-lg dark:shadow-none">
                <div className="flex items-center justify-center space-x-3 mb-2">
                  <Trophy className="h-6 w-6 text-amber-500 dark:text-yellow-400 animate-pulse" />
                  <span className="text-gray-900 dark:text-white font-semibold text-lg">
                    Welcome back, {user.name}!
                  </span>
                </div>
                <p className="text-gray-600 dark:text-slate-400 text-sm">
                  Continue your interview preparation journey
                </p>
                <div className="mt-3 flex justify-center">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-pulse" style={{animationDelay: `${i * 0.2}s`}}></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Target className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Complete Interview Preparation
            </h2>
          </div>
          <p className="text-gray-600 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Each feature is designed to enhance specific skills needed for successful interviews.
            Complete all levels to become interview-ready!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Link
                key={feature.id}
                to={feature.path}
                className="group relative transform hover:scale-105 transition-all duration-500"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`bg-white/90 dark:bg-gradient-to-br dark:from-slate-800/60 dark:to-slate-900/60 backdrop-blur-lg border border-gray-200/80 dark:border-slate-600/50 rounded-3xl p-8 hover:border-gray-300/80 dark:hover:border-slate-500/70 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-2xl relative overflow-hidden shadow-lg dark:shadow-none`}>
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-500 dark:bg-purple-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                        style={{backgroundImage: `linear-gradient(135deg, ${feature.color.split(' ')[1]}, ${feature.color.split(' ')[3]})`}}>
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-slate-300 text-lg mb-6 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-amber-500 dark:text-yellow-400 group-hover:animate-spin" />
                        <span className="text-amber-600 dark:text-yellow-400 font-semibold">
                          {feature.points} Points
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-500 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-all duration-300">
                        <span className="font-medium">Start Challenge</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/90 dark:bg-gradient-to-r dark:from-slate-800/40 dark:to-slate-900/40 backdrop-blur-lg border border-gray-200/80 dark:border-slate-600/50 rounded-3xl p-8 max-w-4xl mx-auto relative overflow-hidden group hover:border-gray-300/80 dark:hover:border-slate-500/70 transition-all duration-500 shadow-lg dark:shadow-none">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 dark:from-cyan-500/5 dark:to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 dark:from-yellow-400 dark:to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-purple-600 dark:group-hover:from-cyan-400 dark:group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                Ready to Ace Your Next Interview?
              </h3>
              
              <p className="text-gray-600 dark:text-slate-300 text-lg mb-8 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-slate-200 transition-colors duration-300">
                Join thousands of candidates who have successfully improved their interview skills with Mock AI
              </p>
              
              {!user && (
                <Link 
                  to="/login"
                  className="inline-flex items-center space-x-3 bg-gradient-to-r from-cyan-600 to-blue-700 dark:from-cyan-500 dark:to-blue-600 text-white px-8 py-4 rounded-2xl hover:from-cyan-700 hover:to-blue-800 dark:hover:from-cyan-600 dark:hover:to-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 font-semibold text-lg group"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  <Sparkles className="h-5 w-5 animate-pulse" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;