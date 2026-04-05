import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Code, GraduationCap, Briefcase, 
    FileCode, Paintbrush, Braces, 
    Database, Boxes, Sparkles, BrainCircuit 
} from 'lucide-react';
import ParallaxTitle from './ParallaxTitle';

const skills = [
    { icon: <FileCode size={20} />, label: 'HTML' },
    { icon: <Paintbrush size={20} />, label: 'CSS' },
    { icon: <Braces size={20} />, label: 'JavaScript' },
    { icon: <Database size={20} />, label: 'SQL' },
    { icon: <Database size={20} />, label: 'MongoDB' },
    { icon: <Boxes size={20} />, label: 'MERN Stack' },
    { icon: <Sparkles size={20} />, label: 'Gen AI' },
    { icon: <BrainCircuit size={20} />, label: 'LLMs' }
];

const Skills = () => {
    const [activeTab, setActiveTab] = useState('skills');

    const tabs = [
        { id: 'skills', label: 'Skills', icon: <Code size={18} /> },
        { id: 'education', label: 'Education', icon: <GraduationCap size={18} /> },
        { id: 'experience', label: 'Workshops', icon: <Briefcase size={18} /> },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const tabContent = {
        skills: (
            <motion.div 
                className="skills-tab-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <div className="skills-grid-pivot">
                    {skills.map((skill) => (
                        <motion.div 
                            key={skill.label} 
                            className="skill-card-pivot glass interactive"
                            variants={itemVariants}
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
                className="timeline-pivot"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <motion.div className="timeline-item-pivot glass" variants={itemVariants}>
                    <div className="timeline-date">2024 - 2028</div>
                    <h3>NxtWave Institute of Advanced Technologies (NIAT)</h3>
                    <p>
                        Computer Science Program in Data Science and Artificial Intelligence Specialization.
                    </p>
                </motion.div>

                <motion.div className="timeline-item-pivot glass" variants={itemVariants}>
                    <div className="timeline-date">2024 - 2027</div>
                    <h3>BITS Pilani, Hyderabad Campus</h3>
                    <p>
                        Bachelor of Science (BSc) in Computer Science.
                    </p>
                </motion.div>
            </motion.div>
        ),

        experience: (
            <motion.div 
                className="timeline-pivot"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <motion.div className="timeline-item-pivot glass" variants={itemVariants}>
                    <h3>Study Sync AI</h3>
                    <p>
                        Developed an AI-based learning assistant application to support students. 
                        Focused on usability, structured learning, and intelligent response generation.
                    </p>
                </motion.div>

                <motion.div className="timeline-item-pivot glass" variants={itemVariants}>
                    <h3>Telangana Hackathon</h3>
                    <p>
                        Participated in a state-level hackathon focused on AI-driven solutions. 
                        Worked with tools like Vercel V0, Base44, and OpenAI APIs to build applications.
                    </p>
                </motion.div>

                <motion.div className="timeline-item-pivot glass" variants={itemVariants}>
                    <h3>Generative AI Workshop</h3>
                    <p>
                        Gained hands-on experience in Generative AI, focusing on prompt design, 
                        content generation, and building AI-powered applications.
                    </p>
                </motion.div>
            </motion.div>
        )
    };

    return (
        <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
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