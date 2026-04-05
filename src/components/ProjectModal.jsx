import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, ExternalLink, Github, Terminal } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
    const navigate = useNavigate();

    const handleVisitLive = (e) => {
        e.preventDefault();
        onClose();
        navigate(project.link);
    };

    return (
        <AnimatePresence>
            {project && (
                <motion.div 
                    className="modal-overlay-premium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div 
                        className="modal-container-premium glass"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="close-modal-premium interactive" onClick={onClose}>
                            <X size={24} />
                        </button>
                        
                        <div className="modal-inner-premium">
                            <div className="modal-header-premium">
                                <span className="modal-badge-premium">CASE STUDY</span>
                                <h2>{project.title}</h2>
                            </div>
                            
                            <div className="modal-body-premium">
                                <p>{project.desc}</p>
                                
                                <div className="modal-tech-stack">
                                    <h4>Tech Stack</h4>
                                    <div className="tech-tags-premium">
                                        {project.tags.map(tag => (
                                            <span key={tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="modal-status-premium">
                                    <Terminal size={14} />
                                    <span>Deployment Status: <span className="status-online">Online</span></span>
                                </div>
                            </div>
                            
                            <div className="modal-actions-premium">
                                <button className="btn btn-primary interactive" onClick={handleVisitLive}>
                                    Live Preview <ExternalLink size={18} className="btn-icon" />
                                </button>
                                <a href="#" className="btn btn-outline interactive">
                                    Source Code <Github size={18} className="btn-icon" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectModal;
