import './index.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import MobileDock from './components/layout/MobileDock';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Timeline from './components/sections/Timeline';
import Certificates from './components/sections/Certificates';
import Blog from './components/sections/Blog';
import FAQ from './components/sections/FAQ';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress className="top-14" />
      <Header />
      <main className="flex-1">
        <Hero />
        <Skills />
        <Timeline />
        <Education />
        <Certificates />
        <Blog />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <MobileDock />
    </div>
  );
}

export default App;
