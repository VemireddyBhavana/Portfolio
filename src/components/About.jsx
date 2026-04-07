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

                <div className="about-layout-pivot">
                    <div className="about-text-container-pivot">
                        <AnimatedText 
                            text="I am an aspiring Full Stack Developer with a strong passion for building scalable, efficient, and user-centric web applications. With hands-on experience in modern technologies such as React, Node.js, and MongoDB, I enjoy transforming ideas into impactful digital products."
                            className="about-text-pivot"
                            direction="bottom"
                            blur={true}
                            delay={0.2}
                        />

                        <AnimatedText 
                            text="I have a keen interest in AI and automation, and I continuously explore new tools and technologies to enhance my development skills. I focus on writing clean, maintainable code and delivering seamless, high-quality user experiences."
                            className="about-text-pivot"
                            direction="bottom"
                            blur={true}
                            delay={0.4}
                        />
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default About;