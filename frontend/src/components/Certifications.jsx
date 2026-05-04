import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Trophy, Rocket, Bot, ExternalLink, Cpu, Star, Mic, Award, Gift, X, Maximize2, Github, Globe, CheckCircle2 } from 'lucide-react';
import ParallaxTitle from './ParallaxTitle';

// Study Sync AI Specific Showcase (Bulletproof Stability Version)
// Study Sync AI Specific Showcase (Bulletproof Stability Version)
const StudySyncShowcase = ({ onClose }) => {
    const modalRef = useRef(null);
    
    // Scroll to top when opened
    useEffect(() => {
        window.scrollTo(0, 0);
        if (modalRef.current) modalRef.current.scrollTop = 0;
        
        // Prevent background scrolling
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, []);

    return (
        <div 
            id="study-sync-modal"
            ref={modalRef}
            data-lenis-prevent="true"
            style={{ 
                zIndex: 5000000, 
                position: 'fixed', 
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                background: '#020617', 
                overflowY: 'auto', 
                padding: '0',
                margin: '0',
                display: 'block',
                WebkitOverflowScrolling: 'touch'
            }} 
        >
            <div 
                style={{ 
                    background: '#0f172a', 
                    color: '#ffffff',
                    width: '100%',
                    maxWidth: '1000px',
                    margin: '0 auto', 
                    minHeight: '100vh',
                    position: 'relative',
                    padding: '6rem 2rem 10rem', 
                    borderLeft: '1px solid rgba(255,255,255,0.1)',
                    borderRight: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 0 50px rgba(0,0,0,0.5)'
                }}
            >
                <button 
                    onClick={onClose} 
                    style={{ 
                        position: 'fixed', 
                        top: '2rem', 
                        right: '3rem', 
                        zIndex: 6000001,
                        background: '#00f5ff', 
                        color: '#0f172a', 
                        border: 'none',
                        width: '50px', 
                        height: '50px', 
                        borderRadius: '50%', 
                        cursor: 'pointer',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)',
                        pointerEvents: 'auto',
                        transition: 'transform 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <X size={28} />
                </button>
                
                <div style={{ marginBottom: '4rem', textAlign: 'left' }}>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: '900', marginBottom: '1.5rem', color: '#ffffff' }}>Study Sync AI</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
                        <span style={{ color: '#00f5ff', fontWeight: '800', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Trophy size={24} /> Winner – NIAT x Base44 Hackathon
                        </span>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', marginBottom: '5rem' }}>
                    <div style={{ position: 'relative', width: '100%', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <img src="https://res.cloudinary.com/de8opipom/image/upload/v1777883253/1776060788465_v4patz.jpg" alt="Team" style={{ width: '100%', height: 'auto', display: 'block' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200" alt="Login Interface" style={{ width: '100%', borderRadius: '16px', display: 'block', border: '1px solid rgba(255,255,255,0.1)' }} />
                        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" alt="Dashboard Preview" style={{ width: '100%', borderRadius: '16px', display: 'block', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                </div>

                <div style={{ marginBottom: '5rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <h4 style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '2rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Project Overview</h4>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#cbd5e1' }}>
                        Study Sync AI is an AI-powered platform that helps students plan and manage their study schedules efficiently. It intelligently organizes tasks, improves productivity, and solves real-world student time management problems.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
                    <div>
                        <h4 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '2.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Key Features</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {["AI-based study planning", "Smart task scheduling", "Clean dashboard UI", "Real-time task updates"].map(f => (
                                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#cbd5e1', marginBottom: '1.2rem', fontSize: '1.1rem' }}>
                                    <CheckCircle2 size={24} style={{ color: '#00f5ff', flexShrink: 0 }} /> {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '2.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Tech Stack</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                            {["MongoDB", "Express.js", "React.js", "Node.js", "AI APIs"].map(t => (
                                <span key={t} style={{ background: 'rgba(0, 245, 255, 0.1)', border: '1px solid rgba(0, 245, 255, 0.3)', padding: '0.6rem 1.2rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '700', color: '#00f5ff' }}>
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ padding: '4rem 0', textAlign: 'center' }}>
                    <a href="https://study-sync-ai-be1b5585.base44.app/" target="_blank" rel="noopener noreferrer" 
                       style={{ 
                           display: 'inline-flex', 
                           alignItems: 'center', 
                           gap: '1.5rem', 
                           background: '#00f5ff', 
                           color: '#0f172a', 
                           padding: '1.5rem 4rem', 
                           borderRadius: '50px', 
                           fontWeight: '900', 
                           fontSize: '1.3rem', 
                           textDecoration: 'none',
                           pointerEvents: 'auto',
                           transition: 'all 0.3s ease',
                           boxShadow: '0 10px 30px rgba(0, 245, 255, 0.3)'
                       }}
                       onMouseEnter={(e) => {
                           e.currentTarget.style.transform = 'translateY(-5px)';
                           e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 245, 255, 0.5)';
                       }}
                       onMouseLeave={(e) => {
                           e.currentTarget.style.transform = 'translateY(0)';
                           e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 245, 255, 0.3)';
                       }}
                    >
                        <Globe size={28} /> Live Demo
                    </a>
                </div>
            </div>
        </div>
    );
};

const certificateData = [
    {
        id: 1,
        title: "Study Sync AI",
        issuer: "NIAT × Base44 Hackathon",
        date: "April 2024",
        image: "https://res.cloudinary.com/de8opipom/image/upload/v1777883253/1776060788465_v4patz.jpg",
        description: "Awarded the Top Prize for \"Study Sync AI\" by team AlphaCoders. Recognized as the most innovative project among all campus entries.",
        icon: <Trophy size={18} />,
        featured: true,
        buttonText: "View My Work",
        isProject: true
    },
    {
        id: 2,
        title: "AI Agents 201 Hands-On",
        issuer: "NxTWave / NIAT",
        date: "April 2026",
        image: "https://media.licdn.com/dms/image/v2/D5622AQFAMNmdbj1uFw/feedshare-shrink_800/B56Z2kLUrHIUAc-/0/1776575925207?e=1779321600&v=beta&t=6hC04egWbGDLqEGFfs76eUJsp3J-VyQomabavJqOmU4",
        certImage: "https://media.licdn.com/dms/image/v2/D5622AQFAMNmdbj1uFw/feedshare-shrink_800/B56Z2kLUrHIUAc-/0/1776575925207?e=1779321600&v=beta&t=6hC04egWbGDLqEGFfs76eUJsp3J-VyQomabavJqOmU4",
        description: "Participated in building AI-driven solutions and gained hands-on experience solving real-world problems using AI Agents.",
        icon: <Bot size={18} />,
        buttonText: "View Certificate"
    },
    {
        id: 3,
        title: "Build for Telangana Hackathon",
        issuer: "NIAT / NxTWave",
        date: "June 2025",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
        certImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
        description: "Participated in a state-level hackathon hosted exclusively for NIAT students to build impactful solutions for Telangana.",
        icon: <Rocket size={18} />,
        buttonText: "View Certificate"
    },
    {
        id: 4,
        title: "Build Your Own Buddy",
        issuer: "NIAT Robotics",
        date: "2024",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
        certImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200",
        description: "Completed the hands-on workshop focused on building functional robotic buddies through active participation.",
        icon: <Cpu size={18} />,
        buttonText: "View Certificate"
    },
    {
        id: 5,
        title: "Special Recognition",
        issuer: "NIAT Management",
        date: "2024",
        image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
        certImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200",
        description: "Received special appreciation and gifts from the NIAT management for outstanding technical contributions.",
        icon: <Gift size={18} />,
        buttonText: "View Certificate"
    },
    {
        id: 6,
        title: "Autonomous Mobility 101",
        issuer: "NxTWave / NIAT",
        date: "March 2025",
        image: "https://images.unsplash.com/photo-1555624106-22e965f3f019?auto=format&fit=crop&q=80&w=800",
        certImage: "https://images.unsplash.com/photo-1555624106-22e965f3f019?auto=format&fit=crop&q=80&w=1200",
        description: "Attended the workshop on autonomous robotics and mobility hosted by the VP of Robotics at NxTWave.",
        icon: <Star size={18} />,
        buttonText: "View Certificate"
    },
    {
        id: 7,
        title: "From Code to CEO Journey",
        issuer: "Ameet Ayare / NIAT",
        date: "Feb 2025",
        image: "https://images.unsplash.com/photo-1478737270239-2fccd2c40c4a?auto=format&fit=crop&q=80&w=800",
        certImage: "https://images.unsplash.com/photo-1478737270239-2fccd2c40c4a?auto=format&fit=crop&q=80&w=1200",
        description: "Gained insights into tech leadership and entrepreneurship from the CEO of Actlogica.",
        icon: <Mic size={18} />,
        buttonText: "View Certificate"
    },
    {
        id: 8,
        title: "Generative AI for Developers",
        issuer: "NxTWave / IBM",
        date: "2024",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        certImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
        description: "Mastered Generative AI strategy, ethical AI implementation, and building AI-powered applications with IBM.",
        icon: <Award size={18} />,
        buttonText: "View Certificate"
    }
];

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);
    const [showProject, setShowProject] = useState(false);

    const handleSelect = (item) => {
        console.log("Selecting item:", item.title);
        if (item.id === 1) {
            setShowProject(true);
        } else {
            setSelectedCert(item);
        }
    };

    return (
        <section id="certifications" className="section certifications">
            <div className="container">
                <ParallaxTitle title="Awards & Certifications" subTitle="Recognition for technical excellence." />
                <div className="awards-grid-premium">
                    {certificateData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`award-card-v2 glass ${item.featured ? 'featured-v2' : ''} interactive`}
                            onClick={() => handleSelect(item)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="award-image-container" onClick={(e) => { e.stopPropagation(); handleSelect(item); }}>
                                <img src={item.image} alt={item.title} className="award-img-v2" />
                                <div className="award-icon-badge-v2">{item.icon}</div>
                                {item.featured && <div className="award-ribbon-v2"><span>TOP PRIZE</span></div>}
                            </div>
                            
                            <div className="award-content-v2">
                                <div className="award-meta-v2">
                                    <span>{item.date}</span> • <span>{item.issuer}</span>
                                </div>
                                <h3 className="award-title-v2" style={{ cursor: 'pointer' }}>{item.title}</h3>
                                <p className="award-desc-v2">{item.description}</p>
                                <div className="award-footer-v2">
                                    <button 
                                        id={`view-work-${item.id}`}
                                        className="view-cert-v2" 
                                        onClick={(e) => { 
                                            e.stopPropagation(); 
                                            console.log("CRITICAL CLICK - Opening Showcase");
                                            handleSelect(item); 
                                        }}
                                        style={{ 
                                            pointerEvents: 'auto', 
                                            position: 'relative', 
                                            zIndex: 9999999,
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {item.buttonText} <ExternalLink size={14} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Standard Certificate Modal */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div className="cert-modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCert(null)} style={{ zIndex: 1000001 }}>
                        <motion.div className="cert-modal-content glass" initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0.5 }} onClick={(e) => e.stopPropagation()}>
                            <button className="modal-close-btn" onClick={() => setSelectedCert(null)}><X size={24} /></button>
                            <img src={selectedCert.certImage} alt={selectedCert.title} style={{ width: '100%', borderRadius: '12px' }} />
                            <div className="modal-cert-footer">
                                <h3>{selectedCert.title}</h3>
                                <p>{selectedCert.issuer} • {selectedCert.date}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bulletproof Full-Page Study Sync AI Showcase */}
            {showProject && (
                <StudySyncShowcase onClose={() => setShowProject(false)} />
            )}
        </section>
    );
};

export default Certifications;
