"use client";

import { Sparkles, Mail, RefreshCw } from "lucide-react";

export default function Footer() {
  const handleResetOnboarding = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("visitorName");
      window.location.reload();
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#050816] border-t border-white/5 py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col space-y-10">
        
        {/* Top block */}
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-8 pb-10 border-b border-white/5">
          {/* Logo Title */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-softWhite">
              <Sparkles className="h-5 w-5 text-cyan" />
              <span className="font-heading font-bold text-lg tracking-tight">
                AI Builders Summit 2026
              </span>
            </div>
            <p className="text-xs text-mutedGray max-w-xs font-sans leading-relaxed">
              Bengaluru Convention Plaza &bull; August 22-23, 2026. Empowering developers, researchers, and builders to shape the future of AI.
            </p>
          </div>

          {/* Links and Actions */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 text-xs font-sans">
            <div className="space-y-3">
              <h5 className="font-semibold text-softWhite uppercase tracking-widest text-[10px] text-cyan/70">
                Explore
              </h5>
              <ul className="space-y-2 text-mutedGray">
                <li>
                  <a href="#" className="hover:text-cyan transition-colors">Hero</a>
                </li>
                <li>
                  <a href="#register" className="hover:text-cyan transition-colors">Register</a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h5 className="font-semibold text-softWhite uppercase tracking-widest text-[10px] text-cyan/70">
                Contact
              </h5>
              <ul className="space-y-2 text-mutedGray">
                <li className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-cyan/80" />
                  <a href="mailto:hello@aibuilders2026.com" className="hover:text-cyan transition-colors">
                    hello@aibuilders2026.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Reset Area */}
            <div className="space-y-3">
              <h5 className="font-semibold text-softWhite uppercase tracking-widest text-[10px] text-cyan/70">
                Preferences
              </h5>
              <button
                onClick={handleResetOnboarding}
                className="flex items-center gap-1.5 text-mutedGray hover:text-red-400 transition-colors cursor-pointer group"
              >
                <RefreshCw className="h-3.5 w-3.5 text-red-500/80 group-hover:rotate-180 transition-transform duration-500" />
                Reset Onboarding
              </button>
            </div>
          </div>
        </div>

        {/* Bottom block */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-sans text-mutedGray">
          <p>&copy; {currentYear} AI Builders Summit. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-cyan transition-colors">Terms of Service</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-cyan transition-colors">Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
