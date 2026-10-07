import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Maximize2 } from 'lucide-react';
import { sfx } from '../utils/sound';

interface FinalSectionProps {
  onOpenPledgeModal: () => void;
  onOpenPosterModal: () => void;
}

export const FinalSection: React.FC<FinalSectionProps> = ({ onOpenPledgeModal, onOpenPosterModal }) => {
  return (
    <section className="relative py-28 sm:py-36 bg-[#060608] text-[#f4f1ea] border-t-2 border-[#dc2626] overflow-hidden">
      {/* Background Ambience & Red Glow */}
      <div className="absolute inset-0 halftone-red opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55rem] h-[35rem] bg-red-600/15 rounded-full blur-[180px] pointer-events-none" />

      {/* Candidate image as dramatic background editorial element */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 opacity-10 lg:opacity-20 pointer-events-none overflow-hidden flex items-center justify-center">
        <img
          src="/candidate-poster.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-top filter grayscale contrast-150 mix-blend-luminosity scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060608] via-[#060608]/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Mini Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-[#dc2626] text-black font-anton text-xs sm:text-sm tracking-wider uppercase mb-8 shadow-md"
        >
          <Shield className="w-4 h-4 text-black" />
          <span>OFFICIAL ISE VICE PRESIDENTIAL CANDIDACY</span>
        </motion.div>

        {/* Dramatic Candidate Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-4"
        >
          <h2 className="font-bebas text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] tracking-tight text-[#f4f1ea] leading-[0.88] select-none uppercase">
            SASHWAT <span className="text-[#dc2626]">KUMAR</span>
          </h2>
        </motion.div>

        {/* Position & Forum */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 flex flex-col items-center"
        >
          <div className="font-anton text-2xl sm:text-4xl md:text-5xl text-zinc-100 uppercase tracking-widest">
            VICE PRESIDENT
          </div>
          <div className="font-tech text-base sm:text-xl text-[#dc2626] font-bold uppercase tracking-widest mt-1">
            SANGYARTHAM — ISE FORUM
          </div>
        </motion.div>

        {/* The Campaign Climax Slogan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="my-10 p-6 sm:p-10 bg-black/90 border-2 border-[#dc2626] shadow-[0_0_50px_rgba(220,38,38,0.3)] max-w-3xl mx-auto"
        >
          <p className="font-condensed text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-wider text-[#f4f1ea] leading-tight">
            YOUR VOICE. <br className="sm:hidden" />
            YOUR CHOICE. <br />
            <span className="text-[#dc2626]">YOUR VICE PRESIDENT.</span>
          </p>
        </motion.div>

        {/* Verified Campaign Record Box (Strictly no fabricated dates/symbols) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto my-8 p-6 bg-[#111116] border border-zinc-800 text-left"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
            <span className="font-tech text-xs text-[#dc2626] uppercase font-bold tracking-widest">
              OFFICIAL CAMPAIGN RECORD
            </span>
            <span className="font-tech text-[11px] text-zinc-500 uppercase">
              DEPT. OF INFORMATION SCIENCE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-tech text-zinc-400">
            <div>
              <span className="text-zinc-500 uppercase block text-[10px]">CANDIDATE</span>
              <span className="text-zinc-200 font-bold">Sashwat Kumar</span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase block text-[10px]">CONTESTED OFFICE</span>
              <span className="text-zinc-200 font-bold">Vice President</span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase block text-[10px]">DEPARTMENTAL FORUM</span>
              <span className="text-zinc-200 font-bold">SANGYARTHAM</span>
            </div>
            <div>
              <span className="text-zinc-500 uppercase block text-[10px]">AFFILIATION</span>
              <span className="text-zinc-200 font-bold">ISE, NMIT</span>
            </div>
          </div>
        </motion.div>

        {/* Final CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <button
            onClick={() => {
              sfx.stamp();
              onOpenPledgeModal();
            }}
            className="px-8 sm:px-10 py-4 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-anton text-lg tracking-wider uppercase transition-all shadow-[0_6px_30px_rgba(220,38,38,0.5)] flex items-center space-x-2 border border-red-500 active:scale-95"
          >
            <Sparkles className="w-5 h-5" />
            <span>STAND WITH SASHWAT</span>
          </button>

          <button
            onClick={() => {
              sfx.click();
              onOpenPosterModal();
            }}
            className="px-6 sm:px-8 py-4 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-tech text-xs sm:text-sm tracking-wider uppercase border border-zinc-700 transition-colors flex items-center space-x-2"
          >
            <Maximize2 className="w-4 h-4 text-[#dc2626]" />
            <span>VIEW OFFICIAL POSTER</span>
          </button>
        </motion.div>

      </div>
    </section>
  );
};
