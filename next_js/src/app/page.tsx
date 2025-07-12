import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronRight, Briefcase, FileText, Users, ClipboardList } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900">
      {/* First section that takes up full viewport height */}
      <div className="h-screen flex flex-col">
        <header className="p-6">
          <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-white text-2xl font-bold">CareerBoost</div>
            <div className="space-x-4">
              <Link href="/login">
                <Button 
                  variant="ghost" 
                  className="
                      text-white bg-gradient-to-r from-indigo-700 to-indigo-800 
                    hover:from-indigo-800 hover:to-indigo-900 hover:scale-110 
                    shadow-lg hover:shadow-xl 
                    transition-all duration-300 transform"
                  >
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button 
                    variant="outline" 
                    className="
                      bg-white text-indigo-700 border-indigo-300 
                      hover:bg-indigo-100 hover:text-indigo-900 
                      transition-all duration-300 transform hover:scale-105"
                  >
                  Sign Up
                </Button>
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-grow flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Elevate Your Career with AI-Powered Tools
            </h1>
            <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
              Create standout resumes, ace interviews, and land your dream job with our cutting-edge career development platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/login">
                <Button 
                  size="lg" 
                  className="bg-white text-indigo-800 
                             hover:bg-gradient-to-r from-indigo-600 to-blue-500 
                             hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-indigo-300 text-indigo-200 
                             hover:bg-white hover:text-indigo-800 transition-all duration-300 
                             transform hover:scale-105"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>

      {/* Features section that appears below the viewport */}
      <section className="py-10 px-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Briefcase, title: "AI Resume Builder", description: "Create professional resumes tailored to your industry" },
              { icon: FileText, title: "Cover Letter Generator", description: "Craft compelling cover letters in minutes" },
              { icon: Users, title: "Interview Preparation", description: "Practice with AI-generated interview questions" },
              { icon: ClipboardList, title: "Resume Checker", description: "Get instant feedback on your resume" },
            ].map((feature, index) => (
              <Link href="/login" key={index} className="block h-full">
                <div 
                  className="flex flex-col items-center text-center p-6 bg-white bg-opacity-20 rounded-lg 
                    hover:bg-gradient-to-t from-purple-700 to-blue-500 
                    hover:scale-105 group transition-all duration-300 cursor-pointer 
                    h-full min-h-[250px] w-full"
                >
                  <feature.icon className="h-10 w-10 text-indigo-300 group-hover:text-white transition-colors duration-300 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-indigo-200">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
