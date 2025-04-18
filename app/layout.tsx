import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import Chatbot from "./components/Chatbot"
import { DarkModeProvider } from "./DarkModeContext"
import { LanguageProvider } from "./LanguageContext"
import ParticleBackground from "./components/ParticleBackground"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Amit Kumar - Full Stack Developer",
  description: "Portfolio of Amit Kumar, a Full Stack Developer specializing in React and Node.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <LanguageProvider>
        <DarkModeProvider>
          <body className={`${inter.className} transition-colors duration-300`}>
            <ParticleBackground />
            {children}
            <Chatbot />
            <Analytics />
            <SpeedInsights />
          </body>
        </DarkModeProvider>
      </LanguageProvider>
    </html>
  )
}
