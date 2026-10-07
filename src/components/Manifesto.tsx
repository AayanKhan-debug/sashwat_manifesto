import React, { useState } from 'react';
import {
  Compass,
  Megaphone,
  Briefcase,
  Code2,
  Users,
  Trophy,
  BookOpen,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { sfx } from '../utils/sound';

interface ManifestoProps {
  onOpenPledgeModal?: () => void;
}

export interface ManifestoItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tag: string;
  badge: string;
  points: string[];
}

export const Manifesto: React.FC<ManifestoProps> = ({ onOpenPledgeModal }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const manifestoItems: ManifestoItem[] = [
    {
      id: 'trips',
      number: '01',
      title: 'INDUSTRIAL TRIPS',
      description: 'Real exposure beyond the classroom.',
      icon: Compass,
      tag: 'INITIATIVE 01',
      badge: 'PRACTICAL EXPOSURE',
      points: [
        'Organizing and championing Industrial Trips for Information Science and Engineering students.',
        'Providing firsthand exposure to real-world industrial environments and engineering workflows.',
        'Facilitating practical learning opportunities beyond conventional lecture hall coursework.',
        'Strengthening department engagement through organized technical and industrial visits.',
      ],
    },
    {
      id: 'voice',
      number: '02',
      title: "STUDENT'S VOICE",
      description: 'Your concerns. Your ideas. Your representation.',
      icon: Megaphone,
      tag: 'INITIATIVE 02',
      badge: 'AUTHENTIC ADVOCACY',
      points: [
        'Establishing an Open Student Forum where students can raise academic, event, lab, or forum-related concerns and receive updates.',
        'Dedicated representation for every Information Science student across all batches.',
        'Ensuring student concerns and demands are actively brought forward, valued, and addressed.',
        'Serving as an accessible, direct, and uncompromised conduit between students and the forum leadership.',
      ],
    },
    {
      id: 'career',
      number: '03',
      title: 'CAREER & PLACEMENT SUPPORT',
      description: 'More opportunities. Better preparation. Stronger connections.',
      icon: Briefcase,
      tag: 'INITIATIVE 03',
      badge: 'CAREER READINESS',
      points: [
        'Placement preparation sessions to build aptitude, problem-solving, and core technical fundamentals.',
        'Resume and LinkedIn optimization workshops tailored for engineering and tech careers.',
        'Interview preparation drives including mock technical and HR interview rounds.',
        'Active internship and placement opportunity sharing across ISE student channels.',
        'Alumni and senior career guidance sessions providing practical hiring insights.',
      ],
    },
    {
      id: 'tech',
      number: '04',
      title: 'TECH & HACKATHONS',
      description: 'Build. Compete. Innovate.',
      icon: Code2,
      tag: 'INITIATIVE 04',
      badge: 'TECHNICAL GROWTH',
      points: [
        'Department-level coding contests to sharpen algorithmic thinking and competitive skills.',
        'Hackathons fostering collaborative software engineering and creative problem-solving.',
        'Technical workshops exploring modern developer tools, stacks, and frameworks.',
        'Project-building sessions turning theoretical concepts into functional applications.',
        'Direct support and coordination for teams participating in inter-college tech competitions.',
      ],
    },
    {
      id: 'alumni',
      number: '05',
      title: 'ALUMNI & INDUSTRY CONNECT',
      description: "Connect with people who've already walked the path.",
      icon: Users,
      tag: 'INITIATIVE 05',
      badge: 'NETWORK & MENTORSHIP',
      points: [
        'Alumni interaction sessions creating direct links between ISE graduates and current students.',
        'Career talks dissecting industry trends, engineering workflows, and transition tips.',
        'Structured mentorship opportunities connecting students with experienced industry seniors.',
        'Industry-oriented sessions addressing real expectations across emerging tech domains.',
        'Senior and alumni guidance for internship acquisition and campus placement preparation.',
      ],
    },
    {
      id: 'recognition',
      number: '06',
      title: 'STUDENT RECOGNITION',
      description: 'Every achievement deserves to be seen.',
      icon: Trophy,
      tag: 'INITIATIVE 06',
      badge: 'MERIT & CELEBRATION',
      points: [
        'Recognizing and celebrating student victories in coding contests and hackathons.',
        'Showcasing outstanding student engineering projects, software builds, and research.',
        'Applauding and amplifying athletic, sports, and tournament achievements across batches.',
        'Honoring cultural, artistic, and community contributions within the ISE department.',
        'Creating department-wide visibility so no student milestone or effort goes unnoticed.',
      ],
    },
    {
      id: 'academics',
      number: '07',
      title: 'ACADEMIC SUPPORT',
      description: 'Learn together. Grow together.',
      icon: BookOpen,
      tag: 'INITIATIVE 07',
      badge: 'PEER COLLABORATION',
      points: [
        'Peer-to-peer study groups for collaborative exam revision and complex topic mastery.',
        'Senior-junior academic guidance to navigate curriculum, laboratory modules, and electives.',
        'Curated resource sharing of reference materials and syllabus roadmaps.',
        'A collaborative notes and learning-material repository organized by and for ISE students.',
      ],
    },
    {
      id: 'events',
      number: '08',
      title: 'BETTER ISE EVENTS',
      description: 'More participation. More experiences. More memories.',
      icon: Sparkles,
      tag: 'INITIATIVE 08',
      badge: 'DEPARTMENT CULTURE',
      points: [
        'High-energy technical events designed for maximum hands-on participation.',
        'Vibrant cultural activities that bring the entire ISE department community together.',
        'Inter-section competitions fostering healthy batch camaraderie and enthusiasm.',
        'Inclusive gaming and sports activities for recreation and team bonding.',
        'Student-focused events shaped directly by collective ideas submitted through the forum.',
      ],
    },
  ];

  const handleTabChange = (tab: string) => {
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
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#dc2626] pb-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center space-x-2 text-xs font-tech text-[#dc2626] uppercase tracking-[0.25em] mb-2 font-bold">
              <span className="w-2 h-2 bg-[#dc2626] inline-block animate-pulse" />
              <span>THE 8-POINT PLATFORM // SANGYARTHAM 2024–2025</span>
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
        <div className="flex flex-wrap items-center justify-between gap-3 mb-10 pb-4 border-b border-zinc-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-tech text-zinc-500 uppercase mr-1 hidden sm:inline">VIEW:</span>
            
            <button
              onClick={() => handleTabChange('all')}
              className={`px-3 py-1.5 font-tech text-xs tracking-wider uppercase transition-all ${
                activeTab === 'all'
                  ? 'bg-[#dc2626] text-black font-bold shadow-[0_2px_10px_rgba(220,38,38,0.4)]'
                  : 'bg-[#141418] text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              ALL INITIATIVES (08)
            </button>

            {manifestoItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`px-3 py-1.5 font-tech text-xs tracking-wider uppercase transition-all ${
                  activeTab === item.id
                    ? 'bg-[#dc2626] text-black font-bold shadow-[0_2px_10px_rgba(220,38,38,0.4)]'
                    : 'bg-[#141418] text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {item.number}. {item.title}
              </button>
            ))}
          </div>

          <div className="text-xs font-tech text-zinc-500 uppercase tracking-widest hidden xl:block">
            STRICTLY GROUNDED IN OFFICIAL CAMPAIGN PLEDGES
          </div>
        </div>

        {/* Numbered Editorial Layout (Grid of 8 Initiatives) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {filteredItems.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="relative flex flex-col justify-between p-6 sm:p-8 transition-all duration-300 border-2 bg-gradient-to-b from-[#14141a] via-[#0f0f14] to-[#0a0a0e] border-zinc-800 hover:border-[#dc2626] shadow-[0_15px_40px_rgba(0,0,0,0.6)] group"
              >
                {/* Corner Crosshair Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 bg-zinc-700 group-hover:bg-[#dc2626] transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 bg-zinc-700 group-hover:bg-[#dc2626] transition-colors" />

                <div>
                  {/* Top Bar: Badges & Monumental Number */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-[#dc2626] text-black font-anton text-[11px] sm:text-xs tracking-wider uppercase">
                        {item.tag}
                      </span>
                      <span className="font-tech text-[10px] sm:text-xs text-zinc-400 tracking-widest uppercase bg-zinc-900 px-2 py-0.5 border border-zinc-800">
                        {item.badge}
                      </span>
                    </div>

                    {/* Monumental Number */}
                    <div className="font-bebas text-5xl sm:text-6xl text-zinc-700/60 group-hover:text-[#dc2626] transition-colors leading-none select-none pl-2">
                      {item.number}
                    </div>
                  </div>

                  {/* Icon & Title */}
                  <div className="mb-3">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="p-2 bg-[#dc2626]/10 border border-[#dc2626]/40 text-[#dc2626] shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <h3 className="font-anton text-2xl sm:text-3xl lg:text-4xl tracking-wide uppercase text-[#f4f1ea] leading-tight">
                        {item.number} — {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Short Powerful Description */}
                  <div className="my-4 p-3 bg-black/60 border-l-2 border-[#dc2626] text-xs sm:text-sm font-tech uppercase tracking-wider text-red-300/90 leading-relaxed">
                    &ldquo;{item.description}&rdquo;
                  </div>

                  {/* Supporting Action Points */}
                  <div className="space-y-2.5 my-5">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#dc2626] mt-0.5 shrink-0" />
                        <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="pt-4 mt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div className="font-tech text-[11px] text-zinc-500 uppercase tracking-wider">
                    MANDATE: SANGYARTHAM // ISE FORUM
                  </div>
                  <div className="flex items-center space-x-1 text-[#dc2626] font-tech text-xs uppercase font-semibold group-hover:translate-x-1 transition-transform">
                    <span>ISE FIRST</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dramatic Closing Statement Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="mt-14 sm:mt-16 p-8 sm:p-12 md:p-14 bg-gradient-to-b from-[#181114] via-[#100c0e] to-[#09090c] border-2 border-[#dc2626] relative overflow-hidden shadow-[0_20px_50px_rgba(220,38,38,0.25)]"
        >
          {/* Subtle background texture */}
          <div className="absolute inset-0 halftone-bg opacity-15 pointer-events-none" />
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 bg-[#dc2626]" />
          <div className="absolute top-0 right-0 w-3 h-3 bg-[#dc2626]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#dc2626]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#dc2626]" />

          <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-black/80 border border-red-500/50 text-[#dc2626] font-tech text-xs tracking-[0.2em] uppercase font-bold">
              <span className="w-1.5 h-1.5 bg-[#dc2626] inline-block animate-ping" />
              <span>OFFICIAL CAMPAIGN COMMITMENT // SANGYARTHAM</span>
            </div>

            {/* Dramatic Statement 1 */}
            <h3 className="font-anton text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-[#f4f1ea] leading-tight">
              &ldquo;NOT JUST PROMISES.<br className="hidden sm:inline" /> A PLATFORM FOR ISE STUDENTS TO BE HEARD, CONNECTED AND REPRESENTED.&rdquo;
            </h3>

            {/* Divider */}
            <div className="w-24 h-1 bg-[#dc2626] mx-auto my-4" />

            {/* Dramatic Statement 2 */}
            <div className="font-bebas text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-[#dc2626] leading-none uppercase">
              YOUR VOICE. YOUR CHOICE. YOUR VICE PRESIDENT.
            </div>

            <p className="font-tech text-xs sm:text-sm text-zinc-400 uppercase tracking-widest max-w-2xl mx-auto">
              SASHWAT KUMAR • VICE PRESIDENT • SANGYARTHAM, ISE FORUM • NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY
            </p>

            {/* Interactive Call-To-Action */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              {onOpenPledgeModal && (
                <button
                  onClick={() => {
                    sfx.stamp();
                    onOpenPledgeModal();
                  }}
                  className="px-8 py-3.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-anton text-base sm:text-lg tracking-wider uppercase transition-all shadow-[0_4px_20px_rgba(220,38,38,0.5)] flex items-center space-x-2 border border-red-500 active:scale-95"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>STAND WITH SASHWAT</span>
                </button>
              )}

              <a
                href="#candidate"
                onClick={() => sfx.click()}
                className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-tech text-xs sm:text-sm tracking-wider uppercase border border-zinc-700 transition-colors flex items-center space-x-2"
              >
                <span>MEET SASHWAT KUMAR</span>
                <ChevronRight className="w-4 h-4 text-[#dc2626]" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Banner with Key Focus */}
        <div className="mt-10 p-6 bg-[#121217] border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-center sm:text-left">
            <Layers className="w-6 h-6 text-[#dc2626] shrink-0" />
            <div>
              <div className="font-anton text-base uppercase text-[#f4f1ea]">
                FOCUSED. MEASURED. AUTHENTIC.
              </div>
              <div className="font-tech text-xs text-zinc-400">
                Action-oriented initiatives built to empower Information Science & Engineering students across every semester.
              </div>
            </div>
          </div>

          <a
            href="#the-campaign"
            onClick={() => sfx.click()}
            className="px-5 py-2.5 bg-zinc-900 hover:bg-[#dc2626] hover:text-black font-anton text-sm tracking-wider uppercase text-zinc-200 border border-zinc-700 hover:border-red-500 transition-all flex items-center space-x-2 shrink-0"
          >
            <span>CORE CAMPAIGN MESSAGE</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
