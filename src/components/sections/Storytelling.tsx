"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Storytelling() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <section className="relative w-full flex items-center justify-center pt-12 pb-12 md:pt-16 md:pb-16 px-6 overflow-hidden border-t border-white/5">
      {/* Background Parallax Layer */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/assets/backgrounds/ai-network-bg.jpg"
          alt="AI Network Neural Pathways"
          fill
          className="object-cover object-center opacity-10"
        />
        <div className="absolute inset-0 bg-spaceBlack/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-spaceBlack via-transparent to-spaceBlack" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="max-w-4xl w-full text-center space-y-12 z-10"
      >
        <motion.div variants={textVariants} className="space-y-4">
          <span className="text-xs uppercase font-mono tracking-widest text-cyan font-semibold">
            Our Vision
          </span>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-softWhite leading-tight">
            The Future Is Being Built Today
          </h2>
        </motion.div>

        <div className="space-y-8 max-w-3xl mx-auto text-mutedGray text-base md:text-xl leading-relaxed text-balance font-sans">
          <motion.p variants={textVariants}>
            We are experiencing the most significant technology shift in a generation. The rise of Artificial Intelligence is rewriting software, data pipelines, and creative workflows.
          </motion.p>
          <motion.p variants={textVariants}>
            But AI is not just for tech conglomerates. The real revolution is the <span className="text-cyan font-medium">democratization of builders</span>—engineers, scientists, analysts, and students using models to automate complex systems and construct agentic systems from scratch.
          </motion.p>
          <motion.p variants={textVariants} className="text-softWhite font-medium text-lg md:text-2xl">
            &ldquo;The best way to predict the future is to build it.&rdquo;
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
