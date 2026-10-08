import { useState } from 'react';
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
  getStoredSupportCount,
  getHasSupported,
  recordLocalSupport,
} from './utils/supportStorage';
import { sfx } from './utils/sound';

export function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);

  // Frontend-Only Campaign Support State (Persisted in localStorage, base 100)
  const [supporterCount, setSupporterCount] = useState<number>(() => getStoredSupportCount());
  const [hasSupported, setHasSupported] = useState<boolean>(() => getHasSupported());
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Handler for direct support click on navigation or buttons
  const handleDirectSupport = () => {
    sfx.stamp();

    if (hasSupported) {
      // If already recorded support in this browser, open the supporter pass modal
      setIsPledgeModalOpen(true);
      return;
    }

    // Trigger celebratory red & cream confetti
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.2 },
      colors: ['#dc2626', '#f4f1ea', '#991b1b', '#ffffff'],
    });

    const result = recordLocalSupport();
    setSupporterCount(result.count);
    setHasSupported(true);

    setToastMessage('Support recorded! Thank you for standing with Sashwat.');
    setTimeout(() => setToastMessage(null), 4000);
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
    }, 4000);
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
        <Manifesto onOpenPledgeModal={() => setIsPledgeModalOpen(true)} />

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
