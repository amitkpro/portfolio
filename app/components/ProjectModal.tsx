"use client"

import { motion, AnimatePresence } from "framer-motion"
import { FaTimes } from "react-icons/fa"
import type React from "react" // Added import for React

interface ProjectModalProps {
  project: {
    title: string
    description: string
    techStack: string
    role: string
    contributions: string[]
  }
  onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <FaTimes size={24} />
            </button>
          </div>
          <p className="text-gray-700 mb-4">{project.description}</p>
          <p className="text-gray-600 mb-2">
            <strong>Tech Stack:</strong> {project.techStack}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Role:</strong> {project.role}
          </p>
          <h4 className="text-xl font-semibold mb-2">Key Contributions:</h4>
          <ul className="list-disc list-inside space-y-2">
            {project.contributions.map((contribution, index) => (
              <li key={index} className="text-gray-700">
                {contribution}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ProjectModal

