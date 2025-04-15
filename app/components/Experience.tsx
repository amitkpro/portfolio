"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { FaCalendarAlt, FaChevronDown, FaChevronUp, FaBriefcase, FaLaptopCode } from "react-icons/fa"
import { useDarkMode } from "../DarkModeContext"
import { useLanguage } from "../LanguageContext"

const Experience = () => {
  const { darkMode } = useDarkMode()
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })

  // Define experiences with translation keys
  const experiences = [
    {
      title: "experience.fullStackDeveloper",
      company: "experience.kindlebit",
      period: "experience.kindlebitPeriod",
      description: [
        "experience.kindlebitDescription1",
        "experience.kindlebitDescription2",
        "experience.kindlebitDescription3",
        "experience.kindlebitDescription4",
        "experience.kindlebitDescription5",
      ],
    },
    {
      title: "experience.nodeJsDeveloper",
      company: "experience.avipl",
      period: "experience.aviplPeriod",
      description: ["experience.aviplDescription1", "experience.aviplDescription2", "experience.aviplDescription3"],
    },
  ]

  // Define projects with translation keys
  const projects = [
    {
      title: "experience.insiderHealth.title",
      overview: "experience.insiderHealth.overview",
      techStack: "experience.insiderHealth.techStack",
      role: "experience.insiderHealth.role",
      contributions: ["experience.insiderHealth.contributions.contribution1", "experience.insiderHealth.contributions.contribution2"],
    },
    {
      title: "experience.druyp.title",
      overview: "experience.druyp.overview",
      techStack: "experience.druyp.techStack",
      role: "experience.druyp.role",
      contributions: ["experience.druyp.contributions.contribution1", "experience.druyp.contributions.contribution2"],
    },
    {
      title: "experience.tradix.title",
      overview: "experience.tradix.overview",
      techStack: "experience.tradix.techStack",
      role: "experience.tradix.role",
      contributions: ["experience.tradix.contributions.contribution1", "experience.tradix.contributions.contribution2"],
    },
    {
      title: "experience.perkTool.title",
      overview: "experience.perkTool.overview",
      techStack: "experience.perkTool.techStack",
      role: "experience.perkTool.role",
      contributions: ["experience.perkTool.contributions.contribution1"],
    },
  ]

  const ExperienceCard = ({ experience, index }: { experience: (typeof experiences)[0]; index: number }) => {
    const [isOpen, setIsOpen] = useState(true)
    const cardRef = useRef(null)
    const isInView = useInView(cardRef, { once: true, amount: 0.3 })

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
              <h3 className="text-xl font-semibold">{t(experience.title)}</h3>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </motion.div>
          </div>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-2`}>{t(experience.company)}</p>
          <div className={`flex items-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            <FaCalendarAlt className="mr-2" />
            <span>{t(experience.period)}</span>
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
                  {t(item)}
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
              <h3 className="text-xl font-semibold">{t(project.title)}</h3>
            </div>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={`p-2 rounded-full ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-100 hover:bg-gray-200"}`}
            >
              {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </motion.div>
          </div>
          <p className={`${darkMode ? "text-gray-300" : "text-gray-600"} mb-2`}>{t(project.overview)}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
            <p className={`${darkMode ? "text-gray-400" : "text-gray-500"} mb-2`}>
              <strong>{t("experience.techStack")}:</strong> {t(project.techStack)}
            </p>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              <strong>{t("experience.role")}:</strong> {t(project.role)}
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
            <h4 className={`font-semibold mb-2 ${darkMode ? "text-gray-200" : "text-gray-800"}`}>
              {t("experience.contributions")}:
            </h4>
            <ul className={`list-disc list-inside space-y-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              {project.contributions.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  {t(item)}
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    )
  }

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
          {t("experience.title")}
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
          {t("experience.projects")}
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
