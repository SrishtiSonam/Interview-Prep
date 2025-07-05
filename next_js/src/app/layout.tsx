import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'CareerBoost - Elevate Your Career with AI-Powered Tools',
    template: '%s | CareerBoost'
  },
  description: 'Create standout resumes, ace interviews, and land your dream job with our cutting-edge career development platform.',
  keywords: ['career', 'resume', 'job search', 'interview preparation', 'AI'],
  authors: [{ name: 'CareerBoost Team' }],
  creator: 'CareerBoost',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://careerboost.app',
    siteName: 'CareerBoost',
    title: 'CareerBoost - Elevate Your Career with AI-Powered Tools',
    description: 'Create standout resumes, ace interviews, and land your dream job with our cutting-edge career development platform.',
    images: [
      {
        url: 'https://careerboost.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CareerBoost - AI-Powered Career Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerBoost - Elevate Your Career with AI-Powered Tools',
    description: 'Create standout resumes, ace interviews, and land your dream job with our cutting-edge career development platform.',
    images: ['https://careerboost.app/twitter-image.jpg'],
    creator: '@careerboost',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" 
 defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
              {children}
            </main>
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}