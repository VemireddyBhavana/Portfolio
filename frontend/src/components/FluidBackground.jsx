import React, { useEffect, useRef } from 'react';

const FluidBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext('webgl');
        if (!gl) return;

        // Detection for light/dark mode
        const isDarkMode = document.documentElement.classList.contains('dark-mode') || 
                           document.body.classList.contains('dark-theme');

        const vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `;

        const fragmentShaderSource = `
            precision highp float;
            uniform vec2 u_resolution;
            uniform float u_time;
            uniform vec2 u_mouse;
            uniform bool u_isDark;
            
            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution;
                float dist = distance(uv, u_mouse / u_resolution);
                float ripple = sin(dist * 12.0 - u_time * 2.5) * exp(-dist * 4.0);
                
                // Adaptive colors based on theme
                vec3 darkBg = vec3(0.01, 0.02, 0.05);
                vec3 lightBg = vec3(0.95, 0.97, 1.0);
                vec3 baseColor = u_isDark ? darkBg : lightBg;
                
                vec3 darkRipple = vec3(0.0, 0.6, 1.0);
                vec3 lightRipple = vec3(0.5, 0.8, 1.0);
                vec3 rippleColor = u_isDark ? darkRipple : lightRipple;
                
                vec3 color = baseColor + ripple * rippleColor * 0.15;
                
                gl_FragColor = vec4(color, 0.4);
            }
        `;

        // ... shader initialization ...

        const handleMove = (e) => {
            const x = e.clientX || (e.touches && e.touches[0].clientX);
            const y = canvas.height - (e.clientY || (e.touches && e.touches[0].clientY));
            // Update uniforms...
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove, { passive: true });
        
        // ... animation loop ...

        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('touchmove', handleMove);
        };
    }, []);

    return (
        <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }} />
    );
};

export default FluidBackground;
