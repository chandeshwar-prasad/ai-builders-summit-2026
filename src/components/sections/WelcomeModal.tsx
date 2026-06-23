"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useLenis } from "@studio-freight/react-lenis";

interface WelcomeModalProps {
  onComplete: (name: string) => void;
}

export default function WelcomeModal({ onComplete }: WelcomeModalProps) {
  const [, setVisitorName] = useLocalStorage<string>("visitorName", "");
  const [nameInput, setNameInput] = useState("");
  const [activeName, setActiveName] = useState("");
  const [error, setError] = useState("");
  
  // Stages: "initial" (checking local storage), "form" (ask name), "success" (onboarding transition), "returning" (returning greeting), "closed"
  const [stage, setStage] = useState<"initial" | "form" | "success" | "returning" | "closed">("initial");
  
  const lenis = useLenis();
  const prefersReducedMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);

  // Stop/Start page scrolling based on modal state
  useEffect(() => {
    if (stage !== "closed") {
      lenis?.stop();
    } else {
      lenis?.start();
    }
  }, [stage, lenis]);

  // Read name on mount to detect returning visitors
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = window.localStorage.getItem("visitorName");
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed && parsed.trim().length >= 2) {
            setActiveName(parsed);
            setStage("returning");
            const timer = setTimeout(() => {
              setStage("closed");
              onComplete(parsed);
            }, 2000);
            return () => clearTimeout(timer);
          }
        }
      } catch (err) {
        console.warn("Failed to check localStorage visitorName on mount:", err);
      }
    }
    setStage("form");
  }, [onComplete]);

  // Autofocus input field when stage changes to form
  useEffect(() => {
    if (stage === "form") {
      const timer = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    
    if (trimmed.length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }
    if (trimmed.length > 40) {
      setError("Name cannot exceed 40 characters.");
      return;
    }
    
    setError("");
    setVisitorName(trimmed);
    setStage("success");
    
    const timer = setTimeout(() => {
      setStage("closed");
      onComplete(trimmed);
    }, 1500);
    return () => clearTimeout(timer);
  };

  if (stage === "closed") return null;

  const fadeTransition = { duration: prefersReducedMotion ? 0.15 : 0.4 };
  
  const modalVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, damping: 25, stiffness: 220 } },
    exit: { opacity: 0, y: prefersReducedMotion ? 0 : -20, transition: { ease: "easeIn" as const, duration: 0.25 } }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050816]/95 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={fadeTransition}
      >
        <AnimatePresence mode="wait">
          {stage === "form" && (
            <motion.div
              key="form-card"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="glass-card p-8 md:p-10 w-[90%] max-w-[520px] rounded-[24px] text-center space-y-6 relative shadow-2xl border border-white/10"
            >
              {/* Header Icon */}
              <div className="flex flex-col items-center space-y-2">
                <div className="h-12 w-12 rounded-2xl bg-cyan/10 border border-cyan/20 flex items-center justify-center text-cyan">
                  <Sparkles className="h-6 w-6 animate-pulse" />
                </div>
                <span className="text-xs uppercase font-mono tracking-widest text-cyan/70 font-semibold pt-1">
                  AI Builders Summit 2026
                </span>
              </div>

              {/* Header Text */}
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-softWhite leading-tight">
                  Welcome to the Summit
                </h2>
                <p className="text-xs md:text-sm text-mutedGray leading-relaxed max-w-sm mx-auto">
                  The future of AI, Analytics, Automation, and Innovation begins here.
                </p>
              </div>

              {/* Name Input Form */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                <div className="space-y-1.5 text-left">
                  <label htmlFor="name-input" className="text-xs font-semibold text-softWhite/70 pl-1 uppercase tracking-wider font-sans">
                    What should we call you?
                  </label>
                  <input
                    id="name-input"
                    ref={inputRef}
                    type="text"
                    value={nameInput}
                    onChange={(e) => {
                      setNameInput(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Enter your name"
                    className={`w-full h-14 px-4 bg-white/5 border ${error ? 'border-red-500 focus:ring-red-500' : 'border-white/10 focus:ring-electricBlue focus:border-electricBlue'} rounded-2xl text-softWhite placeholder-white/20 outline-none focus:ring-2 focus:ring-opacity-50 transition-all font-sans text-base`}
                    maxLength={40}
                    autoComplete="off"
                    required
                  />
                  {error && (
                    <p className="text-xs text-red-500 pl-1 font-medium font-sans">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-electricBlue to-violet hover:opacity-90 hover:scale-[1.01] active:scale-[0.98] transition-all rounded-2xl text-white font-semibold text-base shadow-lg shadow-electricBlue/15 font-sans"
                >
                  Enter Summit
                </button>
              </form>
            </motion.div>
          )}

          {stage === "success" && (
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={fadeTransition}
              className="text-center space-y-4 max-w-sm px-6"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-softWhite leading-tight">
                Welcome, {nameInput.trim()}!
              </h2>
              <div className="flex items-center justify-center gap-2.5 text-cyan">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p className="text-sm font-sans tracking-wide">
                  Preparing your summit experience...
                </p>
              </div>
            </motion.div>
          )}

          {stage === "returning" && (
            <motion.div
              key="returning-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fadeTransition}
              className="text-center space-y-4 max-w-sm px-6"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-softWhite leading-tight">
                Welcome back, {activeName}!
              </h2>
              <div className="flex items-center justify-center gap-2.5 text-cyan">
                <Loader2 className="h-5 w-5 animate-spin" />
                <p className="text-sm font-sans tracking-wide">
                  Preparing your summit experience...
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
