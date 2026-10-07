import React, { useState } from 'react';
import { X, CheckCircle, Heart, Share2, Loader2, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sfx } from '../utils/sound';
import { getAnonymousVisitorId, submitSupport, setLocalSupportState } from '../services/supportApi';

interface PledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPledgeSuccess: (supporterName: string, newCount: number) => void;
  currentCount: number | null;
}

export const PledgeModal: React.FC<PledgeModalProps> = ({
  isOpen,
  onClose,
  onPledgeSuccess,
  currentCount,
}) => {
  const [name, setName] = useState('');
  const [departmentYear, setDepartmentYear] = useState('ISE Student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [pledged, setPledged] = useState(false);
  const [copied, setCopied] = useState(false);
  const [finalCount, setFinalCount] = useState<number | null>(currentCount);

  if (!isOpen) return null;

  const handlePledge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || isSubmitting) return;

    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const visitorId = getAnonymousVisitorId();
      const response = await submitSupport(visitorId);

      sfx.stamp();

      // Trigger high-impact red & cream confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#dc2626', '#f4f1ea', '#991b1b', '#ffffff'],
      });

      setLocalSupportState(true);
      setFinalCount(response.count);
      setPledged(true);
      onPledgeSuccess(name.trim(), response.count);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unable to connect to support server. Please try again.';
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full bg-[#101015] border-2 border-[#dc2626] shadow-[0_0_50px_rgba(220,38,38,0.4)] p-6 sm:p-8 overflow-hidden rounded-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header bar */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-6">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 bg-[#dc2626] animate-pulse inline-block" />
            <span id="pledge-modal-title" className="font-tech text-xs uppercase tracking-widest text-zinc-300">
              ISE SUPPORT // SANGYARTHAM
            </span>
          </div>

          <button
            onClick={() => {
              sfx.click();
              onClose();
            }}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!pledged ? (
          <div>
            <div className="mb-6">
              <h3 className="font-anton text-3xl sm:text-4xl text-[#f4f1ea] uppercase tracking-wide">
                STAND WITH <span className="text-[#dc2626]">SASHWAT</span>
              </h3>
              <p className="font-tech text-xs text-zinc-400 uppercase tracking-widest mt-1">
                Record your support for the Vice President candidate of the ISE Forum
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-950/40 border border-red-800 text-red-200 text-xs font-tech flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#dc2626]" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handlePledge} className="space-y-4">
              <div>
                <label className="block font-tech text-xs uppercase tracking-wider text-zinc-300 mb-1.5">
                  YOUR NAME / SUPPORTER IDENTIFIER *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul / Ananya"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#171720] border border-zinc-700 text-[#f4f1ea] px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#dc2626] focus:ring-1 focus:ring-[#dc2626] transition-colors"
                />
              </div>

              <div>
                <label className="block font-tech text-xs uppercase tracking-wider text-zinc-300 mb-1.5">
                  AFFILIATION / BATCH
                </label>
                <select
                  value={departmentYear}
                  onChange={(e) => setDepartmentYear(e.target.value)}
                  className="w-full bg-[#171720] border border-zinc-700 text-[#f4f1ea] px-4 py-3 font-sans text-sm focus:outline-none focus:border-[#dc2626] transition-colors"
                >
                  <option value="ISE Student">ISE Student (General Body)</option>
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
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-anton text-base tracking-wider uppercase transition-all shadow-[0_4px_16px_rgba(220,38,38,0.4)] flex items-center justify-center space-x-2 border border-red-500 active:scale-[0.98] disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                  ) : (
                    <Heart className="w-4 h-4 fill-current text-white" />
                  )}
                  <span>{isSubmitting ? 'RECORDING SUPPORT...' : 'CONFIRM SUPPORT'}</span>
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
                SUPPORT RECORDED
              </span>
              <h3 className="font-anton text-3xl sm:text-4xl text-[#f4f1ea] uppercase">
                THANK YOU, {name.toUpperCase()}!
              </h3>
              <p className="font-tech text-xs text-zinc-400 tracking-wider uppercase mt-1">
                YOU ARE STANDING WITH SASHWAT KUMAR FOR VICE PRESIDENT
              </p>
            </div>

            {/* Supporter Digital Pass Card */}
            <div className="relative p-5 bg-[#09090c] border border-dashed border-red-500/80 text-left scanlines">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                <span className="font-anton text-sm text-[#f4f1ea]">ISE SUPPORTER PASS</span>
                <span className="font-tech text-[10px] text-[#dc2626] font-bold">
                  COUNT: +{finalCount ?? '0'}
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
