import './index.css';
import { useState } from 'react';
import { useConsent } from './hooks/useConsent';
import { useAnalytics } from './hooks/useAnalytics';
import { useSectionTracking } from './hooks/useSectionTracking';
import { useEventTracking } from './hooks/useEventTracking';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import MobileDock from './components/layout/MobileDock';
import ConsentBanner from './components/layout/ConsentBanner';
import PrivacyPolicyModal from './components/layout/PrivacyPolicyModal';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import ProjectsTimeline from './components/sections/ProjectsTimeline';
import Certificates from './components/sections/Certificates';
import Blog from './components/sections/Blog';
import FAQ from './components/sections/FAQ';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';

function App() {
  const [policyOpen, setPolicyOpen] = useState(false);

  // Consent gate — all tracking is gated on this
  const { consent, accept, decline } = useConsent();

  // Phase 1: enriched page-view + returns sessionId for downstream hooks
  const { sessionId } = useAnalytics(consent);

  // Phase 2: section engagement (only activates once sessionId is set)
  useSectionTracking(sessionId);

  // Phase 3: click + scroll-depth events (only activates once sessionId is set)
  useEventTracking(sessionId);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Skills />
        <Experience />
        <ProjectsTimeline />
        <Education />
        <Certificates />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer
        consent={consent}
        onAccept={accept}
        onDecline={decline}
        onViewPolicy={() => setPolicyOpen(true)}
      />
      <ScrollToTop />
      <MobileDock />
      {/* Phase 4: CCPA consent banner */}
      <ConsentBanner
        consent={consent}
        onAccept={accept}
        onDecline={decline}
        onViewPolicy={() => setPolicyOpen(true)}
      />
      {/* Phase 5: Privacy policy modal */}
      <PrivacyPolicyModal
        open={policyOpen}
        onClose={() => setPolicyOpen(false)}
      />
    </div>
  );
}

export default App;
