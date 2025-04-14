"use client"

import { motion } from "framer-motion"
import { useDarkMode } from "../DarkModeContext"
import { useLanguage } from "../LanguageContext"

const About = () => {
  const { darkMode } = useDarkMode()
  const { t } = useLanguage()

  return (
    <motion.section
      id="about"
      className={`py-20 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">{t("about.title")}</h2>
        <motion.p
          className={`text-lg max-w-3xl mx-auto ${darkMode ? "text-gray-300" : "text-gray-700"}`}
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          {t("about.description")}
        </motion.p>
      </div>
    </motion.section>
  )
}

export default About
