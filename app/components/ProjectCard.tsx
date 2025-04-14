"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { FaArrowRight, FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa"
import { useDarkMode } from "../DarkModeContext"
import { useLanguage } from "../LanguageContext"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    techStack: string
    role: string
    contributions: string[]
    imageUrl?: string
    githubUrl?: string
    liveUrl?: string
  }
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })
  const { darkMode } = useDarkMode()
  const { t } = useLanguage()

  const techStackArray = project.techStack.split(", ")

  return (
    <>
      <div ref={cardRef} className="relative w-full h-[400px] perspective-1000">
        <motion.div
          className="w-full h-full transition-all duration-500 preserve-3d cursor-pointer"
          // animate={{ rotateY: isFlipped ? 180 : 0 }}
          onClick={() => setIsFlipped(!isFlipped)}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          {/* Front of the card */}
          <div
            className={`absolute w-full h-full backface-hidden ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} p-6 rounded-lg shadow-md`}
          >
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-700"} mb-4`}>{project.description}</p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"} mb-2`}>
              <strong>{t("experience.techStack")}:</strong> {project.techStack}
            </p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              <strong>{t("experience.role")}:</strong> {project.role}
            </p>
            <div className="absolute bottom-4 right-4 text-blue-500 flex items-center">
              <motion.span
                className="mr-2"
                initial={{ x: -5 }}
                animate={{ x: 0 }}
                transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 0.6 }}
              >
                {t("experience.keyContributions")}
              </motion.span>
              <FaArrowRight />
            </div>
          </div>

          {/* Back of the card */}
          <div
            className={`absolute w-full h-full backface-hidden ${darkMode ? "bg-gray-700 text-white" : "bg-blue-100 text-gray-800"} rounded-lg shadow-md rotate-y-180 flex flex-col`}
          >
            <div className="p-6 overflow-y-auto flex-grow">
              <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
              <h4 className="text-lg font-semibold mb-2">{t("experience.keyContributions")}:</h4>
              <ul className="list-disc list-inside space-y-2 mb-4">
                {project.contributions.map((contribution, index) => (
                  <motion.li
                    key={index}
                    className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {contribution}
                  </motion.li>
                ))}
              </ul>
              <motion.button
                className={`mt-4 px-4 py-2 rounded-md ${darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation()
                  setShowModal(true)
                }}
              >
                {t("experience.keyContributions")}
              </motion.button>
            </div>
            <motion.div
              className={`${darkMode ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-500 text-white hover:bg-blue-600"} py-2 px-4 flex justify-center items-center cursor-pointer transition-colors duration-300 sticky bottom-0`}
              whileHover={{ y: -3 }}
            >
              <span className="mr-2">Back to Overview</span>
              <FaArrowRight className="rotate-180" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Modal for full project details */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto`}
              initial={{ y: -50, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -50, opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className={`${darkMode ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}
                >
                  <FaTimes size={24} />
                </button>
              </div>

              {project.imageUrl && (
                <motion.div
                  className="mb-6 overflow-hidden rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              )}

              <motion.p
                className={`${darkMode ? "text-gray-300" : "text-gray-700"} mb-4`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {project.description}
              </motion.p>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                  {t("experience.techStack")}
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {techStackArray.map((tech, index) => (
                    <motion.span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm ${darkMode ? "bg-gray-700 text-blue-300" : "bg-blue-100 text-blue-800"}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech.trim()}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                  {t("experience.role")}
                </h4>
                <p className={`${darkMode ? "text-gray-300" : "text-gray-700"}`}>{project.role}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <h4 className={`text-xl font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
                  {t("experience.keyContributions")}
                </h4>
                <ul className={`list-disc list-inside space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  {project.contributions.map((contribution, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      {contribution}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="flex gap-4 mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"} transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub /> View Code
                  </motion.a>
                )}
                {project.liveUrl && (
                  <motion.a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2 rounded-md ${darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"} transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </motion.a>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ProjectCard
