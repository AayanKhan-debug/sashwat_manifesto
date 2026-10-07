import React from 'react';

interface MarqueeBannerProps {
  variant?: 'red' | 'black' | 'outline';
}

export const MarqueeBanner: React.FC<MarqueeBannerProps> = ({ variant = 'red' }) => {
  const items = [
    'SASHWAT KUMAR',
    'VICE PRESIDENT',
    'SANGYARTHAM',
    'ISE FORUM',
    'INDUSTRIAL TRIPS',
    'STUDENT\'S VOICE',
    'YOUR VOICE. YOUR CHOICE. YOUR VICE PRESIDENT.',
    'NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY',
  ];

  const bgColor =
    variant === 'red'
      ? 'bg-[#dc2626] text-black border-y-2 border-black'
      : variant === 'black'
      ? 'bg-[#0f0f14] text-[#f4f1ea] border-y border-[#dc2626]/40'
      : 'bg-black text-[#dc2626] border-y border-zinc-800';

  return (
    <div className={`overflow-hidden py-2 sm:py-3 select-none ${bgColor} relative z-20`}>
      <div className="flex w-max whitespace-nowrap animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center mx-4 sm:mx-6">
            <span className="font-anton text-sm sm:text-lg tracking-wider uppercase font-normal">
              {text}
            </span>
            <span className="mx-4 sm:mx-6 text-xs select-none opacity-60">★</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
};
