import React from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '../utils/sound';

interface SupportButtonProps {
  count: number;
  hasSupported: boolean;
  onSupport: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline';
  className?: string;
}

export const SupportButton: React.FC<SupportButtonProps> = ({
  count,
  hasSupported,
  onSupport,
  size = 'md',
  variant = 'primary',
  className = '',
}) => {
  const handleClick = () => {
    sfx.stamp();
    onSupport();
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base',
    lg: 'px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg',
  }[size];

  const countDisplay = `${count}+`;

  return (
    <div className="relative inline-flex flex-col items-center">
      <button
        onClick={handleClick}
        aria-label={hasSupported ? `SUPPORTED ${countDisplay}` : `SUPPORT ${countDisplay}`}
        className={`relative overflow-hidden font-anton tracking-wider uppercase transition-all duration-200 flex items-center space-x-2 border shadow-md active:scale-95 ${
          hasSupported
            ? 'bg-[#181822] text-[#f4f1ea] border-zinc-700 hover:border-red-600/60'
            : variant === 'primary'
            ? 'bg-[#dc2626] hover:bg-[#b91c1c] text-[#f4f1ea] border-red-500 shadow-[0_4px_16px_rgba(220,38,38,0.4)]'
            : 'bg-transparent hover:bg-[#dc2626] text-[#f4f1ea] border-[#dc2626]'
        } ${sizeClasses} ${className}`}
      >
        {/* Heart Icon */}
        <Heart
          className={`w-4 h-4 transition-transform duration-300 ${
            hasSupported
              ? 'fill-red-600 text-red-600 scale-110'
              : 'fill-current text-white group-hover:scale-110'
          }`}
        />

        {/* Text Status */}
        <span>{hasSupported ? 'SUPPORTED' : 'SUPPORT'}</span>

        {/* Counter Badge with subtle animation */}
        <span className="ml-1 bg-black/60 border border-zinc-800/80 text-[11px] sm:text-xs px-2 py-0.5 rounded-none font-tech font-bold text-red-300 inline-flex items-center min-w-[28px] justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={countDisplay}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {countDisplay}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>
    </div>
  );
};
