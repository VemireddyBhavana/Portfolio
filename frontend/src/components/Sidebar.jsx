import React from 'react';
import { motion } from 'framer-motion';
import { Home, User, GraduationCap, Briefcase, Mail, Award } from 'lucide-react';
import Magnetic from './Magnetic';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { id: 'hero', icon: <Home size={22} />, label: 'Home' },
  { id: 'about', icon: <User size={22} />, label: 'About' },
  { id: 'skills', icon: <GraduationCap size={22} />, label: 'Skills' },
  { id: 'certifications', icon: <Award size={22} />, label: 'Awards' },
  { id: 'projects', icon: <Briefcase size={22} />, label: 'Work' },
  { id: 'contact', icon: <Mail size={22} />, label: 'Contact' },
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = React.useState('hero');

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'certifications', 'projects', 'contact'];
      let current = '';
      
      for (let id of sections) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = id;
            break;
          }
        }
      }
      
      // Fallback: If we're confidently at the bottom of the scrollable page, force activate contact.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        current = 'contact';
      }

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 968 : false;

  return (
    <motion.div 
      className="sidebar-premium"
      initial={isMobile ? { y: 100, x: "-50%", opacity: 0 } : { x: -100, y: "-50%", opacity: 0 }}
      animate={isMobile ? { y: 0, x: "-50%", opacity: 1 } : { x: 0, y: "-50%", opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="sidebar-icons">
        {navItems.map((item) => (
          <Magnetic key={item.id}>
            <motion.div 
              className={`sidebar-icon-wrapper ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <div className="sidebar-icon">{item.icon}</div>
              <div className="sidebar-tooltip">{item.label}</div>
            </motion.div>
          </Magnetic>
        ))}
        <Magnetic>
           <ThemeToggle />
        </Magnetic>
      </div>
    </motion.div>
  );
};

export default Sidebar;
