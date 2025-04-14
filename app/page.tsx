"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import Header from "./components/Header"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
import Contact from "./components/Contact"
import CursorTrailer from "./components/CursorTrailer"
// Add the useLanguage hook import
import { useLanguage } from "./LanguageContext"

export default function Home() {
  const controls = useAnimation()
  // Inside the Home component, add this line after the existing hooks
  const { language } = useLanguage()

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  // Update the return statement to include the language direction
  return (
    <main className={`min-h-screen bg-gray-100`} dir={language.direction}>
      <CursorTrailer />
      <Header />
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
      >
        <Hero />
        <About />
        <Skills />
        <Experience />
        {/*  <Projects /> */}
        <Contact />
      </motion.div>
    </main>
  )
}
