import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Trophy, Star, Gift, Cpu, Rocket, Mic, Bot, X, Maximize2 } from 'lucide-react';
import ParallaxTitle from './ParallaxTitle';
import AnimatedText from './AnimatedText';

const achievements = [
    {
        id: 1,
        type: 'award',
        title: 'Best Project of Our Campus',
        issuer: 'NIAT × Base44 Hackathon',
        date: 'April 2024',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
        certImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
        description: 'Awarded the Top Prize for "Study Sync AI" by team AlphaCoders. Recognized as the most innovative project among all campus entries.',
        icon: <Trophy className="text-yellow-400" />,
        featured: true
    },
    {
        id: 2,
        type: 'workshop',
        title: 'AI Agents 201 Hands-On',
        issuer: 'NxtWave / NIAT',
        date: 'April 2026',
        image: 'https://images.unsplash.com/photo-1675557009875-436f595b18b8?auto=format&fit=crop&q=80&w=800',
        certImage: 'https://res.cloudinary.com/de8opipom/image/upload/v1777867628/photo_fbf76u.jpg', // Placeholder - will need your actual file
        description: 'Participated in building AI-driven solutions and gained practical experience in real-world problem solving using AI Agents.',
        icon: <Bot className="text-cyan-400" />
    },
    {
        id: 3,
        type: 'hackathon',
        title: 'Build for Telangana Hackathon',
        issuer: 'NIAT / NxtWave',
        date: 'June 2025',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
        certImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1200',
        description: 'Participated in the state-level hackathon hosted exclusively for NIAT students to build impactful solutions for Telangana.',
        icon: <Rocket className="text-orange-400" />
    },
    {
        id: 4,
        type: 'workshop',
        title: 'Build Your Own Buddy',
        issuer: 'NIAT Robotics',
        date: '2024',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
        certImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200',
        description: 'Completed the hands-on workshop focused on building functional robotic buddies through active participation.',
        icon: <Cpu className="text-green-400" />
    },
    {
        id: 5,
        type: 'award',
        title: 'Special Mention & Recognition',
        issuer: 'NIAT Management',
        date: '2024',
        image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800',
        certImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200',
        description: 'Received special appreciation and gifts from the NxtWave Institute of Advanced Technologies management for outstanding technical contributions.',
        icon: <Gift className="text-pink-400" />
    },
    {
        id: 6,
        type: 'workshop',
        title: 'Autonomous Mobility 101',
        issuer: 'NxtWave / NIAT',
        date: 'March 2025',
        image: 'https://images.unsplash.com/photo-1555624106-22e965f3f019?auto=format&fit=crop&q=80&w=800',
        certImage: 'https://images.unsplash.com/photo-1555624106-22e965f3f019?auto=format&fit=crop&q=80&w=1200',
        description: 'Attended the workshop on autonomous robotics and mobility hosted by the VP of Robotics at NxtWave.',
        icon: <Star className="text-blue-400" />
    },
    {
        id: 7,
        type: 'podcast',
        title: 'From Code to CEO Journey',
        issuer: 'Ameet Ayare / NIAT',
        date: 'Feb 2025',
        image: 'https://images.unsplash.com/photo-1478737270239-2fccd2c40c4a?auto=format&fit=crop&q=80&w=800',
        certImage: 'https://images.unsplash.com/photo-1478737270239-2fccd2c40c4a?auto=format&fit=crop&q=80&w=1200',
        description: 'Gained insights into tech leadership and entrepreneurship from the CEO of Actlogica.',
        icon: <Mic className="text-red-400" />
    },
    {
        id: 8,
        type: 'cert',
        title: 'Generative AI for Developers',
        issuer: 'NxtWave / IBM',
        date: '2024',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
        certImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200',
        description: 'Mastered Generative AI strategy, ethical AI implementation, and building AI-powered applications with IBM.',
        icon: <Award className="text-blue-400" />
    }
];

const Certifications = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8 }}
            id="certifications" 
            className="section certifications"
        >
            <div className="container">
                <ParallaxTitle title="Recognition" subTitle="Awards, Workshops & Certifications" />
                
                <div className="cert-grid-premium">
                    {achievements.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className={`achievement-card glass ${item.featured ? 'featured-award' : ''}`}
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="achievement-image-wrapper" onClick={() => setSelectedCert(item)}>
                                <img src={item.image} alt={item.title} className="achievement-img" />
                                <div className="achievement-overlay">
                                    <div className="achievement-icon-badge">
                                        {item.icon}
                                    </div>
                                    <div className="maximize-hint">
                                        <Maximize2 size={16} />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="achievement-content">
                                <div className="achievement-meta">
                                    <span className="achievement-date">{item.date}</span>
                                    <span className="achievement-issuer">{item.issuer}</span>
                                </div>
                                
                                <h3 className="achievement-title">{item.title}</h3>
                                
                                <p className="achievement-description">
                                    {item.description}
                                </p>
                                
                                <div className="achievement-footer">
                                    <motion.button 
                                        className="btn-text interactive"
                                        whileHover={{ x: 5 }}
                                        onClick={() => setSelectedCert(item)}
                                    >
                                        View Certificate <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                                    </motion.button>
                                </div>
                            </div>
                            
                            {item.featured && (
                                <div className="award-ribbon">
                                    <span>TOP PRIZE</span>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Certificate Modal */}
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
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
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
        </motion.section>
    );
};

export default Certifications;
