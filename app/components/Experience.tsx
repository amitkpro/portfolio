"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaCalendarAlt, FaChevronDown, FaChevronUp } from "react-icons/fa"

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

const ExperienceCard = ({ experience }: { experience: (typeof experiences)[0] }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{experience.title}</h3>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </motion.div>
        </div>
        <p className="text-gray-600 mb-2">{experience.company}</p>
        <div className="flex items-center text-gray-500">
          <FaCalendarAlt className="mr-2" />
          <span>{experience.period}</span>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {experience.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden mb-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isOpen ? <FaChevronUp /> : <FaChevronDown />}
          </motion.div>
        </div>
        <p className="text-gray-600 mb-2">{project.overview}</p>
        <p className="text-gray-500 mb-2">
          <strong>Tech Stack:</strong> {project.techStack}
        </p>
        <p className="text-gray-500">
          <strong>Role:</strong> {project.role}
        </p>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6">
              <h4 className="font-semibold mb-2">Contributions:</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {project.contributions.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const Experience = () => {
  return (
    <motion.section
      id="experience"
      className="py-20 bg-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">Work Experience</h2>
        <div className="mb-12">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}
        </div>
        <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
        <div>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Experience

