import React from 'react';
import { ArrowUp } from 'lucide-react';
import { sfx } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sfx.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050507] text-[#f4f1ea] border-t border-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          
          {/* Candidate Minimal Identity */}
          <div className="text-center md:text-left">
            <div className="font-anton text-2xl sm:text-3xl text-[#f4f1ea] tracking-wider uppercase">
              SASHWAT KUMAR
            </div>
            <div className="font-tech text-xs sm:text-sm text-[#dc2626] font-bold uppercase tracking-widest mt-1">
              VICE PRESIDENT CANDIDATE
            </div>
            <div className="font-tech text-xs text-zinc-400 tracking-wider uppercase mt-0.5">
              SANGYARTHAM — ISE FORUM
            </div>
          </div>

          {/* Department & College Mention */}
          <div className="text-center md:text-right font-tech text-xs text-zinc-500">
            <div className="text-zinc-300 font-semibold uppercase">
              NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY
            </div>
            <div className="uppercase mt-0.5">
              DEPARTMENT OF INFORMATION SCIENCE & ENGINEERING
            </div>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="p-3 bg-[#111116] hover:bg-[#dc2626] text-zinc-400 hover:text-black border border-zinc-800 transition-colors flex items-center justify-center group"
            title="Back to Top"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Minimal Copyright Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-tech text-zinc-600">
          <div>
            OFFICIAL CAMPAIGN MICROSITE • FOR SASHWAT KUMAR
          </div>
          <div>
            &ldquo;YOUR VOICE. YOUR CHOICE. YOUR VICE PRESIDENT.&rdquo;
          </div>
        </div>
      </div>
    </footer>
  );
};
