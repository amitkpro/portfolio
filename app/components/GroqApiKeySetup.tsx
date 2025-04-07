"use client"

import { useEffect } from "react"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useDarkMode } from "../DarkModeContext"

const GroqApiKeySetup = () => {
  const [apiKey, setApiKey] = useState("")
  const [isVisible, setIsVisible] = useState(true)
  const { darkMode } = useDarkMode()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim()) {
      // Store the API key in localStorage
      localStorage.setItem("GROQ_API_KEY", apiKey)
      // Hide the setup component
      setIsVisible(false)
    }
  }

  // Check if API key already exists
  useEffect(() => {
    const storedKey = localStorage.getItem("GROQ_API_KEY")
    if (storedKey) {
      setIsVisible(false)
    }
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} rounded-lg p-6 w-full max-w-md`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <h2 className="text-xl font-bold mb-4">Set Up GROQ API Key</h2>
        <p className="mb-4">
          To enable the chatbot functionality, please enter your GROQ API key. You can get one by signing up at{" "}
          <a
            href="https://console.groq.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            console.groq.com
          </a>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your GROQ API key"
            className={`w-full px-3 py-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
            }`}
          />
          <div className="flex justify-end">
            <motion.button
              type="submit"
              className={`${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"} text-white px-4 py-2 rounded-lg transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Save API Key
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default GroqApiKeySetup

