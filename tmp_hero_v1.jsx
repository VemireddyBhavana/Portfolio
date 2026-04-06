import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, Stars, Float } from '@react-three/drei';
import { motion, useMotionValue } from 'framer-motion';
import { Github, Linkedin, Twitter, Youtube, ChevronDown } from 'lucide-react';

const Hero = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const buttonRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const dX = clientX - centerX;
    const dY = clientY - centerY;

    if (Math.abs(dX) < 100 && Math.abs(dY) < 100) {
      mouseX.set(dX * 0.3);
      mouseY.set(dY * 0.3);
    } else {
      mouseX.set(0);
      mouseY.set(0);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      id="hero" 
      className="hero-section"
      onMouseMove={handleMouseMove}
    >
      {/* Background 3D Scene */}
      <div className="hero-canvas-container">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00d8ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
          <Suspense fallback={null}>
            <Stars 
                radius={100} 
                depth={50} 
                count={isMobile ? 1000 : 5000} 
                factor={4} 
                saturation={0} 
                fade 
                speed={1} 
            />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>

      <div className="container hero-container-pivot">
        <div className="hero-content-pivot">
          <motion.div 
            className="profile-section-premium"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="profile-image-wrapper">
              <div className="profile-glow-ring"></div>
              <div className="profile-glow-ring-outer"></div>
              <img 
                src="https://res.cloudinary.com/de8opipom/image/upload/v1774977788/photo_li1vaw.jpg" 
                alt="Bhavana Profile" 
                className="profile-image-actual"
              />
            </div>
          </motion.div>

          <motion.div 
            className="hero-text-premium"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
             <h1 className="hero-title-premium">
               {"I'm Vemireddy Bhavana".split(" ").map((word, i) => (
                 <motion.span
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                   style={{ display: 'inline-block', marginRight: '0.4rem' }}
                 >
                   {word}
                 </motion.span>
               ))}
             </h1>
            <h2 className="hero-subtitle-pivot text-gradient">Full Stack Developer & AI Enthusiast</h2>
            <p className="hero-description-pivot">
             I develop scalable and user-centric web applications with a focus on clean architecture, performance, and modern design. Passionate about AI-driven solutions, automation, and building impactful digital experiences. 
            </p>
            
            <div className="hero-cta-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div className="hero-cta-pivot" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <a href="/resume.pdf" download="Vemireddy_Bhavana_Resume.pdf">
                  <motion.button 
                    ref={buttonRef}
                    className="btn btn-primary btn-glow interactive"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ x: mouseX, y: mouseY, padding: '0.8rem 2rem' }}
                  >
                    Download CV
                  </motion.button>
                </a>
                <motion.button 
                  className="btn btn-outline interactive"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  style={{ padding: '0.8rem 2rem', margin: 0 }}
                >
                  Let's Talk
                </motion.button>
              </div>

              <div className="hero-socials" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="https://github.com/VemireddyBhavana" target="_blank" rel="noreferrer" className="social-circle-btn">
                  <Github size={20} />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="https://linkedin.com/in/bhavana-vemireddy-426b382a5" target="_blank" rel="noreferrer" className="social-circle-btn">
                  <Linkedin size={20} />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="#" target="_blank" rel="noreferrer" className="social-circle-btn">
                  <Twitter size={20} />
                </motion.a>
                <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href="#" target="_blank" rel="noreferrer" className="social-circle-btn">
                  <Youtube size={20} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="scroll-indicator-pivot"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="mouse-scroller"></div>
          <ChevronDown size={24} className="chevron-scroll" />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
