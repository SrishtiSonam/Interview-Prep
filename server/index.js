const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running!' });
});

// Resume upload and analysis
app.post('/api/resume/analyze', upload.single('resume'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Simulate resume analysis
  setTimeout(() => {
    const analysis = {
      score: Math.floor(Math.random() * 30) + 70, // 70-100
      strengths: [
        'Clear contact information',
        'Relevant work experience',
        'Technical skills section',
        'Proper formatting'
      ],
      improvements: [
        'Add more quantifiable achievements',
        'Include relevant keywords for ATS',
        'Optimize section ordering',
        'Add a professional summary'
      ],
      keywords: {
        found: ['JavaScript', 'React', 'Node.js', 'Git'],
        missing: ['AWS', 'Docker', 'CI/CD', 'Agile']
      },
      atsCompatibility: Math.floor(Math.random() * 20) + 80 // 80-100
    };

    res.json(analysis);
  }, 2000);
});

// Aptitude test questions
app.get('/api/aptitude/questions', (req, res) => {
  const { count = 30 } = req.query;
  
  // Sample questions - in production, fetch from database
  const questions = [
    {
      id: 1,
      question: "If a train travels 120 km in 2 hours, what is its average speed?",
      options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
      correct: 1,
      category: "quantitative"
    },
    {
      id: 2,
      question: "Which number comes next in the sequence: 2, 6, 12, 20, 30, ?",
      options: ["40", "42", "44", "46"],
      correct: 1,
      category: "logical"
    },
    // Add more questions...
  ];

  // Randomly select questions
  const selectedQuestions = questions
    .sort(() => 0.5 - Math.random())
    .slice(0, parseInt(count));

  res.json(selectedQuestions);
});

// Coding problems
app.get('/api/coding/problems', (req, res) => {
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
      starterCode: `function twoSum(nums, target) {\n    // Write your solution here\n    \n}`,
      testCases: [
        { input: [[2,7,11,15], 9], expected: [0,1] },
        { input: [[3,2,4], 6], expected: [1,2] },
        { input: [[3,3], 6], expected: [0,1] }
      ]
    },
    // Add more problems...
  ];

  res.json(problems);
});

// Code execution
app.post('/api/coding/execute', (req, res) => {
  const { code, testCases } = req.body;
  
  // Simulate code execution
  setTimeout(() => {
    const results = testCases.map((testCase, index) => ({
      case: index + 1,
      input: testCase.input,
      expected: testCase.expected,
      actual: testCase.expected, // Simulate correct answer
      passed: true
    }));

    res.json({ results });
  }, 1000);
});

// Interview feedback
app.post('/api/interview/feedback', (req, res) => {
  const { answers, settings } = req.body;
  
  // Simulate AI analysis
  setTimeout(() => {
    const feedback = {
      overallScore: Math.floor(Math.random() * 20) + 80, // 80-100
      technicalKnowledge: Math.floor(Math.random() * 20) + 75,
      communicationSkills: Math.floor(Math.random() * 20) + 85,
      problemSolving: Math.floor(Math.random() * 20) + 80,
      strengths: [
        'Clear communication and explanation of concepts',
        'Strong understanding of core technologies',
        'Good problem-solving approach'
      ],
      improvements: [
        'Could elaborate more on performance optimization',
        'Consider discussing more real-world examples',
        'Practice explaining complex concepts simply'
      ],
      recommendation: 'Strong candidate with good technical knowledge. Recommended to proceed to the next round.'
    };

    res.json(feedback);
  }, 3000);
});

// User progress tracking
app.post('/api/user/progress', (req, res) => {
  const { userId, activity, score, points } = req.body;
  
  // In production, save to database
  res.json({ 
    success: true, 
    message: 'Progress saved successfully',
    totalPoints: points
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});