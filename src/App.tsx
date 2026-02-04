import './index.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/layout/ScrollToTop';
import MobileDock from './components/layout/MobileDock';
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
      <Footer />
      <ScrollToTop />
      <MobileDock />
    </div>
  );
}

export default App;
