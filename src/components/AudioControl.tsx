import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import campaignAudioSrc from '../assets/Kgf - Bgm _ Instrumental.mp3';

interface AudioControlProps {
  autoStart: boolean;
}

export const AudioControl: React.FC<AudioControlProps> = ({ autoStart }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);

  // Initialize and handle autoStart trigger
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(campaignAudioSrc);
      audio.preload = 'auto';
      audio.volume = 0.38; // Initial volume 38%
      audio.loop = false; // Do not continuously loop
      
      // Natural fade out near the end
      audio.addEventListener('timeupdate', () => {
        if (audio.duration && !audio.muted) {
          const timeLeft = audio.duration - audio.currentTime;
          if (timeLeft <= 4 && timeLeft > 0) {
            // Fade out from 0.38 to 0 smoothly over 4 seconds
            const targetVol = Math.max(0, (timeLeft / 4) * 0.38);
            audio.volume = targetVol;
          }
        }
      });

      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
      });

      audioRef.current = audio;
    }

    if (autoStart && !hasStarted && audioRef.current) {
      setHasStarted(true);
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Audio play prevented by browser policy:', err);
        });
    }

    return () => {
      // Don't teardown on re-renders, preserve audio instance
    };
  }, [autoStart, hasStarted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // If ended or near end, restore normal volume before playing
      if (audioRef.current.volume === 0 && !audioRef.current.muted) {
        audioRef.current.volume = 0.38;
      }
      audioRef.current.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <aside
      aria-label="Campaign Audio Control"
      className="fixed bottom-5 right-5 z-40 flex items-center space-x-2 bg-[#0e0e14]/95 backdrop-blur-md border border-[#dc2626]/50 p-2 sm:px-3 sm:py-2 shadow-[0_8px_30px_rgba(0,0,0,0.85)]"
    >
      {/* Audio Wave Visualizer Bars */}
      <div className="flex items-end space-x-0.5 h-4 w-4 mr-1 text-[#dc2626]">
        <span
          className={`w-1 bg-[#dc2626] transition-all duration-200 ${
            isPlaying && !isMuted ? 'h-3 animate-pulse' : 'h-1'
          }`}
        />
        <span
          className={`w-1 bg-[#dc2626] transition-all duration-300 ${
            isPlaying && !isMuted ? 'h-4 animate-bounce' : 'h-1.5'
          }`}
        />
        <span
          className={`w-1 bg-[#dc2626] transition-all duration-150 ${
            isPlaying && !isMuted ? 'h-2 animate-pulse' : 'h-1'
          }`}
        />
      </div>

      {/* Label */}
      <div className="hidden sm:flex flex-col text-left mr-2">
        <span className="font-anton text-xs text-[#f4f1ea] uppercase tracking-wider flex items-center gap-1">
          <Music className="w-3 h-3 text-[#dc2626]" />
          <span>CAMPAIGN BGM</span>
        </span>
        <span className="font-tech text-[9px] text-zinc-400 tracking-wider">
          {isPlaying ? (isMuted ? 'MUTED' : 'PLAYING') : 'PAUSED'}
        </span>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="p-1.5 sm:p-2 bg-zinc-900 hover:bg-[#dc2626] text-zinc-200 hover:text-white border border-zinc-700 hover:border-red-500 transition-colors"
        aria-label={isPlaying ? 'Pause Campaign Audio' : 'Play Campaign Audio'}
        title={isPlaying ? 'Pause Campaign Audio' : 'Play Campaign Audio'}
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
      </button>

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="p-1.5 sm:p-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition-colors"
        aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
        title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
      >
        {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-500" /> : <Volume2 className="w-3.5 h-3.5 text-[#dc2626]" />}
      </button>
    </aside>
  );
};
