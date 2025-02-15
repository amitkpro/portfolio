"use client"

import { motion } from "framer-motion"
import { FaJs, FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa"
import {
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiVite,
  SiRedux,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiJest,
  SiMocha,
  SiCypress,
} from "react-icons/si"

const skills = [
  { name: "JavaScript", icon: FaJs, color: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss3, color: "#1572B6" },
  { name: "React.js", icon: FaReact, color: "#61DAFB" },
  { name: "Vite.js", icon: SiVite, color: "#646CFF" },
  { name: "React Native", icon: FaReact, color: "#61DAFB" },
  { name: "Redux", icon: SiRedux, color: "#764ABC" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933" },
  { name: "Express.js", icon: SiExpress, color: "#000000" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "SQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "Git", icon: FaGitAlt, color: "#F05032" },
  { name: "Jest", icon: SiJest, color: "#C21325" },
  { name: "Mocha", icon: SiMocha, color: "#8D6748" },
  { name: "Cypress", icon: SiCypress, color: "#17202C" },
]

const Skills = () => {
  return (
    <motion.section
      id="skills"
      className="py-20 bg-gray-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="bg-white p-4 rounded-full shadow-md flex flex-col items-center justify-center w-24 h-24"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
                backgroundColor: skill.color,
                color: skill.color === "#F7DF1E" || skill.color === "#61DAFB" ? "#000000" : "#FFFFFF",
              }}
            >
              <skill.icon className="text-3xl mb-2" />
              <span className="text-xs text-center">{skill.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Skills

