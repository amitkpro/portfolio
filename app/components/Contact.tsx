"use client"

import { motion } from "framer-motion"
import { FaEnvelope, FaPhone, FaLinkedin, FaMedium, FaGithub } from "react-icons/fa"
import { useDarkMode } from "../DarkModeContext"

const Contact = () => {
  const { darkMode } = useDarkMode()

  const contactInfo = [
    { icon: FaEnvelope, text: "amitkpro222@gmail.com", href: "mailto:amitkpro222@gmail.com" },
    { icon: FaPhone, text: "+91 7657807660", href: "tel:+917657807660" },
    { icon: FaLinkedin, text: "linkedin.com/in/amitkpro", href: "https://www.linkedin.com/in/amitkpro" },
    { icon: FaMedium, text: "medium.com/@amitkpro", href: "https://medium.com/@amitkpro" },
    { icon: FaGithub, text: "github.com/amitkpro", href: "https://github.com/amitkpro" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  return (
    <motion.section
      id="contact"
      className={`py-20 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-6">
        <motion.h2 className="text-4xl font-bold mb-12 text-center" variants={itemVariants}>
          Get in Touch
        </motion.h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto" variants={containerVariants}>
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 ${
                darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
              }`}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <info.icon className={`text-3xl mr-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
              <span className="text-lg">{info.text}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}

export default Contact

