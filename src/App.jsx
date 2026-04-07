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
import FloatingShapes from './components/FloatingShapes';
import ScrollProgress from './components/ScrollProgress';

// Pages
import NexusShowcase from './pages/NexusShowcase';
import AetherShowcase from './pages/AetherShowcase';
import LuminaShowcase from './pages/LuminaShowcase';
import SentinelShowcase from './pages/SentinelShowcase';

import Skills from './components/Skills';
import { motion, useScroll, useSpring, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 50;
    const moveY = (clientY - window.innerHeight / 2) / 50;
    mouseX.set(moveX);
    mouseY.set(moveY);
  };

  const blobX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const blobY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  return (
    <div className="portfolio-layout" onMouseMove={handleMouseMove}>
      <ScrollProgress />
      <FloatingShapes />
      <div className="liquid-blob-bg">
        <motion.div 
          className="blob-item blob-1" 
          style={{ x: blobX, y: blobY }}
        />
        <motion.div 
          className="blob-item blob-2" 
          style={{ x: useTransform(blobX, x => x * -1.2), y: useTransform(blobY, y => y * -1.2) }}
        />
        <motion.div 
          className="blob-item blob-3" 
          style={{ x: useTransform(blobX, x => x * 0.8), y: useTransform(blobY, y => y * -0.5) }}
        />
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
