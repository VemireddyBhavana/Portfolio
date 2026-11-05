import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, FileText, ArrowRight, MessageCircle } from 'lucide-react';
import './FloatingWidgets.css';

// WhatsApp icon SVG component
const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.57c.12.17 1.75 2.67 4.24 3.75.59.26 1.05.41 1.41.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.31z" />
    </svg>
);

// Intelligent response generator for BhavanaAI
const getAIResponse = (userQuery) => {
    const q = userQuery.toLowerCase().trim();

    // 1. Greetings
    if (/^(hi|hello|hey|hola|greetings|good morning|good afternoon|good evening)\b/.test(q)) {
        return {
            text: "Hello! 👋 I'm Bhavana's personal AI assistant. You can ask me anything about her skills, projects, education, services, or how to contact her!",
            actions: ['resume', 'contact']
        };
    }

    // 2. Who is Bhavana / About
    if (q.includes('who is') || q.includes('about bhavana') || q.includes('tell me about') || q.includes('who are you')) {
        return {
            text: "Vemireddy Bhavana is an aspiring Full-Stack Web Developer and UI/UX Designer passionate about crafting scalable web applications, 3D interactive experiences, and high-performance digital products.",
            actions: ['resume', 'contact']
        };
    }

    // 3. Projects
    if (q.includes('project') || q.includes('portfolio') || q.includes('medinova') || q.includes('food munch') || q.includes('work') || q.includes('app')) {
        return {
            text: "Bhavana has built several impactful projects including:\n• MediNova (AI-powered telemedicine & doctor booking)\n• Food Munch (Dynamic responsive restaurant platform)\n• 3D Interactive Portfolio (WebGL particle canvas with Three.js)\n• Study Sync AI (Hackathon winner at NIAT x Base44)\n• Lumina SaaS & Sentinel AI.",
            actions: ['projects', 'contact']
        };
    }

    // 4. Skills & Tech Stack
    if (q.includes('skill') || q.includes('tech') || q.includes('stack') || q.includes('react') || q.includes('node') || q.includes('language') || q.includes('python')) {
        return {
            text: "Bhavana's core tech stack covers:\n• Frontend: React, Vite, Three.js, Tailwind CSS, JavaScript (ES6+), HTML5/CSS3\n• Backend & Database: Node.js, Express, MongoDB, REST APIs, Supabase\n• Tools & Design: Figma, Git/GitHub, Framer Motion, AI Integrations.",
            actions: ['resume', 'contact']
        };
    }

    // 5. Education & College
    if (q.includes('education') || q.includes('college') || q.includes('degree') || q.includes('study') || q.includes('nxtwave') || q.includes('bits') || q.includes('niat')) {
        return {
            text: "Bhavana is pursuing:\n1. NxtWave of Innovation in Advanced Technologies (2024 - 2028) — Computer Science with Data Science & AI Specialization.\n2. BITS Pilani, Hyderabad Campus (2024 - 2027) — B.Sc. in Computer Science.",
            actions: ['resume']
        };
    }

    // 6. Services & Freelancing
    if (q.includes('service') || q.includes('offer') || q.includes('hire') || q.includes('freelance') || q.includes('meta ads') || q.includes('ui/ux') || q.includes('website')) {
        return {
            text: "Bhavana offers specialized digital services:\n• Web Development (Portfolio, Business & React Apps)\n• UI/UX & Figma Design Systems\n• Meta Ads & Growth Strategy\n• Content & Script Writing\n• Event Management & Hackathon Ops\n• Product Strategy & MVP Scoping.",
            actions: ['contact', 'whatsapp']
        };
    }

    // 7. Resume / CV
    if (q.includes('resume') || q.includes('cv') || q.includes('curriculum')) {
        return {
            text: "You can view and download Bhavana's official resume using the button below!",
            actions: ['resume']
        };
    }

    // 8. Contact & Phone / WhatsApp / Email
    if (q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('whatsapp') || q.includes('email') || q.includes('reach') || q.includes('call')) {
        return {
            text: "You can reach Bhavana directly via:\n• WhatsApp / Phone: +91 9014086453\n• Contact Form on this site (replies within 24 hours).",
            actions: ['whatsapp', 'contact']
        };
    }

    // 9. Pricing / Availability
    if (q.includes('price') || q.includes('cost') || q.includes('rate') || q.includes('available') || q.includes('charge')) {
        return {
            text: "Pricing and timelines depend on project scope and requirements. Feel free to send an inquiry or message on WhatsApp for a quick estimate!",
            actions: ['contact', 'whatsapp']
        };
    }

    // Default Fallback
    return {
        text: `Thanks for asking! Bhavana is always open to new opportunities, freelance projects, and collaborations. Would you like to review her resume, explore her services, or connect on WhatsApp?`,
        actions: ['resume', 'contact', 'whatsapp']
    };
};

const FloatingWidgets = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'bot',
            text: "Hi! I'm Bhavana's AI assistant. Ask me anything about her skills, projects, education, services, or collaboration!",
            actions: ['resume', 'contact']
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef(null);

    // Auto-scroll chat to latest message
    useEffect(() => {
        if (isChatOpen && chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isChatOpen]);

    // Direct WhatsApp redirect to +91 9014086453
    const handleWhatsAppClick = (e) => {
        e.preventDefault();
        const phoneNumber = '919014086453';
        const text = encodeURIComponent("Hi Bhavana, I came across your portfolio and would like to connect!");
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
    };

    // Open Contact Modal & Redirect to Get In Touch
    const handleOpenContactModal = () => {
        setIsChatOpen(false);
        // Scroll to the Get In Touch section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        // Open the Inquiry Form Modal
        setTimeout(() => {
            window.dispatchEvent(new CustomEvent('open-inquiry-modal', { detail: { service: 'Web Development' } }));
        }, 350);
    };

    // Open Resume
    const handleOpenResume = () => {
        window.open('/resume.pdf', '_blank');
    };

    // Scroll to projects
    const handleScrollToProjects = () => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        setIsChatOpen(false);
    };

    // Submit question in chatbot
    const handleSendMessage = (e) => {
        e.preventDefault();
        const query = inputValue.trim();
        if (!query) return;

        // 1. Add user message
        const userMsg = {
            id: Date.now(),
            sender: 'user',
            text: query
        };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        // 2. Generate intelligent AI bot response
        setTimeout(() => {
            const botResponse = getAIResponse(query);
            const botMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: botResponse.text,
                actions: botResponse.actions
            };
            setMessages(prev => [...prev, botMsg]);
        }, 350);
    };

    return (
        <>
            {/* 1. WhatsApp Float Button — Bottom Left (+91 9014086453) */}
            <a 
                href="https://wa.me/919014086453"
                onClick={handleWhatsAppClick}
                className="whatsapp-float-btn"
                aria-label="Chat with Bhavana on WhatsApp"
            >
                <div className="whatsapp-icon-wrap">
                    <WhatsAppIcon />
                </div>
                <span className="whatsapp-label">WhatsApp</span>
            </a>

            {/* 2. BhavanaAI Interactive Chat Widget — Bottom Right */}
            <div className="chat-widget-container">
                <AnimatePresence>
                    {isChatOpen && (
                        <motion.div 
                            className="chat-panel"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                        >
                            {/* Chat Header */}
                            <div className="chat-panel-header">
                                <div className="chat-header-left">
                                    <div className="chat-avatar">
                                        <Bot size={22} color="#ffffff" />
                                    </div>
                                    <div className="chat-header-info">
                                        <span className="chat-name">BhavanaAI</span>
                                        <div className="chat-status-wrap">
                                            <span className="chat-status-dot" />
                                            <span className="chat-status">Assistant • Online</span>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    className="chat-close-btn"
                                    onClick={() => setIsChatOpen(false)}
                                    aria-label="Close chat"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Chat Messages Body */}
                            <div className="chat-body">
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`chat-bubble-row ${msg.sender}`}>
                                        {msg.sender === 'user' ? (
                                            <div className="chat-user-bubble">
                                                {msg.text}
                                            </div>
                                        ) : (
                                            <>
                                                <div className="chat-bubble">
                                                    {msg.text}
                                                </div>

                                                {/* Action Buttons */}
                                                {msg.actions && msg.actions.length > 0 && (
                                                    <div className="chat-action-row">
                                                        {msg.actions.includes('resume') && (
                                                            <button 
                                                                className="chat-action-btn"
                                                                onClick={handleOpenResume}
                                                            >
                                                                <FileText size={13} />
                                                                <span>Resume</span>
                                                            </button>
                                                        )}
                                                        {msg.actions.includes('contact') && (
                                                            <button 
                                                                className="chat-action-btn orange"
                                                                onClick={handleOpenContactModal}
                                                            >
                                                                <span>Let's Talk</span>
                                                                <ArrowRight size={13} />
                                                            </button>
                                                        )}
                                                        {msg.actions.includes('whatsapp') && (
                                                            <button 
                                                                className="chat-action-btn green"
                                                                onClick={handleWhatsAppClick}
                                                            >
                                                                <MessageCircle size={13} />
                                                                <span>WhatsApp</span>
                                                            </button>
                                                        )}
                                                        {msg.actions.includes('projects') && (
                                                            <button 
                                                                className="chat-action-btn"
                                                                onClick={handleScrollToProjects}
                                                            >
                                                                <span>View Work</span>
                                                                <ArrowRight size={13} />
                                                            </button>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Real Chat Input Form at Bottom */}
                            <form className="chat-input-form" onSubmit={handleSendMessage}>
                                <input 
                                    type="text" 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask anything about Bhavana..."
                                    className="chat-text-input"
                                    autoFocus={false}
                                />
                                <button 
                                    type="submit" 
                                    className="chat-send-btn"
                                    disabled={!inputValue.trim()}
                                    aria-label="Send message"
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* FAB Trigger Button */}
                <button 
                    className="chat-fab"
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    aria-label="Toggle BhavanaAI assistant"
                >
                    {isChatOpen ? <X size={24} color="#ffffff" /> : <Bot size={26} color="#ffffff" />}
                </button>
            </div>
        </>
    );
};

export default FloatingWidgets;
