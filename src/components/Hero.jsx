import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Stars } from '@react-three/drei';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter, Youtube, ChevronDown } from 'lucide-react';
import Magnetic from './Magnetic';
import AnimatedText from './AnimatedText';
import TextScramble from './TextScramble';

const Hero = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const rect = sectionRef.current.getBoundingClientRect();
    
    const x = (clientX - rect.left - rect.width / 2) / 25;
    const y = (clientY - rect.top - rect.height / 2) / 25;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.section 
      ref={sectionRef}
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
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f5ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
          <Suspense fallback={null}>
            <Stars 
                radius={100} 
                depth={50} 
                count={isMobile ? 500 : 2000} 
                factor={4} 
                saturation={0} 
                fade 
                speed={1} 
            />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
        <div className="hero-bg-overlay"></div>
      </div>

      <div className="container hero-container-pivot">
        <div className="hero-content-pivot">
          <motion.div 
            className="hero-text-premium"
            style={{ x: mouseXSpring, y: mouseYSpring }}
          >
             <AnimatedText 
                text="Hello I'm" 
                type="span" 
                className="hello-text" 
                direction="left" 
                delay={0.4} 
             />
             <TextScramble 
                text="Vemireddy Bhavana" 
                type="h1" 
                className="hero-title-premium" 
                duration={2} 
             />
             <AnimatedText 
                text="Full Stack Developer & AI Enthusiast" 
                type="h2" 
                className="hero-subtitle-pivot" 
                direction="bottom" 
                delay={0.8} 
             />
             <AnimatedText 
                text="I develop scalable and user-centric web applications with a focus on clean architecture, performance, and modern design. Passionate about AI-driven solutions, automation, and building impactful digital experiences." 
                className="hero-description-pivot" 
                direction="bottom" 
                delay={1.2} 
             />
            
            <div className="hero-cta-container">
              <div className="hero-cta-pivot">
                <Magnetic>
                  <a href="/resume.pdf" download="Vemireddy_Bhavana_Resume.pdf" style={{ textDecoration: 'none' }}>
                    <motion.button 
                      ref={buttonRef}
                      className="btn btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Download CV
                    </motion.button>
                  </a>
                </Magnetic>
                <Magnetic>
                  <motion.a 
                    href="mailto:bhavanavemireddy6@gmail.com"
                    className="btn btn-outline"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ textDecoration: 'none' }}
                  >
                    Let's Talk
                  </motion.a>
                </Magnetic>
              </div>

              <div className="hero-socials">
                {[
                  { icon: <Github size={20} />, link: "https://github.com/VemireddyBhavana" },
                  { icon: <Linkedin size={20} />, link: "https://linkedin.com/in/bhavana-vemireddy-426b382a5" },
                  { icon: <Mail size={20} />, link: "mailto:bhavanavemireddy6@gmail.com" },
                  { icon: <Twitter size={20} />, link: "#" },
                  { icon: <Youtube size={20} />, link: "#" }
                ].map((social, i) => (
                  <Magnetic key={i}>
                    <motion.a 
                      whileHover={{ y: -5, color: '#00f5ff' }} 
                      whileTap={{ scale: 0.9 }} 
                      href={social.link} 
                      target={social.link.startsWith('mailto:') ? "_self" : "_blank"} 
                      rel="noreferrer" 
                      className="social-circle-btn"
                    >
                      {social.icon}
                    </motion.a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="profile-section-premium"
            initial={{ scale: 0.8, opacity: 0, x: 30 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ x: useTransform(mouseXSpring, (x) => x * -1.2), y: useTransform(mouseYSpring, (y) => y * -1.2) }}
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
        </div>
        
      </div>
    </motion.section>
  );
};

export default Hero;
