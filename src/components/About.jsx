import React from 'react';
import { motion } from 'framer-motion';
import ParallaxTitle from './ParallaxTitle';
import Magnetic from './Magnetic';
import AnimatedText from './AnimatedText';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { duration: 0.8, ease: "easeOut" } 
        }
    };

    return (
        <motion.section 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            id="about" 
            className="section about"
        >
            <div className="container">
                <ParallaxTitle title="About Me" subTitle="The Person Behind the Code" />

                <div className="about-layout-pivot hero-content-pivot">

                    {/* 🔥 PROFILE IMAGE WITH MAGNETIC ATTRACTION */}
                    <motion.div 
                      className="profile-section-premium"
                      initial={{ scale: 0.8, opacity: 0, rotate: -5 }}
                      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                      viewport={{ once: false }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                      <Magnetic>
                        <div className="profile-image-wrapper interactive">
                          <div className="profile-glow-ring"></div>
                          <div className="profile-glow-ring-outer"></div>
                          <img 
                            src="https://res.cloudinary.com/de8opipom/image/upload/v1774977788/photo_li1vaw.jpg" 
                            alt="Bhavana Profile" 
                            className="profile-image-actual"
                          />
                        </div>
                      </Magnetic>
                    </motion.div>

                    <div className="about-text-container-pivot">
                        <AnimatedText 
                            text="I am an aspiring Full Stack Developer with a strong passion for building scalable, efficient, and user-centric web applications. With hands-on experience in modern technologies such as React, Node.js, and MongoDB, I enjoy transforming ideas into impactful digital products."
                            className="about-text-pivot"
                            direction="right"
                            delay={0.2}
                        />

                        <AnimatedText 
                            text="I have a keen interest in AI and automation, and I continuously explore new tools and technologies to enhance my development skills. I focus on writing clean, maintainable code and delivering seamless, high-quality user experiences."
                            className="about-text-pivot"
                            direction="right"
                            delay={0.4}
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default About;