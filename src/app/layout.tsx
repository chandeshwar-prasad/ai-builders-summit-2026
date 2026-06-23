import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ParticleBackground from "@/components/ParticleBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "AI Builders Summit 2026 | AI, Data Analytics & Automation",
  description: "Join us on 22–23 August 2026 in Bengaluru for the premier summit on Artificial Intelligence, Data Analytics, Automation, and Generative AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark scroll-smooth", inter.variable, spaceGrotesk.variable)}>
      <body className="bg-background text-foreground font-sans antialiased relative min-h-screen">
        <SmoothScrollProvider>
          <ParticleBackground />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

