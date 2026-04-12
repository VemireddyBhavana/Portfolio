import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * A "Scramble" text effect component for a premium techno-aesthetic.
 * @param {Object} props
 * @param {string} props.text - The target text to scramble to.
 * @param {number} props.duration - How long the effect lasts.
 * @param {string} props.className - Custom CSS classes.
 * @param {string} props.type - Element type (h1, h2, etc.)
 */
const TextScramble = ({ 
    text, 
    duration = 1.5, 
    className = '', 
    type = 'h2' 
}) => {
    const [displayText, setDisplayText] = useState('');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.5 });
    const chars = '!<>-_\\/[]{}—=+*^?#$@%&()0123456789ABCDEF';
    
    useEffect(() => {
        if (!isInView) {
            setDisplayText(''); // Reset when out of view
            return;
        }

        let frame = 0;
        const totalFrames = duration * 60; // Assuming 60fps
        const results = [];
        
        for (let i = 0; i < text.length; i++) {
            const from = '';
            const to = text[i];
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            results.push({ from, to, start, end, char: '' });
        }

        let animationFrame;
        const update = () => {
            let output = '';
            let complete = 0;

            for (let i = 0, n = results.length; i < n; i++) {
                let { from, to, start, end, char } = results[i];
                if (frame >= end) {
                    complete++;
                    output += to;
                } else if (frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = chars[Math.floor(Math.random() * chars.length)];
                        results[i].char = char;
                    }
                    output += `<span class="scramble-char">${char}</span>`;
                } else {
                    output += from;
                }
            }

            setDisplayText(output);

            if (complete === results.length) {
                setDisplayText(text);
                cancelAnimationFrame(animationFrame);
            } else {
                frame++;
                animationFrame = requestAnimationFrame(update);
            }
        };

        update();

        return () => cancelAnimationFrame(animationFrame);
    }, [isInView, text, duration]);

    const Tag = type;

    return (
        <Tag 
            ref={ref} 
            className={`text-scramble-pivot ${className}`}
            dangerouslySetInnerHTML={{ __html: displayText }}
        />
    );
};

export default TextScramble;
