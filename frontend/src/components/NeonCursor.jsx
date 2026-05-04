import React, { useEffect, useRef } from 'react';

const NeonCursor = () => {
    const canvasRef = useRef(null);
    const points = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });
    const smoothedMouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 1. AI Motion Smoothing (Lerp)
            // The cursor doesn't snap; it follows with an organic "weight"
            smoothedMouse.current.x += (mouse.current.x - smoothedMouse.current.x) * 0.15;
            smoothedMouse.current.y += (mouse.current.y - smoothedMouse.current.y) * 0.15;

            // 2. Trail Logic
            points.current.push({ ...smoothedMouse.current });
            if (points.current.length > 25) points.current.shift();

            // 3. Draw Neon Gradient Trail
            if (points.current.length > 1) {
                ctx.shadowBlur = 20;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                for (let i = 1; i < points.current.length; i++) {
                    const p1 = points.current[i - 1];
                    const p2 = points.current[i];
                    
                    const ratio = i / points.current.length;
                    const color = `hsla(${200 + ratio * 100}, 100%, 60%, ${ratio})`; // Blue to Pink

                    ctx.beginPath();
                    ctx.strokeStyle = color;
                    ctx.shadowColor = color;
                    ctx.lineWidth = ratio * 10;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        
        resize();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

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
                zIndex: 10000, // Top layer
                mixBlendMode: 'screen'
            }}
        />
    );
};

export default NeonCursor;
