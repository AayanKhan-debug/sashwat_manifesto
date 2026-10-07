import React, { useState } from 'react';
import { Share2, Check, Radio, Flame, Sparkles } from 'lucide-react';
import { sfx } from '../utils/sound';

interface TheCampaignProps {
  onOpenPledgeModal: () => void;
}

export const TheCampaign: React.FC<TheCampaignProps> = ({ onOpenPledgeModal }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    sfx.stamp();
    const shareText = `ISE, READY FOR A REAL CHANGE? Because this time, the change has a name: Sashwat Kumar, standing for Vice President – SANGYARTHAM, ISE Forum. #SashwatKumar #ISEForum`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="campaign" className="relative py-24 sm:py-32 bg-[#08080b] text-[#f4f1ea] border-t border-zinc-900 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 halftone-bg opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#dc2626] pb-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center space-x-2 text-xs font-tech text-[#dc2626] uppercase tracking-[0.25em] mb-2 font-bold">
              <span className="w-2 h-2 bg-[#dc2626] inline-block" />
              <span>OFFICIAL DISPATCH // THE CAMPAIGN</span>
            </div>
            <h2 className="font-bebas text-6xl sm:text-8xl md:text-9xl tracking-tight text-[#f4f1ea] leading-none uppercase">
              THE CAMPAIGN
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
            <span className="font-tech text-xs text-zinc-400 uppercase tracking-widest">
              CALL TO ACTION
            </span>
            <span className="font-anton text-lg sm:text-xl text-[#dc2626] uppercase">
              A REAL CHANGE FOR ISE
            </span>
          </div>
        </div>

        {/* Central Campaign Manifesto Dispatch Box */}
        <div className="relative bg-[#111116] border-2 border-zinc-800 p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Subtle red gradient accent along top edge */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#dc2626] via-red-500 to-[#dc2626]" />

          {/* Decorative stamp top-right */}
          <div className="absolute top-6 right-6 hidden sm:flex items-center space-x-2 bg-black/60 border border-zinc-800 px-3 py-1 font-tech text-xs text-zinc-400">
            <Radio className="w-3.5 h-3.5 text-[#dc2626] animate-pulse" />
            <span className="uppercase tracking-widest">TRANSMISSION ACTIVE</span>
          </div>

          <div className="max-w-4xl mx-auto text-left">
            
            {/* The Big Question Callout */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-[#dc2626] text-black font-anton text-xs sm:text-sm tracking-wider uppercase mb-4">
                ISE GENERAL BODY
              </span>
              <h3 className="font-anton text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#f4f1ea] tracking-tight uppercase leading-[0.95]">
                ISE, READY FOR A REAL CHANGE?
              </h3>
            </div>

            {/* The Authentic Campaign Follow-up */}
            <div className="border-l-4 border-[#dc2626] pl-6 my-8 py-2 bg-gradient-to-r from-red-950/20 to-transparent">
              <p className="font-condensed text-2xl sm:text-3xl md:text-4xl text-zinc-200 uppercase font-bold tracking-wide leading-snug">
                Because this time, the change has a name.
              </p>
            </div>

            {/* The Candidate Endorsement Paragraph */}
            <div className="bg-black/60 border border-zinc-800 p-6 sm:p-8 rounded-none">
              <p className="font-sans text-lg sm:text-2xl text-zinc-300 font-medium leading-relaxed">
                &ldquo;Our own, <span className="text-[#dc2626] font-bold font-anton text-xl sm:text-3xl tracking-wide">Sashwat Kumar</span>, from ISE, standing for the position of <span className="text-white font-semibold">Vice President – SANGYARTHAM, ISE Forum</span>.&rdquo;
              </p>
            </div>

            {/* Action Bar */}
            <div className="mt-10 pt-8 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-6">
              
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    sfx.stamp();
                    onOpenPledgeModal();
                  }}
                  className="px-6 sm:px-8 py-3.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-anton text-base sm:text-lg tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(220,38,38,0.4)] flex items-center space-x-2 border border-red-500 active:scale-95"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>PLEDGE YOUR VOTE</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-tech text-xs sm:text-sm tracking-wider uppercase border border-zinc-700 transition-colors flex items-center space-x-2"
                >
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4 text-[#dc2626]" />}
                  <span>{copied ? 'CAMPAIGN COPIED TO CLIPBOARD' : 'SPREAD THE WORD'}</span>
                </button>
              </div>

              {/* Tagline Badge */}
              <div className="flex items-center space-x-2 font-tech text-xs text-zinc-400 uppercase">
                <Flame className="w-4 h-4 text-[#dc2626]" />
                <span>FORUM ELECTIONS • SANGYARTHAM</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
