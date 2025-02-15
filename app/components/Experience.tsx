"use client"

import { motion } from "framer-motion"
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa"

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Kindlebit Solution Pvt Ltd",
    period: "Jan 2022 - Present",
    description: [
      "Spearheaded the development of dynamic web and mobile applications, enhancing user engagement and operational efficiency.",
      "Collaborated with cross-functional teams to define project requirements, design solutions, and integrate front-end and back-end technologies.",
      "Optimized application performance and scalability, implementing best practices in code quality and data security.",
      "Contributed to agile project management processes, improving team productivity and project deliverables.",
    ],
  },
  {
    title: "Node.js Developer (Intern)",
    company: "AVIPL, Remote",
    period: "August 2021 - November 2021",
    description: [
      "Developed secure and efficient APIs for e-commerce and educational platforms, enhancing functionality and user experience.",
      "Implemented authentication and authorization features using JWT, improving application security.",
      "Supported front-end developers by providing API documentation and integration support, ensuring seamless functionality across application components.",
    ],
  },
]

const ExperienceCard = ({ experience, index }: { experience: (typeof experiences)[0]; index: number }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">{experience.title}</h3>
            <p className="text-gray-600 mb-2">{experience.company}</p>
            <div className="flex items-center text-gray-500 mb-4">
              <FaCalendarAlt className="mr-2" />
              <span>{experience.period}</span>
            </div>
          </div>
          <FaBriefcase className="text-3xl text-blue-500" />
        </div>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {experience.description.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
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
        <div className="grid gap-6 md:grid-cols-2">
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Experience

