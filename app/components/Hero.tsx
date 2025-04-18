"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaFileAlt, FaDownload } from "react-icons/fa"
import { useDarkMode } from "../DarkModeContext"
import { useLanguage } from "../LanguageContext"

const Hero = () => {
  const cvUrl = process.env.NEXT_PUBLIC_CV_URL
  const downloadUrl = process.env.NEXT_PUBLIC_DOWNLOAD_URL
  const { darkMode } = useDarkMode()
  const { t, language } = useLanguage()
  const [typewriterText, setTypewriterText] = useState("")
  const [textIndex, setTextIndex] = useState(0)

  const fullText = t("hero.subtitle")

  useEffect(() => {
    setTypewriterText("")
    setTextIndex(0)
  }, [language])

  useEffect(() => {
    if (textIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setTypewriterText((prevText) => prevText + fullText[textIndex])
        setTextIndex((prevIndex) => prevIndex + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [textIndex, fullText])

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `${downloadUrl}`; 
    link.download = "Amit_Kumar_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <motion.section
      id="hero"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
        style={{
          backgroundImage: darkMode
            ? "linear-gradient(45deg, #1a202c, #2d3748)"
            : "linear-gradient(45deg, #4a00e0, #8e2de2)",
          backgroundSize: "400% 400%",
        }}
      />

      <div className="text-center relative z-10">
        <motion.h1
          className={`text-5xl font-bold mb-4 ${darkMode ? "text-white" : "text-white"}`}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {t("hero.title")}
        </motion.h1>
        <motion.h2
          className={`text-3xl mb-8 ${darkMode ? "text-gray-300" : "text-white"} h-16`} // Added fixed height
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {typewriterText}
          <span className="animate-blink">|</span>
        </motion.h2>
        <div className="flex flex-wrap justify-center space-x-4 px-4">
          <motion.a
            href="#contact"
            className={`${darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white text-purple-600 hover:bg-purple-100"} px-6 py-3 rounded-full font-semibold transition duration-300 flex items-center mb-4 sm:mb-0`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("hero.getInTouch")}
          </motion.a>
          <motion.a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-transparent border-2 border-white text-white hover:bg-white hover:text-purple-600"} px-6 py-3 rounded-full font-semibold transition duration-300 flex items-center mb-4 sm:mb-0`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFileAlt className="mr-2" /> {t("hero.viewCV")}
          </motion.a>
          <motion.button
  onClick={handleDownload}
  className={`${darkMode ? "bg-green-600 text-white hover:bg-green-700" : "bg-green-500 text-white hover:bg-green-600"} px-6 py-3 rounded-full font-semibold transition duration-300 flex items-center`}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  <FaDownload className="mr-2" /> {t("hero.downloadCV")}
</motion.button>
        </div>
      </div>
    </motion.section>
  )
}

export default Hero
