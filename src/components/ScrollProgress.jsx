import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="scroll-progress-line"
            style={{
                scaleX,
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'var(--accent-color)',
                transformOrigin: '0%',
                zIndex: 100000,
                boxShadow: '0 0 10px var(--accent-color), 0 0 20px var(--accent-color)'
            }}
        />
    );
};

export default ScrollProgress;
