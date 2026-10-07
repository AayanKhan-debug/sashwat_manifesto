import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, Download, Check } from 'lucide-react';
import { sfx } from '../utils/sound';

interface PosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PosterModal: React.FC<PosterModalProps> = ({ isOpen, onClose }) => {
  const [scale, setScale] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleZoomIn = () => {
    sfx.click();
    setScale((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    sfx.click();
    setScale((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleReset = () => {
    sfx.click();
    setScale(1);
  };

  const handleShare = () => {
    sfx.stamp();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[96vh] flex flex-col bg-[#0e0e12] border-2 border-[#dc2626]/60 shadow-[0_0_50px_rgba(220,38,38,0.35)] overflow-hidden rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#16161c] border-b border-[#2a2a34]">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 bg-[#dc2626] animate-pulse inline-block" />
            <span id="modal-title" className="font-tech text-xs uppercase tracking-widest text-[#f4f1ea]">
              Official Campaign Poster // ISE Forum Archives
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleZoomIn}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              title="Reset Zoom"
              aria-label="Reset Zoom"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleShare}
              className="px-2.5 py-1 text-xs font-tech text-[#f4f1ea] bg-[#dc2626] hover:bg-[#b91c1c] transition-colors flex items-center space-x-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Download className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share Link'}</span>
            </button>
            <button
              onClick={() => {
                sfx.click();
                onClose();
              }}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-[#dc2626] transition-colors ml-2"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Poster Viewer Container */}
        <div className="relative flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-[#070709] scanlines min-h-[60vh]">
          <div
            className="transition-transform duration-200 ease-out flex items-center justify-center"
            style={{ transform: `scale(${scale})` }}
          >
            <img
              src="/candidate-poster.png"
              alt="Official Campaign Poster for Sashwat Kumar, candidate for Vice President – SANGYARTHAM, ISE Forum at NMIT"
              className="max-h-[75vh] w-auto object-contain border border-[#333] shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>

        {/* Bottom meta bar */}
        <div className="px-4 py-2.5 bg-[#121217] border-t border-[#222] flex flex-wrap items-center justify-between gap-2 text-xs font-tech text-zinc-400">
          <div className="flex items-center space-x-4">
            <span className="text-[#dc2626] font-bold">CANDIDATE: SASHWAT KUMAR</span>
            <span className="hidden sm:inline text-zinc-500">|</span>
            <span className="hidden sm:inline">POSITION: VICE PRESIDENT</span>
            <span className="hidden sm:inline text-zinc-500">|</span>
            <span className="hidden sm:inline">FORUM: SANGYARTHAM (ISE)</span>
          </div>
          <div className="text-zinc-500 text-[11px]">NITTE MEENAKSHI INSTITUTE OF TECHNOLOGY</div>
        </div>
      </div>
    </div>
  );
};
