"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import ProjectCard from "./ProjectCard"
import { useDarkMode } from "../DarkModeContext"

const projects = [
  {
    title: "Druyp Project - House Renting Website",
    description:
      "A comprehensive platform designed to simplify the house renting process for tenants, homeowners, and service providers.",
    techStack: "Node.js, MSSQL with Sequelize ORM, Elasticsearch, React.js",
    role: "Backend Developer",
    contributions: [
      "Implemented server-side logic and database management using Node.js and MSSQL with Sequelize ORM.",
      "Developed advanced search functionalities using Elasticsearch to improve user experience.",
      "Designed and implemented RESTful APIs for seamless communication between frontend and backend.",
      "Optimized database queries and implemented caching strategies to improve application performance.",
    ],
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Crypto Market Project: Mobile App (Tradix V1) & Advanced Trading Web Platform",
    description:
      "A mobile and web application designed to provide users with real-time insights and tools for crypto trading.",
    techStack: "React.js for the web platform, React Native for the mobile application, PHP",
    role: "Frontend Developer (React.js), Frontend React Native Developer",
    contributions: [
      "Developed key features for the crypto trading platform using React.js and React Native.",
      "Implemented real-time chat functionality to enhance user engagement and communication.",
      "Created interactive data visualization components for displaying complex trading information.",
      "Designed and implemented a responsive UI that provides a consistent user experience across web and mobile platforms.",
      "Integrated advanced trading tools and real-time market data feeds.",
    ],
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "Perk Tool (Learning Management System)",
    description:
      "Led the creation of an interactive LMS, improving the digital learning environment for students, teachers, and administrators.",
    techStack: "React.js, Ant Design",
    role: "Frontend Developer",
    contributions: [
      "Designed and implemented an intuitive user interface using React.js and Ant Design components.",
      "Developed interactive features such as quizzes, progress tracking, and discussion forums.",
      "Implemented a responsive design to ensure a seamless experience across desktop and mobile devices.",
      "Collaborated with backend developers to integrate APIs and ensure smooth data flow.",
      "Implemented state management using Redux to handle complex application state.",
    ],
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
  {
    title: "CS Online Learning Management System",
    description: "Developed a comprehensive platform for educational administration tasks.",
    techStack: "MERN Stack (MongoDB, Express.js, React.js, Node.js)",
    role: "Frontend Developer",
    contributions: [
      "Built a responsive and intuitive frontend using React.js for managing educational resources and administrative functions.",
      "Implemented user authentication and authorization features to ensure data security.",
      "Developed interactive dashboards for students, teachers, and administrators to track progress and manage courses.",
      "Integrated real-time notifications and messaging features to improve communication within the platform.",
      "Collaborated with the backend team to design and consume RESTful APIs for data management.",
    ],
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
]

const Projects = () => {
  const { darkMode } = useDarkMode()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <motion.section
      // id="projects"
      ref={sectionRef}
      className={`py-20 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-6">
        <motion.h2
          className={`text-3xl font-bold mb-8 text-center ${darkMode ? "text-white" : "text-gray-800"}`}
          initial={{ y: -20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Projects

