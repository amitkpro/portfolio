"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import Header from "./components/Header"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Experience from "./components/Experience"
// import Projects from "./components/Projects"
import Contact from "./components/Contact"
import CursorTrailer from "./components/CursorTrailer"

export default function Home() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start("visible")
  }, [controls])

  return (
    <main className="min-h-screen bg-gray-100">
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
        {/* <Projects /> */}
        <Contact />
      </motion.div>
    </main>
  )
}

