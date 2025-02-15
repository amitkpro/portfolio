"use client"

import { motion } from "framer-motion"
import { FaFileAlt, FaDownload } from "react-icons/fa"

const Hero = () => {
  const cvUrl = "https://drive.google.com/file/d/1lzLWa_WUN_yZ3nY_58YwtjQca_-ABZlv/view?usp=sharing"

  return (
    <motion.section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 20, ease: "linear" }}
        style={{
          backgroundImage: "linear-gradient(45deg, #4a00e0, #8e2de2)",
          backgroundSize: "400% 400%",
        }}
      />

      <div className="text-center relative z-10">
        <motion.h1
          className="text-5xl font-bold mb-4 text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Amit Kumar
        </motion.h1>
        <motion.h2
          className="text-3xl mb-8 text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        >
          Full Stack Developer
        </motion.h2>
        <div className="flex justify-center space-x-4">
          <motion.a
            href="#contact"
            className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-purple-100 transition duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.a>
          <motion.a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFileAlt className="mr-2" /> View CV
          </motion.a>
          <motion.a
            href={cvUrl}
            download="Amit_Kumar_CV.pdf"
            className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition duration-300 flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaDownload className="mr-2" /> Download CV
          </motion.a>
        </div>
      </div>
    </motion.section>
  )
}

export default Hero

