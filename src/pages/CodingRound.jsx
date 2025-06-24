import React, { useState } from 'react';
import { Play, Code, CheckCircle, X, Clock } from 'lucide-react';

const CodingRound = ({ user }) => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const problems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        }
      ],
      starterCode: `function twoSum(nums, target) {
    // Write your solution here
    
}`,
      testCases: [
        { input: [[2,7,11,15], 9], expected: [0,1] },
        { input: [[3,2,4], 6], expected: [1,2] },
        { input: [[3,3], 6], expected: [0,1] }
      ]
    },
    {
      id: 2,
      title: "Reverse String",
      difficulty: "Easy",
      description: "Write a function that reverses a string. The input string is given as an array of characters s.",
      examples: [
        {
          input: 's = ["h","e","l","l","o"]',
          output: '["o","l","l","e","h"]',
          explanation: ""
        }
      ],
      starterCode: `function reverseString(s) {
    // Write your solution here
    
}`,
      testCases: [
        { input: [["h","e","l","l","o"]], expected: ["o","l","l","e","h"] },
        { input: [["H","a","n","n","a","h"]], expected: ["h","a","n","n","a","H"] }
      ]
    },
    {
      id: 3,
      title: "Palindrome Number",
      difficulty: "Easy",
      description: "Given an integer x, return true if x is palindrome integer. An integer is a palindrome when it reads the same backward as forward.",
      examples: [
        {
          input: "x = 121",
          output: "true",
          explanation: "121 reads as 121 from left to right and from right to left."
        }
      ],
      starterCode: `function isPalindrome(x) {
    // Write your solution here
    
}`,
      testCases: [
        { input: [121], expected: true },
        { input: [-121], expected: false },
        { input: [10], expected: false }
      ]
    }
  ];

  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    setTestResults(null);

    setTimeout(() => {
      try {
        // Create a function from the code
        const wrappedCode = `
          ${code}
          
          // Test the function
          const testResults = [];
          ${selectedProblem.testCases.map((testCase, index) => `
            try {
              const result = ${selectedProblem.title.replace(/\s+/g, '').charAt(0).toLowerCase() + selectedProblem.title.replace(/\s+/g, '').slice(1)}(${testCase.input.map(input => JSON.stringify(input)).join(', ')});
              const expected = ${JSON.stringify(testCase.expected)};
              const passed = JSON.stringify(result) === JSON.stringify(expected);
              testResults.push({
                case: ${index + 1},
                input: ${JSON.stringify(testCase.input)},
                expected: expected,
                actual: result,
                passed: passed
              });
            } catch (error) {
              testResults.push({
                case: ${index + 1},
                input: ${JSON.stringify(testCase.input)},
                expected: ${JSON.stringify(testCase.expected)},
                actual: 'Error: ' + error.message,
                passed: false
              });
            }
          `).join('')}
          
          return testResults;
        `;

        const func = new Function(wrappedCode);
        const results = func();
        setTestResults(results);
        
        const passedTests = results.filter(r => r.passed).length;
        setOutput(`Executed successfully!\n${passedTests}/${results.length} test cases passed.`);
      } catch (error) {
        setOutput(`Error: ${error.message}`);
      }
      
      setIsRunning(false);
    }, 1000);
  };

  const selectProblem = (problem) => {
    setSelectedProblem(problem);
    setCode(problem.starterCode);
    setOutput('');
    setTestResults(null);
  };

  if (!selectedProblem) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Coding Round</h1>
            <p className="text-white/70 text-lg">
              Practice coding problems with our integrated compiler
            </p>
          </div>

          <div className="grid gap-6">
            {problems.map((problem) => (
              <div
                key={problem.id}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all cursor-pointer"
                onClick={() => selectProblem(problem)}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white">{problem.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    problem.difficulty === 'Easy' 
                      ? 'bg-green-500/20 text-green-400'
                      : problem.difficulty === 'Medium'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {problem.difficulty}
                  </span>
                </div>
                
                <p className="text-white/80 mb-4">{problem.description}</p>
                
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Example:</h4>
                  <div className="text-sm text-white/70">
                    <div><strong>Input:</strong> {problem.examples[0].input}</div>
                    <div><strong>Output:</strong> {problem.examples[0].output}</div>
                    {problem.examples[0].explanation && (
                      <div><strong>Explanation:</strong> {problem.examples[0].explanation}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">{selectedProblem.title}</h1>
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mt-2 ${
              selectedProblem.difficulty === 'Easy' 
                ? 'bg-green-500/20 text-green-400'
                : selectedProblem.difficulty === 'Medium'
                ? 'bg-yellow-500/20 text-yellow-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {selectedProblem.difficulty}
            </span>
          </div>
          <button
            onClick={() => setSelectedProblem(null)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all"
          >
            Back to Problems
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Problem Description</h3>
            <p className="text-white/80 mb-6">{selectedProblem.description}</p>
            
            <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
              <h4 className="text-white font-medium mb-3">Example:</h4>
              <div className="text-sm text-white/70 space-y-1">
                <div><strong>Input:</strong> {selectedProblem.examples[0].input}</div>
                <div><strong>Output:</strong> {selectedProblem.examples[0].output}</div>
                {selectedProblem.examples[0].explanation && (
                  <div><strong>Explanation:</strong> {selectedProblem.examples[0].explanation}</div>
                )}
              </div>
            </div>

            {/* Test Results */}
            {testResults && (
              <div>
                <h4 className="text-white font-medium mb-3">Test Results:</h4>
                <div className="space-y-2">
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border ${
                        result.passed 
                          ? 'border-green-500/30 bg-green-500/10' 
                          : 'border-red-500/30 bg-red-500/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">Test Case {result.case}</span>
                        {result.passed ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <X className="h-5 w-5 text-red-400" />
                        )}
                      </div>
                      <div className="text-sm text-white/70">
                        <div>Input: {JSON.stringify(result.input)}</div>
                        <div>Expected: {JSON.stringify(result.expected)}</div>
                        <div>Actual: {JSON.stringify(result.actual)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Code Editor</h3>
              <button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50"
              >
                {isRunning ? (
                  <Clock className="h-4 w-4 animate-spin" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
                <span>{isRunning ? 'Running...' : 'Run Code'}</span>
              </button>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 bg-gray-900 text-white font-mono text-sm p-4 rounded-lg border border-white/10 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 resize-none"
              placeholder="Write your code here..."
            />

            {/* Output */}
            <div className="mt-4">
              <h4 className="text-white font-medium mb-2">Output:</h4>
              <div className="bg-gray-900 rounded-lg p-4 min-h-[100px] text-white/80 font-mono text-sm whitespace-pre-wrap">
                {output || 'Run your code to see the output...'}
              </div>
            </div>

            {testResults && testResults.every(r => r.passed) && user && (
              <div className="mt-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg border border-white/10 rounded-xl p-4 text-center">
                <p className="text-white/80 mb-2">Challenge Completed!</p>
                <p className="text-cyan-400 font-semibold">+200 Points Earned</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingRound;