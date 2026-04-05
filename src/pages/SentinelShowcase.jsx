import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

const SentinelShowcase = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const isMobile = window.innerWidth < 768;
        const group = new THREE.Group();
        // Create an abstract neural network / data point visual for Sentinel AI
        const pointGeo = new THREE.BufferGeometry();
        const particlesCount = isMobile ? 800 : 2000;
        const posArray = new Float32Array(particlesCount * 3);
        
        for(let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 100;
        }
        
        pointGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const pointMat = new THREE.PointsMaterial({
            size: 0.1,
            color: 0x00d8ff,
            transparent: true,
            opacity: 0.8
        });

        const particlesMesh = new THREE.Points(pointGeo, pointMat);
        scene.add(particlesMesh);

        camera.position.z = 40;

        const animate = () => {
            requestAnimationFrame(animate);
            particlesMesh.rotation.y += 0.001;
            particlesMesh.rotation.x += 0.0005;
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
            pointGeo.dispose();
            pointMat.dispose();
        };
    }, []);

    return (
        <div className="showcase-page" style={{ backgroundColor: '#0b1120', minHeight: '100vh', position: 'relative', color: '#f8f9fa' }}>
            <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}></div>
            
            <div style={{ position: 'relative', zIndex: 1, padding: '5rem 2rem', textAlign: 'center' }}>
                <Link to="/" style={{ color: '#00d8ff', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>← Back to Home</Link>
                <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(0, 216, 255, 0.1)', border: '1px solid #00d8ff', borderRadius: '50px', fontSize: '0.8rem', marginBottom: '1rem', fontWeight: 600, color: '#00d8ff' }}>AI INFRASTRUCTURE</div>
                <h1 style={{ fontSize: '4rem', color: '#f8f9fa', letterSpacing: '-2px', marginBottom: '1.5rem', fontFamily: 'Outfit', textShadow: '0 0 20px rgba(0, 216, 255, 0.3)' }}>Sentinel <span style={{ color: '#00d8ff' }}>AI</span></h1>
                <p style={{ maxWidth: '700px', margin: '0 auto 3.5rem', color: '#9ca3af', fontSize: '1.2rem', lineHeight: 1.6 }}>An intelligent monitoring interface for distributed AI models built with beautiful dark aesthetics and real-time alerts.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                    <div className="glass" style={{ borderLeft: '4px solid #00d8ff', textAlign: 'left' }}>
                        <h3 style={{ color: '#00d8ff', marginBottom: '1rem', fontFamily: 'Outfit' }}>Real-time Visualization</h3>
                        <p style={{ color: '#9ca3af' }}>Watch neural networks process constraints continuously with beautiful WebGL rendering frameworks.</p>
                    </div>
                    <div className="glass" style={{ borderLeft: '4px solid #00d8ff', textAlign: 'left' }}>
                        <h3 style={{ color: '#00d8ff', marginBottom: '1rem', fontFamily: 'Outfit' }}>Predictive Alerts</h3>
                        <p style={{ color: '#9ca3af' }}>Smart algorithms that detect anomalies in your infrastructure before they even occur.</p>
                    </div>
                    <div className="glass" style={{ borderLeft: '4px solid #00d8ff', textAlign: 'left' }}>
                        <h3 style={{ color: '#00d8ff', marginBottom: '1rem', fontFamily: 'Outfit' }}>Distributed Logging</h3>
                        <p style={{ color: '#9ca3af' }}>Track parameters globally completely decentralized ensuring robust operation uptime.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SentinelShowcase;
