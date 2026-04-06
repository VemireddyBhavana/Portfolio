import React from 'react';
import { motion } from 'framer-motion';

/**
 * A reusable component for premium text reveal animations.
 * @param {Object} props
 * @param {string} props.text - The text to animate.
 * @param {string} props.type - Element type (h1, h2, p, span, etc.)
 * @param {string} props.className - Custom CSS classes.
 * @param {'left' | 'right' | 'bottom' | 'none'} props.direction - Slide direction.
 * @param {number} props.delay - Initial animation delay.
 * @param {boolean} props.once - Whether to animate only once in view.
 * @param {number} props.stagger - Delay between individual characters or words (if split).
 */
const AnimatedText = ({
    text,
    type = 'p',
    className = '',
    direction = 'left',
    delay = 0,
    once = false,
    stagger = 0.02
}) => {
    const Tag = motion[type] || motion.p;

    const variants = {
        hidden: {
            opacity: 0,
            x: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
            y: direction === 'bottom' ? 30 : 0
        },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                duration: 0.8,
                delay,
                ease: [0.22, 1, 0.36, 1], // Premium bezier
                staggerChildren: stagger
            }
        }
    };

    const childVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    // If text is a string, we can split it for a more staggered effect
    // Otherwise just animate the container
    const isString = typeof text === 'string';

    return (
        <Tag
            className={`animated-text-pivot ${className}`}
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.3 }}
        >
            {isString ? (
                text.split(' ').map((word, index) => (
                    <motion.span
                        key={index}
                        variants={childVariants}
                        style={{ display: 'inline-block', marginRight: '0.25em' }}
                    >
                        {word}
                    </motion.span>
                ))
            ) : (
                text
            )}
        </Tag>
    );
};

export default AnimatedText;
