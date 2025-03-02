"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { useChat } from '@ai-sdk/react';
import { FaRobot, FaTimes, FaPaperPlane, FaMoon, FaSun } from "react-icons/fa"
import { useDarkMode } from "../DarkModeContext"

const personalBio = {
  name: "Amit Kumar",
  role: "Full Stack Developer",
  experience: "3+ years",
  skills: ["JavaScript", "React", "Node.js", "TypeScript", "MongoDB", "AWS"],
  projects: [
    {
      name: "InsiderHealth AI",
      description: "AI-powered health platform with personalized insights",
      techStack: "Next.js, TypeScript, MySQL, AI models",
    },
    {
      name: "Druyp",
      description: "House renting platform streamlining the rental process",
      techStack: "Node.js, React.js, MSSQL, Elasticsearch, Socket.IO",
    },
    {
      name: "Tradix",
      description: "Crypto trading platform for web and mobile",
      techStack: "React.js, React Native, PHP",
    },
  ],
  education: "Bachelor of Technology in Computer Science and Engineering",
  interests: ["Programming", "Traveling", "Outdoor Games"],
}

const predefinedQuestions = [
  "What are Amit's main skills?",
  "Tell me about Amit's work experience",
  "What projects has Amit worked on?",
  "What's Amit's educational background?",
  "What are Amit's interests?",
]

const staticAnswers :any= {
  "What are Amit's main skills?":
    "Amit's main skills include JavaScript, React, Node.js, TypeScript, MongoDB, and AWS. He's a versatile Full Stack Developer with expertise in both frontend and backend technologies.",
  "Tell me about Amit's work experience":
    "Amit has over 3 years of experience as a Full Stack Developer. He has worked on various projects, including AI-powered health platforms, house renting platforms, and crypto trading applications.",
  "What projects has Amit worked on?":
    "Some of Amit's notable projects include InsiderHealth AI (an AI-powered health platform), Druyp (a house renting platform), and Tradix (a crypto market platform for web and mobile).",
  "What's Amit's educational background?":
    "Amit holds a Bachelor of Technology in Computer Science and Engineering. This strong educational foundation has contributed to his expertise in software development.",
  "What are Amit's interests?":
    "Apart from coding, Amit is passionate about programming, enjoys traveling, and likes outdoor games. These interests contribute to his well-rounded personality and problem-solving skills.",
}

const dynamicTexts = [
  "Ask me about Amit!",
  "Curious about Amit's skills?",
  "Amit's experience?",
  "Discover Amit's projects!",
]

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const { messages, input, handleInputChange, handleSubmit, setInput, setMessages } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { darkMode, toggleDarkMode } = useDarkMode()
  const [dynamicText, setDynamicText] = useState(dynamicTexts[0])
  const chatbotRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: chatbotRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicText(dynamicTexts[Math.floor(Math.random() * dynamicTexts.length)])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleQuestionClick = (question: string) => {
    setInput(question)
    handleSubmit(new Event("submit") as any)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsTyping(true)
    const userMessage = { role: "user", content: input }
    setMessages((prevMessages):any => [...prevMessages, userMessage])
    setInput("")

    // Simulate AI typing
    await new Promise((resolve) => setTimeout(resolve, 1000))
    let inputdata:any = input ?? ""
    let aiResponse
    if (staticAnswers[inputdata]) {
      aiResponse = staticAnswers[inputdata]
    } else {
      aiResponse =
        "I'm still learning about Amit! I can answer questions about his skills, work experience, projects, education, and interests. For other questions, please check back later as I'm continuously improving!"
    }

    const aiMessage = { role: "assistant", content: aiResponse }
    setMessages((prevMessages):any => [...prevMessages, aiMessage])
    setIsTyping(false)
  }

  return (
    <motion.div
      ref={chatbotRef}
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ scale }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg w-96 h-[500px] flex flex-col overflow-hidden`}
            initial={{ y: 20, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div
              className={`${darkMode ? "bg-gray-900" : "bg-blue-600"} text-white p-4 rounded-t-lg flex justify-between items-center`}
            >
              <h3 className="text-lg font-semibold flex items-center">
                <FaRobot className="mr-2" /> Chat with AmitBot 9000
              </h3>
              <div className="flex items-center">
                {/* <button onClick={toggleDarkMode} className="mr-4 hover:text-gray-300 transition-colors">
                  {darkMode ? <FaSun /> : <FaMoon />}
                </button> */}
                <button onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition-colors">
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className={`flex-grow overflow-y-auto p-4 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span
                    className={`inline-block p-2 rounded-lg ${
                      message.role === "user"
                        ? darkMode
                          ? "bg-blue-600 text-white"
                          : "bg-blue-100 text-blue-800"
                        : darkMode
                          ? "bg-gray-600 text-white"
                          : "bg-white text-gray-800"
                    }`}
                  >
                    {message.content}
                  </span>
                </motion.div>
              ))}
              {isTyping && (
                <div className="text-left mb-4">
                  <span
                    className={`inline-block p-2 rounded-lg ${darkMode ? "bg-gray-600 text-white" : "bg-white text-gray-800"}`}
                  >
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
                    >
                      AmitBot 9000 is typing...
                    </motion.span>
                  </span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className={`p-4 border-t ${darkMode ? "border-gray-600 bg-gray-800" : "border-gray-200"}`}>
              <div className="mb-2 flex flex-wrap gap-2">
                {predefinedQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className={`text-xs ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} rounded px-2 py-1 transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {question}
                  </motion.button>
                ))}
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about Amit..."
                    className={`flex-grow px-3 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                    }`}
                  />
                  <button
                    type="submit"
                    className={`${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"} text-white px-4 py-2 rounded-r-lg transition-colors`}
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className={`${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"} text-white p-4 rounded-full shadow-lg transition-colors relative`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaRobot size={24} />
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
        {!isOpen && (
          <motion.span
            className="absolute left-[-200%] -translate-x-1/2 -top-12 bg-white text-blue-600 px-2 py-1 rounded-lg text-sm whitespace-nowrap shadow-md"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {dynamicText}
          </motion.span>
        )}
      </motion.button>
    </motion.div>
  )
}

export default Chatbot

