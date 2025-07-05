import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { 
  ChevronRight, 
  Briefcase, 
  FileText, 
  Users, 
  ClipboardList, 
  Brain,
  Code,
  MessageSquare,
  Database,
  BarChart3,
  MessageCircle,
  BookOpen,
  Share2,
  Target,
  Zap,
  Lightbulb,
  TrendingUp,
  Users2,
  Award,
  Star
} from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 min-h-screen">
      {/* Header */}
      <header className="p-6">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">CareerBoost</div>
          <div className="space-x-4">
            <Link href="/login">
              <Button 
                variant="ghost" 
                className="text-white bg-gradient-to-r from-indigo-700 to-indigo-800 
                          hover:from-indigo-800 hover:to-indigo-900 hover:scale-110 
                          shadow-lg hover:shadow-xl transition-all duration-300 transform"
              >
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button 
                variant="outline" 
                className="bg-white text-indigo-700 border-indigo-300 
                          hover:bg-indigo-100 hover:text-indigo-900 
                          transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Your Complete Career Development Platform
          </h1>
          <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
            Master interviews, build projects, and connect with the community. Everything you need to accelerate your career.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="flex-grow px-4 pb-16">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section 1: Interview Prep */}
          <section className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Interview Prep Section</h2>
              <p className="text-indigo-200 text-lg">Comprehensive tools to ace your interviews</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* 1.1 Resume */}
              <div className="bg-white bg-opacity-20 rounded-xl p-6 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-blue-300 group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-semibold text-white ml-3">Resume Tools</h3>
                </div>
                <p className="text-indigo-200 mb-4">Complete resume toolkit</p>
                <div className="space-y-2">
                  <Link href="/create-resume">
                    <Button variant="ghost" className="w-full justify-start text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-20">
                      <Zap className="h-4 w-4 mr-2" />
                      AI Resume Builder
                    </Button>
                  </Link>
                  <Link href="/cover-letter">
                    <Button variant="ghost" className="w-full justify-start text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-20">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Cover Letter Generator
                    </Button>
                  </Link>
                  <Link href="/resume-checker">
                    <Button variant="ghost" className="w-full justify-start text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-20">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      Resume Checker
                    </Button>
                  </Link>
                </div>
              </div>

              {/* 1.2 Aptitude Test */}
              <div className="bg-white bg-opacity-20 rounded-xl p-6 hover:bg-gradient-to-br hover:from-green-600 hover:to-blue-600 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <Brain className="h-8 w-8 text-green-300 group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-semibold text-white ml-3">Aptitude Test</h3>
                </div>
                <p className="text-indigo-200 mb-4">Practice logical reasoning and problem-solving</p>
                <Link href="/aptitude-test">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                    Start Practice
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* 1.3 Coding Round */}
              <div className="bg-white bg-opacity-20 rounded-xl p-6 hover:bg-gradient-to-br hover:from-orange-600 hover:to-red-600 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <Code className="h-8 w-8 text-orange-300 group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-semibold text-white ml-3">Coding Round</h3>
                </div>
                <p className="text-indigo-200 mb-4">Master coding challenges and algorithms</p>
                <Link href="/coding-round">
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                    Practice Coding
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* 1.4 Technical Round */}
              <div className="bg-white bg-opacity-20 rounded-xl p-6 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <MessageCircle className="h-8 w-8 text-purple-300 group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-semibold text-white ml-3">Technical Round</h3>
                </div>
                <p className="text-indigo-200 mb-4">AI-generated interview questions</p>
                <Link href="/interview-prep">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Practice with AI
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Section 2: Project Prep */}
          <section className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full mb-4">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Project Prep Section</h2>
              <p className="text-indigo-200 text-lg">Data science and machine learning tools</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 2.1 Scrap Data */}
              <div className="bg-white bg-opacity-20 rounded-xl p-6 hover:bg-gradient-to-br hover:from-green-600 hover:to-blue-600 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <TrendingUp className="h-8 w-8 text-green-300 group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-semibold text-white ml-3">Data Scraping</h3>
                </div>
                <p className="text-indigo-200 mb-4">Extract and store data in CSV format</p>
                <Link href="/data-scraping">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                    Start Scraping
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* 2.2 Prep CSV Data */}
              <div className="bg-white bg-opacity-20 rounded-xl p-6 hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-300 group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-semibold text-white ml-3">Data Preparation</h3>
                </div>
                <p className="text-indigo-200 mb-4">Prepare CSV data for machine learning</p>
                <Link href="/data-prep">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                    Prepare Data
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* 2.3 Talk to CSV */}
              <div className="bg-white bg-opacity-20 rounded-xl p-6 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <MessageSquare className="h-8 w-8 text-purple-300 group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-semibold text-white ml-3">Talk to CSV</h3>
                </div>
                <p className="text-indigo-200 mb-4">Interactive data analysis with AI</p>
                <Link href="/csv-chat">
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Chat with Data
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Section 3: Social */}
          <section className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full mb-4">
                <Users2 className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Social Section</h2>
              <p className="text-indigo-200 text-lg">Connect, learn, and share experiences</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 3.1 Quiz Section */}
              <div className="bg-white bg-opacity-20 rounded-xl p-6 hover:bg-gradient-to-br hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <BookOpen className="h-8 w-8 text-yellow-300 group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-semibold text-white ml-3">Quiz Section</h3>
                </div>
                <p className="text-indigo-200 mb-4">Test your knowledge with interactive quizzes</p>
                <div className="space-y-2">
                  <Link href="/quiz/technical">
                    <Button variant="ghost" className="w-full justify-start text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-20">
                      <Star className="h-4 w-4 mr-2" />
                      Technical Quizzes
                    </Button>
                  </Link>
                  <Link href="/quiz/aptitude">
                    <Button variant="ghost" className="w-full justify-start text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-20">
                      <Brain className="h-4 w-4 mr-2" />
                      Aptitude Quizzes
                    </Button>
                  </Link>
                  <Link href="/quiz/general">
                    <Button variant="ghost" className="w-full justify-start text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-20">
                      <Award className="h-4 w-4 mr-2" />
                      General Knowledge
                    </Button>
                  </Link>
                </div>
              </div>

              {/* 3.2 Experience Section */}
              <div className="bg-white bg-opacity-20 rounded-xl p-6 hover:bg-gradient-to-br hover:from-rose-600 hover:to-pink-600 transition-all duration-300 group">
                <div className="flex items-center mb-4">
                  <Share2 className="h-8 w-8 text-rose-300 group-hover:text-white transition-colors" />
                  <h3 className="text-xl font-semibold text-white ml-3">Experience Section</h3>
                </div>
                <p className="text-indigo-200 mb-4">Share and learn from interview experiences</p>
                <div className="space-y-2">
                  <Link href="/experiences">
                    <Button variant="ghost" className="w-full justify-start text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-20">
                      <Users className="h-4 w-4 mr-2" />
                      Browse Experiences
                    </Button>
                  </Link>
                  <Link href="/experiences/share">
                    <Button variant="ghost" className="w-full justify-start text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-20">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Share Your Experience
                    </Button>
                  </Link>
                  <Link href="/experiences/companies">
                    <Button variant="ghost" className="w-full justify-start text-indigo-200 hover:text-white hover:bg-white hover:bg-opacity-20">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Company Reviews
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-900 bg-opacity-50 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-white mb-4 md:mb-0">&copy; 2024 CareerBoost. All rights reserved.</div>
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-indigo-200 hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-indigo-200 hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-indigo-200 hover:text-white transition-colors duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
