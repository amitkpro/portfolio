// "use client"

// import React ,{ useState, useRef, useEffect } from "react"
// import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
// import { FaRobot, FaTimes, FaPaperPlane, FaMoon, FaSun, FaMicrophone, FaVolumeUp } from "react-icons/fa"
// import { useDarkMode } from "../DarkModeContext"

// const predefinedQuestions = [
//   "What are Amit's main skills?",
//   "Tell me about Amit's work experience",
//   "What projects has Amit worked on?",
//   "What's Amit's educational background?",
//   "What are Amit's interests?",
// ]

// const dynamicTexts = [
//   "Ask me about Amit!",
//   "Curious about Amit's skills?",
//   "Want to know Amit's experience?",
//   "Discover Amit's projects!",
// ]

// interface Message {
//   role: "user" | "assistant"
//   content: string
// }

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const [isTyping, setIsTyping] = useState(false)
//   const [voiceMode, setVoiceMode] = useState(false)
//   const [isListening, setIsListening] = useState(false)
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [messages, setMessages] = useState<Message[]>([])
//   const [input, setInput] = useState("")
//   const [transcript, setTranscript] = useState("")
//   const [finalTranscript, setFinalTranscript] = useState("")
//   const messagesEndRef = useRef<HTMLDivElement>(null)
//   const { darkMode, toggleDarkMode } = useDarkMode()
//   const [dynamicText, setDynamicText] = useState(dynamicTexts[0])
//   const chatbotRef = useRef(null)
//   const recognitionRef = useRef<any>(null)
//   const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
//   const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
//   const [isDebouncing, setIsDebouncing] = useState(false)
//   // const [isSpeechToTextOn , setIsSpeechToTextOn] = useState(false)
//   const isSpeechToTextOn = useRef<boolean>(false); 

//   const { scrollYProgress } = useScroll({
//     target: chatbotRef,
//     offset: ["start end", "end start"],
//   })

//   const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])

//   // Initialize speech recognition
//   useEffect(() => {
//     if ((typeof window !== "undefined" && "SpeechRecognition" in window) || "webkitSpeechRecognition" in window) {
//       const SpeechRecognition:any = window?.SpeechRecognition || window?.webkitSpeechRecognition
//       recognitionRef.current = new SpeechRecognition()
//       recognitionRef.current.continuous = true
//       recognitionRef.current.interimResults = true
//       recognitionRef.current.lang = "en-US"

//       recognitionRef.current.onresult = (event: any) => {
//         let interimTranscript = ""
//         let finalTranscriptValue = ""

//         // Process the results
//         for (let i = event.resultIndex; i < event.results.length; i++) {
//           const transcript = event.results[i][0].transcript
//           if (event.results[i].isFinal) {
//             finalTranscriptValue += transcript
//           } else {
//             interimTranscript += transcript
//           }
//         }

//         // Update the transcript state
//         setTranscript(interimTranscript)

//         if (finalTranscriptValue) {
//           setFinalTranscript(finalTranscriptValue)
//           setInput(finalTranscriptValue)

//           // Clear any existing debounce timer
//           if (debounceTimerRef.current) {
//             clearTimeout(debounceTimerRef.current)
//             debounceTimerRef.current = null
//           }

//           // Start debouncing - show visual indicator
//           setIsDebouncing(true)

//           // Set a new debounce timer
//           debounceTimerRef.current = setTimeout(() => {
//             if (finalTranscriptValue.trim()) {
//               // Stop listening before processing
//               stopListening()
//               // Process the input
//               processUserInput(finalTranscriptValue)
//               // Reset states
//               setTranscript("")
//               setFinalTranscript("")
//               setInput("")
//               setIsDebouncing(false)
//             }
//           }, 2000) // 2 second debounce
//         } else if (interimTranscript) {
//           // If we have interim results, update the input but reset the debounce timer
//           setInput(interimTranscript)

//           // Clear any existing debounce timer
//           if (debounceTimerRef.current) {
//             clearTimeout(debounceTimerRef.current)
//             debounceTimerRef.current = null
//           }

//           // Start debouncing - show visual indicator
//           setIsDebouncing(true)

//           // Set a new debounce timer
//           debounceTimerRef.current = setTimeout(() => {
//             if (interimTranscript.trim()) {
//               // Stop listening before processing
//               stopListening()
//               // Process the input
//               processUserInput(interimTranscript)
//               // Reset states
//               setTranscript("")
//               setFinalTranscript("")
//               setInput("")
//               setIsDebouncing(false)
//             }
//           }, 2000) // 2 second debounce
//         }
//       }

//       recognitionRef.current.onend = () => {
//         // Only restart if we're in voice mode and not speaking
//         if (voiceMode && isListening && !isSpeaking) {
//           try {
//             recognitionRef.current.start()
//           } catch (error) {
//             console.error("Error restarting speech recognition:", error)
//             setIsListening(false)
//           }
//         } else {
//           setIsListening(false)
//         }
//       }

//       recognitionRef.current.onerror = (event: any) => {
//         console.error("Speech recognition error", event.error)
//         setIsListening(false)
//       }
//     }

//     return () => {
//       if (recognitionRef.current) {
//         try {
//           recognitionRef.current.stop()
//         } catch (error) {
//           console.error("Error stopping speech recognition on cleanup:", error)
//         }
//       }
//       if (debounceTimerRef.current) {
//         clearTimeout(debounceTimerRef.current)
//       }
//     }
//   }, [voiceMode, isListening, isSpeaking])

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
//     }
//   }, [messages])

//   // Dynamic text rotation
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDynamicText(dynamicTexts[Math.floor(Math.random() * dynamicTexts.length)])
//     }, 5000)
//     return () => clearInterval(interval)
//   }, [])

//   // console.log("Chatbot component mounted")
//   // console.log("Chatbot component mounted Voice mode:", voiceMode)
//   // console.log("Chatbot component mounted Is listening:", isListening)
//   // console.log("Chatbot component mounted Is speaking:", isSpeaking)
//   // console.log("Chatbot component mounted Is typing:", isTyping)
//   const toggleVoiceMode = async() => {
    
//     const newVoiceMode = !voiceMode
//     setVoiceMode(newVoiceMode)

//     if (newVoiceMode) {
//       isSpeechToTextOn.current = true        
//       startListening()
//     } else {
//       isSpeechToTextOn.current = false    
//       stopListening()
//       if (isSpeaking) {
//         stopSpeaking()
//       }
//       // Clear any debounce timer
//       if (debounceTimerRef.current) {
//         clearTimeout(debounceTimerRef.current)
//         debounceTimerRef.current = null
//       }
//       setIsDebouncing(false)
//     }
//   }

//   const startListening = () => {
//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.start()
//         setIsListening(true)
//       } catch (error) {
//         console.error("Error starting speech recognition:", error)
//       }
//     }
//   }

//   const stopListening = () => {
//     if (recognitionRef.current) {
//       try {
//         recognitionRef.current.stop()
//         setIsListening(false)
//       } catch (error) {
//         console.error("Error stopping speech recognition:", error)
//       }
//     }
//   }

//   const speakText = (text: string) => {
//     if ("speechSynthesis" in window) {
//       // Cancel any ongoing speech
//       recognitionRef.current.stop()
//       window.speechSynthesis.cancel()

//       // Create a new utterance
//       const utterance = new SpeechSynthesisUtterance(text)
//       speechSynthesisRef.current = utterance

//       // Configure the utterance
//       utterance.lang = "en-US"
//       utterance.rate = 1.0
//       utterance.pitch = 1.0

//       // Set event handlers
//       utterance.onstart = () => setIsSpeaking(true)
//       utterance.onend = () => {
//         setIsSpeaking(false)
//         speechSynthesisRef.current = null

//         // If still in voice mode, restart listening after a short delay
//         setIsListening(true)
//         recognitionRef.current.start()
//         if (voiceMode) {
//           setTimeout(() => {
//             startListening()
//           }, 500)
//         }
//       }

//       // Speak the text
//       window.speechSynthesis.speak(utterance)
//     }
//   }

//   const stopSpeaking = () => {
//     if ("speechSynthesis" in window) {
//       window.speechSynthesis.cancel()
//       setIsSpeaking(false)
//       speechSynthesisRef.current = null
//     }
//   }

//   const handleQuestionClick = (question: string) => {
//     setInput(question)
//     processUserInput(question)
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInput(e.target.value)
//   }

//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!input.trim()) return

//     processUserInput(input)
//   }

//   const processUserInput = async (userInput: string) => {
//     // If speaking, stop it
//     if (isSpeaking) {
//       stopSpeaking()
//     }

//     // If listening, pause it temporarily
//     if (isListening) {
//       stopListening()
//     }

//     // Clear any debounce timer
//     if (debounceTimerRef.current) {
//       clearTimeout(debounceTimerRef.current)
//       debounceTimerRef.current = null
//     }
//     setIsDebouncing(false)

//     setIsTyping(true)
//     const userMessage = { role: "user", content: userInput }
//     setMessages((prevMessages):any => [...prevMessages, userMessage])
//     setInput("")

//     try {
//       // Call the API to get a response
//       const response = await fetch("/api/chat", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message: userInput }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to get response")
//       }

//       const data = await response.json()

//       // Add the response to messages
//       const aiMessage = { role: "assistant", content: data.response }
//       setMessages((prevMessages):any => [...prevMessages, aiMessage])

//       // If voice mode is on, speak the response
//       debugger
     
//       console.log("isSpeechToTextOn", isSpeechToTextOn.current)
//       if (isListening) {
//         stopListening()
//       }
//       if ( isSpeechToTextOn.current) {
//         speakText(data.response)
//       }
//     } catch (error) {
//       console.error("Error getting chat response:", error)
//       const errorMessage = {
//         role: "assistant",
//         content: "I'm having trouble accessing Amit's information right now. Please try again later.",
//       }
//       setMessages((prevMessages):any => [...prevMessages, errorMessage])

//       // If voice mode is on, speak the error message
     
//       if (isSpeechToTextOn.current) {
//         speakText(errorMessage.content)
//       }
//     } finally {
//       setIsTyping(false)
//     }
//   }

//   return (
//     <motion.div
//       ref={chatbotRef}
//       className="fixed bottom-4 right-4 z-50"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       style={{ scale }}
//     >
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             className={`${darkMode ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg w-96 h-[500px] flex flex-col overflow-hidden`}
//             initial={{ y: 20, opacity: 0, scale: 0.8 }}
//             animate={{ y: 0, opacity: 1, scale: 1 }}
//             exit={{ y: 20, opacity: 0, scale: 0.8 }}
//             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//           >
//             <div
//               className={`${darkMode ? "bg-gray-900" : "bg-blue-600"} text-white p-4 rounded-t-lg flex justify-between items-center`}
//             >
//               <h3 className="text-lg font-semibold flex items-center">
//                 <FaRobot className="mr-2" /> AmitBot 9000
//               </h3>
//               <div className="flex items-center">
//                 <button onClick={toggleDarkMode} className="mr-4 hover:text-gray-300 transition-colors">
//                   {darkMode ? <FaSun /> : <FaMoon />}
//                 </button>
//                 <button onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition-colors">
//                   <FaTimes />
//                 </button>
//               </div>
//             </div>

//             {/* Chat content area */}
//             <div className={`flex-grow overflow-y-auto p-4 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
//               {voiceMode ? (
//                 // Voice mode UI - only show voice animation
//                 <div className="h-full flex flex-col items-center justify-center">
//                   <motion.div
//                     className={`p-8 rounded-full ${darkMode ? "bg-gray-800" : "bg-blue-100"} mb-4`}
//                     animate={
//                       isListening
//                         ? {
//                             scale: [1, 1.2, 1],
//                             boxShadow: [
//                               "0px 0px 0px rgba(0,0,0,0)",
//                               "0px 0px 20px rgba(59,130,246,0.5)",
//                               "0px 0px 0px rgba(0,0,0,0)",
//                             ],
//                           }
//                         : isSpeaking
//                           ? { scale: [1, 1.1, 1] }
//                           : isDebouncing
//                             ? {
//                                 scale: [1, 1.05, 1],
//                                 boxShadow: [
//                                   "0px 0px 0px rgba(0,0,0,0)",
//                                   "0px 0px 10px rgba(245,158,11,0.5)",
//                                   "0px 0px 0px rgba(0,0,0,0)",
//                                 ],
//                               }
//                             : {}
//                     }
//                     transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
//                   >
//                     {isListening ? (
//                       <FaMicrophone className={`text-4xl ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
//                     ) : isSpeaking ? (
//                       <FaVolumeUp className={`text-4xl ${darkMode ? "text-green-400" : "text-green-600"}`} />
//                     ) : isDebouncing ? (
//                       <FaMicrophone className={`text-4xl ${darkMode ? "text-amber-400" : "text-amber-600"}`} />
//                     ) : (
//                       <FaMicrophone className={`text-4xl ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
//                     )}
//                   </motion.div>
//                   <p className={`text-center ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
//                     {isListening
//                       ? "Listening... Speak now"
//                       : isSpeaking
//                         ? "Speaking..."
//                         : isDebouncing
//                           ? "Processing..."
//                           : "Voice mode active. Tap the microphone to speak."}
//                   </p>
//                   {input && (isListening || isDebouncing) && (
//                     <div className={`mt-4 p-3 rounded ${darkMode ? "bg-gray-800" : "bg-white"} max-w-xs text-center`}>
//                       <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-sm`}>{input}</p>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 // Regular chat UI
//                 <>
//                   {messages.map((message, index) => (
//                     <motion.div
//                       key={index}
//                       className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}
//                       initial={{ opacity: 0, y: 10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                     >
//                       <span
//                         className={`inline-block p-2 rounded-lg ${
//                           message.role === "user"
//                             ? darkMode
//                               ? "bg-blue-600 text-white"
//                               : "bg-blue-100 text-blue-800"
//                             : darkMode
//                               ? "bg-gray-600 text-white"
//                               : "bg-white text-gray-800"
//                         }`}
//                       >
//                         {message.content}
//                       </span>
//                     </motion.div>
//                   ))}
//                   {isTyping && (
//                     <div className="text-left mb-4">
//                       <span
//                         className={`inline-block p-2 rounded-lg ${darkMode ? "bg-gray-600 text-white" : "bg-white text-gray-800"}`}
//                       >
//                         <motion.span
//                           initial={{ opacity: 0 }}
//                           animate={{ opacity: 1 }}
//                           transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
//                         >
//                           AmitBot 9000 is thinking...
//                         </motion.span>
//                       </span>
//                     </div>
//                   )}
//                 </>
//               )}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Input area */}
//             <div className={`p-4 border-t ${darkMode ? "border-gray-600 bg-gray-800" : "border-gray-200"}`}>
//               {!voiceMode && (
//                 <div className="mb-2 flex flex-wrap gap-2">
//                   {predefinedQuestions.map((question, index) => (
//                     <motion.button
//                       key={index}
//                       onClick={() => handleQuestionClick(question)}
//                       className={`text-xs ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} rounded px-2 py-1 transition-colors`}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                     >
//                       {question}
//                     </motion.button>
//                   ))}
//                 </div>
//               )}
//               <form onSubmit={handleFormSubmit}>
//                 <div className="flex items-center">
//                   {!voiceMode && (
//                     <input
//                       type="text"
//                       value={input}
//                       onChange={handleInputChange}
//                       placeholder="Ask about Amit..."
//                       className={`flex-grow px-3 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
//                         darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
//                       }`}
//                     />
//                   )}
//                   <button
//                     type="button"
//                     onClick={toggleVoiceMode}
//                     className={`${voiceMode ? "rounded-l-lg" : ""} px-3 py-2 ${
//                       voiceMode
//                         ? isListening
//                           ? "bg-green-500 hover:bg-green-600"
//                           : isSpeaking
//                             ? "bg-blue-500 hover:bg-blue-600"
//                             : isDebouncing
//                               ? "bg-amber-500 hover:bg-amber-600"
//                               : "bg-gray-500 hover:bg-gray-600"
//                         : darkMode
//                           ? "bg-gray-600 hover:bg-gray-500"
//                           : "bg-gray-300 hover:bg-gray-400"
//                     } text-white transition-colors relative`}
//                   >
//                     <FaMicrophone />
//                     {isSpeaking && (
//                       <motion.div
//                         className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
//                         animate={{ scale: [1, 1.5, 1] }}
//                         transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
//                       />
//                     )}
//                   </button>
//                   {!voiceMode && (
//                     <button
//                       type="submit"
//                       className={`${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"} text-white px-4 py-2 rounded-r-lg transition-colors`}
//                     >
//                       <FaPaperPlane />
//                     </button>
//                   )}
//                 </div>
//               </form>
//               {voiceMode && (
//                 <div className={`mt-2 text-xs text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
//                   {isListening
//                     ? "Listening... Speak now"
//                     : isSpeaking
//                       ? "Listening to response..."
//                       : isDebouncing
//                         ? "Processing your question..."
//                         : "Tap microphone to speak"}
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//       <motion.button
//         className={`${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"} text-white p-4 rounded-full shadow-lg transition-colors relative`}
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <FaRobot size={24} />
//         <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span>
//         {!isOpen && (
//           <motion.span
//             className="absolute left-1/2 -translate-x-1/2 -top-12 bg-white text-blue-600 px-2 py-1 rounded-lg text-sm whitespace-nowrap shadow-md"
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//           >
//             {dynamicText}
//           </motion.span>
//         )}
//       </motion.button>
//     </motion.div>
//   )
// }

// export default Chatbot


"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { FaRobot, FaTimes, FaPaperPlane, FaMoon, FaSun, FaMicrophone, FaVolumeUp } from "react-icons/fa"
import { useDarkMode } from "../DarkModeContext"

// Add TypeScript declarations for the Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onresult: (event: SpeechRecognitionEvent) => void
  onend: () => void
  onerror: (event: SpeechRecognitionErrorEvent) => void
}

interface SpeechRecognitionEvent {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  length: number
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  isFinal: boolean
  [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

// Add to Window interface
declare global {
  interface Window {
    SpeechRecognition?: {
      new (): SpeechRecognition
    }
    webkitSpeechRecognition?: {
      new (): SpeechRecognition
    }
  }
}

const predefinedQuestions = [
  "What are Amit's main skills?",
  "Tell me about Amit's work experience",
  "What projects has Amit worked on?",
  "What's Amit's educational background?",
  "What are Amit's interests?",
]

const dynamicTexts = [
  "Ask me about Amit!",
  "Curious about Amit's skills?",
  "Want to know Amit's experience?",
  "Discover Amit's projects!",
]

interface Message {
  role: "user" | "assistant"
  content: string
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [transcript, setTranscript] = useState("")
  const [finalTranscript, setFinalTranscript] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { darkMode, toggleDarkMode } = useDarkMode()
  const [dynamicText, setDynamicText] = useState(dynamicTexts[0])
  const chatbotRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [isDebouncing, setIsDebouncing] = useState(false)
  const isSpeechToTextOn = useRef<boolean>(false)

  const { scrollYProgress } = useScroll({
    target: chatbotRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])

  // Initialize speech recognition
  useEffect(() => {
    if ((typeof window !== "undefined" && window.SpeechRecognition) || window.webkitSpeechRecognition) {
      const SpeechRecognitionConstructor = window.SpeechRecognition || window.webkitSpeechRecognition

      if (SpeechRecognitionConstructor) {
        recognitionRef.current = new SpeechRecognitionConstructor()
        recognitionRef.current.continuous = true
        recognitionRef.current.interimResults = true
        recognitionRef.current.lang = "en-US"

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          let interimTranscript = ""
          let finalTranscriptValue = ""

          // Process the results
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript
            if (event.results[i].isFinal) {
              finalTranscriptValue += transcript
            } else {
              interimTranscript += transcript
            }
          }

          // Update the transcript state
          setTranscript(interimTranscript)

          if (finalTranscriptValue) {
            setFinalTranscript(finalTranscriptValue)
            setInput(finalTranscriptValue)

            // Clear any existing debounce timer
            if (debounceTimerRef.current) {
              clearTimeout(debounceTimerRef.current)
              debounceTimerRef.current = null
            }

            // Start debouncing - show visual indicator
            setIsDebouncing(true)

            // Set a new debounce timer
            debounceTimerRef.current = setTimeout(() => {
              if (finalTranscriptValue.trim()) {
                // Stop listening before processing
                stopListening()
                // Process the input
                processUserInput(finalTranscriptValue)
                // Reset states
                setTranscript("")
                setFinalTranscript("")
                setInput("")
                setIsDebouncing(false)
              }
            }, 2000) // 2 second debounce
          } else if (interimTranscript) {
            // If we have interim results, update the input but reset the debounce timer
            setInput(interimTranscript)

            // Clear any existing debounce timer
            if (debounceTimerRef.current) {
              clearTimeout(debounceTimerRef.current)
              debounceTimerRef.current = null
            }

            // Start debouncing - show visual indicator
            setIsDebouncing(true)

            // Set a new debounce timer
            debounceTimerRef.current = setTimeout(() => {
              if (interimTranscript.trim()) {
                // Stop listening before processing
                stopListening()
                // Process the input
                processUserInput(interimTranscript)
                // Reset states
                setTranscript("")
                setFinalTranscript("")
                setInput("")
                setIsDebouncing(false)
              }
            }, 2000) // 2 second debounce
          }
        }

        recognitionRef.current.onend = () => {
          // Only restart if we're in voice mode and not speaking
          if (voiceMode && isListening && !isSpeaking) {
            try {
              if (recognitionRef.current) {
                recognitionRef.current.start()
              }
            } catch (error) {
              console.error("Error restarting speech recognition:", error)
              setIsListening(false)
            }
          } else {
            setIsListening(false)
          }
        }

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error("Speech recognition error", event.error)
          setIsListening(false)
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (error) {
          console.error("Error stopping speech recognition on cleanup:", error)
        }
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [voiceMode, isListening, isSpeaking])

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Dynamic text rotation
  useEffect(() => {
    console.log(transcript, finalTranscript)  // remove this in next version
    const interval = setInterval(() => {
      setDynamicText(dynamicTexts[Math.floor(Math.random() * dynamicTexts.length)])
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const toggleVoiceMode = async () => {
    const newVoiceMode = !voiceMode
    setVoiceMode(newVoiceMode)

    if (newVoiceMode) {
      isSpeechToTextOn.current = true
      startListening()
    } else {
      isSpeechToTextOn.current = false
      stopListening()
      if (isSpeaking) {
        stopSpeaking()
      }
      // Clear any debounce timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
        debounceTimerRef.current = null
      }
      setIsDebouncing(false)
    }
  }

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start()
        setIsListening(true)
      } catch (error) {
        console.error("Error starting speech recognition:", error)
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop()
        setIsListening(false)
      } catch (error) {
        console.error("Error stopping speech recognition:", error)
      }
    }
  }

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()

      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(text)
      speechSynthesisRef.current = utterance

      // Configure the utterance
      utterance.lang = "en-US"
      utterance.rate = 1.0
      utterance.pitch = 1.0

      // Set event handlers
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => {
        setIsSpeaking(false)
        speechSynthesisRef.current = null

        // If still in voice mode, restart listening after a short delay
        if (voiceMode) {
          setTimeout(() => {
            startListening()
          }, 500)
        }
      }

      // Speak the text
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      speechSynthesisRef.current = null
    }
  }

  const handleQuestionClick = (question: string) => {
    setInput(question)
    processUserInput(question)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    processUserInput(input)
  }

  const processUserInput = async (userInput: string) => {
    // If speaking, stop it
    if (isSpeaking) {
      stopSpeaking()
    }

    // If listening, pause it temporarily
    if (isListening) {
      stopListening()
    }

    // Clear any debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = null
    }
    setIsDebouncing(false)

    setIsTyping(true)
    const userMessage: Message = { role: "user", content: userInput }
    setMessages((prevMessages) => [...prevMessages, userMessage])
    setInput("")

    try {
      // Call the API to get a response
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      // Add the response to messages
      const aiMessage: Message = { role: "assistant", content: data.response }
      setMessages((prevMessages) => [...prevMessages, aiMessage])

      // If voice mode is on, speak the response
      if (isListening) {
        stopListening()
      }
      if (isSpeechToTextOn.current) {
        speakText(data.response)
      }
    } catch (error) {
      console.error("Error getting chat response:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "I'm having trouble accessing Amit's information right now. Please try again later.",
      }
      setMessages((prevMessages) => [...prevMessages, errorMessage])

      // If voice mode is on, speak the error message
      if (isSpeechToTextOn.current) {
        speakText(errorMessage.content)
      }
    } finally {
      setIsTyping(false)
    }
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
                <FaRobot className="mr-2" /> AmitBot 9000
              </h3>
              <div className="flex items-center">
                <button onClick={toggleDarkMode} className="mr-4 hover:text-gray-300 transition-colors">
                  {darkMode ? <FaSun /> : <FaMoon />}
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:text-gray-300 transition-colors">
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Chat content area */}
            <div className={`flex-grow overflow-y-auto p-4 ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
              {voiceMode ? (
                // Voice mode UI - only show voice animation
                <div className="h-full flex flex-col items-center justify-center">
                  <motion.div
                    className={`p-8 rounded-full ${darkMode ? "bg-gray-800" : "bg-blue-100"} mb-4`}
                    animate={
                      isListening
                        ? {
                            scale: [1, 1.2, 1],
                            boxShadow: [
                              "0px 0px 0px rgba(0,0,0,0)",
                              "0px 0px 20px rgba(59,130,246,0.5)",
                              "0px 0px 0px rgba(0,0,0,0)",
                            ],
                          }
                        : isSpeaking
                          ? { scale: [1, 1.1, 1] }
                          : isDebouncing
                            ? {
                                scale: [1, 1.05, 1],
                                boxShadow: [
                                  "0px 0px 0px rgba(0,0,0,0)",
                                  "0px 0px 10px rgba(245,158,11,0.5)",
                                  "0px 0px 0px rgba(0,0,0,0)",
                                ],
                              }
                            : {}
                    }
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  >
                    {isListening ? (
                      <FaMicrophone className={`text-4xl ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                    ) : isSpeaking ? (
                      <FaVolumeUp className={`text-4xl ${darkMode ? "text-green-400" : "text-green-600"}`} />
                    ) : isDebouncing ? (
                      <FaMicrophone className={`text-4xl ${darkMode ? "text-amber-400" : "text-amber-600"}`} />
                    ) : (
                      <FaMicrophone className={`text-4xl ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
                    )}
                  </motion.div>
                  <p className={`text-center ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {isListening
                      ? "Listening... Speak now"
                      : isSpeaking
                        ? "Speaking..."
                        : isDebouncing
                          ? "Processing..."
                          : "Voice mode active. Tap the microphone to speak."}
                  </p>
                  {input && (isListening || isDebouncing) && (
                    <div className={`mt-4 p-3 rounded ${darkMode ? "bg-gray-800" : "bg-white"} max-w-xs text-center`}>
                      <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} text-sm`}>{input}</p>
                    </div>
                  )}
                </div>
              ) : (
                // Regular chat UI
                <>
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
                          AmitBot 9000 is thinking...
                        </motion.span>
                      </span>
                    </div>
                  )}
                </>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className={`p-4 border-t ${darkMode ? "border-gray-600 bg-gray-800" : "border-gray-200"}`}>
              {!voiceMode && (
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
              )}
              <form onSubmit={handleFormSubmit}>
                <div className="flex items-center">
                  {!voiceMode && (
                    <input
                      type="text"
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Ask about Amit..."
                      className={`flex-grow px-3 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
                      }`}
                    />
                  )}
                  <button
                    type="button"
                    onClick={toggleVoiceMode}
                    className={`${voiceMode ? "rounded-l-lg" : ""} px-3 py-2 ${
                      voiceMode
                        ? isListening
                          ? "bg-green-500 hover:bg-green-600"
                          : isSpeaking
                            ? "bg-blue-500 hover:bg-blue-600"
                            : isDebouncing
                              ? "bg-amber-500 hover:bg-amber-600"
                              : "bg-gray-500 hover:bg-gray-600"
                        : darkMode
                          ? "bg-gray-600 hover:bg-gray-500"
                          : "bg-gray-300 hover:bg-gray-400"
                    } text-white transition-colors relative`}
                  >
                    <FaMicrophone />
                    {isSpeaking && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.8 }}
                      />
                    )}
                  </button>
                  {!voiceMode && (
                    <button
                      type="submit"
                      className={`${darkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"} text-white px-4 py-2 rounded-r-lg transition-colors`}
                    >
                      <FaPaperPlane />
                    </button>
                  )}
                </div>
              </form>
              {voiceMode && (
                <div className={`mt-2 text-xs text-center ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {isListening
                    ? "Listening... Speak now"
                    : isSpeaking
                      ? "Listening to response..."
                      : isDebouncing
                        ? "Processing your question..."
                        : "Tap microphone to speak"}
                </div>
              )}
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
            className="absolute left-1/2 -translate-x-1/2 -top-12 bg-white text-blue-600 px-2 py-1 rounded-lg text-sm whitespace-nowrap shadow-md"
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

