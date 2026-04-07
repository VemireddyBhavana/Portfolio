import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, MapPin, Phone } from 'lucide-react';
import Magnetic from './Magnetic';
import ParallaxTitle from './ParallaxTitle';
import AnimatedText from './AnimatedText';

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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            id="contact"
            className="section contact"
        >
            <div className="container">
                <ParallaxTitle title="Get In Touch" subTitle="Let's build something extraordinary together" />

                <div className="contact-grid-premium">
                    <div className="contact-info-premium">
                        <AnimatedText 
                            text="Let's collaborate on something great." 
                            type="h3" 
                            direction="left"
                            delay={0.1}
                        />
                        <AnimatedText 
                            text="I'm currently available for freelance work and full-time opportunities. If you have a project that needs a creative touch, I'd love to hear from you." 
                            className="contact-description-pivot"
                            direction="left"
                            delay={0.3}
                        />

                        <div className="contact-details">
                            {[
                                { href: "mailto:bhavanavemireddy6@gmail.com", icon: <Mail size={20} />, label: "Email", value: "bhavanavemireddy6@gmail.com", isLink: true },
                                { icon: <MapPin size={20} />, label: "Location", value: "Hyderabad, Telangana", isLink: false }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                                >
                                    {item.isLink ? (
                                        <motion.a 
                                            href={item.href}
                                            className="contact-detail-item interactive"
                                            whileHover={{ x: 10, backgroundColor: 'rgba(0, 245, 255, 0.05)' }}
                                            style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}
                                        >
                                            <div className="detail-icon">{item.icon}</div>
                                            <div>
                                                <div className="detail-label">{item.label}</div>
                                                <div className="detail-value text-highlight">{item.value}</div>
                                            </div>
                                        </motion.a>
                                    ) : (
                                        <motion.div 
                                            className="contact-detail-item"
                                            whileHover={{ x: 10 }}
                                        >
                                            <div className="detail-icon">{item.icon}</div>
                                            <div>
                                                <div className="detail-label">{item.label}</div>
                                                <div className="detail-value">{item.value}</div>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        className="contact-form-premium glass"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="form-premium-row">
                                <div className="form-group-premium">
                                    <label>Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="interactive" required />
                                    <div className="form-line-pivot"></div>
                                </div>
                                <div className="form-group-premium">
                                    <label>Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="interactive" required />
                                    <div className="form-line-pivot"></div>
                                </div>
                            </div>
                            <div className="form-group-premium">
                                <label>Subject</label>
                                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project Inquiry" className="interactive" required />
                                <div className="form-line-pivot"></div>
                            </div>
                            <div className="form-group-premium">
                                <label>Message</label>
                                <textarea name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Tell me about your project..." className="interactive" required></textarea>
                                <div className="form-line-pivot"></div>
                            </div>
                            <div className="form-submit-wrapper">
                                <Magnetic>
                                    <button type="submit" className="btn btn-primary full-width interactive">
                                        Send Message <Send size={18} className="btn-icon" />
                                    </button>
                                </Magnetic>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default Contact;

