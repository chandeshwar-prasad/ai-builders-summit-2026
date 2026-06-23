"use client";

import Image from "next/image";
import { MapPin, Navigation, Compass, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Venue() {
  const handleDirectionsClick = () => {
    // Open Google Maps search pointing to BIEC/BICC Bengaluru
    window.open("https://maps.google.com/?q=Bengaluru+International+Exhibition+Centre", "_blank");
  };

  return (
    <section className="relative w-full pt-12 pb-12 md:pt-16 md:pb-16 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center space-y-16 border-t border-white/5">
      {/* Title */}
      <div className="text-center space-y-4 max-w-2xl">
        <span className="text-xs uppercase font-mono tracking-widest text-cyan font-semibold">
          Summit Location
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-softWhite leading-tight">
          The BICC Experience
        </h2>
        <p className="text-sm md:text-base text-mutedGray font-sans leading-relaxed">
          Join us in Bengaluru for two days of learning, networking, and innovation.
        </p>
      </div>

      {/* Event Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl">
        {[
          { value: "2,000+", label: "Attendees" },
          { value: "30+", label: "Speakers" },
          { value: "12", label: "Workshops" },
          { value: "8", label: "Learning Tracks" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-5 md:p-6 rounded-2xl border border-white/5 text-center flex flex-col justify-center items-center space-y-1 hover:border-cyan/20 transition-all duration-300"
          >
            <span className="text-2xl md:text-3xl font-heading font-extrabold bg-gradient-to-r from-cyan to-electricBlue bg-clip-text text-transparent">
              {stat.value}
            </span>
            <span className="text-[10px] md:text-xs font-sans text-mutedGray uppercase tracking-widest font-semibold">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* 2-Column Grid on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full max-w-6xl items-center">
        {/* Left Side: Images Grid (5/12 columns) */}
        <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
          {/* Main Exterior Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full h-[260px] md:h-[320px] rounded-3xl overflow-hidden glass-card group border border-white/10"
          >
            <Image
              src="/assets/venue/venue-exterior.jpg"
              alt="BICC Venue Exterior"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-spaceBlack/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-softWhite bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm font-sans font-semibold">
              <Star className="h-3.5 w-3.5 text-cyan fill-cyan" />
              Main Convention Plaza
            </div>
          </motion.div>

          {/* Networking Session Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full h-[200px] md:h-[240px] rounded-3xl overflow-hidden glass-card group border border-white/10"
          >
            <Image
              src="/assets/venue/networking-session.jpg"
              alt="Plaza Networking Hall"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-spaceBlack/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs text-softWhite bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm font-sans font-semibold">
              <Compass className="h-3.5 w-3.5 text-cyan" />
              Networking Plazas
            </div>
          </motion.div>
        </div>

        {/* Right Side: Details & Maps (7/12 columns) */}
        <div className="lg:col-span-7 space-y-8 flex flex-col">
          {/* Venue Info Card */}
          <div className="glass-card p-6 md:p-8 rounded-[24px] border border-white/5 space-y-5 text-left">
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-heading font-bold text-softWhite flex items-center gap-2">
                <MapPin className="h-6 w-6 text-cyan" />
                Bengaluru International Convention Centre (BICC)
              </h3>
              <p className="text-xs font-mono text-cyan/70 tracking-widest uppercase font-semibold">
                Bengaluru, India
              </p>
            </div>

            <p className="text-xs md:text-sm text-mutedGray font-sans leading-relaxed">
              Equipped with ultra-fast connectivity, spatial sound arrays, and immersive screens, the BICC hosts the largest technology launches in South Asia. Accessible by metro and road, with dedicated parking and convention amenities.
            </p>

            <div className="pt-2">
              <Button
                onClick={handleDirectionsClick}
                className="font-sans font-semibold text-xs tracking-wider uppercase py-4 px-6 gap-2 bg-gradient-to-r from-electricBlue to-violet hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all text-white border-0 shadow-lg shadow-electricBlue/20"
              >
                Get Directions <Navigation className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Embedded Google Maps Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full h-[280px] md:h-[350px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative"
          >
            <iframe
              title="BICC Bengaluru Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15545.973413009403!2d77.5855668!3d12.9733075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae167123999999%3A0x2314e3b1c6764cb5!2sBengaluru%20International%20Exhibition%20Centre!5e0!3m2!1sen!2sin!4v1719114389020!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale invert opacity-80"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
