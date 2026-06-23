"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  drift: number;
}

export default function ParticleBackground() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Generate particles on client mount to avoid hydration mismatch
    const generated: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // initial horizontal percent
      size: Math.random() * 2 + 1, // 1px to 3px diameter
      duration: Math.random() * 25 + 25, // 25s to 50s speed
      delay: Math.random() * -50, // pre-distributes particles across viewport height
      opacity: Math.random() * 0.25 + 0.1, // 0.1 to 0.35 opacity
      drift: Math.random() * 40 - 20, // offset range for side-to-side float drift
    }));
    setParticles(generated);
  }, []);

  if (prefersReducedMotion || particles.length === 0) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan"
          style={{
            left: `${p.x}%`,
            top: "105%",
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: p.size > 2 ? "0 0 6px rgba(34, 211, 238, 0.4)" : "none",
          }}
          animate={{
            y: ["0vh", "-115vh"],
            x: [0, p.drift, -p.drift, 0],
          }}
          transition={{
            y: {
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            },
            x: {
              duration: p.duration / 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }
          }}
        />
      ))}
    </div>
  );
}
