"use client"

import { useEffect, useState } from "react"
import { useDarkMode } from "../DarkModeContext"

const ParticleBackground = () => {
  const [particles, setParticles] = useState<
    Array<{ id: number; size: number; left: number; top: number; duration: number }>
  >([])
  const { darkMode } = useDarkMode()

  useEffect(() => {
    const createParticles = () => {
      const newParticles = []
      for (let i = 0; i < 20; i++) {
        newParticles.push({
          id: i,
          size: Math.random() * 5 + 1,
          left: Math.random() * 100,
          top: Math.random() * 100,
          duration: Math.random() * 10 + 10,
        })
      }
      setParticles(newParticles)
    }

    createParticles()
    const interval = setInterval(createParticles, 10000) // Recreate particles every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`particles ${darkMode ? "dark" : ""}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  )
}

export default ParticleBackground

