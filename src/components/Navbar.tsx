import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Heart, ShieldAlert, Loader2 } from 'lucide-react';
import { sfx } from '../utils/sound';

interface NavbarProps {
  onOpenPledge: () => void;
  onSupportClick: () => void;
  supporterCount: number | null;
  isLoadingSupport: boolean;
  hasSupported: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPledge,
  onSupportClick,
  supporterCount,
  isLoadingSupport,
  hasSupported,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const state = sfx.toggle();
    setSoundEnabled(state);
    if (state) sfx.click();
  };

  const navItems = [
    { label: '01. HERO', href: '#hero' },
    { label: '02. MANIFESTO', href: '#manifesto' },
    { label: '03. THE CANDIDATE', href: '#candidate' },
    { label: '04. WHY THIS CAMPAIGN', href: '#why' },
    { label: '05. THE CAMPAIGN', href: '#campaign' },
  ];

  const handleNavClick = (href: string) => {
    sfx.click();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const displayCount = isLoadingSupport
    ? '...'
    : supporterCount !== null
    ? `+${supporterCount}`
    : '+0';

  return (
    <>
      {/* Top Dispatch Banner */}
      <div className="bg-[#141418] border-b border-[#272730] text-[#a1a1aa] py-1 px-4 text-[10px] sm:text-xs font-tech tracking-wider uppercase flex items-center justify-between select-none">
        <div className="flex items-center space-x-2 truncate">
          <span className="inline-block w-2 h-2 bg-[#dc2626] animate-ping" />
          <span className="font-semibold text-zinc-300">NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY</span>
          <span className="text-zinc-600 hidden md:inline">|</span>
          <span className="hidden md:inline text-zinc-400">ISE DEPARTMENT // SANGYARTHAM FORUM</span>
        </div>
        <div className="flex items-center space-x-3 text-[#f4f1ea]">
          <span className="text-[#dc2626] font-bold">OFFICIAL CANDIDACY</span>
          <span className="hidden sm:inline text-zinc-600">|</span>
          <span className="hidden sm:inline text-zinc-400">INFO SCIENCE & ENGINEERING</span>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <nav
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0d]/95 backdrop-blur-md border-b border-[#dc2626]/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-[#0a0a0d]/80 backdrop-blur-sm border-b border-zinc-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Candidate Identity Mark */}
            <a
              href="#hero"
              onClick={() => sfx.click()}
              className="group flex items-center space-x-3 text-left focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 bg-[#dc2626] flex items-center justify-center text-black font-anton text-xl tracking-tighter border border-[#f4f1ea]/30 group-hover:scale-105 transition-transform">
                SK
              </div>
              <div>
                <div className="font-anton text-xl sm:text-2xl text-[#f4f1ea] tracking-wider leading-none group-hover:text-[#dc2626] transition-colors">
                  SASHWAT KUMAR
                </div>
                <div className="font-tech text-[10px] sm:text-xs text-[#a1a1aa] tracking-widest uppercase mt-0.5">
                  VICE PRESIDENT • SANGYARTHAM
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="font-tech text-xs tracking-wider text-zinc-400 hover:text-[#f4f1ea] hover:border-b-2 hover:border-[#dc2626] pb-1 transition-all"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Actions: Sound Toggle & Real Support CTA */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={toggleSound}
                className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors"
                title={soundEnabled ? 'Mute Interaction Sounds' : 'Enable Interaction Sounds'}
                aria-label="Toggle Sound"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-[#dc2626]" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Real Support Action Button */}
              <button
                onClick={() => {
                  sfx.stamp();
                  if (hasSupported) {
                    onOpenPledge();
                  } else {
                    onSupportClick();
                  }
                }}
                disabled={isLoadingSupport}
                className={`relative overflow-hidden px-3.5 sm:px-5 py-2 sm:py-2.5 font-anton text-sm sm:text-base tracking-wider transition-all transform active:scale-95 border flex items-center space-x-2 ${
                  hasSupported
                    ? 'bg-[#181822] text-[#f4f1ea] border-zinc-700 hover:border-red-500 shadow-md'
                    : 'bg-[#dc2626] hover:bg-[#b91c1c] text-[#f4f1ea] border-red-500 shadow-[0_4px_16px_rgba(220,38,38,0.4)]'
                }`}
                title={hasSupported ? 'You have supported Sashwat Kumar (Click to view pass)' : 'Support Sashwat Kumar'}
                aria-label={hasSupported ? `Supported (${displayCount})` : `Support (${displayCount})`}
              >
                {isLoadingSupport ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Heart
                    className={`w-4 h-4 ${
                      hasSupported ? 'fill-red-600 text-red-600' : 'fill-current text-white animate-pulse'
                    }`}
                  />
                )}
                <span>{hasSupported ? 'SUPPORTED' : 'SUPPORT'}</span>
                <span className="bg-black/60 text-[10px] sm:text-xs px-2 py-0.5 font-tech font-bold text-red-200">
                  {displayCount}
                </span>
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => {
                  sfx.click();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden p-2 text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800"
                aria-label="Toggle Mobile Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#dc2626]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0d0d12] border-b-2 border-[#dc2626] px-4 py-6 scanlines">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="font-anton text-2xl text-[#f4f1ea] hover:text-[#dc2626] tracking-wider py-1 border-b border-zinc-800 transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-zinc-600 font-tech text-xs">→</span>
                </a>
              ))}
              <div className="pt-2 flex items-center justify-between text-xs font-tech text-zinc-500">
                <span className="flex items-center space-x-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#dc2626]" />
                  <span>ISE FORUM ELECTIONS</span>
                </span>
                <span className="text-zinc-400">SANGYARTHAM</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
