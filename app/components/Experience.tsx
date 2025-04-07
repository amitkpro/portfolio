"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaCalendarAlt, FaChevronDown, FaChevronUp, FaBriefcase, FaLaptopCode } from "react-icons/fa"
import { useDarkMode } from "../DarkModeContext"

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Kindlebit Solution Pvt Ltd",
    period: "January 2022 - Present",
    description: [
      "Developed responsive, scalable client applications, increasing user engagement by 30% and enhancing workflow efficiency.",
      "Collaborated with cross-functional teams to address user pain points and improve UX, ensuring smooth front-end and back-end integration.",
      "Led projects from design through deployment, reviewing code for quality and scalability, and mentoring junior developers in best practices.",
      "Improved application performance through code optimization, reducing load times by 25% and implementing secure data handling practices.",
      "Integrated AI-powered solutions to enhance application intelligence and improve user experience.",
    ],
  },
  {
    title: "Node.js Developer (Internship)",
    company: "AVIPL",
    period: "August 2021 - November 2021",
    description: [
      "Developed secure and efficient APIs for e-commerce and educational platforms, enhancing functionality and user experience.",
      "Implemented authentication and authorization features using JWT, improving application security.",
      "Optimized database queries and API responses, reducing latency and improving overall system efficiency.",
    ],
  },
]

const projects = [
  {
    title: "InsiderHealth AI",
    overview: "An AI-powered health platform offering personalized health insights.",
    techStack: "Next.js (TypeScript), MySQL, AI models",
    role: "Full Stack Developer",
    contributions: [
      "Integrated ChatGPT & Perplexity AI for smart health suggestions.",
      "Developed a custom diet planner and health tracking dashboard.",
    ],
  },
  {
    title: "Druyp Project - House Renting Platform",
    overview:
      "A comprehensive platform designed to simplify the house renting process for tenants, homeowners, and service providers.",
    techStack: "Node.js, MSSQL with Sequelize ORM, Elasticsearch, React.js, Socket.IO",
    role: "Full Stack Developer",
    contributions: [
      "Implemented server-side logic, database management, and advanced search functionalities.",
      "Played a critical role in developing features that streamlined the rental experience, ensuring high standards of maintenance and user satisfaction.",
    ],
  },
  {
    title: "Crypto Market Platform - Tradix",
    overview:
      "A mobile and web application designed to provide users with real-time insights and tools for crypto trading.",
    techStack: "React.js for the web platform, React Native for the mobile application, PHP",
    role: "Frontend Developer (React.js), Frontend React Native Developer",
    contributions: [
      "Developed and led key features for a crypto trading platform, enhancing mobile and web app user engagement through real-time chat, data visualization, and personalized alerts.",
      "Improved UI/UX and integrated advanced trading tools, ensuring a seamless, cohesive user experience across platforms.",
    ],
  },
  {
    title: "Perk Tool - Learning Management System",
    overview:
      "Led the creation of an interactive LMS, improving the digital learning environment for students, teachers, and administrators.",
    techStack: "React.js, Ant Design",
    role: "Frontend Developer",
    contributions: [
      "Spearheaded frontend development, introducing intuitive UI/UX designs and collaborating with backend teams for feature integration.",
    ],
  },
]

const ExperienceCard = ({ experience, index }: { experience: (typeof experiences)[0]; index: number }) => {
  const [isOpen, setIsOpen] = useState(true)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })
  const { darkMode } = useDarkMode()

  return (
    <motion.div
      ref={cardRef}
      className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} rounded-lg shadow-md overflow-hidden mb-6`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <motion.div
              className={`mr-3 p-2 rounded-full ${darkMode ? "bg-blue-600" : "bg-blue-100"}`}
              whileHover={{ rotate: 15 }}
            >
              <FaBriefcase className={darkMode ? "text-white" : "text-blue-600"} />
            </motion.div>
            <h3 className="text-xl font-semibold">{experience.title}</h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </motion.div>
        </div>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-2`}>{experience.company}</p>
        <div className={`flex items-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          <FaCalendarAlt className="mr-2" />
          <span>{experience.period}</span>
        </div>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <ul className={`list-disc list-inside space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {experience.description.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}

const ProjectCard = ({ project, index }: { project: (typeof projects)[0]; index: number }) => {
  const [isOpen, setIsOpen] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })
  const { darkMode } = useDarkMode()

  return (
    <motion.div
      ref={cardRef}
      className={`${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} rounded-lg shadow-md overflow-hidden mb-6`}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <motion.div
              className={`mr-3 p-2 rounded-full ${darkMode ? "bg-purple-600" : "bg-purple-100"}`}
              whileHover={{ rotate: 15 }}
            >
              <FaLaptopCode className={darkMode ? "text-white" : "text-purple-600"} />
            </motion.div>
            <h3 className="text-xl font-semibold">{project.title}</h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </motion.div>
        </div>
        <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-2`}>{project.overview}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} mb-2`}>
            <strong>Tech Stack:</strong> {project.techStack}
          </p>
          <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            <strong>Role:</strong> {project.role}
          </p>
        </div>
      </div>
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <h4 className={`font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>Contributions:</h4>
          <ul className={`list-disc list-inside space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
            {project.contributions.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Experience = () => {
  const { darkMode } = useDarkMode()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <motion.section
      id="experience"
      ref={sectionRef}
      className={`py-20 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className={`text-3xl font-bold mb-12 text-center ${darkMode ? "text-white" : "text-gray-800"}`}
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Work Experience
        </motion.h2>
        <div className="mb-12">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
        <motion.h2
           id="projects"
          className={`text-3xl font-bold mb-12 text-center ${darkMode ? "text-white" : "text-gray-800"}`}
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Projects
        </motion.h2>
        <div>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Experience

