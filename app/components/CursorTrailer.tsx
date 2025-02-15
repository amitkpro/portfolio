"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const CursorTrailer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  return (
    <>
      <motion.div
        className="w-6 h-6 bg-blue-500 rounded-full fixed pointer-events-none z-50 mix-blend-difference"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="w-12 h-12 border-2 border-purple-500 rounded-full fixed pointer-events-none z-50"
        animate={{ x: mousePosition.x - 24, y: mousePosition.y - 24 }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  )
}

export default CursorTrailer

