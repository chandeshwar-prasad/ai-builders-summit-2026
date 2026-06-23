"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, Clock, User } from "lucide-react";

interface Session {
  time: string;
  title: string;
  description: string;
  speaker?: string;
  role?: string;
}

const day1Sessions: Session[] = [
  {
    time: "09:00 AM",
    title: "Opening Keynote",
    description: "Welcome address and summit opening remarks. Establishing the central themes of open building, agency, and collaborative AI development.",
  },
  {
    time: "10:00 AM",
    title: "Future of Generative AI",
    description: "A comprehensive look at frontier models, scaling laws, and next-generation architectural shifts in foundation intelligence.",
    speaker: "Peter Pandey",
    role: "AI Research Lead",
  },
  {
    time: "11:30 AM",
    title: "AI Agents in Business",
    description: "Architectural insights on designing, testing, and deploying multi-agent swarms to orchestrate complex background task workflows.",
    speaker: "John David",
    role: "Founder, AI Labs",
  },
  {
    time: "02:00 PM",
    title: "Data Analytics with AI",
    description: "Empowering analytics teams with natural language interface systems and automated database query synthesis.",
    speaker: "Hemanand V",
    role: "Head of Analytics",
  },
  {
    time: "04:00 PM",
    title: "Networking Session",
    description: "An informal meet-and-greet in the BICC convention plaza. Mingle with summit keynotes, engineers, sponsors, and peers.",
  },
];

const day2Sessions: Session[] = [
  {
    time: "09:00 AM",
    title: "Building AI Products",
    description: "Core product management paradigms for migrating early prototype scripts into optimized customer interfaces.",
  },
  {
    time: "11:00 AM",
    title: "RAG Systems Workshop",
    description: "Hands-on architectural review covering chunking heuristics, hybrid vector retrievals, and automated indexing strategies.",
  },
  {
    time: "02:00 PM",
    title: "Automation Masterclass",
    description: "Structuring reliable background pipelines, error resolution logic, and enterprise robotic process automation frameworks.",
    speaker: "Eliza Grace",
    role: "Automation Consultant",
  },
  {
    time: "04:00 PM",
    title: "Closing Keynote",
    description: "Summary of summit takeaways, next milestones for the AI Builders community, and closing announcements.",
  },
];

export default function Schedule() {
  const [expandedDay1, setExpandedDay1] = useState<number | null>(null);
  const [expandedDay2, setExpandedDay2] = useState<number | null>(null);

  const toggleDay1 = (index: number) => {
    setExpandedDay1(expandedDay1 === index ? null : index);
  };

  const toggleDay2 = (index: number) => {
    setExpandedDay2(expandedDay2 === index ? null : index);
  };

  return (
    <section className="relative w-full pt-12 pb-12 md:pt-16 md:pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center space-y-16">
      {/* Title */}
      <div className="text-center space-y-4 max-w-2xl">
        <span className="text-xs uppercase font-mono tracking-widest text-cyan font-semibold">
          Conference Schedule
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-softWhite leading-tight">
          Explore the Agenda
        </h2>
        <p className="text-sm md:text-base text-mutedGray font-sans leading-relaxed">
          Two days of dense technical sessions, practical code workshops, and valuable community networking.
        </p>
      </div>

      {/* Desktop Layout: Split Vertical Timeline */}
      <div className="hidden lg:grid grid-cols-2 gap-12 w-full max-w-6xl relative pt-6">
        {/* Central Vertical Divider line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 -z-10" />

        {/* Left Column: Day 1 */}
        <div className="space-y-8 pr-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/5">
            <Calendar className="h-5 w-5 text-cyan" />
            <h3 className="text-2xl font-heading font-bold text-softWhite">Day 1 &bull; 22 August</h3>
          </div>

          <div className="space-y-6 relative pl-6 border-l border-cyan/20">
            {day1Sessions.map((session) => (
              <div key={session.title} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-cyan/20 transition-all duration-300 space-y-3 relative">
                {/* Connector Dot */}
                <div className="absolute -left-[29px] top-6 h-3 w-3 rounded-full bg-cyan shadow-sm shadow-cyan/50" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-cyan/80">
                    <Clock className="h-3.5 w-3.5" />
                    {session.time}
                  </div>
                </div>

                <h4 className="text-lg font-heading font-semibold text-white">{session.title}</h4>
                <p className="text-xs md:text-sm text-mutedGray font-sans leading-relaxed">{session.description}</p>

                {session.speaker && (
                  <div className="flex items-center gap-2 pt-2 text-xs font-sans text-cyan/70">
                    <User className="h-3.5 w-3.5 text-cyan" />
                    <span className="font-semibold">{session.speaker}</span>
                    <span className="text-white/20">|</span>
                    <span className="text-mutedGray">{session.role}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Day 2 */}
        <div className="space-y-8 pl-6">
          <div className="flex items-center gap-3 pb-4 border-b border-white/5">
            <Calendar className="h-5 w-5 text-violet" />
            <h3 className="text-2xl font-heading font-bold text-softWhite">Day 2 &bull; 23 August</h3>
          </div>

          <div className="space-y-6 relative pl-6 border-l border-violet/20">
            {day2Sessions.map((session) => (
              <div key={session.title} className="glass-card p-6 rounded-2xl border border-white/5 hover:border-violet/20 transition-all duration-300 space-y-3 relative">
                {/* Connector Dot */}
                <div className="absolute -left-[29px] top-6 h-3 w-3 rounded-full bg-violet shadow-sm shadow-violet/50" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-violet/80">
                    <Clock className="h-3.5 w-3.5" />
                    {session.time}
                  </div>
                </div>

                <h4 className="text-lg font-heading font-semibold text-white">{session.title}</h4>
                <p className="text-xs md:text-sm text-mutedGray font-sans leading-relaxed">{session.description}</p>

                {session.speaker && (
                  <div className="flex items-center gap-2 pt-2 text-xs font-sans text-violet/70">
                    <User className="h-3.5 w-3.5 text-violet" />
                    <span className="font-semibold">{session.speaker}</span>
                    <span className="text-white/20">|</span>
                    <span className="text-mutedGray">{session.role}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout: Responsive Accordions */}
      <div className="lg:hidden w-full max-w-md space-y-10">
        {/* Day 1 Accordion Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-heading font-bold text-cyan border-b border-white/5 pb-2">
            Day 1 &bull; 22 August
          </h3>
          <div className="space-y-3">
            {day1Sessions.map((session, index) => {
              const isExpanded = expandedDay1 === index;
              return (
                <div key={session.title} className="glass-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-200">
                  <button
                    onClick={() => toggleDay1(index)}
                    className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan">
                        <Clock className="h-3 w-3" />
                        {session.time}
                      </div>
                      <h4 className="text-base font-heading font-semibold text-white">{session.title}</h4>
                    </div>
                    <ChevronDown className={`h-4.5 w-4.5 text-mutedGray transition-transform duration-200 ${isExpanded ? 'rotate-180 text-cyan' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t border-white/5 text-xs text-mutedGray space-y-3">
                          <p className="leading-relaxed">{session.description}</p>
                          {session.speaker && (
                            <div className="flex items-center gap-1.5 text-[10px] font-sans text-cyan/80">
                              <User className="h-3 w-3 text-cyan" />
                              <span className="font-semibold">{session.speaker}</span>
                              <span className="text-white/10">|</span>
                              <span>{session.role}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Day 2 Accordion Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-heading font-bold text-violet border-b border-white/5 pb-2">
            Day 2 &bull; 23 August
          </h3>
          <div className="space-y-3">
            {day2Sessions.map((session, index) => {
              const isExpanded = expandedDay2 === index;
              return (
                <div key={session.title} className="glass-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-200">
                  <button
                    onClick={() => toggleDay2(index)}
                    className="w-full p-4 flex items-center justify-between text-left focus:outline-none"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-violet">
                        <Clock className="h-3 w-3" />
                        {session.time}
                      </div>
                      <h4 className="text-base font-heading font-semibold text-white">{session.title}</h4>
                    </div>
                    <ChevronDown className={`h-4.5 w-4.5 text-mutedGray transition-transform duration-200 ${isExpanded ? 'rotate-180 text-violet' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 border-t border-white/5 text-xs text-mutedGray space-y-3">
                          <p className="leading-relaxed">{session.description}</p>
                          {session.speaker && (
                            <div className="flex items-center gap-1.5 text-[10px] font-sans text-violet/80">
                              <User className="h-3 w-3 text-violet" />
                              <span className="font-semibold">{session.speaker}</span>
                              <span className="text-white/10">|</span>
                              <span>{session.role}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
