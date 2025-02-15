"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FaArrowRight } from "react-icons/fa"
import type React from "react" // Added import for React

interface ProjectCardProps {
  project: {
    title: string
    description: string
    techStack: string
    role: string
    contributions: string[]
  }
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="relative w-full h-[400px] perspective-1000">
      <motion.div
        className="w-full h-full transition-all duration-500 preserve-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full backface-hidden bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-700 mb-4">{project.description}</p>
          <p className="text-gray-600 mb-2">
            <strong>Tech Stack:</strong> {project.techStack}
          </p>
          <p className="text-gray-600">
            <strong>Role:</strong> {project.role}
          </p>
          <div className="absolute bottom-4 right-4 text-blue-500 flex items-center">
            <span className="mr-2">View Details</span>
            <FaArrowRight />
          </div>
        </div>

        {/* Back of the card */}
        <div className="absolute w-full h-full backface-hidden bg-blue-100 rounded-lg shadow-md rotate-y-180 flex flex-col">
          <div className="p-6 overflow-y-auto flex-grow">
            <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
            <h4 className="text-lg font-semibold mb-2">Key Contributions:</h4>
            <ul className="list-disc list-inside space-y-2 mb-4">
              {project.contributions.map((contribution, index) => (
                <li key={index} className="text-gray-700">
                  {contribution}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-500 text-white py-2 px-4 flex justify-center items-center cursor-pointer hover:bg-blue-600 transition-colors duration-300">
            <span className="mr-2">Back to Overview</span>
            <FaArrowRight className="rotate-180" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ProjectCard

