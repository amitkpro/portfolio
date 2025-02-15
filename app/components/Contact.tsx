"use client"

import { motion } from "framer-motion"

const Contact = () => {
  return (
    <motion.section
      id="contact"
      className="py-20 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
        <div className="max-w-md mx-auto">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-700">amitkpro222@gmail.com</p>
          </motion.div>
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p className="text-gray-700">+91 7657807660</p>
          </motion.div>
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-2">LinkedIn</h3>
            <a
              href="https://www.linkedin.com/in/amitkpro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              www.linkedin.com/in/amitkpro
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-2">Medium</h3>
            <a
              href="https://medium.com/@amitkpro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              medium.com/@amitkpro
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact

