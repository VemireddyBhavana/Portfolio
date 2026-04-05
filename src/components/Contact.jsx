import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, subject, message } = formData;
        
        const mailtoLink = `mailto:bhavanavemireddy6@gmail.com?subject=${encodeURIComponent(subject || 'Project Inquiry from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        
        window.location.href = mailtoLink;
        
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            id="contact"
            className="section contact"
        >
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Get In Touch</h2>
                    <div className="title-underline"></div>
                </div>

                <div className="contact-grid-premium">
                    <motion.div
                        className="contact-info-premium"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3>Let's collaborate on something great.</h3>
                        <p>I'm currently available for freelance work and full-time opportunities. If you have a project that needs a creative touch, I'd love to hear from you.</p>

                        <div className="contact-details">
                            <div className="contact-detail-item">
                                <div className="detail-icon"><Mail size={20} /></div>
                                <div>
                                    <div className="detail-label">Email</div>
                                    <div className="detail-value text-highlight">bhavanavemireddy6@gmail.com</div>
                                </div>
                            </div>
                            <div className="contact-detail-item">
                                <div className="detail-icon"><MapPin size={20} /></div>
                                <div>
                                    <div className="detail-label">Location</div>
                                    <div className="detail-value">Hyderabad, Telangana</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="contact-form-premium glass"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="form-premium-row">
                                <div className="form-group-premium">
                                    <label>Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="interactive" required />
                                </div>
                                <div className="form-group-premium">
                                    <label>Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="interactive" required />
                                </div>
                            </div>
                            <div className="form-group-premium">
                                <label>Subject</label>
                                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project Inquiry" className="interactive" required />
                            </div>
                            <div className="form-group-premium">
                                <label>Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Tell me about your project..." className="interactive" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary full-width interactive">
                                Send Message <Send size={18} className="btn-icon" />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default Contact;
