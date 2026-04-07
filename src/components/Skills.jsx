import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Code, GraduationCap, Briefcase, 
    FileCode, Paintbrush, Braces, 
    Database, Boxes, Sparkles, BrainCircuit 
} from 'lucide-react';
import ParallaxTitle from './ParallaxTitle';
import Magnetic from './Magnetic';
import AnimatedText from './AnimatedText';

const skills = [
    { icon: <FileCode size={22} />, label: 'HTML' },
    { icon: <Paintbrush size={22} />, label: 'CSS' },
    { icon: <Braces size={22} />, label: 'JavaScript' },
    { icon: <Database size={22} />, label: 'SQL' },
    { icon: <Database size={22} />, label: 'MongoDB' },
    { icon: <Boxes size={22} />, label: 'MERN Stack' },
    { icon: <Sparkles size={22} />, label: 'Gen AI' },
    { icon: <BrainCircuit size={22} />, label: 'LLMs' }
];

const Skills = () => {
    const [activeTab, setActiveTab] = useState('skills');

    const tabs = [
        { id: 'skills', label: 'Skills', icon: <Code size={18} /> },
        { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
        { id: 'experience', label: 'Workshops', icon: <Briefcase size={18} /> },
    ];

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        exit: {
            opacity: 0,
            scale: 1.05,
            transition: {
                staggerChildren: 0.02,
                staggerDirection: -1,
                duration: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.7, filter: 'blur(10px)' },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            filter: 'blur(0px)',
            transition: { 
                type: 'spring',
                damping: 15,
                stiffness: 150
            } 
        },
        exit: {
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 }
        }
    };

    const cardFloatingAnimation = (index) => ({
        y: [0, -10, 0],
        transition: {
            duration: 4 + (index % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1
        }
    });

    const tabContent = {
        skills: (
            <motion.div 
                key="skills-tab"
                className="skills-tab-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="skills-grid-pivot">
                    {skills.map((skill, index) => (
                        <motion.div 
                            key={skill.label} 
                            className="skill-card-pivot glass interactive"
                            variants={itemVariants}
                            animate={cardFloatingAnimation(index)}
                            whileHover={{ 
                                scale: 1.1, 
                                y: -15,
                                boxShadow: "0 20px 40px rgba(0, 245, 255, 0.2)",
                                borderColor: "var(--accent-color)"
                            }}
                            style={{ willChange: 'transform' }}
                        >
                            <div className="skill-icon-pivot">{skill.icon}</div>
                            <span>{skill.label}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        ),

        education: (
            <motion.div 
                key="education-tab"
                className="timeline-pivot"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="timeline-item-pivot glass">
                    <div className="timeline-date">2024 - 2028</div>
                    <h3>NxtWave Institute of Advanced Technologies (NIAT)</h3>
                    <AnimatedText 
                        text="Computer Science Program in Data Science and Artificial Intelligence Specialization."
                        direction="bottom"
                        delay={0.1}
                    />
                </div>

                <div className="timeline-item-pivot glass">
                    <div className="timeline-date">2024 - 2027</div>
                    <h3>BITS Pilani, Hyderabad Campus</h3>
                    <AnimatedText 
                        text="Bachelor of Science (BSc) in Computer Science."
                        direction="bottom"
                        delay={0.3}
                    />
                </div>
            </motion.div>
        ),

        experience: (
            <motion.div 
                key="experience-tab"
                className="timeline-pivot"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="timeline-item-pivot glass">
                    <h3>Study Sync AI</h3>
                    <AnimatedText 
                        text="Developed an AI-based learning assistant application to support students. Focused on usability, structured learning, and intelligent response generation."
                        direction="bottom"
                        delay={0.1}
                    />
                </div>

                <div className="timeline-item-pivot glass">
                    <h3>Telangana Hackathon</h3>
                    <AnimatedText 
                        text="Participated in a state-level hackathon focused on AI-driven solutions. Worked with tools like Vercel V0, Base44, and OpenAI APIs to build applications."
                        direction="bottom"
                        delay={0.3}
                    />
                </div>

                <div className="timeline-item-pivot glass">
                    <h3>Generative AI Workshop</h3>
                    <AnimatedText 
                        text="Gained hands-on experience in Generative AI, focusing on prompt design, content generation, and building AI-powered applications."
                        direction="bottom"
                        delay={0.5}
                    />
                </div>
            </motion.div>
        )
    };

    return (
        <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            id="skills" 
            className="section skills"
        >
            <div className="container">
                <ParallaxTitle title="Superpowers" subTitle="My Technical Toolbox" />

                <div className="about-tabs-container glass mx-auto">
                    <div className="tabs-header">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab === tab.id ? 'active' : ''} interactive`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.icon}
                                <span>{tab.label}</span>
                                {activeTab === tab.id && (
                                    <motion.div className="active-tab-line" layoutId="activeTabLine" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="tab-body">
                        <AnimatePresence mode="wait">
                            {tabContent[activeTab]}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Skills;