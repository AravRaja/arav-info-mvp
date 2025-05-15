import { motion } from 'framer-motion'

export default function Header() {
  return (
    <a href="#" className="fixed top-5 left-6 z-50 font-mono text-white text-lg select-none">
      <motion.span
        whileHover={{
          textShadow: '0 0 8px #43B0F1, 0 0 2px #fff',
          scale: 1.08,
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        arav.info
      </motion.span>
    </a>
  )
}
