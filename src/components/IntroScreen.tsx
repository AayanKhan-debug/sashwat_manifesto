import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Volume2, Shield } from 'lucide-react';

interface IntroScreenProps {
  onEnter: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400);   // THE ISE FORUM
    const t2 = setTimeout(() => setStep(2), 1200);  // SANGYARTHAM
    const t3 = setTimeout(() => setStep(3), 2000);  // SASHWAT KUMAR
    const t4 = setTimeout(() => setStep(4), 2800);  // VICE PRESIDENT
    const t5 = setTimeout(() => setStep(5), 3500);  // [ ENTER THE CAMPAIGN ]

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-12 bg-[#050507] text-[#f4f1ea] overflow-hidden select-none"
      >
        {/* Subtle Film Grain Overlay */}
        <div className="absolute inset-0 grain-overlay pointer-events-none opacity-40" />
        
        {/* Cinematic ambient red glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35rem] h-[35rem] bg-red-700/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Header metadata */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full flex items-center justify-between text-[11px] sm:text-xs font-tech text-zinc-400 uppercase tracking-widest pt-2"
        >
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-[#dc2626] animate-ping" />
            <span>NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY</span>
          </div>
          <div className="hidden sm:block text-zinc-500">
            OFFICIAL CAMPAIGN ARCHIVE // ISE
          </div>
        </motion.div>

        {/* Center Animated Sequence */}
        <div className="flex flex-col items-center justify-center text-center my-auto w-full max-w-4xl px-2">
          
          {/* Step 1: THE ISE FORUM */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 15 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center space-x-2 mb-2"
          >
            <Shield className="w-4 h-4 text-[#dc2626]" />
            <span className="font-tech text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase text-zinc-300 font-semibold">
              THE <span className="text-[#dc2626]">ISE</span> FORUM
            </span>
          </motion.div>

          {/* Step 2: SANGYARTHAM */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.95 }}
            transition={{ duration: 0.6 }}
            className="mb-4 sm:mb-6"
          >
            <span className="font-anton text-2xl sm:text-4xl md:text-5xl tracking-[0.15em] uppercase text-[#dc2626]">
              SANGYARTHAM
            </span>
          </motion.div>

          {/* Subtle horizontal red separator */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: step >= 2 ? '120px' : '0px' }}
            transition={{ duration: 0.6 }}
            className="h-[2px] bg-[#dc2626] mx-auto mb-6 sm:mb-8"
          />

          {/* Step 3: SASHWAT KUMAR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 20 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="mb-3"
          >
            <h1 className="font-bebas text-6xl sm:text-8xl md:text-9xl lg:text-[8.5rem] tracking-tight text-[#f4f1ea] leading-[0.88] uppercase drop-shadow-[0_10px_30px_rgba(220,38,38,0.2)]">
              SASHWAT <span className="text-[#dc2626]">KUMAR</span>
            </h1>
          </motion.div>

          {/* Step 4: VICE PRESIDENT */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 15 }}
            transition={{ duration: 0.7 }}
            className="mb-10 sm:mb-14"
          >
            <div className="font-anton text-xl sm:text-3xl md:text-4xl text-zinc-300 tracking-[0.25em] uppercase">
              VICE PRESIDENT
            </div>
            <div className="font-tech text-xs sm:text-sm text-zinc-500 tracking-widest uppercase mt-1">
              DEPARTMENT OF INFORMATION SCIENCE & ENGINEERING
            </div>
          </motion.div>

          {/* Step 5: [ ENTER THE CAMPAIGN ] button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: step >= 5 ? 1 : 0, scale: step >= 5 ? 1 : 0.92 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center"
          >
            <button
              onClick={onEnter}
              className="group relative px-8 sm:px-12 py-4 sm:py-5 bg-[#dc2626] hover:bg-[#b91c1c] text-[#f4f1ea] font-anton text-lg sm:text-2xl tracking-[0.15em] uppercase transition-all duration-300 shadow-[0_0_35px_rgba(220,38,38,0.5)] flex items-center space-x-3 border-2 border-red-400 hover:border-white active:scale-95"
            >
              <span>[ ENTER THE CAMPAIGN ]</span>
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1.5 transition-transform" />
            </button>

            <div className="mt-4 flex items-center space-x-2 text-zinc-400 font-tech text-xs tracking-wider">
              <Volume2 className="w-3.5 h-3.5 text-[#dc2626]" />
              <span>EXPERIENCE WITH OFFICIAL CAMPAIGN THEME AUDIO</span>
            </div>
          </motion.div>

        </div>

        {/* Bottom minimal tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8 }}
          className="text-[11px] font-tech text-zinc-500 uppercase tracking-widest text-center"
        >
          &ldquo;YOUR VOICE. YOUR CHOICE. YOUR VICE PRESIDENT.&rdquo;
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
