import React, { useEffect, useRef, useState } from 'react';

const PremiumCursor = () => {
    const canvasRef = useRef(null);
    const cursorRef = useRef(null);
    const auraRef = useRef(null);
    
    // Position tracking with high-precision refs
    const mouse = useRef({ x: -100, y: -100 });
    const pos = useRef({ x: -100, y: -100 });
    const auraPos = useRef({ x: -100, y: -100 });
    
    // Velocity & Motion smoothing
    const velocity = useRef({ x: 0, y: 0 });
    const smoothVelocity = useRef(0);
    const lastMouse = useRef({ x: 0, y: 0 });
    
    // Animation state
    const [isHovered, setIsHovered] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isInactive, setIsInactive] = useState(false);
    const particles = useRef([]);
    const hue = useRef(210); // Primary Hue
    const hue2 = useRef(280); // Secondary Hue Offset
    const idleTimer = useRef(null);

    useEffect(() => {
        const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        setIsTouchDevice(isTouch);
        
        if (isTouch) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const handleMouseMove = (e) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
            
            // Reset inactivity
            setIsInactive(false);
            if (idleTimer.current) clearTimeout(idleTimer.current);
            idleTimer.current = setTimeout(() => setIsInactive(true), 2000);

            // Hover detection with soft morphing intent
            const target = e.target;
            const interactive = target.closest('a, button, .interactive, .magnetic-wrapper');
            setIsHovered(!!interactive);

            // Update global CSS variables
            document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
        };

        class Particle {
            constructor(x, y, vx, vy, color, speed) {
                this.x = x;
                this.y = y;
                this.vx = vx * 0.4 + (Math.random() - 0.5) * 1.5;
                this.vy = vy * 0.4 + (Math.random() - 0.5) * 1.5;
                this.life = 1.0;
                this.decay = 0.01 + Math.random() * 0.02;
                this.size = (1 + Math.random() * 2) * (speed * 0.1 + 1);
                this.color = color;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.life -= this.decay;
                this.vx *= 0.97;
                this.vy *= 0.97;
            }

            draw() {
                if (this.life <= 0) return;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.x - this.vx * 3, this.y - this.vy * 3);
                ctx.strokeStyle = `hsla(${this.color}, 100%, 70%, ${this.life * 0.4})`;
                ctx.lineWidth = this.size * this.life;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
        }

        const animate = () => {
            const now = Date.now();
            const time = now * 0.001;
            
            // 1. Velocity Smoothing (Lerp)
            const rawVX = mouse.current.x - lastMouse.current.x;
            const rawVY = mouse.current.y - lastMouse.current.y;
            const rawSpeed = Math.sqrt(rawVX ** 2 + rawVY ** 2);
            
            velocity.current.x += (rawVX - velocity.current.x) * 0.15;
            velocity.current.y += (rawVY - velocity.current.y) * 0.15;
            smoothVelocity.current += (rawSpeed - smoothVelocity.current) * 0.1;

            lastMouse.current.x = mouse.current.x;
            lastMouse.current.y = mouse.current.y;

            // 2. Organic Breathing & Floating (Amplify for premium feel)
            const breathe = Math.sin(time * 2.5) * 4;
            const driftX = Math.cos(time * 0.6) * 6;
            const driftY = Math.sin(time * 0.8) * 6;

            // 3. Elegant Interpolation (Lerp)
            const followEase = isHovered ? 0.25 : 0.15;
            pos.current.x += (mouse.current.x - pos.current.x) * followEase;
            pos.current.y += (mouse.current.y - pos.current.y) * followEase;
            
            const auraEase = isHovered ? 0.15 : 0.08;
            auraPos.current.x += (mouse.current.x - auraPos.current.x) * auraEase;
            auraPos.current.y += (mouse.current.y - auraPos.current.y) * auraEase;

            // Update DOM Layers with GPU Optimization (translate3d)
            if (cursorRef.current) {
                // Motion Blur / Stretching on Core
                const stretch = Math.min(smoothVelocity.current * 0.02, 0.8);
                const angle = Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI);
                
                cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch * 0.5})`;
                cursorRef.current.style.width = isHovered ? '24px' : '10px';
                cursorRef.current.style.height = isHovered ? '24px' : '10px';
                cursorRef.current.style.borderRadius = isHovered ? '35%' : '50%'; // Morphing effect
                cursorRef.current.style.backgroundColor = isHovered ? 'rgba(255, 255, 255, 0.9)' : '#fff';
            }

            if (auraRef.current) {
                // Breathing glow (Make it more dynamic)
                const auraScale = (isHovered ? 2.5 : 1.0) + (isInactive ? breathe * 0.05 : 0);
                auraRef.current.style.transform = `translate3d(${auraPos.current.x + (isInactive ? driftX : 0)}px, ${auraPos.current.y + (isInactive ? driftY : 0)}px, 0) scale(${auraScale})`;
                auraRef.current.style.opacity = isInactive ? '0.3' : (isHovered ? '0.9' : '0.5');
                
                // Update dual hues for prismatic transition
                const hueBase = 200; 
                const hueRange = 120; 
                hue.current = hueBase + Math.sin(time * 1.5) * hueRange;
                hue2.current = (hue.current + 60 + Math.cos(time * 0.8) * 40) % 360;
                
                // DIRECTLY UPDATE COLORS ON REFS
                // Using 4 distinct color stops for a true prismatic feel
                const h1 = hue.current;
                const h2 = (hue.current + 45) % 360;
                const h3 = (hue.current + 90) % 360;
                const h4 = (hue.current + 135) % 360;
                
                auraRef.current.style.background = `radial-gradient(circle at center, 
                    hsla(${hue.current}, 100%, 70%, 0.7) 0%, 
                    hsla(${hue2.current}, 100%, 65%, 0.5) 30%, 
                    hsla(${(hue.current + 120) % 360}, 100%, 60%, 0.3) 60%, 
                    transparent 90%)`;
                
                if (cursorRef.current) {
                    cursorRef.current.style.boxShadow = `
                        0 0 15px 2px hsla(${h1}, 100%, 70%, 0.8),
                        0 0 30px 5px hsla(${h2}, 100%, 60%, 0.4)
                    `;
                }
            }

            // 4. Adaptive Particle System (Increase spawn rate for vibrancy)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (!isInactive && smoothVelocity.current > 1.5) {
                const spawnRate = isHovered ? 1.2 : 0.8;
                const count = Math.floor(smoothVelocity.current * spawnRate);
                for (let i = 0; i < Math.min(count, 15); i++) {
                    particles.current.push(new Particle(
                        pos.current.x, 
                        pos.current.y, 
                        -velocity.current.x, 
                        -velocity.current.y, 
                        (i % 2 === 0 ? hue.current : hue2.current) + (Math.random() * 20),
                        smoothVelocity.current
                    ));
                }
            }

            // Draw Particles with soft dispersion
            for (let i = 0; i < particles.current.length; i++) {
                const p = particles.current[i];
                p.update();
                p.draw();
                if (p.life <= 0) {
                    particles.current.splice(i, 1);
                    i--;
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (idleTimer.current) clearTimeout(idleTimer.current);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isTouchDevice, isHovered, isInactive]);

    if (isTouchDevice) return null;

    return (
        <>
            {/* Layer 1: Particle Canvas */}
            <canvas 
                ref={canvasRef} 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    zIndex: 999998,
                    mixBlendMode: 'screen'
                }}
            />
            
            {/* Layer 2: Glow Aura (Motion Blur / Breathing) */}
            <div 
                ref={auraRef}
                style={{
                    position: 'fixed',
                    top: -60,
                    left: -60,
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 999997,
                    background: 'transparent', // Will be updated by ref
                    filter: 'blur(25px)',
                    mixBlendMode: 'screen',
                    transition: 'width 0.6s, height 0.6s, opacity 0.8s ease',
                    willChange: 'transform, scale, opacity'
                }}
            />

            {/* Layer 3: Core Dot (Morphing / Velocity Stretching) */}
            <div 
                ref={cursorRef}
                style={{
                    position: 'fixed',
                    top: -5,
                    left: -5,
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 999999,
                    boxShadow: 'none', // Will be updated by ref
                    transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.4s ease',
                    willChange: 'transform, width, height, border-radius'
                }}
            />
        </>
    );
};

export default PremiumCursor;
