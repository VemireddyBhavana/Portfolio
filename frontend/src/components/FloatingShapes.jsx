import React from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity } from 'framer-motion';

const FloatingShapes = () => {
    const { scrollYProgress } = useScroll();
    const scrollVelocity = useVelocity(scrollYProgress);
    const smoothVelocity = useSpring(scrollVelocity, {
        stiffness: 40,
        damping: 20
    });
    
    // Create velocity-based transformations
    const velocityScale = useTransform(smoothVelocity, [-1, 0, 1], [1.1, 1, 1.1]);
    const velocitySkew = useTransform(smoothVelocity, [-1, 0, 1], [-5, 0, 5]);
    
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -450]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

    const shapes = [
        { id: 1, type: 'circle', size: 150, color: 'rgba(0, 245, 255, 0.05)', top: '15%', left: '10%', y: y1 },
        { id: 2, type: 'triangle', size: 200, color: 'rgba(59, 130, 246, 0.03)', top: '60%', left: '80%', y: y2 },
        { id: 3, type: 'square', size: 100, color: 'rgba(0, 245, 255, 0.04)', top: '35%', left: '75%', y: y3 },
        { id: 4, type: 'circle', size: 250, color: 'rgba(59, 130, 246, 0.02)', top: '80%', left: '5%', y: y1 },
    ];

    return (
        <div className="floating-shapes-container" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden'
        }}>
            {shapes.map((shape) => (
                <motion.div
                    key={shape.id}
                    style={{
                        position: 'absolute',
                        top: shape.top,
                        left: shape.left,
                        width: shape.size,
                        height: shape.size,
                        backgroundColor: shape.type !== 'triangle' ? shape.color : 'transparent',
                        borderRadius: shape.type === 'circle' ? '50%' : '10px',
                        y: shape.y,
                        rotate: rotate,
                        scale: velocityScale,
                        skewX: velocitySkew,
                        border: shape.type === 'triangle' ? `100px solid transparent` : 'none',
                        borderBottom: shape.type === 'triangle' ? `173px solid ${shape.color}` : 'none',
                        filter: 'blur(40px)',
                        willChange: 'transform'
                    }}
                    animate={{
                        x: [0, 20, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

export default FloatingShapes;
