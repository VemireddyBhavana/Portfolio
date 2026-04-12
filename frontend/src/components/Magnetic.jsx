import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Magnetic({ children }) {
    const ref = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        // Disable on touch devices or small screens
        if (window.innerWidth <= 968) return;

        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.35, y: middleY * 0.35 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const handleTouchMove = (e) => {
        const touch = e.touches[0];
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = touch.clientX - (left + width / 2);
        const middleY = touch.clientY - (top + height / 2);

        // Slightly less pull on touch to keep it controllable
        setPosition({ x: middleX * 0.25, y: middleY * 0.25 });
    };

    const handleTouchEnd = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            style={{ position: 'relative' }}
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            animate={{ x, y }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, mass: 0.1 }}
            className="magnetic-wrapper"
        >
            {children}
        </motion.div>
    );
}
