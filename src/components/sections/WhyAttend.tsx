"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Award, Cpu, Network, Briefcase, Code2 } from "lucide-react";

interface Benefit {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const benefits: Benefit[] = [
  {
    title: "Learn from industry leaders",
    description: "Gain direct insights from top AI researchers, founders, and engineers building the next wave of foundation models.",
    icon: Award,
    color: "rgba(59, 130, 246, 0.15)", // Electric Blue Glow
  },
  {
    title: "Explore real-world AI applications",
    description: "Witness live demonstrations of multi-agent systems, data synthesis tools, and enterprise automation setups in action.",
    icon: Cpu,
    color: "rgba(34, 211, 238, 0.15)", // Cyan Glow
  },
  {
    title: "Build professional connections",
    description: "Mingle with peers, developers, and potential collaborators in dedicated networking plazas at the convention center.",
    icon: Network,
    color: "rgba(139, 92, 246, 0.15)", // Violet Glow
  },
  {
    title: "Discover career opportunities",
    description: "Connect with leading tech companies and start-ups looking to hire skilled AI engineers and data professionals.",
    icon: Briefcase,
    color: "rgba(244, 63, 94, 0.12)", // Rose Glow
  },
  {
    title: "Experience hands-on workshops",
    description: "Participate in technical workshops covering hybrid retrieval strategies, model tuning, and pipeline optimization.",
    icon: Code2,
    color: "rgba(245, 158, 11, 0.12)", // Amber Glow
  },
];

export default function WhyAttend() {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative w-full pt-12 pb-12 md:pt-16 md:pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center space-y-16 border-t border-white/5">
      {/* Title Block */}
      <div className="text-center space-y-4 max-w-2xl">
        <span className="text-xs uppercase font-mono tracking-widest text-cyan font-semibold">
          Summit Benefits
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-softWhite leading-tight">
          Why Attend AI Builders Summit 2026
        </h2>
        <p className="text-sm md:text-base text-mutedGray font-sans leading-relaxed">
          Join us in Bengaluru for two days of deep learning, collaborative building, and industry networking.
        </p>
      </div>

      {/* Cards List: Horizontal swipe-scroll on mobile, Grid on desktop/tablet */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="w-full flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-5 gap-6 snap-x snap-mandatory scrollbar-none pb-6 px-4 md:px-0"
      >
        {benefits.map((benefit) => {
          const IconComponent = benefit.icon;
          return (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              whileHover={prefersReducedMotion ? {} : { y: -6, transition: { duration: 0.2 } }}
              className="min-w-[82vw] sm:min-w-[300px] md:min-w-0 snap-center glass-card rounded-[24px] p-6 text-center space-y-5 flex flex-col items-center hover:border-cyan/30 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Background Hover Glow Aura */}
              <div
                className="absolute -inset-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-[40px] pointer-events-none -z-10"
                style={{
                  background: `radial-gradient(circle, ${benefit.color} 0%, transparent 70%)`,
                }}
              />

              {/* Icon Container */}
              <div className="relative h-16 w-16 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl group-hover:border-cyan/30 transition-colors duration-300">
                <IconComponent className="h-7 w-7 text-cyan group-hover:scale-105 transition-transform duration-300" />
              </div>

              {/* Card Copy */}
              <div className="space-y-3 flex-grow flex flex-col justify-between">
                <h3 className="text-base md:text-lg font-heading font-semibold text-softWhite leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-xs md:text-sm text-mutedGray font-sans leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
