import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

const AetherShowcase = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
        const material = new THREE.MeshPhongMaterial({ color: 0x7000ff, wireframe: true, shininess: 100 });
        const torusKnot = new THREE.Mesh(geometry, material);
        scene.add(torusKnot);

        const isMobile = window.innerWidth < 768;
        const particlesGeometry = new THREE.BufferGeometry();
        const count = isMobile ? 1000 : 3000;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        for(let i=0; i<count*3; i++) {
            positions[i] = (Math.random() - 0.5) * 60;
            colors[i] = Math.random();
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const particlesMaterial = new THREE.PointsMaterial({ size: 0.1, vertexColors: true });
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        const light = new THREE.PointLight(0xffffff, 1000);
        light.position.set(0, 5, 25);
        scene.add(light);
        scene.add(new THREE.AmbientLight(0x404040));

        camera.position.z = 40;

        const animate = () => {
            requestAnimationFrame(animate);
            torusKnot.rotation.y += 0.005;
            torusKnot.rotation.x += 0.002;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            container.removeChild(renderer.domElement);
            geometry.dispose();
            material.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
        };
    }, []);

    return (
        <div className="showcase-page" style={{ backgroundColor: '#0a001a', minHeight: '100vh', position: 'relative' }}>
            <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}></div>
            
            <div style={{ position: 'relative', zIndex: 1, padding: '5rem 2rem', textAlign: 'center' }}>
                <Link to="/" style={{ color: '#7000ff', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>← Back to Home</Link>
                <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(112, 0, 255, 0.2)', border: '1px solid #7000ff', borderRadius: '5px', fontSize: '0.8rem', marginBottom: '1rem', fontWeight: 600, color: '#fff' }}>IMMERSIVE VR</div>
                <h1 style={{ fontSize: '4rem', color: '#7000ff', textShadow: '0 0 25px rgba(112, 0, 255, 0.5)', marginBottom: '1rem' }}>Aether VR</h1>
                <p style={{ maxWidth: '600px', margin: '0 auto 3rem', color: '#b0a0cf' }}>A spatial computing framework that blurs the line between physical and digital reality with high-frequency haptics and real-time ray-tracing.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <div className="glass" style={{ borderLeft: '4px solid #7000ff', textAlign: 'left' }}>
                        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Synapse Haptics</h3>
                        <p style={{ color: '#b0a0cf' }}>Advanced sensory feedback system that simulates texture and weight in virtual space.</p>
                    </div>
                    <div className="glass" style={{ borderLeft: '4px solid #7000ff', textAlign: 'left' }}>
                        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Lumen Engine</h3>
                        <p style={{ color: '#b0a0cf' }}>State-of-the-art rendering pipeline for ultra-low latency and photorealistic environments.</p>
                    </div>
                    <div className="glass" style={{ borderLeft: '4px solid #7000ff', textAlign: 'left' }}>
                        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Social Hub</h3>
                        <p style={{ color: '#b0a0cf' }}>Decentralized virtual meeting spaces for global collaboration and creativity.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AetherShowcase;
