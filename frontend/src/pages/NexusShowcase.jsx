import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

const NexusShowcase = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const gridHelper = new THREE.GridHelper(100, 50, 0x00f2fe, 0x002222);
        scene.add(gridHelper);

        const isMobile = window.innerWidth < 768;
        const particlesGeometry = new THREE.BufferGeometry();
        const count = isMobile ? 1500 : 5000;
        const positions = new Float32Array(count * 3);
        for(let i=0; i<count*3; i++) {
            positions[i] = (Math.random() - 0.5) * 50;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particlesMaterial = new THREE.PointsMaterial({ size: 0.05, color: 0x00f2fe });
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        camera.position.set(0, 10, 20);
        camera.lookAt(0, 0, 0);

        const animate = () => {
            requestAnimationFrame(animate);
            gridHelper.rotation.y += 0.001;
            particles.rotation.y -= 0.0005;
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
            gridHelper.geometry.dispose();
            gridHelper.material.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
        };
    }, []);

    return (
        <div className="showcase-page" style={{ backgroundColor: '#050505', minHeight: '100vh', position: 'relative' }}>
            <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}></div>
            
            <div style={{ position: 'relative', zIndex: 1, padding: '5rem 2rem', textAlign: 'center' }}>
                <Link to="/" style={{ 
                    color: '#00f2fe', 
                    textDecoration: 'none', 
                    marginBottom: '3rem', 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '10px',
                    padding: '12px 24px',
                    border: '1px solid rgba(0, 242, 254, 0.3)',
                    borderRadius: '50px',
                    background: 'rgba(0, 242, 254, 0.05)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'all 0.3s ease'
                }}
                className="back-home-btn"
                >
                    <span style={{ fontSize: '1.2rem' }}>←</span> Back to Projects
                </Link>
                <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(0, 242, 254, 0.1)', border: '1px solid #00f2fe', borderRadius: '50px', fontSize: '0.8rem', marginBottom: '1rem', fontWeight: 600, color: '#00f2fe' }}>PROJECT SHOWCASE</div>
                <h1 style={{ fontSize: '4rem', color: '#00f2fe', textShadow: '0 0 20px rgba(0, 242, 254, 0.5)', marginBottom: '1rem' }}>Nexus OS</h1>
                <p style={{ maxWidth: '600px', alignSelf: 'center', margin: '0 auto 3rem', color: '#a0a0a0' }}>The next-generation distributed operating system designed for the decentralized cloud architecture of tomorrow.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <div className="glass" style={{ textAlign: 'left' }}>
                        <h3 style={{ color: '#00f2fe', marginBottom: '1rem' }}>Neural Core</h3>
                        <p style={{ color: '#a0a0a0' }}>Advanced AI scheduling that optimizes process allocation across edge nodes in real-time.</p>
                    </div>
                    <div className="glass" style={{ textAlign: 'left' }}>
                        <h3 style={{ color: '#00f2fe', marginBottom: '1rem' }}>Quantum File System</h3>
                        <p style={{ color: '#a0a0a0' }}>Self-healing, cryptographically secured storage that survives node failures indefinitely.</p>
                    </div>
                    <div className="glass" style={{ textAlign: 'left' }}>
                        <h3 style={{ color: '#00f2fe', marginBottom: '1rem' }}>Hyper-Glass UI</h3>
                        <p style={{ color: '#a0a0a0' }}>A fully immersive, three-dimensional workspace interface for maximum productivity.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NexusShowcase;
