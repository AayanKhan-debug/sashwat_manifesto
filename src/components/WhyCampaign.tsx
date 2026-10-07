import React from 'react';
import { Volume2, ShieldCheck, HeartHandshake } from 'lucide-react';

export const WhyCampaign: React.FC = () => {
  const statements = [
    {
      num: '01',
      title: 'YOUR VOICE DESERVES TO BE HEARD.',
      accent: 'HEARD',
      detail:
        'Every single student within the Information Science & Engineering department carries ideas, feedback, and perspectives that matter. No student should feel unheard in their own department.',
      icon: Volume2,
      borderStyle: 'border-l-4 border-[#dc2626]',
    },
    {
      num: '02',
      title: 'YOUR CONCERNS DESERVE TO BE REPRESENTED.',
      accent: 'REPRESENTED',
      detail:
        'When academic, departmental, or forum challenges arise, students require an authentic representative who steps up and articulates those concerns directly to the leadership of SANGYARTHAM.',
      icon: ShieldCheck,
      borderStyle: 'border-l-4 border-zinc-500 hover:border-[#dc2626]',
    },
    {
      num: '03',
      title: 'YOUR DEMANDS DESERVE TO MATTER.',
      accent: 'MATTER',
      detail:
        'Student priorities are not secondary. From curriculum enrichment through Industrial Trips to forum decision-making, student priorities must hold genuine weight and significance.',
      icon: HeartHandshake,
      borderStyle: 'border-l-4 border-[#dc2626]',
    },
  ];

  return (
    <section id="why" className="relative py-24 sm:py-32 bg-[#0a0a0d] text-[#f4f1ea] border-t border-zinc-900 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 halftone-dense opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[40rem] h-[25rem] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#16161c] border border-zinc-800 text-[#dc2626] font-tech text-xs tracking-[0.25em] uppercase mb-4 font-bold">
            <span className="w-2 h-2 bg-[#dc2626] animate-pulse" />
            <span>CORE CAMPAIGN ETHOS</span>
          </div>

          <h2 className="font-bebas text-6xl sm:text-8xl md:text-9xl tracking-tight text-[#f4f1ea] uppercase leading-none">
            WHY THIS <span className="text-[#dc2626]">CAMPAIGN</span>
          </h2>

          <p className="font-tech text-xs sm:text-sm text-zinc-400 uppercase tracking-widest mt-3">
            THE PHILOSOPHY BEHIND SASHWAT KUMAR&apos;S CANDIDACY FOR VICE PRESIDENT
          </p>
        </div>

        {/* The 3 Monumental Typographic Statements */}
        <div className="space-y-6 sm:space-y-8">
          {statements.map((stmt) => {
            const Icon = stmt.icon;

            return (
              <div
                key={stmt.num}
                className={`relative p-6 sm:p-10 md:p-12 bg-gradient-to-r from-[#121217] via-[#0d0d12] to-[#09090c] border border-zinc-800 hover:border-[#dc2626] transition-all duration-300 shadow-[0_10px_35px_rgba(0,0,0,0.7)] group ${stmt.borderStyle}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Left: Giant Distressed Number */}
                  <div className="lg:col-span-2 flex items-center space-x-4 lg:flex-col lg:items-start lg:space-x-0">
                    <span className="font-bebas text-5xl sm:text-7xl lg:text-8xl text-zinc-700 group-hover:text-[#dc2626] transition-colors leading-none select-none">
                      {stmt.num}
                    </span>
                    <div className="p-2 bg-black/60 border border-zinc-800 text-[#dc2626]">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                  </div>

                  {/* Middle: The Monumental Statement */}
                  <div className="lg:col-span-7">
                    <h3 className="font-anton text-3xl sm:text-5xl md:text-6xl text-[#f4f1ea] tracking-wide uppercase leading-[1.05]">
                      &ldquo;{stmt.title}&rdquo;
                    </h3>
                  </div>

                  {/* Right: The Purpose / Context */}
                  <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-zinc-800 pt-4 lg:pt-0 lg:pl-6">
                    <div className="font-tech text-xs text-[#dc2626] uppercase font-bold tracking-widest mb-1">
                      ISE COMMITMENT
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {stmt.detail}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Central Slogan Lockup */}
        <div className="mt-16 p-8 bg-[#181111] border-2 border-[#dc2626] text-center relative overflow-hidden">
          <div className="absolute inset-0 halftone-red opacity-20 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="font-tech text-xs text-[#dc2626] uppercase tracking-[0.3em] font-bold mb-2">
              UNCOMPROMISED STUDENT FIRST ADVOCACY
            </div>
            <div className="font-condensed text-2xl sm:text-4xl md:text-5xl font-black text-[#f4f1ea] uppercase tracking-wide leading-tight">
              &ldquo;YOUR VOICE. YOUR CHOICE. YOUR VICE PRESIDENT.&rdquo;
            </div>
            <div className="font-anton text-lg sm:text-xl text-[#dc2626] uppercase mt-3 tracking-wider">
              SASHWAT KUMAR • VICE PRESIDENT • SANGYARTHAM
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
