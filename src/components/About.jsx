import React from 'react';
import { motion } from 'framer-motion';
import ParallaxTitle from './ParallaxTitle';

const About = () => {
    return (
        <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            id="about" 
            className="section about"
        >
            <div className="container">
                <ParallaxTitle title="About Me" />

                {/* ✅ FIXED HERE (REMOVED style) */}
                <div className="about-layout-pivot hero-content-pivot">

                    {/* 🔥 PROFILE IMAGE */}
                    <motion.div 
                      className="profile-section-premium"
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    >
                      <div className="profile-image-wrapper">
                        <div className="profile-glow-ring"></div>
                        <div className="profile-glow-ring-outer"></div>
                        <img 
                          src="https://res.cloudinary.com/de8opipom/image/upload/v1774977788/photo_li1vaw.jpg" 
                          alt="Bhavana Profile" 
                          className="profile-image-actual"
                        />
                      </div>
                    </motion.div>

                    <div>
                        <p className="about-text-pivot">
                            I am an aspiring Full Stack Developer with a strong passion for building scalable, efficient, and user-centric web applications. With hands-on experience in modern technologies such as React, Node.js, and MongoDB, I enjoy transforming ideas into impactful digital products.
                        </p>

                        <p className="about-text-pivot">
                            I have a keen interest in AI and automation, and I continuously explore new tools and technologies to enhance my development skills. I focus on writing clean, maintainable code and delivering seamless, high-quality user experiences.
                        </p>


                    </div>

                </div>
            </div>
        </motion.section>
    );
};

export default About;