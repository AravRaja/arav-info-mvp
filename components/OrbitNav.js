import { motion } from 'framer-motion'

const navItems = [
  { label: 'Projects', id: 'projects', color: 'accent-blue' },
  { label: 'Experience', id: 'experience', color: 'accent-purple' },
  { label: 'About', id: 'about', color: 'accent-neon' },
  { label: 'Contact', id: 'contact', color: 'white' },
];

import { useEffect, useRef, useState } from 'react';

export default function OrbitNav({ show, paused, setPaused, setHovered }) {
  // 3D circular orbit, always visible, manual rotation
  // ORBIT RADIUS: Controls how wide the orbit nav is above the SVG portrait
  const orbitRadius = 280; // Increase this value for a wider orbit
  const orbSize = 100;
  const [angle, setAngle] = useState(0); // in degrees
  const animationRef = useRef();
  const normalSpeed = 0.3;
  const slowSpeed = 0.03;
  const [currentSpeed, setCurrentSpeed] = useState(normalSpeed);
  const tilt = 15; // degrees for 3D tilt

  useEffect(() => {
    if (!show) return;
    function animate() {
      setAngle((prev) => prev + currentSpeed);
      animationRef.current = requestAnimationFrame(animate);
    }
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [show, currentSpeed]);

  // Pause on hover/focus, resume on leave/blur
  function handleEnter(id) {
    setPaused(true);
    setHovered(id);
  }
  function handleLeave() {
    setPaused(false);
    setHovered(null);
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 10 }}
    >
      <div
        className="relative w-[320px] h-[180px]"
        style={{
          height: orbSize * 2.5,
          width: orbSize * 5,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt}deg) translateY(-240px)`
        }}
      >
        {navItems.map((item, i) => {
          const orbAngle = ((i / navItems.length) * 360 + angle);
          // 3D ring: rotateY(angle) translateZ(radius), counter-rotateY(-angle) to keep text facing user
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`absolute flex items-center justify-center cursor-pointer font-sans text-lg font-semibold text-white tracking-wide uppercase transition-all focus:outline-none pointer-events-auto hover:text-accent-blue`}
              style={{
                minWidth: 0,
                minHeight: 0,
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotateY(${orbAngle}deg) translateZ(${orbitRadius}px) rotateY(${-orbAngle}deg)`,
                opacity: 1,
                zIndex: 10,
                transition: 'transform 0.2s',
              }}
              tabIndex={0}
              aria-label={item.label}
              onMouseEnter={() => { setCurrentSpeed(slowSpeed); setHovered(item.id); }}
              onMouseLeave={() => { setCurrentSpeed(normalSpeed); setHovered(null); }}
              onFocus={() => { setCurrentSpeed(slowSpeed); setHovered(item.id); }}
              onBlur={() => { setCurrentSpeed(normalSpeed); setHovered(null); }}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
