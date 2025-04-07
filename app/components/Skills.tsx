"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useDarkMode } from "../DarkModeContext"
import { FaMoon, FaSun } from "react-icons/fa"

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode()

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? "bg-gray-900 shadow-lg" : "bg-white shadow-md"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link href="/" className={`${darkMode ? "text-white" : "text-gray-800"}`}>
              AK
            </Link>
          </div>
          <div className="flex items-center">
            <ul className="flex justify-center space-x-6 mr-4">
              {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
                <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-800 hover:text-blue-600"}`}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? "bg-gray-800 text-yellow-300" : "bg-gray-200 text-gray-700"}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </motion.button>
          </div>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header

