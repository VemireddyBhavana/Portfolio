import React, { useEffect, useRef } from 'react';

const FluidCursor = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const particles = useRef([]);
    const mouse = useRef({ x: 0, y: 0 });
    const hue = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Particle {
            constructor(x, y, h) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 8 + 4;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.color = h;
                this.life = 1;
                this.decay = Math.random() * 0.01 + 0.005;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= this.decay;
                if (this.size > 0.2) this.size -= 0.1;
            }

            draw() {
                ctx.fillStyle = `hsla(${this.color}, 100%, 50%, ${this.life})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const handleMouseMove = (e) => {
            const x = e.clientX || (e.touches && e.touches[0].clientX);
            const y = e.clientY || (e.touches && e.touches[0].clientY);
            
            mouse.current.x = x;
            mouse.current.y = y;

            // Update hue over time for multicolor effect
            hue.current += 2;
            if (hue.current > 360) hue.current = 0;

            // Spawn particles
            for (let i = 0; i < 3; i++) {
                particles.current.push(new Particle(mouse.current.x, mouse.current.y, hue.current));
            }
        };

        const drawLines = () => {
            for (let i = 0; i < particles.current.length; i++) {
                for (let j = i; j < particles.current.length; j++) {
                    const dx = particles.current[i].x - particles.current[j].x;
                    const dy = particles.current[i].y - particles.current[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `hsla(${particles.current[i].color}, 100%, 50%, ${particles.current[i].life * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles.current[i].x, particles.current[i].y);
                        ctx.lineTo(particles.current[j].x, particles.current[j].y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Cycle hue slowly even when not moving
            hue.current += 0.5;

            for (let i = 0; i < particles.current.length; i++) {
                particles.current[i].update();
                particles.current[i].draw();

                if (particles.current[i].life <= 0) {
                    particles.current.splice(i, 1);
                    i--;
                }
            }
            
            drawLines();
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);
        
        resize();
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div 
            ref={containerRef}
            className="fluid-cursor-container"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 99999999,
                filter: 'blur(6px) contrast(15)', // Adjusted for better color clarity
                background: 'transparent',
                mixBlendMode: 'screen'
            }}
        >
            <canvas ref={canvasRef} />
        </div>
    );
};

export default FluidCursor;
