import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Maximize2, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import { sfx } from '../utils/sound';

interface HeroProps {
  onOpenPosterModal: () => void;
  onOpenPledgeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenPosterModal, onOpenPledgeModal }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden bg-[#09090c] red-ambient-glow"
    >
      {/* Background Halftone & Grain Overlays */}
      <div className="absolute inset-0 halftone-bg opacity-35 pointer-events-none" />
      <div className="absolute inset-0 grain-overlay pointer-events-none" />
      
      {/* Red ambient radial lights */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-32 w-[30rem] h-[30rem] bg-red-700/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Hero Grid Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-16 pb-12 flex-1 flex flex-col justify-center w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Big Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col space-y-6 order-2 lg:order-1">
            
            {/* ISE Election Header Pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2"
            >
              <span className="inline-flex items-center px-3 py-1 bg-[#dc2626] text-black font-anton text-xs sm:text-sm tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-black" />
                ISE FORUM ELECTION
              </span>
              <span className="font-tech text-xs tracking-widest text-zinc-400 uppercase bg-[#141418] border border-zinc-800 px-3 py-1">
                NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY
              </span>
            </motion.div>

            {/* Candidate Name - Giant Condensed Typography */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="text-[12px] sm:text-sm font-tech tracking-[0.3em] text-[#dc2626] uppercase font-bold mb-1">
                OFFICIAL CANDIDATE
              </div>
              <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] xl:text-[8.5rem] tracking-tight text-[#f4f1ea] leading-[0.88] select-none">
                SASHWAT
                <span className="block text-[#dc2626] hover:text-[#ef4444] transition-colors">
                  KUMAR
                </span>
              </h1>
            </motion.div>

            {/* Position & Forum */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="border-l-4 border-[#dc2626] pl-4 sm:pl-6 py-1 bg-gradient-to-r from-[#1c1212] to-transparent"
            >
              <div className="font-anton text-2xl sm:text-3xl md:text-4xl text-[#f4f1ea] tracking-wider uppercase">
                VICE PRESIDENT
              </div>
              <div className="font-tech text-sm sm:text-base text-zinc-400 tracking-wider uppercase flex items-center gap-2 mt-1">
                <span className="text-[#dc2626] font-bold">SANGYARTHAM</span>
                <span>—</span>
                <span>ISE FORUM</span>
              </div>
            </motion.div>

            {/* Campaign Core Slogan Line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="bg-[#121217] border border-zinc-800 p-4 sm:p-5 relative group"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-[#dc2626]" />
              <p className="font-condensed text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide text-[#f4f1ea] leading-snug pl-2">
                YOUR VOICE. YOUR CHOICE. <span className="text-[#dc2626]">YOUR VICE PRESIDENT.</span>
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                onClick={() => {
                  sfx.stamp();
                  onOpenPledgeModal();
                }}
                className="px-6 sm:px-8 py-3.5 bg-[#dc2626] hover:bg-[#b91c1c] text-[#f4f1ea] font-anton text-base sm:text-lg tracking-wider uppercase transition-all shadow-[0_6px_20px_rgba(220,38,38,0.4)] flex items-center space-x-2 border border-red-500 active:scale-95"
              >
                <Sparkles className="w-5 h-5" />
                <span>STAND WITH SASHWAT</span>
              </button>

              <a
                href="#manifesto"
                onClick={() => sfx.click()}
                className="px-6 py-3.5 bg-[#16161c] hover:bg-[#202028] text-zinc-200 hover:text-white font-tech text-xs sm:text-sm tracking-wider uppercase border border-zinc-700 hover:border-zinc-500 transition-all flex items-center space-x-2"
              >
                <span>EXPLORE MANIFESTO</span>
                <ChevronRight className="w-4 h-4 text-[#dc2626]" />
              </a>

              <button
                onClick={() => {
                  sfx.click();
                  onOpenPosterModal();
                }}
                className="px-4 py-3.5 text-zinc-400 hover:text-[#f4f1ea] font-tech text-xs tracking-wider uppercase hover:underline flex items-center space-x-1.5"
              >
                <Maximize2 className="w-4 h-4 text-[#dc2626]" />
                <span>INSPECT OFFICIAL POSTER</span>
              </button>
            </motion.div>

            {/* Micro Details */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 text-[11px] font-tech text-zinc-400 border-t border-zinc-800/80">
              <div>
                <span className="block text-zinc-500 uppercase">DEPARTMENT</span>
                <span className="text-zinc-200 font-semibold">INFO SCIENCE & ENGG</span>
              </div>
              <div>
                <span className="block text-zinc-500 uppercase">OFFICIAL FORUM</span>
                <span className="text-zinc-200 font-semibold">SANGYARTHAM (ISE)</span>
              </div>
              <div>
                <span className="block text-zinc-500 uppercase">CORE AGENDA</span>
                <span className="text-[#dc2626] font-semibold">TRIPS & VOICE</span>
              </div>
            </div>

          </div>

          {/* Right Column: Prominent Candidate Campaign Poster Asset */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md sm:max-w-lg lg:max-w-none group"
            >
              
              {/* Outer decorative distressed border & glowing aura */}
              <div className="absolute -inset-2 bg-gradient-to-b from-[#dc2626]/30 via-red-900/10 to-[#dc2626]/20 blur-md rounded-none group-hover:from-[#dc2626]/50 transition-all duration-500" />
              
              {/* Halftone texture background behind the poster */}
              <div className="absolute -inset-4 halftone-red opacity-30 pointer-events-none" />

              {/* Main Poster Container */}
              <div
                onClick={() => {
                  sfx.click();
                  onOpenPosterModal();
                }}
                className="relative cursor-pointer bg-[#0e0e12] border-2 border-zinc-700/80 group-hover:border-[#dc2626] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden"
              >
                {/* Vintage Editorial Header strip inside container */}
                <div className="bg-[#141418] px-3 py-1.5 border-b border-zinc-800 flex items-center justify-between text-[11px] font-tech text-zinc-400">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-[#dc2626] inline-block" />
                    <span className="uppercase text-zinc-300">NITTE // ISE FORUM ARCHIVES</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[#dc2626] font-semibold">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="text-[10px]">TAP TO EXPAND</span>
                  </div>
                </div>

                {/* THE UPLOADED CAMPAIGN POSTER ASSET - Face strictly protected and visible */}
                <div className="relative aspect-[3/4.2] sm:aspect-[3/4.1] w-full bg-[#121217] flex items-center justify-center overflow-hidden">
                  <img
                    src="/candidate-poster.png"
                    alt="Sashwat Kumar - Official Campaign Poster for Vice President, SANGYARTHAM, ISE Forum at NMIT"
                    className="w-full h-full object-contain sm:object-cover sm:object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="eager"
                  />
                  {/* Subtle vignette that does NOT obscure the candidate's face */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
                </div>

                {/* Bottom Poster Caption Bar */}
                <div className="bg-[#141418] p-3 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="font-anton text-sm text-[#f4f1ea] tracking-wider uppercase">
                      STARRING : SASHWAT KUMAR
                    </div>
                    <div className="font-tech text-[10px] text-zinc-400">
                      SANGYARTHAM • VICE PRESIDENT CANDIDATE
                    </div>
                  </div>
                  <div className="font-anton text-lg text-[#dc2626] px-2 py-0.5 bg-black/60 border border-red-950">
                    2004
                  </div>
                </div>
              </div>

              {/* Decorative Corner Tags */}
              <div className="absolute -bottom-3 -left-3 bg-[#dc2626] text-black font-anton px-2 py-0.5 text-xs uppercase shadow-md pointer-events-none">
                VERIFIED ASSET
              </div>
              <div className="absolute -top-3 -right-3 bg-zinc-900 border border-zinc-700 text-zinc-300 font-tech px-2 py-0.5 text-[10px] uppercase shadow-md pointer-events-none">
                OFFICIAL POSTER
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="relative z-10 w-full border-t border-zinc-900 bg-[#08080a]/90 py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-tech text-zinc-500">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] animate-ping" />
            <span className="uppercase tracking-widest text-[11px]">VOTE SASHWAT KUMAR • ISE FORUM</span>
          </div>

          <a
            href="#manifesto"
            onClick={() => sfx.click()}
            className="flex items-center space-x-2 text-zinc-400 hover:text-[#dc2626] transition-colors uppercase tracking-widest text-[11px]"
          >
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#dc2626]" />
          </a>

          <div className="hidden sm:block text-[11px] text-zinc-600">
            DEPARTMENT OF INFORMATION SCIENCE & ENGINEERING
          </div>
        </div>
      </div>
    </section>
  );
};
