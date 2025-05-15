import { motion } from 'framer-motion'

export default function SVGPortrait({ draw }) {
  return (
    <motion.svg
      width="340"
      height="340"
      viewBox="0 0 340 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mb-8"
      style={{ position: 'relative' }}
    >
      <motion.image
        href="/face.svg"
        x="40" y="20" width="260" height="300"
        style={{ filter: 'invert(1) brightness(1000%)' }}
        initial={{ opacity: 0, scale: 0.95, filter: 'invert(1) brightness(1000%) blur(6px)' }}
        animate={draw ? { opacity: 1, scale: 1, filter: 'invert(1) brightness(1000%) blur(0px)' } : { opacity: 0, scale: 0.95, filter: 'invert(1) brightness(1000%) blur(6px)' }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />
    </motion.svg>
  )
}

