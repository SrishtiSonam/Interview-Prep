import React from 'react';
import { Trophy, Target, Clock, TrendingUp, Star, Award } from 'lucide-react';

const Dashboard = ({ user }) => {
  if (!user) {
    return (
      <div className="min-h-screen pt-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please log in to view your dashboard</h2>
          <p className="text-white/70">Track your progress and see detailed analytics of your performance</p>
        </div>
      </div>
    );
  }

  const mockStats = {
    totalPoints: 750,
    completedChallenges: 3,
    averageScore: 82,
    timeSpent: 240, // minutes
    achievements: [
      { id: 1, title: 'First Steps', description: 'Completed your first challenge', icon: '🏁', earned: true },
      { id: 2, title: 'Code Master', description: 'Solved 5 coding problems', icon: '💻', earned: true },
      { id: 3, title: 'Interview Ready', description: 'Completed technical interview', icon: '🎯', earned: true },
      { id: 4, title: 'Perfect Score', description: 'Score 100% on any test', icon: '⭐', earned: false },
    ],
    recentActivity: [
      { id: 1, type: 'Technical Interview', score: 85, date: '2024-01-15', points: 250 },
      { id: 2, type: 'Coding Round', score: 90, date: '2024-01-14', points: 200 },
      { id: 3, type: 'Aptitude Test', score: 78, date: '2024-01-13', points: 150 },
      { id: 4, type: 'Resume Checker', score: 82, date: '2024-01-12', points: 100 },
    ]
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome back, {user.name}!</h1>
          <p className="text-white/70 text-lg">Track your progress and continue your interview preparation journey</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-lg border border-cyan-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">{mockStats.totalPoints}</span>
            </div>
            <h3 className="text-white/80 font-medium">Total Points</h3>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">{mockStats.completedChallenges}/4</span>
            </div>
            <h3 className="text-white/80 font-medium">Challenges Complete</h3>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-lg border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold text-white">{mockStats.averageScore}%</span>
            </div>
            <h3 className="text-white/80 font-medium">Average Score</h3>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-lg border border-orange-500/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-8 w-8 text-orange-400" />
              <span className="text-2xl font-bold text-white">{Math.floor(mockStats.timeSpent / 60)}h {mockStats.timeSpent % 60}m</span>
            </div>
            <h3 className="text-white/80 font-medium">Time Practiced</h3>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {mockStats.recentActivity.map((activity) => (
                <div key={activity.id} className="bg-gray-900/50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-white font-medium">{activity.type}</h4>
                    <span className="text-cyan-400 font-semibold">+{activity.points} pts</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">{activity.date}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-medium ${
                        activity.score >= 90 ? 'text-green-400' :
                        activity.score >= 70 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {activity.score}%
                      </span>
                      <div className={`w-2 h-2 rounded-full ${
                        activity.score >= 90 ? 'bg-green-400' :
                        activity.score >= 70 ? 'bg-yellow-400' : 'bg-red-400'
                      }`}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Achievements</h3>
            <div className="space-y-4">
              {mockStats.achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`bg-gray-900/50 rounded-xl p-4 border ${
                    achievement.earned 
                      ? 'border-yellow-500/30 bg-yellow-500/10' 
                      : 'border-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`text-2xl ${achievement.earned ? 'grayscale-0' : 'grayscale'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${achievement.earned ? 'text-white' : 'text-white/50'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${achievement.earned ? 'text-white/70' : 'text-white/40'}`}>
                        {achievement.description}
                      </p>
                    </div>
                    {achievement.earned && (
                      <Award className="h-5 w-5 text-yellow-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Chart Placeholder */}
        <div className="mt-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white mb-6">Performance Trends</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-white/30 mx-auto mb-4" />
              <p className="text-white/60">Performance analytics coming soon!</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all">
            <span className="font-medium">Resume Checker</span>
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all">
            <span className="font-medium">Aptitude Test</span>
          </button>
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all">
            <span className="font-medium">Coding Practice</span>
          </button>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all">
            <span className="font-medium">Mock Interview</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;