import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Trophy, Rocket, Bot, ExternalLink, Cpu, Star, Mic, Award, Gift, X, Maximize2 } from 'lucide-react';
import ParallaxTitle from './ParallaxTitle';

const certificateData = [
    {
        id: 1,
        title: "Best Project of Our Campus",
        issuer: "NIAT × Base44 Hackathon",
        date: "April 2024",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        certImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
        description: "Awarded the Top Prize for \"Study Sync AI\" by team AlphaCoders. Recognized as the most innovative project among all campus entries.",
        tech: ["MERN", "AI APIs"],
        icon: <Trophy size={18} />,
        featured: true
    },
    {
        id: 2,
        title: "AI Agents 201 Hands-On",
        issuer: "NxTWave / NIAT",
        date: "April 2026",
        image: "https://media.licdn.com/dms/image/v2/D5622AQFAMNmdbj1uFw/feedshare-shrink_800/B56Z2kLUrHIUAc-/0/1776575925207?e=1779321600&v=beta&t=6hC04egWbGDLqEGFfs76eUJsp3J-VyQomabavJqOmU4",
        certImage: "https://media.licdn.com/dms/image/v2/D5622AQFAMNmdbj1uFw/feedshare-shrink_800/B56Z2kLUrHIUAc-/0/1776575925207?e=1779321600&v=beta&t=6hC04egWbGDLqEGFfs76eUJsp3J-VyQomabavJqOmU4",
        description: "Participated in building AI-driven solutions and gained hands-on experience solving real-world problems using AI Agents.",
        tech: ["AI Agents", "Prompt Engineering"],
        icon: <Bot size={18} />
    },
    {
        id: 3,
        title: "Build for Telangana Hackathon",
        issuer: "NIAT / NxTWave",
        date: "June 2025",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
        certImage: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200",
        description: "Participated in a state-level hackathon hosted exclusively for NIAT students to build impactful solutions for Telangana.",
        tech: ["Web Development", "Problem Solving"],
        icon: <Rocket size={18} />
    },
    {
        id: 4,
        title: "Build Your Own Buddy",
        issuer: "NIAT Robotics",
        date: "2024",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
        certImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200",
        description: "Completed the hands-on workshop focused on building functional robotic buddies through active participation.",
        tech: ["Robotics", "Hardware"],
        icon: <Cpu size={18} />
    },
    {
        id: 5,
        title: "Special Recognition",
        issuer: "NIAT Management",
        date: "2024",
        image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800",
        certImage: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200",
        description: "Received special appreciation and gifts from the NIAT management for outstanding technical contributions.",
        tech: ["Leadership", "Innovation"],
        icon: <Gift size={18} />
    },
    {
        id: 6,
        title: "Autonomous Mobility 101",
        issuer: "NxTWave / NIAT",
        date: "March 2025",
        image: "https://images.unsplash.com/photo-1555624106-22e965f3f019?auto=format&fit=crop&q=80&w=800",
        certImage: "https://images.unsplash.com/photo-1555624106-22e965f3f019?auto=format&fit=crop&q=80&w=1200",
        description: "Attended the workshop on autonomous robotics and mobility hosted by the VP of Robotics at NxTWave.",
        tech: ["Robotics", "AI"],
        icon: <Star size={18} />
    },
    {
        id: 7,
        title: "From Code to CEO Journey",
        issuer: "Ameet Ayare / NIAT",
        date: "Feb 2025",
        image: "https://images.unsplash.com/photo-1478737270239-2fccd2c40c4a?auto=format&fit=crop&q=80&w=800",
        certImage: "https://images.unsplash.com/photo-1478737270239-2fccd2c40c4a?auto=format&fit=crop&q=80&w=1200",
        description: "Gained insights into tech leadership and entrepreneurship from the CEO of Actlogica.",
        tech: ["Entrepreneurship", "Strategy"],
        icon: <Mic size={18} />
    },
    {
        id: 8,
        title: "Generative AI for Developers",
        issuer: "NxTWave / IBM",
        date: "2024",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        certImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200",
        description: "Mastered Generative AI strategy, ethical AI implementation, and building AI-powered applications with IBM.",
        tech: ["Generative AI", "IBM Cloud"],
        icon: <Award size={18} />
    }
];

const AwardCard = ({ item, index, onSelect }) => {
    const cardRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e) => {
        if (isMobile || !cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY: isMobile ? 0 : rotateY,
                rotateX: isMobile ? 0 : rotateX,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.1 
            }}
            whileHover={!isMobile ? { y: -10, scale: 1.02 } : {}}
            className={`award-card-v2 glass ${item.featured ? 'featured-v2' : ''} interactive`}
        >
            <div className="award-image-container" onClick={() => onSelect(item)}>
                <img src={item.image} alt={item.title} className="award-img-v2" />
                <div className="award-icon-badge-v2" style={{ transform: isMobile ? "none" : "translateZ(30px)" }}>
                    {item.icon}
                </div>
                {item.featured && (
                    <div className="award-ribbon-v2">
                        <span>TOP PRIZE</span>
                    </div>
                )}
                <div className="maximize-overlay-v2">
                    <Maximize2 size={isMobile ? 20 : 24} />
                </div>
            </div>
            
            <div className="award-content-v2" style={{ transform: isMobile ? "none" : "translateZ(20px)" }}>
                <div className="award-meta-v2">
                    <span className="award-date-v2">{item.date}</span>
                    <span className="meta-sep"> • </span>
                    <span className="award-issuer-v2">{item.issuer}</span>
                </div>
                
                <h3 className="award-title-v2">{item.title}</h3>
                
                <p className="award-desc-v2">{item.description}</p>
                
                <div className="award-tech-v2">
                    {item.tech.map(t => <span key={t} className="tech-tag-v2">{t}</span>)}
                </div>

                <div className="award-footer-v2">
                    <button onClick={() => onSelect(item)} className="view-cert-v2 interactive">
                        View Certificate <ExternalLink size={14} className="link-icon" />
                    </button>
                </div>
            </div>
            {!isMobile && <div className="card-shine-effect"></div>}
        </motion.div>
    );
};

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <section id="certifications" className="section certifications">
            <div className="container">
                <ParallaxTitle 
                    title="Awards & Certifications" 
                    subTitle="Recognition for innovation, problem-solving, and technical excellence." 
                />

                <div className="awards-grid-premium" style={{ perspective: "1000px" }}>
                    {certificateData.map((item, index) => (
                        <AwardCard 
                            key={item.id} 
                            item={item} 
                            index={index} 
                            onSelect={setSelectedCert} 
                        />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedCert && (
                    <motion.div 
                        className="cert-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div 
                            className="cert-modal-content glass"
                            initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0.5, opacity: 0, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close-btn" onClick={() => setSelectedCert(null)}>
                                <X size={24} />
                            </button>
                            <div className="modal-cert-image-container">
                                <img src={selectedCert.certImage} alt={selectedCert.title} className="modal-cert-img" />
                            </div>
                            <div className="modal-cert-footer">
                                <h3>{selectedCert.title}</h3>
                                <p>{selectedCert.issuer} • {selectedCert.date}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certifications;
