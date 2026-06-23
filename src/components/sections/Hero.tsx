"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Sparkles, MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface HeroProps {
  userName: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function Hero({ userName }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const targetDate = new Date("2026-08-22T09:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRegisterClick = () => {
    const registerSection = document.getElementById("register");
    if (registerSection) {
      registerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Pad numbers with leading zero
  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-24 pb-12 md:pt-32 md:pb-16 px-6">
      {/* Background Hero Asset Image with Dark Overlays */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="/assets/hero/hero-main.jpg"
          alt="Futuristic AI Conference Background"
          fill
          priority
          className="object-cover object-center opacity-40 mix-blend-lighten"
        />
        {/* Gradients blending image into Deep Space Black */}
        <div className="absolute inset-0 bg-gradient-to-b from-spaceBlack via-transparent to-spaceBlack" />
        <div className="absolute inset-0 bg-gradient-to-r from-spaceBlack via-transparent to-spaceBlack" />
        <div className="absolute inset-0 bg-spaceBlack/60" />
      </div>

      <div className="max-w-5xl w-full text-center space-y-10 md:space-y-12 z-10 flex flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-cyan font-medium text-xs md:text-sm tracking-widest uppercase font-sans shadow-lg shadow-cyan/5 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-cyan animate-pulse" />
          Build • Learn • Innovate
        </motion.div>

        {/* Headline Group */}
        <div className="space-y-4 md:space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-8xl font-heading font-bold tracking-tight bg-gradient-to-r from-softWhite via-white to-mutedGray bg-clip-text text-transparent leading-[1.05] max-w-4xl font-heading"
          >
            AI Builders
            <br />
            Summit 2026
          </motion.h1>

          {/* Personalized subtitle greeting */}
          {userName && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg md:text-2xl font-heading font-semibold text-cyan tracking-wide font-heading"
            >
              Welcome back, {userName}. Your AI journey starts here.
            </motion.p>
          )}
        </div>

        {/* Tagline / Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-xl text-mutedGray font-sans leading-relaxed max-w-3xl font-sans"
        >
          Democratizing artificial intelligence, data analytics, and automation. Join leading engineers, scientists, and builders to shape the future of tech.
        </motion.p>

        {/* Countdown Timer */}
        {isMounted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl w-full"
          >
            {/* Days */}
            <div className="glass-card flex flex-col justify-center py-4 md:py-6 rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl relative group">
              <span className="text-2xl md:text-5xl font-heading font-bold text-white tracking-tight">
                {formatNumber(timeLeft.days)}
              </span>
              <span className="text-[10px] md:text-xs text-mutedGray font-sans tracking-widest uppercase mt-1 md:mt-2">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="glass-card flex flex-col justify-center py-4 md:py-6 rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl relative group">
              <span className="text-2xl md:text-5xl font-heading font-bold text-white tracking-tight">
                {formatNumber(timeLeft.hours)}
              </span>
              <span className="text-[10px] md:text-xs text-mutedGray font-sans tracking-widest uppercase mt-1 md:mt-2">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="glass-card flex flex-col justify-center py-4 md:py-6 rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl relative group">
              <span className="text-2xl md:text-5xl font-heading font-bold text-white tracking-tight">
                {formatNumber(timeLeft.minutes)}
              </span>
              <span className="text-[10px] md:text-xs text-mutedGray font-sans tracking-widest uppercase mt-1 md:mt-2">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="glass-card flex flex-col justify-center py-4 md:py-6 rounded-2xl md:rounded-3xl border border-white/5 shadow-2xl relative group">
              <span className="text-2xl md:text-5xl font-heading font-bold text-cyan tracking-tight transition-colors duration-200">
                {formatNumber(timeLeft.seconds)}
              </span>
              <span className="text-[10px] md:text-xs text-mutedGray font-sans tracking-widest uppercase mt-1 md:mt-2">
                Seconds
              </span>
            </div>
          </motion.div>
        )}

        {/* Event Details (Date & Venue) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center justify-center text-xs md:text-sm text-mutedGray font-sans"
        >
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
            <Calendar className="h-4.5 w-4.5 text-electricBlue" />
            22–23 August 2026
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
            <MapPin className="h-4.5 w-4.5 text-violet" />
            Bengaluru International Convention Centre (BICC), Bengaluru, India
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="pt-2 flex flex-col items-center space-y-4"
        >
          <Button
            onClick={handleRegisterClick}
            className="font-sans font-semibold text-xs tracking-wider uppercase py-6 px-8 gap-2 bg-gradient-to-r from-electricBlue to-violet hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all text-white border-0 shadow-lg shadow-electricBlue/20"
          >
            Register Now <MoveRight className="h-4 w-4" />
          </Button>

          {/* Social Proof */}
          <div className="flex items-center gap-2 text-xs font-mono text-mutedGray tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>1,248 Builders Registered</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
