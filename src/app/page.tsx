"use client";

import { useState } from "react";
import WelcomeModal from "@/components/sections/WelcomeModal";
import Hero from "@/components/sections/Hero";
import Storytelling from "@/components/sections/Storytelling";
import WhyAttend from "@/components/sections/WhyAttend";
import Audience from "@/components/sections/Audience";
import Speakers from "@/components/sections/Speakers";
import Schedule from "@/components/sections/Schedule";
import Venue from "@/components/sections/Venue";
import Registration from "@/components/sections/Registration";
import Footer from "@/components/Footer";

export default function Home() {
  const [userName, setUserName] = useState("");

  const handleOnboardingComplete = (name: string) => {
    setUserName(name);
  };

  return (
    <main className="flex flex-col items-center min-h-screen bg-background text-foreground selection:bg-primary/30 relative overflow-hidden">
      {/* Welcome Onboarding Modal Overlay */}
      <WelcomeModal onComplete={handleOnboardingComplete} />

      {/* Background glow overlay */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_60%)]" />
      <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] -z-10 animate-glow-slow" />
      <div className="absolute top-[40%] -left-[10%] w-[450px] h-[450px] bg-cyan-500/8 rounded-full blur-[140px] -z-10 animate-glow-slow [animation-delay:4s]" />
      <div className="absolute -bottom-[10%] right-[10%] w-[550px] h-[550px] bg-electricBlue/8 rounded-full blur-[140px] -z-10 animate-glow-slow [animation-delay:8s]" />

      {/* Main Hero Component */}
      <Hero userName={userName} />

      {/* Storytelling Section */}
      <Storytelling />

      {/* Why Attend Section */}
      <WhyAttend />

      {/* Audience Target Groups Section */}
      <Audience />

      {/* Speakers Keynote Section */}
      <Speakers />

      {/* Conference Schedule Timeline Section */}
      <Schedule />

      {/* Venue Experience & Location Section */}
      <Venue />

      {/* Registration Section */}
      <Registration userName={userName} />

      {/* Footer Section */}
      <Footer />
    </main>
  );
}
