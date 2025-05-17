import { motion } from 'framer-motion'

const navItems = [
  { label: 'Projects', id: 'projects', color: 'accent-blue' },
  { label: 'Experience', id: 'experience', color: 'accent-purple' },
  { label: 'About', id: 'about', color: 'accent-neon' },
  { label: 'Contact', id: 'contact', color: 'white' },
];

import { useEffect, useRef, useState } from 'react';

export default function OrbitNav({ show, paused, setPaused, setHovered, hovered }) {
  // State for orbit/nav color
  const [orbitColor, setOrbitColor] = useState('#bbb');
  // 3D circular orbit, always visible, manual rotation
  // ORBIT RADIUS: Controls how wide the orbit nav is above the SVG portrait
  const orbitRadius = 280; // Increase this value for a wider orbit
  const orbSize = 100;
  const [angle, setAngle] = useState(0); // in degrees
  const animationRef = useRef();
  // Animation speeds
  const normalSpeed = 0.06; // slowed down from 0.12
  const slowSpeed = 0.015;  // slowed down from 0.03
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

  // Helper to get node 2D positions
  function getNode2D(idx, angleOverride = null) {
    const orbAngle = ((idx / navItems.length) * 360 + (angleOverride !== null ? angleOverride : angle));
    const rad = (orbAngle * Math.PI) / 180;
    // 3D coordinates before tilt
    const x3d = orbitRadius * Math.sin(rad);
    const y3d = 0;
    const z3d = orbitRadius * Math.cos(rad);
    // Apply tilt (rotation around X axis)
    const tiltRad = tilt * Math.PI / 180;
    const y3d_tilt = y3d * Math.cos(tiltRad) - z3d * Math.sin(tiltRad);
    // const z3d_tilt = y3d * Math.sin(tiltRad) + z3d * Math.cos(tiltRad);
    // Project to 2D SVG
    const centerX = (orbSize * 5) / 2;
    const centerY = (orbSize * 2.5) / 2;
    const x2d = centerX + x3d;
    const y2d = centerY + y3d_tilt;
    return { x: x2d, y: y2d };
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {/* Color slider UI - only visible when show is true */}
      {show && (
        <div style={{ position: 'absolute', top: 16, right: 32, zIndex: 100, pointerEvents: 'auto', background: 'rgba(24,24,24,0.95)', borderRadius: 8, padding: '8px 16px', boxShadow: '0 2px 8px #0008', display: 'flex', alignItems: 'center', gap: 10 }}>
          <label htmlFor="orbit-color-slider" style={{ color: '#fff', fontFamily: 'monospace', fontSize: 14 }}>Nav Color:</label>
          <input
            id="orbit-color-slider"
            type="color"
            value={orbitColor}
            onChange={e => setOrbitColor(e.target.value)}
            style={{ width: 36, height: 36, border: 'none', background: 'none', cursor: 'pointer' }}
          />
        </div>
      )}

      <div
        className="relative w-[320px] h-[180px] flex items-center justify-center"
        style={{
          height: orbSize * 2.5,
          width: orbSize * 5,
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt}deg)`
        }}
      >
        {/* Central technical sphere: horizontally flat ellipse, dotted outline, no fill */}
        <svg
          className="absolute left-1/2 top-1/2"
          style={{
            transform: 'translate(-50%, -50%)',
            zIndex: 6,
            pointerEvents: 'none',
          }}
          width={36}
          height={14}
        >
          <ellipse
            cx={18}
            cy={7}
            rx={15}
            ry={5}
            fill={orbitColor}
            stroke={orbitColor}
            strokeWidth={6}
            strokeDasharray="3 3"
          />
        </svg>
        {/* Each nav item renders its own SVG line from center to node */}
        <svg
          width={orbSize * 5}
          height={orbSize * 2.5}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: orbSize * 5,
            height: orbSize * 2.5,
            zIndex: 20,
            overflow: 'visible',
            pointerEvents: 'auto',
          }}
        >
          {/* Central vertical axis grey dotted line (full sphere diameter) */}
          {(() => {
            const centerX = (orbSize * 5) / 2;
            const centerY = (orbSize * 2.5) / 2;
            const ellipseRy = orbitRadius * Math.cos(tilt * Math.PI / 180);
            return (
              <line
                x1={centerX}
                y1={centerY - ellipseRy}
                x2={centerX}
                y2={centerY + ellipseRy}
                stroke={orbitColor}
                strokeWidth="6"
                strokeDasharray="7 7"
                style={{ opacity: 0.7 }}
              />
            );
          })()}

          {/* Dotted curved lines from each node to both ends of the vertical axis */}
          {(() => {
            const centerX = (orbSize * 5) / 2;
            const centerY = (orbSize * 2.5) / 2;
            const ellipseRy = orbitRadius * Math.cos(tilt * Math.PI / 180);
            const top = { x: centerX, y: centerY - ellipseRy };
            const bottom = { x: centerX, y: centerY + ellipseRy };
            return navItems.flatMap((item, i) => {
              const p = getNode2D(i);
              return [
                // Curve to top
                <path
                  key={`curve-${i}-top`}
                  d={`M${p.x},${p.y} Q${(p.x + top.x) / 2 + (p.y - top.y) * 0.33},${(p.y + top.y) / 2 + (top.x - p.x) * 0.33} ${top.x},${top.y}`}
                  stroke={orbitColor}
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="7 7"
                  style={{ opacity: 0.7 }}
                />, 
                // Curve to bottom
                <path
                  key={`curve-${i}-bottom`}
                  d={`M${p.x},${p.y} Q${(p.x + bottom.x) / 2 + (p.y - bottom.y) * 0.33},${(p.y + bottom.y) / 2 + (bottom.x - p.x) * 0.33} ${bottom.x},${bottom.y}`}
                  stroke={orbitColor}
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="7 7"
                  style={{ opacity: 0.7 }}
                />
              ];
            });
          })()}


          {navItems.map((item, i) => {
            const orbAngle = ((i / navItems.length) * 360 + angle);
            const rad = (orbAngle * Math.PI) / 180;
            // 3D coordinates before tilt
            const x3d = orbitRadius * Math.sin(rad);
            const y3d = 0;
            const z3d = orbitRadius * Math.cos(rad);
            // Apply tilt (rotation around X axis)
            const tiltRad = tilt * Math.PI / 180;
            const y3d_tilt = y3d * Math.cos(tiltRad) - z3d * Math.sin(tiltRad);
            const z3d_tilt = y3d * Math.sin(tiltRad) + z3d * Math.cos(tiltRad);
            // Project to 2D SVG
            const centerX = (orbSize * 5) / 2;
            const centerY = (orbSize * 2.5) / 2;
            const x2d = centerX + x3d;
            const y2d = centerY + y3d_tilt;

            // --- Offset line start to edge of sphere ---
            const sphereRadius = 12;
            const dx = x2d - centerX;
            const dy = y2d - centerY;
            const len = Math.sqrt(dx * dx + dy * dy);
            const x1 = centerX + (dx / len) * sphereRadius;
            const y1 = centerY + (dy / len) * sphereRadius;

            // SVG node radius
            const nodeRadius = 6;
            // Label offset above node
            const labelOffset = 18;
            // Hover state for SVG
            const isHovered = hovered === item.id;

            return (
              <g
                key={item.id}
                style={{ cursor: 'pointer', outline: 'none' }}
              >
                {/* Large invisible circle for hover/focus area that covers both node and text */}
                <circle
                  cx={x2d}
                  cy={y2d - nodeRadius - labelOffset/2}
                  r={nodeRadius * 3.2}
                  fill="transparent"
                  style={{ cursor: 'pointer', pointerEvents: 'all' }}
                  tabIndex={0}
                  onMouseEnter={() => { setCurrentSpeed(slowSpeed); setHovered(item.id); }}
                  onMouseLeave={() => { setCurrentSpeed(normalSpeed); setHovered(null); }}
                  onFocus={() => { setCurrentSpeed(slowSpeed); setHovered(item.id); }}
                  onBlur={() => { setCurrentSpeed(normalSpeed); setHovered(null); }}
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.location.hash = `#${item.id}`;
                    }
                  }}
                  aria-label={item.label}
                  role="button"
                />
                {/* Dotted line from center to node */}
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2d}
                  y2={y2d}
                  stroke={orbitColor}
                  strokeWidth="6"
                  strokeDasharray="4 4"
                  style={{ opacity: 0.85 }}
                />
                {/* Node at end of line */}
                <circle
                  cx={x2d}
                  cy={y2d}
                  r={nodeRadius}
                  fill={isHovered ? 'var(--color-accent-blue, #38bdf8)' : orbitColor}
                  style={{ transition: 'fill 0.18s', pointerEvents: 'none' }}
                />
                {/* Code-style label above node */}
                <text
                  x={x2d}
                  y={y2d - nodeRadius - labelOffset}
                  textAnchor="middle"
                  fontFamily="Fira Mono, Menlo, monospace"
                  fontSize="18"
                  fill={isHovered ? 'var(--color-accent-blue, #38bdf8)' : orbitColor}
                  style={{
                    pointerEvents: 'none',
                    opacity: 0.95,
                    background: 'transparent',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'fill 0.18s',
                  }}
                >{`{${item.label.toLowerCase()}}`}</text>
              </g>
            );
          })}
        </svg>

      </div>
    </div>
  );
}
