import React, { useState, useEffect } from 'react';
import { Clock, Brain, CheckCircle, X } from 'lucide-react';

const AptitudeTest = ({ user }) => {
  const [testMode, setTestMode] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTestActive, setIsTestActive] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);

  // Sample questions (in real app, these would come from API)
  const questions = [
    {
      id: 1,
      question: "If a train travels 120 km in 2 hours, what is its average speed?",
      options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
      correct: 1
    },
    {
      id: 2,
      question: "Which number comes next in the sequence: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "46"],
      correct: 1
    },
    {
      id: 3,
      question: "If all Roses are Flowers and some Flowers are Red, then:",
      options: [
        "All Roses are Red",
        "Some Roses may be Red", 
        "No Roses are Red",
        "All Red things are Roses"
      ],
      correct: 1
    },
    {
      id: 4,
      question: "A book costs $12. If the price increases by 25%, what is the new price?",
      options: ["$14", "$15", "$16", "$18"],
      correct: 1
    },
    {
      id: 5,
      question: "Complete the analogy: Book is to Reading as Fork is to ?",
      options: ["Kitchen", "Eating", "Cooking", "Plate"],
      correct: 1
    }
  ];

  const testModes = [
    {
      id: '30-30',
      title: '30 Questions in 30 Minutes',
      description: 'Quick assessment format',
      questions: 30,
      time: 30 * 60,
      icon: '⚡'
    },
    {
      id: '60-60',
      title: '60 Questions in 60 Minutes',
      description: 'Comprehensive assessment',
      questions: 60,
      time: 60 * 60,
      icon: '🎯'
    }
  ];

  useEffect(() => {
    let timer;
    if (isTestActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            completeTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTestActive, timeLeft]);

  const startTest = (mode) => {
    setTestMode(mode);
    setTimeLeft(mode.time);
    setIsTestActive(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setTestCompleted(false);
  };

  const selectAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      completeTest();
    }
  };

  const completeTest = () => {
    setIsTestActive(false);
    setTestCompleted(true);
    
    // Calculate score
    let correctAnswers = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index]?.correct) {
        correctAnswers++;
      }
    });
    setScore(Math.round((correctAnswers / questions.length) * 100));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (testCompleted) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Test Completed!</h2>
            <div className="text-6xl font-bold text-cyan-400 mb-4">{score}%</div>
            <p className="text-white/70 text-lg mb-8">
              You answered {answers.filter((answer, index) => answer === questions[index]?.correct).length} out of {questions.length} questions correctly
            </p>
            
            {user && (
              <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg border border-white/10 rounded-xl p-4 mb-6">
                <p className="text-white/80 mb-2">Challenge Completed!</p>
                <p className="text-cyan-400 font-semibold">+150 Points Earned</p>
              </div>
            )}
            
            <button
              onClick={() => {
                setTestMode(null);
                setTestCompleted(false);
                setCurrentQuestion(0);
                setAnswers([]);
              }}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all"
            >
              Take Another Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isTestActive) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Timer and Progress */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Clock className="h-6 w-6 text-cyan-400" />
                <span className="text-2xl font-bold text-white">{formatTime(timeLeft)}</span>
              </div>
              <div className="text-white/70">
                Question {currentQuestion + 1} of {questions.length}
              </div>
            </div>
            <div className="mt-4 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-8">
              {questions[currentQuestion]?.question}
            </h2>
            
            <div className="space-y-4 mb-8">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    answers[currentQuestion] === index
                      ? 'border-cyan-500 bg-cyan-500/20 text-white'
                      : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={nextQuestion}
                disabled={answers[currentQuestion] === undefined}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question'}
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
          <h1 className="text-4xl font-bold text-white mb-4">Aptitude Test</h1>
          <p className="text-white/70 text-lg">
            Test your logical reasoning, quantitative aptitude, and verbal ability
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testModes.map((mode) => (
            <div
              key={mode.id}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all"
            >
              <div className="text-center">
                <div className="text-4xl mb-4">{mode.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{mode.title}</h3>
                <p className="text-white/70 mb-6">{mode.description}</p>
                
                <div className="space-y-2 mb-8">
                  <div className="flex justify-between text-white/80">
                    <span>Questions:</span>
                    <span>{mode.questions}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Time Limit:</span>
                    <span>{mode.time / 60} minutes</span>
                  </div>
                </div>
                
                <button
                  onClick={() => startTest(mode)}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all font-semibold"
                >
                  Start Test
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Test Instructions</h3>
          <div className="grid md:grid-cols-2 gap-6 text-white/80">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Before You Start:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Ensure stable internet connection</li>
                <li>• Find a quiet environment</li>
                <li>• Have pen and paper ready</li>
                <li>• Close unnecessary browser tabs</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">During the Test:</h4>
              <ul className="space-y-2 text-sm">
                <li>• Read each question carefully</li>
                <li>• Manage your time wisely</li>
                <li>• You can navigate between questions</li>
                <li>• Auto-submit when time expires</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptitudeTest;