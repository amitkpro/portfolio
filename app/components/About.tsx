"use client"

import { motion } from "framer-motion"

const About = () => {
  return (
    <motion.section
      id="about"
      className="py-20 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
        <motion.p
          className="text-lg text-gray-700 max-w-3xl mx-auto"
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          A proficient Full Stack Developer with 2+ years of experience in both front-end and back-end development. I
          specialize in developing user-centric applications and leading projects from conception to deployment. My
          expertise lies in collaborative teamwork and leveraging innovative technologies to achieve project excellence.
          I'm passionate about delivering efficient, maintainable code for long-term use and continuously improving my
          skills in the ever-evolving tech landscape.
        </motion.p>
      </div>
    </motion.section>
  )
}

export default About

