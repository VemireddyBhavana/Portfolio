import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';
import ProjectModal from './ProjectModal';
import ParallaxTitle from './ParallaxTitle';
import AnimatedText from './AnimatedText';

const projects = [
    {
        id: 'Nexus OS',
        title: 'Nexus OS',
        subtitle: 'A futuristic dashboard with real-time data visualization and glassmorphism UI.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
        tags: ['React', 'Three.js', 'CSS3'],
        desc: 'A high-performance cloud dashboard featuring real-time data streaming and glassmorphism design patterns.',
        link: '/nexus'
    },
    {
        id: 'Aether VR',
        title: 'Aether VR',
        subtitle: 'Immersive 3D landing page for a fictional VR brand featuring interactive shaders.',
        image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800',
        tags: ['Three.js', 'GSAP', 'HTML5'],
        desc: 'An experimental landing page showcasing advanced WebGL shaders and immersive 3D navigation.',
        link: '/aether'
    },
    {
        id: 'Lumina SaaS',
        title: 'Lumina SaaS',
        subtitle: 'Premium SaaS landing page with dark mode and smooth scroll animations.',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
        tags: ['Next.js', 'Tailwind', 'Framer'],
        desc: 'A modern enterprise platform structure with focus on performance, scalability, and UX.',
        link: '/lumina'
    },
    {
        id: 'Sentinel AI',
        title: 'Sentinel AI',
        subtitle: 'Machine learning operations dashboard with predictive analytics and alerting.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        tags: ['React', 'Python', 'D3.js'],
        desc: 'An intelligent monitoring interface for distributed AI models built with beautiful dark aesthetics.',
        link: '/sentinel'
    }
];

const ProjectCard = ({ project, index, onSelect }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
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
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="project-card-container interactive"
        >
            <div className="project-card-inner glass" style={{ transform: "translateZ(50px)" }}>
                <div className="project-image-wrapper">
                    <img src={project.image} alt={project.title} className="project-inner-img" />
                    <div className="project-image-overlay">
                        <button className="view-project-btn" onClick={() => onSelect(project)}>
                            View Project Details
                        </button>
                    </div>
                </div>
                <div className="project-info-premium" style={{ transform: "translateZ(30px)" }}>
                    <div className="project-meta">
                        <Layers size={14} className="meta-icon" />
                        <span>Featured Project</span>
                    </div>
                    <AnimatedText 
                        text={project.title} 
                        type="h3" 
                        direction="left"
                        delay={0.1}
                    />
                    <AnimatedText 
                        text={project.subtitle} 
                        type="p" 
                        direction="left"
                        delay={0.3}
                    />
                    <div className="project-tags-premium">
                        {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                    </div>
                    <div className="project-links-premium">
                        <a href={project.link} className="project-link-icon interactive"><ExternalLink size={20} /></a>
                        <a href="#" className="project-link-icon interactive"><Github size={20} /></a>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            id="projects" 
            className="section projects"
        >
            <div className="container">
                <ParallaxTitle title="Selected Works" subTitle="Handcrafted Digital Experiences" />
                
                <motion.div 
                    className="projects-grid-premium"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={project.id} 
                            project={project} 
                            index={index} 
                            onSelect={setSelectedProject} 
                        />
                    ))}
                </motion.div>
            </div>

            <ProjectModal 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        </motion.section>
    );
};

export default Projects;
