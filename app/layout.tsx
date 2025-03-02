import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import Chatbot from "./components/Chatbot"
import { DarkModeProvider } from "./DarkModeContext"
import ParticleBackground from "./components/ParticleBackground"

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
      <DarkModeProvider>
        <body className={`${inter.className} transition-colors duration-300`}>
          <ParticleBackground />
          {children}
          <Chatbot />
        </body>
      </DarkModeProvider>
    </html>
  )
}

