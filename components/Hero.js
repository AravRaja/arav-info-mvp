import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import OrbitNav from './OrbitNav'

export default function Hero() {
  const [booted, setBooted] = useState(false)
  const [hovered, setHovered] = useState(null) // nav id or null
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 2200)
    return () => clearTimeout(timer)
  }, [])

  // Easily changeable base color
  const baseColor = '#181A1B';
  // Aesthetic accent colors for each nav orb
  const orbColors = {
    projects: '#43B0F1',
    experience: '#A259F7',
    about: '#39FF14',
    contact: '#fff',
  };

  // Track color influences for each orb
  const [influences, setInfluences] = useState({
    projects: 0,
    experience: 0,
    about: 0,
    contact: 0,
  });
  // Track which orb is currently hovered
  const [hovering, setHovering] = useState(null);

  // Blending and decay logic
  useEffect(() => {
    let frame;
    function step() {
      setInfluences(prev => {
        let next = { ...prev };
        // Decay all influences
        for (const key in next) {
          next[key] = Math.max(0, next[key] - 0.0005); // even slower decay
        }
        // If hovering, increase that influence
        if (hovering && next[hovering] < 1) {
          next[hovering] = Math.min(1, next[hovering] + 0.006); // much slower ramp-up
        }
        return next;
      });
      frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [hovering]);

  // Blend baseColor with orb colors by their influences
  function hexToRgb(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    const num = parseInt(hex, 16);
    return [num >> 16 & 255, num >> 8 & 255, num & 255];
  }
  function rgbToHex([r, g, b]) {
    return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
  }
  function blendColors(base, influences, orbColors) {
    let baseRgb = hexToRgb(base);
    let total = 1;
    let rgb = baseRgb.map(x => x * 1);
    for (const key in influences) {
      if (influences[key] > 0.01) {
        const orbRgb = hexToRgb(orbColors[key]);
        rgb = rgb.map((c, i) => c + orbRgb[i] * influences[key]);
        total += influences[key];
      }
    }
    rgb = rgb.map(x => Math.round(x / total));
    return rgbToHex(rgb);
  }
  const blendedBg = blendColors(baseColor, influences, orbColors);

  return (
    <section className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
      <AnimatePresence>
        {!booted && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-white z-20"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.span
              className="font-mono text-lg text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              {'> booting up arav.info...'}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className={`relative flex flex-col items-center justify-center w-full h-full transition-colors`}
        animate={{ backgroundColor: blendedBg }}
        transition={{ duration: 0.7 }}
      >
        <OrbitNav
          show={booted}
          paused={paused}
          setPaused={setPaused}
          setHovered={setHovering}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={booted ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 1 }}
        >
        </motion.div>
      {/* Color indicator bottom left */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded border border-white" style={{ background: blendedBg }}></span>
          <span className="font-mono text-xs text-white bg-black/60 px-2 py-1 rounded">{blendedBg.toUpperCase()}</span>
        </div>
        <div className="flex gap-1 items-end h-4">
          {Object.keys(orbColors).map(key => (
            <div key={key} title={key}
              style={{
                width: 18,
                height: `${Math.round(24 * influences[key])}px`,
                background: orbColors[key],
                opacity: influences[key] > 0.01 ? 0.85 : 0.25,
                borderRadius: 2,
                border: '1px solid #fff',
                transition: 'height 0.2s, opacity 0.2s',
              }}
            />
          ))}
        </div>
      </div>
      </motion.div>
    </section>
  )
}
