import React, { useState } from 'react';
import { MessageSquare, Mic, MicOff, Settings, Send } from 'lucide-react';

const TechnicalInterview = ({ user }) => {
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewSettings, setInterviewSettings] = useState({
    techStack: '',
    numQuestions: 5,
    level: 'intermediate'
  });
  const [messages, setMessages] = useState([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const techStacks = [
    'Frontend (React, Vue, Angular)',
    'Backend (Node.js, Python, Java)',
    'Full Stack (MEAN/MERN)',
    'Mobile (React Native, Flutter)',
    'DevOps (AWS, Docker, Kubernetes)',
    'Data Science (Python, R, ML)',
    'System Design'
  ];

  const levels = [
    { value: 'basic', label: 'Basic (0-2 years)' },
    { value: 'intermediate', label: 'Intermediate (2-5 years)' },
    { value: 'advanced', label: 'Advanced (5+ years)' }
  ];

  const startInterview = () => {
    if (!interviewSettings.techStack) {
      alert('Please select a tech stack');
      return;
    }

    setInterviewStarted(true);
    const welcomeMessage = {
      id: 1,
      sender: 'ai',
      content: `Hello! I'm your AI interviewer today. We'll be conducting a ${interviewSettings.level} level technical interview focusing on ${interviewSettings.techStack}. I'll ask you ${interviewSettings.numQuestions} questions. Let's start with the first question: Can you tell me about yourself and your experience with ${interviewSettings.techStack}?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const sendMessage = () => {
    if (!currentInput.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: currentInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(messages.length + 1);
      setMessages(prev => [...prev, aiResponse]);
      
      // Check if interview should end
      if (messages.length >= interviewSettings.numQuestions * 2) {
        setTimeout(() => {
          completeInterview();
        }, 2000);
      }
    }, 1500);
  };

  const generateAIResponse = (questionNumber) => {
    const responses = [
      "That's interesting! Can you explain how you would optimize the performance of a React application?",
      "Good answer. Now, let's talk about state management. What are the differences between useState and useReducer?",
      "Excellent! Can you walk me through how you would design a RESTful API for a social media application?",
      "Great explanation. What are some security considerations you would implement in a web application?",
      "Perfect! For our final question, how would you handle error boundaries in React and why are they important?"
    ];

    const questionIndex = Math.min(Math.floor(questionNumber / 2), responses.length - 1);
    
    return {
      id: questionNumber + 1,
      sender: 'ai',
      content: responses[questionIndex] || "Thank you for your responses. That concludes our technical interview!",
      timestamp: new Date()
    };
  };

  const completeInterview = () => {
    setInterviewComplete(true);
    setFeedback({
      overallScore: 85,
      technicalKnowledge: 80,
      communicationSkills: 90,
      problemSolving: 85,
      strengths: [
        'Clear communication and explanation of concepts',
        'Strong understanding of React fundamentals',
        'Good problem-solving approach'
      ],
      improvements: [
        'Could elaborate more on performance optimization techniques',
        'Consider discussing more real-world examples',
        'Practice explaining complex concepts in simpler terms'
      ],
      recommendation: 'Strong candidate with good technical knowledge. Recommended to proceed to the next round.'
    });
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real app, implement Web Speech API here
  };

  if (interviewComplete && feedback) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Interview Complete!</h2>
              <p className="text-white/70">Here's your detailed feedback and performance analysis</p>
            </div>

            {/* Overall Score */}
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-cyan-400 mb-2">{feedback.overallScore}%</div>
              <p className="text-white/80">Overall Interview Score</p>
            </div>

            {/* Detailed Scores */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900/50 rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">{feedback.technicalKnowledge}%</div>
                <p className="text-white/80">Technical Knowledge</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-2">{feedback.communicationSkills}%</div>
                <p className="text-white/80">Communication Skills</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-6 text-center">
                <div className="text-2xl font-bold text-green-400 mb-2">{feedback.problemSolving}%</div>
                <p className="text-white/80">Problem Solving</p>
              </div>
            </div>

            {/* Strengths and Improvements */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-4">Strengths</h3>
                <ul className="space-y-2">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-white/80">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-400 mb-4">Areas for Improvement</h3>
                <ul className="space-y-2">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-white/80">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendation */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-bold text-white mb-3">Interviewer Recommendation</h3>
              <p className="text-white/80">{feedback.recommendation}</p>
            </div>

            {user && (
              <div className="text-center bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg border border-white/10 rounded-xl p-4 mb-6">
                <p className="text-white/80 mb-2">Challenge Completed!</p>
                <p className="text-cyan-400 font-semibold">+250 Points Earned</p>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => {
                  setInterviewStarted(false);
                  setInterviewComplete(false);
                  setMessages([]);
                  setFeedback(null);
                }}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all"
              >
                Start New Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (interviewStarted) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Technical Interview in Progress</h2>
                <p className="text-white/70">{interviewSettings.techStack} • {interviewSettings.level} level</p>
              </div>
              <div className="text-white/70">
                Question {Math.ceil(messages.length / 2)} of {interviewSettings.numQuestions}
              </div>
            </div>

            {/* Chat Messages */}
            <div className="bg-gray-900/50 rounded-xl p-4 h-96 overflow-y-auto mb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`inline-block max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex space-x-4">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                placeholder="Type your answer here..."
              />
              <button
                onClick={toggleVoiceInput}
                className={`p-3 rounded-lg transition-all ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isListening ? (
                  <MicOff className="h-5 w-5 text-white" />
                ) : (
                  <Mic className="h-5 w-5 text-white" />
                )}
              </button>
              <button
                onClick={sendMessage}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Technical Interview</h1>
          <p className="text-white/70 text-lg">
            AI-powered mock interview tailored to your tech stack and experience level
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <div className="flex items-center mb-6">
            <Settings className="h-6 w-6 text-cyan-400 mr-3" />
            <h3 className="text-2xl font-bold text-white">Interview Settings</h3>
          </div>

          <div className="space-y-6">
            {/* Tech Stack Selection */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-3">
                Select your tech stack focus area:
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {techStacks.map((stack) => (
                  <button
                    key={stack}
                    onClick={() => setInterviewSettings({...interviewSettings, techStack: stack})}
                    className={`text-left p-4 rounded-lg border transition-all ${
                      interviewSettings.techStack === stack
                        ? 'border-cyan-500 bg-cyan-500/20 text-white'
                        : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20'
                    }`}
                  >
                    {stack}
                  </button>
                ))}
              </div>
            </div>

            {/* Number of Questions */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-3">
                Number of questions:
              </label>
              <select
                value={interviewSettings.numQuestions}
                onChange={(e) => setInterviewSettings({...interviewSettings, numQuestions: parseInt(e.target.value)})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white"
              >
                <option value={3}>3 Questions (15-20 minutes)</option>
                <option value={5}>5 Questions (25-30 minutes)</option>
                <option value={8}>8 Questions (40-45 minutes)</option>
                <option value={10}>10 Questions (50-60 minutes)</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label className="block text-white/80 text-sm font-medium mb-3">
                Experience level:
              </label>
              <div className="grid md:grid-cols-3 gap-3">
                {levels.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setInterviewSettings({...interviewSettings, level: level.value})}
                    className={`text-center p-4 rounded-lg border transition-all ${
                      interviewSettings.level === level.value
                        ? 'border-purple-500 bg-purple-500/20 text-white'
                        : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20'
                    }`}
                  >
                    <div className="font-medium">{level.value.charAt(0).toUpperCase() + level.value.slice(1)}</div>
                    <div className="text-sm text-white/60">{level.label.split('(')[1]?.replace(')', '')}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={startInterview}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all font-semibold text-lg"
            >
              Start Technical Interview
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
          <h3 className="text-xl font-bold text-white mb-4">Interview Instructions</h3>
          <div className="grid md:grid-cols-2 gap-6 text-white/80">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">During the Interview:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Answer questions clearly and concisely</li>
                <li>• Use specific examples from your experience</li>
                <li>• Ask clarifying questions if needed</li>
                <li>• Think out loud to show your thought process</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Tips for Success:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Stay calm and confident</li>
                <li>• Explain your reasoning step by step</li>
                <li>• Discuss trade-offs and alternatives</li>
                <li>• Be honest about what you don't know</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalInterview;