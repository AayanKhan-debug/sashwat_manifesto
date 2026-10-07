import { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { IntroScreen } from './components/IntroScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeBanner } from './components/MarqueeBanner';
import { Manifesto } from './components/Manifesto';
import { Candidate } from './components/Candidate';
import { TheCampaign } from './components/TheCampaign';
import { ManifestoHighlight } from './components/ManifestoHighlight';
import { FinalSection } from './components/FinalSection';
import { Footer } from './components/Footer';
import { PosterModal } from './components/PosterModal';
import { PledgeModal } from './components/PledgeModal';
import { AudioControl } from './components/AudioControl';
import {
  fetchSupportCount,
  submitSupport,
  getAnonymousVisitorId,
  getLocalSupportState,
  setLocalSupportState,
} from './services/supportApi';
import { sfx } from './utils/sound';

export function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);

  // Real Persistent MongoDB Support State - Initialized without hardcoded values
  const [supporterCount, setSupporterCount] = useState<number | null>(null);
  const [isLoadingSupport, setIsLoadingSupport] = useState<boolean>(true);
  const [hasSupported, setHasSupported] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load real verified count and local visitor state on mount
  const loadInitialSupportData = useCallback(async () => {
    setIsLoadingSupport(true);
    try {
      const count = await fetchSupportCount();
      setSupporterCount(count);
    } catch (error) {
      console.warn('Backend support API unavailable on initial load:', error);
      // Fallback to 0 if database has no records or backend unreachable
      setSupporterCount((prev) => (prev !== null ? prev : 0));
    } finally {
      setIsLoadingSupport(false);
      setHasSupported(getLocalSupportState());
    }
  }, []);

  useEffect(() => {
    loadInitialSupportData();
  }, [loadInitialSupportData]);

  // Handler for direct support click on navigation or buttons
  const handleDirectSupport = async () => {
    if (hasSupported) {
      // If already recorded support, open the voter badge/pass modal
      setIsPledgeModalOpen(true);
      return;
    }

    setIsLoadingSupport(true);
    try {
      const visitorId = getAnonymousVisitorId();
      const response = await submitSupport(visitorId);

      sfx.stamp();

      // Trigger celebratory red & cream confetti
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.2 },
        colors: ['#dc2626', '#f4f1ea', '#991b1b', '#ffffff'],
      });

      // Update strictly with server response count
      setSupporterCount(response.count);
      setHasSupported(true);
      setLocalSupportState(true);

      setToastMessage(
        response.alreadySupported
          ? 'You have already recorded support. Thank you for standing with Sashwat!'
          : `Support recorded! Verified campaign supporters: ${response.count}`
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Could not record support. Please retry.';
      setToastMessage(`Network Notice: ${errorMsg}`);
    } finally {
      setIsLoadingSupport(false);
      setTimeout(() => setToastMessage(null), 4500);
    }
  };

  const handleEnterCampaign = () => {
    setShowIntro(false);
    setAudioStarted(true);
  };

  const handlePledgeSuccess = (supporterName: string, newCount: number) => {
    setSupporterCount(newCount);
    setHasSupported(true);
    setToastMessage(`Support recorded for ${supporterName}! Thank you for standing with Sashwat.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f1ea] font-sans antialiased relative selection:bg-[#dc2626] selection:text-white">
      {/* 1. CINEMATIC INTRO FULL-SCREEN EXPERIENCE */}
      {showIntro && <IntroScreen onEnter={handleEnterCampaign} />}

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 bg-[#16161d] border-2 border-[#dc2626] text-white px-5 py-3 shadow-[0_10px_30px_rgba(220,38,38,0.4)] flex items-center space-x-3 text-xs sm:text-sm font-tech animate-bounce">
          <span className="w-2.5 h-2.5 bg-[#dc2626] rounded-full inline-block" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Fixed Music Control in Bottom-Right Corner */}
      {!showIntro && <AudioControl autoStart={audioStarted} />}

      {/* Main Navigation with Real Dynamic Support Counter */}
      <Navbar
        onOpenPledge={() => setIsPledgeModalOpen(true)}
        onSupportClick={handleDirectSupport}
        supporterCount={supporterCount}
        isLoadingSupport={isLoadingSupport}
        hasSupported={hasSupported}
      />

      <main>
        {/* 2. HERO SECTION */}
        <Hero
          onOpenPosterModal={() => setIsPosterModalOpen(true)}
          onOpenPledgeModal={() => setIsPledgeModalOpen(true)}
        />

        {/* Dynamic ticker tape */}
        <MarqueeBanner variant="red" />

        {/* 3. MANIFESTO */}
        <Manifesto />

        {/* Secondary ticker tape */}
        <MarqueeBanner variant="black" />

        {/* 4. THE CANDIDATE */}
        <Candidate
          onOpenPosterModal={() => setIsPosterModalOpen(true)}
          onOpenPledgeModal={() => setIsPledgeModalOpen(true)}
        />

        {/* Accent ticker tape */}
        <MarqueeBanner variant="outline" />

        {/* 5. CAMPAIGN MESSAGE */}
        <TheCampaign
          onOpenPledgeModal={() => setIsPledgeModalOpen(true)}
        />

        {/* 6. MANIFESTO HIGHLIGHT */}
        <ManifestoHighlight />

        {/* 7. FINAL CAMPAIGN SECTION */}
        <FinalSection
          onOpenPledgeModal={() => setIsPledgeModalOpen(true)}
          onOpenPosterModal={() => setIsPosterModalOpen(true)}
        />
      </main>

      {/* 8. FOOTER */}
      <Footer />

      {/* Modals */}
      <PosterModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
      />

      <PledgeModal
        isOpen={isPledgeModalOpen}
        onClose={() => setIsPledgeModalOpen(false)}
        onPledgeSuccess={handlePledgeSuccess}
        currentCount={supporterCount}
      />
    </div>
  );
}

export default App;
