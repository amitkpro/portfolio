"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useDarkMode } from "../DarkModeContext"
import { useLanguage, languages } from "../LanguageContext"
import { FaMoon, FaSun, FaBars, FaTimes, FaGlobe } from "react-icons/fa"

const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkMode()
  const { language, setLanguage, t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (languageMenuOpen) setLanguageMenuOpen(false)
  }

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen)
    if (mobileMenuOpen) setMobileMenuOpen(false)
  }

  const handleLanguageChange = (lang: (typeof languages)[0]) => {
    setLanguage(lang)
    setLanguageMenuOpen(false)
  }

  const menuItems = [
    { key: "about", href: "#about" },
    { key: "skills", href: "#skills" },
    { key: "experience", href: "#experience" },
    { key: "projects", href: "#projects" },
    { key: "contact", href: "#contact" },
  ]

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? "py-2" : "py-3"
      } transition-all duration-300 ${darkMode ? "bg-gray-900 shadow-lg" : "bg-white shadow-md"}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <nav className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link href="/" className={`${darkMode ? "text-white" : "text-gray-800"}`}>
              AK
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <ul className="flex justify-center space-x-6 mr-4">
              {menuItems.map((item) => (
                <motion.li key={item.key} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={item.href}
                    className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-800 hover:text-blue-600"}`}
                  >
                    {t(`header.${item.key}`)}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Language Selector */}
            <div className="relative mr-4">
              <motion.button
                onClick={toggleLanguageMenu}
                className={`p-2 rounded-full ${
                  darkMode
                    ? "bg-gray-800 text-gray-300 hover:text-white"
                    : "bg-gray-200 text-gray-700 hover:text-gray-900"
                } flex items-center`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGlobe />
                <span className="ml-2 text-sm">{language.code.toUpperCase()}</span>
              </motion.button>

              {languageMenuOpen && (
                <motion.div
                  className={`absolute right-0 mt-2 py-2 w-48 rounded-md shadow-lg ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } ring-1 ring-black ring-opacity-5 z-50 max-h-96 overflow-y-auto`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language.code === lang.code
                          ? darkMode
                            ? "bg-gray-700 text-white"
                            : "bg-gray-100 text-blue-600"
                          : darkMode
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {lang.nativeName} ({lang.code.toUpperCase()})
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full ${darkMode ? "bg-gray-800 text-yellow-300" : "bg-gray-200 text-gray-700"}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </motion.button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center md:hidden">
            {/* Language Selector Mobile */}
            <motion.button
              onClick={toggleLanguageMenu}
              className={`p-2 mr-2 rounded-full ${
                darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-200 text-gray-700"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGlobe />
            </motion.button>

            {/* Dark Mode Toggle Mobile */}
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2 mr-2 rounded-full ${darkMode ? "bg-gray-800 text-yellow-300" : "bg-gray-200 text-gray-700"}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-full ${darkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-700"}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            className={`md:hidden mt-4 py-2 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-2 rounded ${
                      darkMode
                        ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                        : "text-gray-800 hover:bg-gray-100 hover:text-blue-600"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(`header.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Language Menu Mobile */}
        {languageMenuOpen && (
          <motion.div
            className={`md:hidden mt-4 py-2 rounded-lg ${darkMode ? "bg-gray-800" : "bg-white"} max-h-60 overflow-y-auto`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang)}
                className={`block w-full text-left px-4 py-2 ${
                  language.code === lang.code
                    ? darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-blue-600"
                    : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {lang.nativeName} ({lang.code.toUpperCase()})
              </button>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}

export default Header
