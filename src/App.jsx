import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';

// Components
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

// Pages
import NexusShowcase from './pages/NexusShowcase';
import AetherShowcase from './pages/AetherShowcase';
import LuminaShowcase from './pages/LuminaShowcase';
import SentinelShowcase from './pages/SentinelShowcase';

import Skills from './components/Skills';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="page-transition-wrapper"
  >
    {children}
  </motion.div>
);

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="portfolio-layout">
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />
      <div className="liquid-blob-bg">
        <div className="blob-item blob-1"></div>
        <div className="blob-item blob-2"></div>
        <div className="blob-item blob-3"></div>
      </div>
      <CustomCursor />
      <Sidebar />
      <main className="main-viewport">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

function AppContent() {
  const location = useLocation();
  
  return (
    <SmoothScroll>
      <div className="App">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/nexus" element={<PageWrapper><NexusShowcase /></PageWrapper>} />
            <Route path="/aether" element={<PageWrapper><AetherShowcase /></PageWrapper>} />
            <Route path="/lumina" element={<PageWrapper><LuminaShowcase /></PageWrapper>} />
            <Route path="/sentinel" element={<PageWrapper><SentinelShowcase /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
