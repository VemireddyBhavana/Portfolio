import React, { useEffect, useRef, useState } from 'react';

const NeonCursor = () => {
    const canvasRef = useRef(null);
    const points = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });
    const smoothedMouse = useRef({ x: 0, y: 0 });
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const checkTheme = () => {
            const dark = document.documentElement.classList.contains('dark-mode') || 
                         document.body.classList.contains('dark-theme');
            setIsDarkMode(dark);
        };
        checkTheme();
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const dx = (mouse.current.x - smoothedMouse.current.x);
            const dy = (mouse.current.y - smoothedMouse.current.y);
            
            smoothedMouse.current.x += dx * 0.25; // Faster following
            smoothedMouse.current.y += dy * 0.25;

            // Only add points if moving or if the trail hasn't fully collapsed to the current position
            const isMoving = Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1;
            
            if (isMoving || points.current.some(p => Math.abs(p.x - smoothedMouse.current.x) > 0.1)) {
                points.current.push({ ...smoothedMouse.current });
                if (points.current.length > 12) points.current.shift(); // Tighter trail
            } else if (points.current.length > 0) {
                // If stopped and trail is collapsed, we can eventually stop rendering
                points.current.shift();
            }

            if (points.current.length === 0 && !isMoving) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                animationFrameId = null;
                return;
            }

            if (points.current.length > 1) {
                ctx.shadowBlur = isDarkMode ? 15 : 8; // Reduced blur
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                for (let i = 1; i < points.current.length; i++) {
                    const p1 = points.current[i - 1];
                    const p2 = points.current[i];
                    const ratio = i / points.current.length;
                    
                    // Adjust colors for better visibility in light mode
                    const hue = isDarkMode ? (200 + ratio * 100) : (210 + ratio * 80);
                    const lightness = isDarkMode ? '60%' : '50%';
                    const color = `hsla(${hue}, 100%, ${lightness}, ${ratio})`;

                    ctx.beginPath();
                    ctx.strokeStyle = color;
                    ctx.shadowColor = color;
                    ctx.lineWidth = ratio * 8;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        const handleMove = (e) => {
            const x = e.clientX || (e.touches && e.touches[0].clientX);
            const y = e.clientY || (e.touches && e.touches[0].clientY);
            mouse.current.x = x;
            mouse.current.y = y;

            if (!animationFrameId) {
                render();
            }
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove, { passive: true });
        
        resize();
        // Animation starts on movement

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDarkMode]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 99999999, // Topmost layer
                mixBlendMode: isDarkMode ? 'screen' : 'multiply'
            }}
        />
    );
};

export default NeonCursor;
