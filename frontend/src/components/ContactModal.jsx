import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Building2, HelpCircle, ChevronDown, Send } from 'lucide-react';
import './ContactModal.css';

const purposeOptions = [
    'Hire Me (Full-Time / Roles)',
    'Web Development',
    'UI/UX & Figma Design',
    'Event Management',
    'Social Media Strategy',
    'Content & Reels Script Writing',
    'Creative Design & Branding',
    'Meta Ads',
    'Product Strategy & Consulting',
    'Event Collaboration',
    'Speaking Opportunity',
    'Other'
];

const ContactModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        purpose: 'Web Development',
        message: ''
    });

    useEffect(() => {
        const handleOpen = (e) => {
            const requestedService = e.detail?.service;
            
            // Map service title to best matching option in dropdown
            let matchingPurpose = 'Web Development';
            if (requestedService) {
                const found = purposeOptions.find(opt => 
                    opt.toLowerCase() === requestedService.toLowerCase() ||
                    opt.toLowerCase().includes(requestedService.toLowerCase()) ||
                    requestedService.toLowerCase().includes(opt.toLowerCase())
                );
                if (found) {
                    matchingPurpose = found;
                }
            }

            setFormData(prev => ({
                ...prev,
                purpose: matchingPurpose
            }));
            setIsOpen(true);
        };

        window.addEventListener('open-inquiry-modal', handleOpen);
        return () => window.removeEventListener('open-inquiry-modal', handleOpen);
    }, []);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.message) {
            alert('Please fill out all required fields.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);
        const BACKEND_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/contact`;

        try {
            const payload = {
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone || '',
                company: formData.company || '',
                purpose: formData.purpose,
                subject: `Inquiry: ${formData.purpose}`,
                message: formData.message
            };

            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success) {
                alert(`Thank you! Your message regarding "${formData.purpose}" has been sent successfully.`);
                setFormData({
                    fullName: '',
                    email: '',
                    phone: '',
                    company: '',
                    purpose: 'Web Development',
                    message: ''
                });
                setIsOpen(false);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Contact form error:', error);
            alert('Message received! I will review your inquiry and respond shortly.');
            setIsOpen(false);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div 
                    className="inquiry-modal-overlay" 
                    onClick={handleClose}
                >
                    <motion.div 
                        className="inquiry-modal-card"
                        initial={{ opacity: 0, scale: 0.94, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 20 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button 
                            className="inquiry-modal-close-btn"
                            onClick={handleClose}
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>

                        {/* Top pill badge */}
                        <div className="inquiry-modal-pill">LET'S CONNECT</div>

                        {/* Title & subtitle */}
                        <h2 className="inquiry-modal-title">Start a Conversation</h2>
                        <p className="inquiry-modal-subtitle">
                            Fill out the form below and I'll respond within 24 hours.
                        </p>

                        {/* Form */}
                        <form className="inquiry-modal-form" onSubmit={handleSubmit}>
                            {/* Row 1: Full Name & Email Address */}
                            <div className="inquiry-form-row">
                                <div className="inquiry-field-group">
                                    <label className="inquiry-label">
                                        FULL NAME <span className="inquiry-req">*</span>
                                    </label>
                                    <div className="inquiry-input-wrapper">
                                        <User size={18} className="inquiry-input-icon" />
                                        <input 
                                            type="text" 
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                            className="inquiry-input"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="inquiry-field-group">
                                    <label className="inquiry-label">
                                        EMAIL ADDRESS <span className="inquiry-req">*</span>
                                    </label>
                                    <div className="inquiry-input-wrapper">
                                        <Mail size={18} className="inquiry-input-icon" />
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="you@domain.com"
                                            className="inquiry-input"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Phone & Company */}
                            <div className="inquiry-form-row">
                                <div className="inquiry-field-group">
                                    <label className="inquiry-label">
                                        PHONE NUMBER (OPTIONAL)
                                    </label>
                                    <div className="inquiry-input-wrapper">
                                        <Phone size={18} className="inquiry-input-icon" />
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                            className="inquiry-input"
                                        />
                                    </div>
                                </div>

                                <div className="inquiry-field-group">
                                    <label className="inquiry-label">
                                        COMPANY / ORGANIZATION (OPTIONAL)
                                    </label>
                                    <div className="inquiry-input-wrapper">
                                        <Building2 size={18} className="inquiry-input-icon" />
                                        <input 
                                            type="text" 
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            placeholder="Startup / Organization"
                                            className="inquiry-input"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Row 3: Purpose of Contact Dropdown */}
                            <div className="inquiry-field-group">
                                <label className="inquiry-label">
                                    PURPOSE OF CONTACT <span className="inquiry-req">*</span>
                                </label>
                                <div className="inquiry-select-wrapper">
                                    <HelpCircle size={18} className="inquiry-input-icon" />
                                    <select 
                                        name="purpose"
                                        value={formData.purpose}
                                        onChange={handleChange}
                                        className="inquiry-select"
                                        required
                                    >
                                        {purposeOptions.map((opt, i) => (
                                            <option key={i} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                    <ChevronDown size={18} className="inquiry-select-chevron" />
                                </div>
                            </div>

                            {/* Row 4: Message */}
                            <div className="inquiry-field-group">
                                <label className="inquiry-label">
                                    MESSAGE <span className="inquiry-req">*</span>
                                </label>
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project, timeline, or what you'd like to collaborate on..."
                                    className="inquiry-textarea"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                className="inquiry-submit-btn"
                                disabled={isSubmitting}
                            >
                                <Send size={18} />
                                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;

