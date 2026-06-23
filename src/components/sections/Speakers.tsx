"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mic, ArrowRight } from "lucide-react";

interface Speaker {
  name: string;
  role: string;
  topic: string;
  bio: string;
  photo: string;
  glowColor: string;
}

const speakersList: Speaker[] = [
  {
    name: "Peter Pandey",
    role: "AI Research Lead",
    topic: "The Future of LLMs",
    bio: "AI researcher focused on enterprise-scale LLM systems and next-generation AI applications.",
    photo: "/assets/speakers/speaker-01-ai-researcher.jpg",
    glowColor: "rgba(59, 130, 246, 0.15)", // Blue
  },
  {
    name: "Hemanand V",
    role: "Head of Analytics",
    topic: "AI for Data Analysts",
    bio: "Analytics leader helping organizations leverage AI-powered decision making and business intelligence.",
    photo: "/assets/speakers/speaker-02-analytics-leader.jpg",
    glowColor: "rgba(34, 211, 238, 0.15)", // Cyan
  },
  {
    name: "John David",
    role: "Founder, AI Labs",
    topic: "Building AI Agents",
    bio: "Founder building AI agents and automation solutions for modern businesses.",
    photo: "/assets/speakers/speaker-03-ai-startup-founder.jpg",
    glowColor: "rgba(139, 92, 246, 0.15)", // Violet
  },
  {
    name: "Eliza Grace",
    role: "Automation Consultant",
    topic: "Enterprise Automation",
    bio: "Automation consultant specializing in enterprise workflow transformation and AI adoption.",
    photo: "/assets/speakers/speaker-04-automation-consultant.jpg",
    glowColor: "rgba(244, 63, 94, 0.15)", // Rose
  },
];

export default function Speakers() {
  return (
    <section className="relative w-full pt-12 pb-12 md:pt-16 md:pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center space-y-16 border-t border-white/5 bg-spaceBlack/20">
      {/* Title */}
      <div className="text-center space-y-4 max-w-2xl">
        <span className="text-xs uppercase font-mono tracking-widest text-cyan font-semibold">
          Keynote Sessions
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-softWhite leading-tight">
          World-Class AI Builders
        </h2>
        <p className="text-sm md:text-base text-mutedGray font-sans leading-relaxed">
          Learn directly from researchers, startup founders, and engineering leaders building the next layer of tech.
        </p>
      </div>

      {/* Grid: Flex scroll on mobile, Grid on desktop/tablet */}
      <div className="w-full flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 snap-x snap-mandatory scrollbar-none pb-6 px-4 md:px-0 justify-center">
        {speakersList.map((speaker, index) => (
          <motion.div
            key={speaker.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -8 }}
            className="min-w-[82vw] sm:min-w-[320px] md:min-w-0 md:w-full max-w-[320px] h-[460px] snap-center glass-card rounded-[24px] overflow-hidden flex flex-col justify-between hover:border-cyan/30 transition-all duration-300 relative group"
          >
            {/* Background Glow */}
            <div
              className="absolute -inset-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-[40px] pointer-events-none -z-10"
              style={{
                background: `radial-gradient(circle, ${speaker.glowColor} 0%, transparent 70%)`,
              }}
            />

            {/* Photo Section with Zoom Animation */}
            <div className="relative w-full h-[190px] overflow-hidden bg-spaceBlack/50">
              <Image
                src={speaker.photo}
                alt={`${speaker.name} Portrait`}
                fill
                className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              
              {/* Mic Icon Badge */}
              <div className="absolute top-4 left-4 h-8 w-8 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-cyan backdrop-blur-md">
                <Mic className="h-4 w-4" />
              </div>
            </div>

            {/* Detail Section */}
            <div className="p-5 flex-grow flex flex-col justify-between space-y-3.5">
              <div className="space-y-1">
                <h3 className="text-xl font-heading font-bold text-softWhite leading-tight">
                  {speaker.name}
                </h3>
                <p className="text-xs font-mono text-cyan uppercase tracking-wider font-semibold">
                  {speaker.role}
                </p>
              </div>

              {/* Bio Section */}
              <p className="text-xs text-mutedGray font-sans leading-relaxed line-clamp-2">
                {speaker.bio}
              </p>

              {/* Session Details */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-mutedGray">
                  Keynote Topic
                </span>
                <p className="text-sm font-sans font-medium text-softWhite/90 leading-snug line-clamp-1">
                  {speaker.topic}
                </p>
              </div>

              {/* View details prompt */}
              <div className="flex items-center gap-1 text-xs font-sans text-cyan/70 font-semibold group-hover:text-cyan transition-colors pt-1">
                View keynote details
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

