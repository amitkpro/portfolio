"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const Header = () => {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <nav className="container mx-auto px-6 py-3">
        <ul className="flex justify-center space-x-6">
          {["About", "Skills", "Experience", "Projects", "Contact"].map((item) => (
            <motion.li key={item} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Link href={`#${item.toLowerCase()}`} className="text-gray-800 hover:text-blue-600">
                {item}
              </Link>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}

export default Header

