import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';

const ResumeChecker = ({ user }) => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
      setAnalysis(null);
    } else {
      alert('Please upload a PDF file');
    }
  };

  const analyzeResume = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setAnalysis({
        score: 78,
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
        atsCompatibility: 85
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Resume ATS Checker</h1>
          <p className="text-white/70 text-lg">
            Upload your resume and get detailed feedback on ATS compatibility and improvements
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8 mb-8">
          <div className="text-center">
            {!file ? (
              <div>
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Upload Your Resume</h3>
                <p className="text-white/60 mb-6">Supported format: PDF</p>
                <label className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all cursor-pointer">
                  <Upload className="h-5 w-5 mr-2" />
                  Choose File
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <div>
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{file.name}</h3>
                <p className="text-white/60 mb-6">File size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                <button
                  onClick={analyzeResume}
                  disabled={isAnalyzing}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Score Card */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Overall Score</h3>
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full border-8 border-gray-700"></div>
                  <div 
                    className="absolute inset-0 rounded-full border-8 border-transparent border-t-cyan-500 transform -rotate-90"
                    style={{
                      background: `conic-gradient(from 0deg, #06b6d4 ${analysis.score * 3.6}deg, transparent 0deg)`
                    }}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">{analysis.score}%</span>
                  </div>
                </div>
                <p className="text-white/70">ATS Compatibility: {analysis.atsCompatibility}%</p>
              </div>
            </div>

            {/* Strengths and Improvements */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-6 w-6 text-green-400 mr-2" />
                  <h3 className="text-xl font-semibold text-white">Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {analysis.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-white/80">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-6 w-6 text-orange-400 mr-2" />
                  <h3 className="text-xl font-semibold text-white">Areas for Improvement</h3>
                </div>
                <ul className="space-y-3">
                  {analysis.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-white/80">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Keywords Analysis */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Keywords Analysis</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-green-400 mb-3">Found Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords.found.map((keyword, index) => (
                      <span key={index} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-medium text-red-400 mb-3">Missing Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords.missing.map((keyword, index) => (
                      <span key={index} className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {user && (
              <div className="text-center">
                <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <p className="text-white/80 mb-2">Challenge Completed!</p>
                  <p className="text-cyan-400 font-semibold">+100 Points Earned</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeChecker;