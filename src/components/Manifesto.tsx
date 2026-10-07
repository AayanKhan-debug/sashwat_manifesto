import React, { useState } from 'react';
import { Compass, Megaphone, CheckCircle2, ChevronRight, Layers, ArrowUpRight } from 'lucide-react';
import { sfx } from '../utils/sound';

export const Manifesto: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'trips' | 'voice'>('all');

  const manifestoItems = [
    {
      id: 'trips',
      number: '01',
      title: 'INDUSTRIAL TRIPS',
      subhead: 'BRIDGING CLASSROOM LEARNING WITH REAL-WORLD INDUSTRY EXPOSURE',
      icon: Compass,
      points: [
        'Organizing and championing Industrial Trips for Information Science and Engineering students.',
        'Providing firsthand exposure to real-world industrial environments and engineering workflows.',
        'Facilitating practical learning opportunities beyond conventional lecture hall coursework.',
        'Strengthening department engagement through organized technical and industrial visits.',
      ],
      editorialStatement:
        'A dedicated commitment to bridging the gap between academic theory and industry practice through purposeful Industrial Trips for the students of Information Science & Engineering.',
      tag: 'PILLAR I',
      badge: 'PRACTICAL EXPOSURE',
    },
    {
      id: 'voice',
      number: '02',
      title: 'STUDENT\'S VOICE',
      subhead: 'REPRESENTING STUDENT CONCERNS AND DEMANDS IN THE ISE FORUM',
      icon: Megaphone,
      points: [
        'Dedicated representation for every Information Science student across all batches.',
        'Ensuring student concerns are actively brought before the ISE Forum leadership.',
        'Standing firmly for student demands to be heard, valued, and addressed.',
        'Serving as an accessible, direct, and uncompromised conduit between students and the forum.',
      ],
      editorialStatement:
        'A steadfast pledge that your voice will never be sidelined. Grounded in direct representation, transparent communication, and student-first leadership within SANGYARTHAM.',
      tag: 'PILLAR II',
      badge: 'AUTHENTIC ADVOCACY',
    },
  ];

  const handleTabChange = (tab: 'all' | 'trips' | 'voice') => {
    sfx.click();
    setActiveTab(tab);
  };

  const filteredItems =
    activeTab === 'all'
      ? manifestoItems
      : manifestoItems.filter((item) => item.id === activeTab);

  return (
    <section id="manifesto" className="relative py-20 sm:py-28 bg-[#09090c] text-[#f4f1ea] border-t border-zinc-900">
      {/* Background accents */}
      <div className="absolute inset-0 halftone-bg opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#dc2626] pb-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center space-x-2 text-xs font-tech text-[#dc2626] uppercase tracking-[0.25em] mb-2 font-bold">
              <span className="w-2 h-2 bg-[#dc2626] inline-block" />
              <span>THE 2-POINT PLATFORM // SANGYARTHAM 2024–2025</span>
            </div>
            <h2 className="font-bebas text-6xl sm:text-8xl md:text-9xl tracking-tight text-[#f4f1ea] leading-none uppercase">
              MANIFESTO
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
            <span className="font-tech text-xs text-zinc-400 uppercase tracking-widest">
              OFFICIAL AGENDA OF SASHWAT KUMAR
            </span>
            <span className="font-anton text-lg sm:text-xl text-[#dc2626] uppercase">
              VICE PRESIDENT CANDIDATE
            </span>
          </div>
        </div>

        {/* Filter Pills / Editorial Tab Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-zinc-800">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-tech text-zinc-500 uppercase mr-2 hidden sm:inline">VIEW MODE:</span>
            <button
              onClick={() => handleTabChange('all')}
              className={`px-4 py-2 font-tech text-xs tracking-wider uppercase transition-all ${
                activeTab === 'all'
                  ? 'bg-[#dc2626] text-black font-bold'
                  : 'bg-[#141418] text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              COMPLETE MANIFESTO (02)
            </button>
            <button
              onClick={() => handleTabChange('trips')}
              className={`px-4 py-2 font-tech text-xs tracking-wider uppercase transition-all ${
                activeTab === 'trips'
                  ? 'bg-[#dc2626] text-black font-bold'
                  : 'bg-[#141418] text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              01. INDUSTRIAL TRIPS
            </button>
            <button
              onClick={() => handleTabChange('voice')}
              className={`px-4 py-2 font-tech text-xs tracking-wider uppercase transition-all ${
                activeTab === 'voice'
                  ? 'bg-[#dc2626] text-black font-bold'
                  : 'bg-[#141418] text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              02. STUDENT'S VOICE
            </button>
          </div>

          <div className="text-xs font-tech text-zinc-500 uppercase tracking-widest hidden lg:block">
            STRICTLY GROUNDED IN OFFICIAL CAMPAIGN PLEDGES
          </div>
        </div>

        {/* The Two Visually Distinctive Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            const isFirst = item.id === 'trips';

            return (
              <div
                key={item.id}
                className={`relative flex flex-col justify-between p-6 sm:p-10 transition-all duration-300 border-2 ${
                  isFirst
                    ? 'bg-gradient-to-b from-[#121217] via-[#0e0e13] to-[#0a0a0e] border-zinc-800 hover:border-[#dc2626]'
                    : 'bg-gradient-to-b from-[#181111] via-[#120d0d] to-[#0a0a0e] border-[#dc2626]/50 hover:border-[#dc2626]'
                } shadow-[0_15px_40px_rgba(0,0,0,0.6)] group`}
              >
                {/* Top Corner Badge & Big Number */}
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <span className="px-2.5 py-1 bg-[#dc2626] text-black font-anton text-xs tracking-wider uppercase">
                        {item.tag}
                      </span>
                      <span className="font-tech text-xs text-zinc-400 tracking-widest uppercase bg-zinc-900 px-2 py-0.5 border border-zinc-800">
                        {item.badge}
                      </span>
                    </div>

                    {/* Monumental Number */}
                    <div className="font-bebas text-6xl sm:text-7xl text-zinc-700/60 group-hover:text-[#dc2626] transition-colors leading-none select-none">
                      {item.number}
                    </div>
                  </div>

                  {/* Main Title - Monumental Condensed */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-[#dc2626]/10 border border-[#dc2626]/30 text-[#dc2626]">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <h3 className="font-anton text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase text-[#f4f1ea] leading-tight">
                        {item.title}
                      </h3>
                    </div>
                    <p className="font-tech text-xs sm:text-sm text-zinc-400 uppercase tracking-widest">
                      {item.subhead}
                    </p>
                  </div>

                  {/* Editorial Callout Quote */}
                  <div className="my-6 p-4 bg-black/60 border-l-2 border-[#dc2626] text-sm sm:text-base font-serif italic text-zinc-300 leading-relaxed">
                    &ldquo;{item.editorialStatement}&rdquo;
                  </div>

                  {/* Specific Action Points */}
                  <div className="space-y-3.5 my-6">
                    {item.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start space-x-3">
                        <CheckCircle2 className="w-4 h-4 text-[#dc2626] mt-1 shrink-0" />
                        <span className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="pt-6 mt-6 border-t border-zinc-800 flex items-center justify-between">
                  <div className="font-tech text-xs text-zinc-500 uppercase">
                    MANDATE: VICE PRESIDENT // ISE FORUM
                  </div>
                  <div className="flex items-center space-x-1 text-[#dc2626] font-tech text-xs uppercase font-semibold group-hover:translate-x-1 transition-transform">
                    <span>ISE FIRST</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with Key Focus */}
        <div className="mt-12 p-6 bg-[#121217] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <Layers className="w-6 h-6 text-[#dc2626] shrink-0" />
            <div>
              <div className="font-anton text-base uppercase text-[#f4f1ea]">
                FOCUSED. MEASURED. AUTHENTIC.
              </div>
              <div className="font-tech text-xs text-zinc-400">
                No ungrounded claims or inflated promises. Two decisive pillars built for Information Science students.
              </div>
            </div>
          </div>

          <a
            href="#why"
            onClick={() => sfx.click()}
            className="px-5 py-2.5 bg-zinc-900 hover:bg-[#dc2626] hover:text-black font-anton text-sm tracking-wider uppercase text-zinc-200 border border-zinc-700 hover:border-red-500 transition-all flex items-center space-x-2 shrink-0"
          >
            <span>WHY THIS CAMPAIGN</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
