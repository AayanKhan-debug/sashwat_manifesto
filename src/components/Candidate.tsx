import React from 'react';
import { motion } from 'framer-motion';
import { Maximize2, BookmarkCheck, Sparkles, ExternalLink, Shield } from 'lucide-react';
import { sfx } from '../utils/sound';

interface CandidateProps {
  onOpenPosterModal: () => void;
  onOpenPledgeModal: () => void;
}

export const Candidate: React.FC<CandidateProps> = ({ onOpenPosterModal, onOpenPledgeModal }) => {
  return (
    <section id="candidate" className="relative py-20 sm:py-28 bg-[#07070a] text-[#f4f1ea] border-t border-zinc-900 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 halftone-bg opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#dc2626] pb-6 mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 text-xs font-tech text-[#dc2626] uppercase tracking-[0.25em] mb-2 font-bold">
              <span className="w-2 h-2 bg-[#dc2626] inline-block" />
              <span>OFFICIAL PROFILE // ELECTION NOMINATION</span>
            </div>
            <h2 className="font-bebas text-6xl sm:text-8xl md:text-9xl tracking-tight text-[#f4f1ea] leading-none uppercase">
              THE CANDIDATE
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-4 md:mt-0 flex flex-col items-start md:items-end"
          >
            <span className="font-tech text-xs text-zinc-400 uppercase tracking-widest">
              OFFICIAL FILING
            </span>
            <span className="font-anton text-lg sm:text-xl text-[#dc2626] uppercase">
              SASHWAT KUMAR
            </span>
          </motion.div>
        </div>

        {/* Editorial Collage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Official Poster Spotlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative w-full max-w-md sm:max-w-lg group">
              {/* Halftone backdrop aura */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#dc2626]/20 via-black to-zinc-900/60 blur-xl pointer-events-none" />

              {/* Poster frame styled as an editorial archive print */}
              <div className="relative bg-[#0d0d12] border-2 border-zinc-700 group-hover:border-[#dc2626] transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.85)] p-3 sm:p-4">
                
                {/* Print Registration Marks */}
                <div className="absolute top-1 left-1 text-[8px] font-tech text-zinc-600">⊕ REG-01</div>
                <div className="absolute top-1 right-1 text-[8px] font-tech text-zinc-600">REG-02 ⊕</div>
                <div className="absolute bottom-1 left-1 text-[8px] font-tech text-zinc-600">⊕ NMIT-ISE</div>
                <div className="absolute bottom-1 right-1 text-[8px] font-tech text-zinc-600">2024-25 ⊕</div>

                {/* Poster asset container */}
                <div
                  onClick={() => {
                    sfx.click();
                    onOpenPosterModal();
                  }}
                  className="relative cursor-pointer overflow-hidden bg-black border border-zinc-800"
                >
                  <img
                    src="/candidate-poster.png"
                    alt="Official Campaign Poster of Sashwat Kumar for Vice President, SANGYARTHAM ISE Forum"
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                    loading="lazy"
                  />

                  {/* Hover action overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        sfx.stamp();
                        onOpenPosterModal();
                      }}
                      className="px-4 py-2 bg-[#dc2626] text-black font-anton tracking-wider text-sm flex items-center space-x-1.5 shadow-lg"
                    >
                      <Maximize2 className="w-4 h-4" />
                      <span>INSPECT ORIGINAL POSTER</span>
                    </button>
                  </div>
                </div>

                {/* Sub-caption */}
                <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center justify-between text-xs font-tech text-zinc-400">
                  <span className="text-[#dc2626] font-bold">AUTHENTIC CAMPAIGN VISUAL</span>
                  <span>PRESERVED ORIGINAL ARTWORK</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Credentials & Campaign Identity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex flex-col space-y-6"
          >
            
            {/* Candidate Identity Card */}
            <div className="p-6 sm:p-8 bg-[#101015] border border-zinc-800 relative">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#dc2626]" />
              
              <div className="flex items-center justify-between mb-4">
                <span className="font-tech text-xs uppercase tracking-widest text-zinc-400">
                  CANDIDATE NOMINATION
                </span>
                <span className="px-2 py-0.5 bg-[#dc2626]/20 text-[#dc2626] border border-[#dc2626]/40 font-tech text-[11px] font-bold flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  ISE DEPARTMENT
                </span>
              </div>

              <h3 className="font-anton text-4xl sm:text-5xl text-[#f4f1ea] tracking-wider uppercase mb-2">
                SASHWAT KUMAR
              </h3>

              <div className="text-lg sm:text-xl font-condensed font-bold text-[#dc2626] uppercase tracking-wide mb-6">
                VICE PRESIDENT CANDIDATE
              </div>

              <div className="font-tech text-sm text-zinc-300 uppercase tracking-widest pb-6 border-b border-zinc-800 flex items-center space-x-2">
                <BookmarkCheck className="w-4 h-4 text-[#dc2626]" />
                <span>SANGYARTHAM — ISE FORUM</span>
              </div>

              {/* Verified Nomination Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <div className="p-3 bg-black/50 border border-zinc-800/80">
                  <div className="font-tech text-[10px] text-zinc-500 uppercase tracking-widest">POSITION SOUGHT</div>
                  <div className="font-anton text-base text-[#f4f1ea] uppercase mt-0.5">VICE PRESIDENT</div>
                </div>

                <div className="p-3 bg-black/50 border border-zinc-800/80">
                  <div className="font-tech text-[10px] text-zinc-500 uppercase tracking-widest">STUDENT FORUM</div>
                  <div className="font-anton text-base text-[#dc2626] uppercase mt-0.5">SANGYARTHAM</div>
                </div>

                <div className="p-3 bg-black/50 border border-zinc-800/80">
                  <div className="font-tech text-[10px] text-zinc-500 uppercase tracking-widest">DEPARTMENT</div>
                  <div className="font-anton text-base text-[#f4f1ea] uppercase mt-0.5">ISE (INFO SCIENCE)</div>
                </div>

                <div className="p-3 bg-black/50 border border-zinc-800/80">
                  <div className="font-tech text-[10px] text-zinc-500 uppercase tracking-widest">INSTITUTION</div>
                  <div className="font-anton text-base text-zinc-300 uppercase mt-0.5">NMIT</div>
                </div>
              </div>
            </div>

            {/* Poster Aesthetics Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#121217] border border-zinc-800">
                <div className="font-anton text-sm text-[#dc2626] uppercase mb-1">
                  NMIT & ISE FORUM BRANDING
                </div>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  Preserving official Nitte Meenakshi Institute of Technology and Information Science & Engineering forum insignia.
                </p>
              </div>

              <div className="p-4 bg-[#121217] border border-zinc-800">
                <div className="font-anton text-sm text-[#dc2626] uppercase mb-1">
                  STARRING: SASHWAT KUMAR
                </div>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  Preserving the candidate&apos;s authentic appearance with the iconic red bindi, halftone finish, and 2004 emblem.
                </p>
              </div>
            </div>

            {/* Interactive Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  sfx.stamp();
                  onOpenPledgeModal();
                }}
                className="px-6 py-3 bg-[#dc2626] hover:bg-[#b91c1c] text-[#f4f1ea] font-anton text-sm tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(220,38,38,0.3)] flex items-center space-x-2 border border-red-500"
              >
                <Sparkles className="w-4 h-4" />
                <span>PLEDGE SUPPORT FOR SASHWAT</span>
              </button>

              <button
                onClick={() => {
                  sfx.click();
                  onOpenPosterModal();
                }}
                className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-tech text-xs tracking-wider uppercase border border-zinc-700 flex items-center space-x-2 transition-colors"
              >
                <span>OPEN POSTER IN HIGH RESOLUTION</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#dc2626]" />
              </button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
