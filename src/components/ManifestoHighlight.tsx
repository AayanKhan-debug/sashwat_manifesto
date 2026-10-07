import React from 'react';
import { motion } from 'framer-motion';

export const ManifestoHighlight: React.FC = () => {
  const statements = [
    {
      prefix: 'YOUR VOICE',
      suffix: 'DESERVES TO BE HEARD.',
      accent: 'HEARD.',
    },
    {
      prefix: 'YOUR CONCERNS',
      suffix: 'DESERVE TO BE REPRESENTED.',
      accent: 'REPRESENTED.',
    },
    {
      prefix: 'YOUR DEMANDS',
      suffix: 'DESERVE TO MATTER.',
      accent: 'MATTER.',
    },
  ];

  return (
    <section className="relative py-28 sm:py-36 bg-[#060608] text-[#f4f1ea] border-t border-zinc-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 halftone-bg opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[25rem] bg-red-700/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Minimalist Top Marker */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#121217] border border-zinc-800 text-[#dc2626] font-tech text-xs tracking-[0.25em] uppercase mb-12 sm:mb-16 font-bold">
          <span className="w-1.5 h-1.5 bg-[#dc2626] inline-block animate-ping" />
          <span>CORE PHILOSOPHY // ISE FORUM</span>
        </div>

        {/* The 3 Scroll-animated Minimalist Typographic Statements */}
        <div className="space-y-16 sm:space-y-24">
          {statements.map((stmt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center"
            >
              <div className="font-bebas text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-zinc-400 uppercase leading-none">
                {stmt.prefix}
              </div>

              <div className="font-anton text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide uppercase leading-tight mt-1">
                {stmt.suffix.replace(stmt.accent, '')}
                <span className="text-[#dc2626] underline decoration-red-600/40 decoration-4 underline-offset-8">
                  {stmt.accent}
                </span>
              </div>

              {idx < statements.length - 1 && (
                <div className="w-16 h-[2px] bg-zinc-800 mx-auto mt-16 sm:mt-24" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Campaign Signoff */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 pt-10 border-t border-zinc-900 flex flex-col items-center"
        >
          <div className="font-tech text-xs sm:text-sm text-zinc-500 uppercase tracking-widest">
            SASHWAT KUMAR • VICE PRESIDENT • SANGYARTHAM, ISE FORUM
          </div>
        </motion.div>

      </div>
    </section>
  );
};
