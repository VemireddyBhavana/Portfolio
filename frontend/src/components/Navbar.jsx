import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, Menu, X } from 'lucide-react';
import Magnetic from './Magnetic';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About', id: 'about' },
        { name: 'Skills', id: 'skills' },
        { name: 'Awards', id: 'certifications' },
        { name: 'Projects', id: 'projects' },
        { name: 'Contact', id: 'contact' },
    ];

    const handleNavClick = (e, id) => {
        if (isHome && id) {
            e.preventDefault();
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
            }
        }
    };

    return (
        <motion.nav 
            className={`navbar-premium ${scrolled ? 'navbar-scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="nav-container-premium">
                <Magnetic>
                    <Link to="/" className="logo-premium interactive">
                        <div className="logo-icon-wrapper">
                            <Rocket size={20} className="logo-icon" />
                        </div>
                        <span>BHAVANA<span>.DEV</span></span>
                    </Link>
                </Magnetic>

                <div className="nav-links-premium">
                    {navLinks.map((link, i) => (
                        <motion.a 
                            key={link.name}
                            href={`/#${link.id}`}
                            onClick={(e) => handleNavClick(e, link.id)}
                            className="nav-link-premium interactive"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i + 0.3 }}
                        >
                            {link.name}
                            <div className="link-hover-line"></div>
                        </motion.a>
                    ))}
                    <Magnetic>
                        <motion.a 
                            href="#contact" 
                            onClick={(e) => handleNavClick(e, 'contact')}
                            className="btn btn-primary btn-sm interactive"
                            style={{ marginLeft: '1rem' }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            Let's Talk
                        </motion.a>
                    </Magnetic>
                </div>

                <div className="mobile-toggle interactive" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        className="mobile-menu-premium"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="mobile-links-premium">
                            {navLinks.map((link) => (
                                <a 
                                    key={link.name} 
                                    href={`/#${link.id}`}
                                    onClick={(e) => handleNavClick(e, link.id)}
                                    className="mobile-link-premium"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
