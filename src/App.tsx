import { useEffect, useState } from "react";
import { IntroScreen } from "./components/IntroScreen";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { MarqueeBanner } from "./components/MarqueeBanner";
import { Manifesto } from "./components/Manifesto";
import { Candidate } from "./components/Candidate";
import { TheCampaign } from "./components/TheCampaign";
import { ManifestoHighlight } from "./components/ManifestoHighlight";
import { FinalSection } from "./components/FinalSection";
import { Footer } from "./components/Footer";
import { PosterModal } from "./components/PosterModal";
import { PledgeModal } from "./components/PledgeModal";
import { AudioControl } from "./components/AudioControl";
import { getSupportCount } from "./utils/supportApi";

import { sfx } from "./utils/sound";

export function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [audioStarted, setAudioStarted] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [isPledgeModalOpen, setIsPledgeModalOpen] = useState(false);

  const [supporterCount, setSupporterCount] = useState(0);
  const [hasSupported, setHasSupported] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Get support count from backend when the app loads
  useEffect(() => {
    const loadSupportCount = async () => {
      try {
        const count = await getSupportCount();
        setSupporterCount(count);
      } catch (error) {
        console.error("Failed to load support count:", error);
      }
    };

    loadSupportCount();
  }, []);

  // Handle direct support button
  const handleDirectSupport = () => {
    sfx.stamp();
    setIsPledgeModalOpen(true);
  };

  const handleEnterCampaign = () => {
    setShowIntro(false);
    setAudioStarted(true);
  };

  const handlePledgeSuccess = (
    supporterName: string,
    newCount: number
  ) => {
    setSupporterCount(newCount);
    setHasSupported(true);

    setToastMessage(
      `Support recorded for ${supporterName}! Thank you for standing with Sashwat.`
    );

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-[#f4f1ea] font-sans antialiased relative selection:bg-[#dc2626] selection:text-white">
      {showIntro && <IntroScreen onEnter={handleEnterCampaign} />}

      {toastMessage && (
        <div className="fixed bottom-20 right-6 z-50 bg-[#16161d] border-2 border-[#dc2626] text-white px-5 py-3 shadow-[0_10px_30px_rgba(220,38,38,0.4)] flex items-center space-x-3 text-xs sm:text-sm font-tech animate-bounce">
          <span className="w-2.5 h-2.5 bg-[#dc2626] rounded-full inline-block" />
          <span>{toastMessage}</span>
        </div>
      )}

      {!showIntro && <AudioControl autoStart={audioStarted} />}

      <Navbar
        onOpenPledge={() => setIsPledgeModalOpen(true)}
        onSupportClick={handleDirectSupport}
        supporterCount={supporterCount}
        hasSupported={hasSupported}
      />

      <main>
        <Hero
          onOpenPosterModal={() => setIsPosterModalOpen(true)}
          onOpenPledgeModal={() => setIsPledgeModalOpen(true)}
        />

        <MarqueeBanner variant="red" />

        <Manifesto />

        <MarqueeBanner variant="black" />

        <Candidate
          onOpenPosterModal={() => setIsPosterModalOpen(true)}
          onOpenPledgeModal={() => setIsPledgeModalOpen(true)}
        />

        <MarqueeBanner variant="outline" />

        <TheCampaign
          onOpenPledgeModal={() => setIsPledgeModalOpen(true)}
        />

        <ManifestoHighlight />

        <FinalSection
          onOpenPledgeModal={() => setIsPledgeModalOpen(true)}
          onOpenPosterModal={() => setIsPosterModalOpen(true)}
        />
      </main>

      <Footer />

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