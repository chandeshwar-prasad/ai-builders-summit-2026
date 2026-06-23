"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface AudienceGroup {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const targetGroups: AudienceGroup[] = [
  {
    title: "Data Analysts",
    description: "Automating reporting workflows, generating code via LLMs, and turning raw databases into active dashboards.",
    icon: "/assets/icons/data-analyst.png",
    color: "rgba(59, 130, 246, 0.15)", // Electric Blue Glow
  },
  {
    title: "Data Scientists",
    description: "Fine-tuning neural weights, building advanced RAG indexes, and deploying machine learning pipelines.",
    icon: "/assets/icons/data-scientist.png",
    color: "rgba(34, 211, 238, 0.15)", // Cyan Glow
  },
  {
    title: "AI Engineers",
    description: "Constructing autonomous agents, managing local inference, and orchestrating serverless AI APIs.",
    icon: "/assets/icons/ai-engineer.png",
    color: "rgba(139, 92, 246, 0.15)", // Violet Glow
  },
  {
    title: "Students",
    description: "Exploring AI pathways, finding career mentorship, and building open-source tools with community partners.",
    icon: "/assets/icons/student.png",
    color: "rgba(244, 63, 94, 0.12)", // Rose Glow
  },
  {
    title: "Business Professionals",
    description: "Evaluating automation ROI, deploying AI tools safely, and driving digital alignment inside enterprises.",
    icon: "/assets/icons/business-professional.png",
    color: "rgba(245, 158, 11, 0.12)", // Amber Glow
  },
];

export default function Audience() {
  return (
    <section className="relative w-full pt-12 pb-12 md:pt-16 md:pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center space-y-12">
      {/* Title */}
      <div className="text-center space-y-4 max-w-2xl">
        <span className="text-xs uppercase font-mono tracking-widest text-cyan font-semibold">
          Who Is This For?
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-softWhite leading-tight">
          Built for Every AI Builder
        </h2>
        <p className="text-sm md:text-base text-mutedGray font-sans leading-relaxed">
          Whether you orchestrate models, automate code, or lead transformation, your seat is reserved at the summit.
        </p>
      </div>

      {/* Cards List: Flex horizontal on mobile, Grid on desktop/tablet */}
      <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-5 gap-6 snap-x snap-mandatory scrollbar-none pb-6 px-4 md:px-0">
        {targetGroups.map((group, index) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="min-w-[82vw] sm:min-w-[300px] md:min-w-0 snap-center glass-card rounded-[24px] p-6 text-center space-y-5 flex flex-col items-center hover:border-cyan/30 transition-all duration-300 relative group overflow-hidden"
          >
            {/* Background Glow Ring */}
            <div
              className="absolute -inset-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-[40px] pointer-events-none -z-10"
              style={{
                background: `radial-gradient(circle, ${group.color} 0%, transparent 70%)`,
              }}
            />

            {/* Icon Wrapper */}
            <div className="relative h-20 w-20 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl group-hover:border-cyan/30 transition-colors duration-300">
              <Image
                src={group.icon}
                alt={`${group.title} Icon`}
                width={56}
                height={56}
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content */}
            <div className="space-y-2 flex-grow flex flex-col justify-between">
              <h3 className="text-lg md:text-xl font-heading font-semibold text-softWhite font-heading">
                {group.title}
              </h3>
              <p className="text-xs md:text-sm text-mutedGray font-sans leading-relaxed">
                {group.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
