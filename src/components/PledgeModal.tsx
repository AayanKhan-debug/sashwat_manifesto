import React, { useState } from 'react';
import { X, CheckCircle, Heart, Share2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/sound';
import { recordLocalSupport } from '../utils/supportStorage';

interface PledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPledgeSuccess: (supporterName: string, newCount: number) => void;
  currentCount: number;
}

export const PledgeModal: React.FC<PledgeModalProps> = ({
  isOpen,
  onClose,
  onPledgeSuccess,
  currentCount,
}) => {
  const [name, setName] = useState('');
  const [departmentYear, setDepartmentYear] = useState('ISE Student');
  const [pledged, setPledged] = useState(false);
  const [alreadySupported, setAlreadySupported] = useState(false);
  const [copied, setCopied] = useState(false);
  const [finalCount, setFinalCount] = useState<number>(currentCount);

  if (!isOpen) return null;

  const handlePledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    sfx.stamp();

    const result = recordLocalSupport();
    setFinalCount(result.count);
    setPledged(true);

    if (result.newlySupported) {
      setAlreadySupported(false);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#f4f1ea', '#991b1b', '#ffffff'],
      });
      onPledgeSuccess(name.trim(), result.count);
    } else {
      setAlreadySupported(true);
      onPledgeSuccess(name.trim(), result.count);
    }
  };

  const handleShare = () => {
    sfx.stamp();
    const text = `I just stood with Sashwat Kumar for Vice President – SANGYARTHAM, ISE Forum! "Your voice deserves to be heard." Check out the official campaign site:`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${text}\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pledge-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#111116] border-2 border-[#dc2626] p-6 sm:p-8 shadow-[0_10px_50px_rgba(220,38,38,0.3)] text-[#f4f1ea]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-3 h-3 bg-[#dc2626]" />
        <div className="absolute top-0 right-0 w-3 h-3 bg-[#dc2626]" />
        <div className="absolute bottom-0 left-0 w-3 h-3 bg-[#dc2626]" />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#dc2626]" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-[#dc2626]" />
            <span id="pledge-modal-title" className="font-tech text-xs uppercase tracking-widest text-zinc-300">
              ISE SUPPORT // SANGYARTHAM
            </span>
          </div>
          <button
            onClick={() => {
              sfx.click();
              onClose();
            }}
            className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-700 hover:border-red-500 transition-colors"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!pledged ? (
          <div>
            <div className="mb-6">
              <span className="inline-block px-2.5 py-0.5 bg-[#dc2626] text-white font-tech text-[10px] uppercase tracking-wider mb-2">
                OFFICIAL SUPPORTER PLEDGE
              </span>
              <h3 className="font-anton text-2xl sm:text-3xl uppercase tracking-wide">
                STAND WITH SASHWAT KUMAR
              </h3>
              <p className="text-zinc-400 font-tech text-xs mt-1">
                Record your support for the Vice President candidate of the ISE Forum
              </p>
            </div>

            <form onSubmit={handlePledge} className="space-y-4">
              <div>
                <label htmlFor="supporter-name" className="block text-xs font-tech uppercase tracking-wider text-zinc-300 mb-1">
                  YOUR NAME / SUPPORTER IDENTIFIER *
                </label>
                <input
                  id="supporter-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma / ISE Batch '26"
                  className="w-full bg-black/60 border border-zinc-700 focus:border-[#dc2626] focus:outline-none px-4 py-2.5 text-sm font-sans text-white placeholder-zinc-600 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="supporter-year" className="block text-xs font-tech uppercase tracking-wider text-zinc-300 mb-1">
                  AFFILIATION / YEAR
                </label>
                <select
                  id="supporter-year"
                  value={departmentYear}
                  onChange={(e) => setDepartmentYear(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-700 focus:border-[#dc2626] focus:outline-none px-4 py-2.5 text-sm font-sans text-white transition-colors"
                >
                  <option value="ISE Student">ISE Student</option>
                  <option value="ISE 1st Year">ISE 1st Year</option>
                  <option value="ISE 2nd Year">ISE 2nd Year</option>
                  <option value="ISE 3rd Year">ISE 3rd Year</option>
                  <option value="ISE 4th Year">ISE 4th Year</option>
                  <option value="ISE Supporter / Peer">ISE Supporter / Peer</option>
                </select>
              </div>

              {/* Campaign Slogan reminder */}
              <div className="p-3 bg-black/60 border-l-2 border-[#dc2626] text-xs font-tech text-zinc-400">
                &ldquo;Your voice deserves to be heard. Your concerns deserve to be represented. Your demands deserve to matter.&rdquo;
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-anton text-base tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(220,38,38,0.4)] flex items-center justify-center space-x-2 border border-red-500 active:scale-[0.98]"
                >
                  <Heart className="w-4 h-4 fill-current text-white" />
                  <span>CONFIRM SUPPORT</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 bg-[#dc2626]/20 border-2 border-[#dc2626] rounded-full flex items-center justify-center mx-auto text-[#dc2626]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-[#dc2626] text-black font-anton text-xs uppercase tracking-wider mb-2">
                {alreadySupported ? 'ALREADY SUPPORTED' : 'SUPPORT RECORDED'}
              </span>
              <h3 className="font-anton text-3xl sm:text-4xl text-[#f4f1ea] uppercase">
                THANK YOU, {name.toUpperCase()}!
              </h3>
              <p className="font-tech text-xs text-zinc-400 tracking-wider uppercase mt-1">
                {alreadySupported
                  ? 'YOUR SUPPORT HAS ALREADY BEEN RECORDED'
                  : 'YOU ARE STANDING WITH SASHWAT KUMAR FOR VICE PRESIDENT'}
              </p>
            </div>

            {/* Supporter Digital Pass Card */}
            <div className="relative p-5 bg-[#09090c] border border-dashed border-red-500/80 text-left scanlines">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                <span className="font-anton text-sm text-[#f4f1ea]">ISE SUPPORTER PASS</span>
                <span className="font-tech text-[10px] text-[#dc2626] font-bold">
                  COUNT: {finalCount}+
                </span>
              </div>
              <div className="text-xs font-tech space-y-1 text-zinc-300">
                <div><span className="text-zinc-500">NAME:</span> {name}</div>
                <div><span className="text-zinc-500">BATCH:</span> {departmentYear}</div>
                <div><span className="text-zinc-500">CANDIDATE:</span> Sashwat Kumar for Vice President</div>
                <div><span className="text-zinc-500">FORUM:</span> SANGYARTHAM — ISE FORUM</div>
              </div>
              <div className="mt-3 pt-2 border-t border-zinc-800 text-[10px] font-condensed uppercase tracking-wider text-[#dc2626] font-bold">
                &ldquo;YOUR VOICE. YOUR CHOICE. YOUR VICE PRESIDENT.&rdquo;
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleShare}
                className="flex-1 py-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-anton text-sm tracking-wider uppercase transition-all flex items-center justify-center space-x-2"
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'LINK COPIED' : 'SHARE PASS'}</span>
              </button>

              <button
                onClick={() => {
                  sfx.click();
                  onClose();
                }}
                className="py-3 px-5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-tech text-xs uppercase tracking-wider border border-zinc-700"
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};