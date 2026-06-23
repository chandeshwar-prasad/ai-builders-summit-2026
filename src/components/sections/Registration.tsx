"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle, Loader2, Mail, Briefcase, User, Building, Ticket, ShieldCheck } from "lucide-react";

const registrationSchema = z.object({
  fullName: z.string()
    .min(2, "Name must be at least 2 characters.")
    .max(40, "Name cannot exceed 40 characters."),
  email: z.string()
    .email("Please enter a valid email address."),
  company: z.string()
    .min(2, "Company name must be at least 2 characters."),
  jobTitle: z.string()
    .min(2, "Job title must be at least 2 characters."),
  dayAttending: z.enum(["day-1", "day-2", "both"]),
});

type RegistrationInput = z.infer<typeof registrationSchema>;

interface RegistrationProps {
  userName?: string;
}

export default function Registration({ userName = "" }: RegistrationProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [submittedData, setSubmittedData] = useState<RegistrationInput | null>(null);
  
  const prefersReducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: userName,
      email: "",
      company: "",
      jobTitle: "",
      dayAttending: "both",
    },
  });

  // Prefill Full Name field once user finishes onboarding welcome modal
  useEffect(() => {
    if (userName) {
      setValue("fullName", userName);
    }
  }, [userName, setValue]);

  const onSubmit = async (data: RegistrationInput) => {
    // Simulate API network request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Generate a unique mock ticket number
    const randomId = Math.floor(1000 + Math.random() * 9000);
    setTicketNumber(`AIB-2026-${randomId}`);
    setSubmittedData(data);
    setIsSuccess(true);
  };

  const handleReset = () => {
    reset({
      fullName: userName,
      email: "",
      company: "",
      jobTitle: "",
      dayAttending: "both",
    });
    setIsSuccess(false);
    setSubmittedData(null);
  };

  const fadeTransition = { duration: prefersReducedMotion ? 0.15 : 0.4 };

  const getPassLabel = (val: string) => {
    switch (val) {
      case "day-1": return "Day 1 Pass";
      case "day-2": return "Day 2 Pass";
      default: return "Full Access Pass";
    }
  };

  return (
    <section id="register" className="relative w-full pt-16 pb-16 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden border-t border-white/5">
      {/* Background Graphic Grid Panel */}
      <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-[0.03] grayscale pointer-events-none" style={{ backgroundImage: "url('/assets/registration/registration-bg.jpg')" }} />
      
      {/* Glow Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <div className="w-full max-w-5xl flex flex-col items-center space-y-16">
        
        {/* Title Block */}
        {!isSuccess && (
          <div className="text-center space-y-4 max-w-2xl">
            <span className="text-xs uppercase font-mono tracking-widest text-cyan font-semibold">
              Register Now
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-softWhite leading-tight">
              Claim Your Builder Pass
            </h2>
            <p className="text-sm md:text-base text-mutedGray font-sans leading-relaxed">
              Register today to secure your in-person access. Seats are limited at the Bengaluru International Convention Centre (BICC).
            </p>
          </div>
        )}

        {/* Dynamic Card Container */}
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form-card"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -25 }}
                transition={fadeTransition}
                className="glass-card p-8 md:p-10 rounded-[28px] border border-white/10 shadow-2xl relative"
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-softWhite/70 pl-1 uppercase tracking-wider font-sans flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-cyan" /> Full Name
                    </label>
                    <input
                      type="text"
                      {...register("fullName")}
                      placeholder="e.g. John Doe"
                      className={`w-full h-12 px-4 bg-white/5 border ${errors.fullName ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:ring-cyan/20 focus:border-cyan'} rounded-xl text-softWhite placeholder-white/20 outline-none focus:ring-4 transition-all font-sans text-sm`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 pl-1 font-medium font-sans">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-softWhite/70 pl-1 uppercase tracking-wider font-sans flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-cyan" /> Email Address
                    </label>
                    <input
                      type="email"
                      {...register("email")}
                      placeholder="e.g. john@company.com"
                      className={`w-full h-12 px-4 bg-white/5 border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:ring-cyan/20 focus:border-cyan'} rounded-xl text-softWhite placeholder-white/20 outline-none focus:ring-4 transition-all font-sans text-sm`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 pl-1 font-medium font-sans">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Company Name & Job Title Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-softWhite/70 pl-1 uppercase tracking-wider font-sans flex items-center gap-1.5">
                        <Building className="h-3.5 w-3.5 text-cyan" /> Company
                      </label>
                      <input
                        type="text"
                        {...register("company")}
                        placeholder="e.g. OpenAI"
                        className={`w-full h-12 px-4 bg-white/5 border ${errors.company ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:ring-cyan/20 focus:border-cyan'} rounded-xl text-softWhite placeholder-white/20 outline-none focus:ring-4 transition-all font-sans text-sm`}
                      />
                      {errors.company && (
                        <p className="text-xs text-red-500 pl-1 font-medium font-sans">
                          {errors.company.message}
                        </p>
                      )}
                    </div>

                    {/* Job Title */}
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-softWhite/70 pl-1 uppercase tracking-wider font-sans flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-cyan" /> Job Title
                      </label>
                      <input
                        type="text"
                        {...register("jobTitle")}
                        placeholder="e.g. AI Engineer"
                        className={`w-full h-12 px-4 bg-white/5 border ${errors.jobTitle ? 'border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:ring-cyan/20 focus:border-cyan'} rounded-xl text-softWhite placeholder-white/20 outline-none focus:ring-4 transition-all font-sans text-sm`}
                      />
                      {errors.jobTitle && (
                        <p className="text-xs text-red-500 pl-1 font-medium font-sans">
                          {errors.jobTitle.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Day Attending dropdown */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-softWhite/70 pl-1 uppercase tracking-wider font-sans flex items-center gap-1.5">
                      <Ticket className="h-3.5 w-3.5 text-cyan" /> Attendance Options
                    </label>
                    <div className="relative">
                      <select
                        {...register("dayAttending")}
                        className="w-full h-12 px-4 bg-[#0F172A] border border-white/10 rounded-xl text-softWhite outline-none focus:ring-4 focus:ring-cyan/20 focus:border-cyan transition-all font-sans text-sm appearance-none cursor-pointer"
                      >
                        <option value="both">Both Days - Full Pass (22–23 August)</option>
                        <option value="day-1">Day 1 Only (22 August)</option>
                        <option value="day-2">Day 2 Only (23 August)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.dayAttending && (
                      <p className="text-xs text-red-500 pl-1 font-medium font-sans">
                        {errors.dayAttending.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-gradient-to-r from-electricBlue to-violet hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 disabled:pointer-events-none transition-all rounded-xl text-white font-semibold text-base shadow-lg shadow-electricBlue/20 flex items-center justify-center gap-2 font-sans mt-8"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" /> Securing Your Seat...
                      </>
                    ) : (
                      <>Claim Builder Pass</>
                    )}
                  </button>
                </form>
              </motion.div>
            ) : (
              /* Premium Glowing Glass Pass Ticket Success State */
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 }}
                transition={{ type: "spring", damping: 20, stiffness: 180 }}
                className="w-full relative"
              >
                {/* Glowing Aura Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-electricBlue/20 to-violet-600/20 blur-xl rounded-[32px] -z-10" />

                <div className="glass-card rounded-[32px] overflow-hidden border border-white/15 shadow-2xl relative flex flex-col">
                  {/* Top Success Badge Banner */}
                  <div className="bg-gradient-to-r from-electricBlue/20 to-violet-600/20 border-b border-white/10 p-6 flex flex-col items-center text-center space-y-2">
                    <div className="h-10 w-10 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 animate-bounce" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-softWhite">
                      Pass Secured Successfully!
                    </h3>
                    <p className="text-xs text-mutedGray font-sans">
                      A confirmation email has been dispatched to <span className="text-cyan font-medium">{submittedData?.email}</span>
                    </p>
                  </div>

                  {/* Main Ticket Layout */}
                  <div className="p-8 md:p-10 flex flex-col space-y-8 relative">
                    {/* Event Details Header */}
                    <div className="flex justify-between items-start border-b border-white/5 pb-6">
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-cyan font-bold">
                          AI Builders Summit
                        </span>
                        <h4 className="text-2xl font-heading font-bold text-softWhite tracking-tight">
                          Bengaluru 2026
                        </h4>
                      </div>
                      <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono text-cyan tracking-wider uppercase font-semibold">
                        {submittedData && getPassLabel(submittedData.dayAttending)}
                      </div>
                    </div>

                    {/* Ticket Fields Grid */}
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-sans text-mutedGray uppercase tracking-widest">
                          Attendee Name
                        </span>
                        <p className="text-sm font-heading font-semibold text-white truncate">
                          {submittedData?.fullName}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-sans text-mutedGray uppercase tracking-widest">
                          Ticket Serial
                        </span>
                        <p className="text-sm font-mono font-semibold text-cyan">
                          {ticketNumber}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-sans text-mutedGray uppercase tracking-widest">
                          Company
                        </span>
                        <p className="text-sm font-heading font-semibold text-white truncate">
                          {submittedData?.company}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-sans text-mutedGray uppercase tracking-widest">
                          Job Title
                        </span>
                        <p className="text-sm font-heading font-semibold text-white truncate">
                          {submittedData?.jobTitle}
                        </p>
                      </div>
                    </div>

                    {/* Location coordinates info */}
                    <div className="flex items-center gap-2 border-t border-white/5 pt-6 text-[11px] font-mono text-mutedGray">
                      <ShieldCheck className="h-4 w-4 text-cyan" />
                      <span>BICC BENGALURU &bull; AUGUST 22-23, 2026</span>
                    </div>

                    {/* Barcode / QR Section */}
                    <div className="flex flex-col items-center justify-center space-y-3 pt-4 border-t border-dashed border-white/10">
                      {/* Stylized Barcode SVG */}
                      <svg className="w-full h-12 opacity-80" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <g fill="#F8FAFC">
                          <rect x="0" y="0" width="2" height="40" />
                          <rect x="4" y="0" width="1" height="40" />
                          <rect x="7" y="0" width="3" height="40" />
                          <rect x="12" y="0" width="1" height="40" />
                          <rect x="15" y="0" width="2" height="40" />
                          <rect x="18" y="0" width="4" height="40" />
                          <rect x="23" y="0" width="1" height="40" />
                          <rect x="26" y="0" width="2" height="40" />
                          <rect x="30" y="0" width="1" height="40" />
                          <rect x="33" y="0" width="3" height="40" />
                          <rect x="38" y="0" width="1" height="40" />
                          <rect x="41" y="0" width="4" height="40" />
                          <rect x="47" y="0" width="2" height="40" />
                          <rect x="50" y="0" width="1" height="40" />
                          <rect x="53" y="0" width="3" height="40" />
                          <rect x="58" y="0" width="2" height="40" />
                          <rect x="61" y="0" width="1" height="40" />
                          <rect x="64" y="0" width="4" height="40" />
                          <rect x="70" y="0" width="1" height="40" />
                          <rect x="73" y="0" width="2" height="40" />
                          <rect x="77" y="0" width="1" height="40" />
                          <rect x="80" y="0" width="3" height="40" />
                          <rect x="85" y="0" width="1" height="40" />
                          <rect x="88" y="0" width="4" height="40" />
                          <rect x="94" y="0" width="2" height="40" />
                          <rect x="98" y="0" width="2" height="40" />
                        </g>
                      </svg>
                      <span className="text-[10px] font-mono tracking-widest text-mutedGray uppercase">
                        Scan QR/Barcode At Entry Gate
                      </span>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <div className="bg-white/[0.02] border-t border-white/5 p-6 flex justify-center">
                    <button
                      onClick={handleReset}
                      className="text-xs uppercase font-mono tracking-wider font-semibold text-cyan hover:text-white transition-colors py-2 px-4 rounded-lg hover:bg-white/5"
                    >
                      Register Another Attendee
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
