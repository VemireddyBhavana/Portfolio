import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronDown, 
    ChevronUp, 
    ArrowRight, 
    Globe, 
    Palette, 
    Layers, 
    TrendingUp, 
    Video, 
    Sparkles, 
    Calendar 
} from 'lucide-react';
import './Services.css';

const categoriesData = [
    {
        id: 'cat-01',
        categoryNumber: 'CATEGORY 01',
        servicesCount: '3 Services',
        title: 'DIGITAL',
        description: 'Modern, high-performance web applications, intuitive UI/UX design systems, and structured digital product consulting.',
        tags: [
            'Web Development',
            'UI/UX & Figma Design',
            'Product Strategy & Consulting'
        ],
        subServices: [
            {
                id: 'web-dev',
                title: 'Web Development',
                icon: <Globe size={22} strokeWidth={2} />,
                subtitle: 'Modern, responsive websites built for performance, conversion, and growth.',
                bullets: [
                    'Portfolio Websites',
                    'Business Websites',
                    'Startup Landing Pages',
                    'Event Websites',
                    'Admin Dashboards',
                    'Custom Web Applications'
                ],
                techTags: ['React', 'Next.js', 'Supabase', 'Tailwind CSS', 'Node.js']
            },
            {
                id: 'ui-ux',
                title: 'UI/UX & Figma Design',
                icon: <Palette size={22} strokeWidth={2} />,
                subtitle: 'Designs focused on clarity, usability, visual aesthetics, and user conversion.',
                bullets: [
                    'Website UI Design',
                    'Mobile App UI',
                    'Dashboard Design',
                    'Landing Pages',
                    'Wireframes',
                    'Interactive Prototypes',
                    'Design Systems'
                ],
                techTags: ['Figma', 'Wireframing', 'Design Systems', 'Interactive Prototypes', 'User Experience']
            },
            {
                id: 'product-strategy',
                title: 'Product Strategy & Consulting',
                icon: <Layers size={22} strokeWidth={2} />,
                subtitle: 'Helping turn raw ideas into structured, scalable digital products and workflows.',
                bullets: [
                    'MVP Planning',
                    'Feature Prioritization',
                    'Product Roadmaps',
                    'User Journey Mapping',
                    'Market Research',
                    'Product Documentation'
                ],
                techTags: ['MVP Planning', 'Product Roadmaps', 'User Flows', 'Consulting']
            }
        ]
    },
    {
        id: 'cat-02',
        categoryNumber: 'CATEGORY 02',
        servicesCount: '4 Services',
        title: 'GROWTH & CONTENT',
        description: 'Audience-first social media growth frameworks, high-retention video scripting, and distinct brand identity systems.',
        tags: [
            'Social Media Strategy',
            'Content & Reels Script Writing',
            'Creative Design & Branding',
            'Meta Ads'
        ],
        subServices: [
            {
                id: 'social-strategy',
                title: 'Social Media Strategy',
                icon: <TrendingUp size={22} strokeWidth={2} />,
                subtitle: 'Audience-first social media growth frameworks to increase reach and brand trust.',
                bullets: [
                    'Audience Growth Frameworks',
                    'Channel Optimization & Positioning',
                    'Viral Hook Systems & Formats',
                    'Content Calendars & Consistency',
                    'Analytics & Engagement Audits'
                ],
                techTags: ['Growth Frameworks', 'Organic Scaling', 'Audience Analytics']
            },
            {
                id: 'script-writing',
                title: 'Content & Reels Script Writing',
                icon: <Video size={22} strokeWidth={2} />,
                subtitle: 'High-retention short-form video scripts and engaging copy designed to hold attention.',
                bullets: [
                    'Instagram Reel Scripts',
                    'YouTube Shorts & TikTok',
                    'Promotional & Ad Scripts',
                    'Brand Storytelling & Narrative',
                    'Product Launch Copy & Captions'
                ],
                techTags: ['Viral Scripting', 'Storytelling Copy', 'Shorts & Reels', 'Brand Voice']
            },
            {
                id: 'creative-branding',
                title: 'Creative Design & Branding',
                icon: <Sparkles size={22} strokeWidth={2} />,
                subtitle: 'Distinctive visual systems that make a brand feel consistent and memorable.',
                bullets: [
                    'Social Media Creatives',
                    'Event Posters & Flyers',
                    'Banner & Digital Assets',
                    'Brand Guidelines & Typography',
                    'Presentation & Pitch Decks'
                ],
                techTags: ['Brand Guidelines', 'Social Creatives', 'Poster Design', 'Pitch Decks']
            },
            {
                id: 'meta-ads',
                title: 'Meta Ads',
                icon: <TrendingUp size={22} strokeWidth={2} />,
                subtitle: 'High-conversion Facebook & Instagram ad campaigns designed for measurable reach and ROI.',
                bullets: [
                    'Campaign Strategy & Funnel Setup',
                    'Audience Research & Laser Targeting',
                    'Ad Copy & High-Converting Creatives',
                    'A/B Split Testing & Budget Optimization',
                    'ROAS Tracking & Analytics Reporting'
                ],
                techTags: ['Meta Ads Manager', 'Facebook Ads', 'Instagram Campaigns', 'A/B Testing']
            }
        ]
    },
    {
        id: 'cat-03',
        categoryNumber: 'CATEGORY 03',
        servicesCount: '1 Service',
        title: 'EXPERIENCES',
        description: 'End-to-end hackathon operations, tech symposiums, workshops, and smooth campus fest logistics.',
        tags: [
            'Event Management'
        ],
        subServices: [
            {
                id: 'event-management',
                title: 'Event Management',
                icon: <Calendar size={22} strokeWidth={2} />,
                subtitle: 'Organized event experiences supported by clear planning and smooth execution.',
                bullets: [
                    'College Events & Tech Symposiums',
                    'Hackathon Operations & Mentorship',
                    'Workshops & Tech Conferences',
                    'Guest & Speaker Management',
                    'Logistics & Program Coordination'
                ],
                techTags: ['Hackathons', 'Event Operations', 'Guest Management', 'Workshops']
            }
        ]
    }
];

const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
};

const Services = () => {
    // Keep track of which categories are currently expanded
    const [expandedCategories, setExpandedCategories] = useState({});

    const toggleCategory = (catId) => {
        setExpandedCategories(prev => ({
            ...prev,
            [catId]: !prev[catId]
        }));
    };

    const handleInquire = (serviceTitle) => {
        window.dispatchEvent(new CustomEvent('open-inquiry-modal', { detail: { service: serviceTitle } }));
    };

    return (
        <motion.section 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            id="services" 
            className="section work-with-me-section"
        >
            <div className="container">
                {/* Section Header */}
                <div className="work-with-me-header">
                    <div className="services-pill-badge">01 — SERVICES</div>
                    <h2 className="services-main-title">Work With Me</h2>
                    <p className="services-main-subtitle">
                        I help startups, creators, businesses, and student communities build impactful digital products, brand growth, and events.
                    </p>
                </div>

                {/* 3 Categories Grid */}
                <div className="work-categories-grid">
                    {categoriesData.map((category) => {
                        const isExpanded = !!expandedCategories[category.id];

                        return (
                            <motion.div 
                                key={category.id}
                                className="category-card"
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.1 }}
                            >
                                <div className="category-card-main">
                                    {/* Top Bar */}
                                    <div className="category-card-top-bar">
                                        <span className="category-badge">{category.categoryNumber}</span>
                                        <span className="category-count">{category.servicesCount}</span>
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="category-title">{category.title}</h3>
                                    <p className="category-description">{category.description}</p>

                                    {/* Tag Chips */}
                                    <div className="category-tags">
                                        {category.tags.map((tag, idx) => (
                                            <span key={idx} className="service-tag-chip">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Toggle Button: Explore Services / Collapse Services */}
                                <div className="category-card-footer">
                                    <button 
                                        className={`explore-services-btn ${isExpanded ? 'is-active' : ''}`}
                                        onClick={() => toggleCategory(category.id)}
                                        aria-expanded={isExpanded}
                                    >
                                        <span>{isExpanded ? 'Collapse Services' : 'Explore Services'}</span>
                                        {isExpanded ? (
                                            <ChevronUp size={20} className="explore-chevron" />
                                        ) : (
                                            <ChevronDown size={20} className="explore-chevron" />
                                        )}
                                    </button>

                                    {/* Smooth Accordion Drawer for Sub-Services */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div 
                                                className="expanded-services-stack"
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                                            >
                                                {category.subServices.map((sub) => (
                                                    <div key={sub.id} className="sub-service-card">
                                                        {/* Header with icon badge and title */}
                                                        <div className="sub-service-header">
                                                            <div className="sub-service-icon-badge">
                                                                {sub.icon}
                                                            </div>
                                                            <h4 className="sub-service-title">{sub.title}</h4>
                                                        </div>

                                                        {/* Subtitle */}
                                                        <p className="sub-service-subtitle">{sub.subtitle}</p>

                                                        {/* Bullets with orange dots */}
                                                        <ul className="sub-service-bullets">
                                                            {sub.bullets.map((bullet, bIdx) => (
                                                                <li key={bIdx} className="sub-service-bullet-item">
                                                                    <span>{bullet}</span>
                                                                </li>
                                                            ))}
                                                        </ul>

                                                        {/* Tech/Tool tags */}
                                                        {sub.techTags && sub.techTags.length > 0 && (
                                                            <div className="sub-service-tech-tags">
                                                                {sub.techTags.map((tech, tIdx) => (
                                                                    <span key={tIdx} className="tech-tag-chip">
                                                                        {tech}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {/* Inquire Button */}
                                                        <button 
                                                            className="sub-service-inquire-btn"
                                                            onClick={() => handleInquire(sub.title)}
                                                        >
                                                            <span>Inquire for {sub.title}</span>
                                                            <ArrowRight size={16} className="inquire-arrow" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.section>
    );
};

export default Services;
