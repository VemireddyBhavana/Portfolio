import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

const LuminaShowcase = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const container = mountRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        const group = new THREE.Group();
        const sphereGeo = new THREE.SphereGeometry(4, 32, 32);
        const sphereMat = new THREE.MeshPhongMaterial({ 
            color: 0x2563eb, transparent: true, opacity: 0.15, 
            shininess: 100, reflectivity: 1, refractionRatio: 0.98 
        });

        for(let i=0; i<15; i++) {
            const sphere = new THREE.Mesh(sphereGeo, sphereMat);
            sphere.position.set((Math.random()-0.5)*100, (Math.random()-0.5)*100, (Math.random()-0.5)*50);
            sphere.scale.setScalar(Math.random()*2+1);
            group.add(sphere);
        }
        scene.add(group);

        const pointLight = new THREE.PointLight(0xffffff, 2000);
        pointLight.position.set(0, 50, 50);
        scene.add(pointLight);
        scene.add(new THREE.AmbientLight(0x404040));

        camera.position.z = 80;

        const animate = () => {
            requestAnimationFrame(animate);
            group.rotation.z += 0.0005;
            group.children.forEach(c => {
                c.rotation.y += 0.01;
                c.position.y += Math.sin(Date.now()*0.001)*0.01;
            });
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
            sphereGeo.dispose();
            sphereMat.dispose();
        };
    }, []);

    return (
        <div className="showcase-page" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', position: 'relative', color: '#1f2937' }}>
            <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}></div>
            
            <div style={{ position: 'relative', zIndex: 1, padding: '5rem 2rem', textAlign: 'center' }}>
                <Link to="/" style={{ color: '#2563eb', textDecoration: 'none', marginBottom: '2rem', display: 'inline-block' }}>← Return to Portfolio</Link>
                <h1 style={{ fontSize: '4rem', color: '#1f2937', letterSpacing: '-2px', marginBottom: '1.5rem' }}>Lumina <span style={{ color: '#2563eb' }}>SaaS</span></h1>
                <p style={{ maxWidth: '700px', margin: '0 auto 3.5rem', color: '#4b5563', fontSize: '1.2rem', lineHeight: 1.6 }}>A unified data intelligence platform for modern enterprises, providing real-time visibility and advanced predictive analytics.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.6)', border: '1px solid rgba(255, 255, 255, 0.8)', padding: '3rem', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                        <h3 style={{ color: '#2563eb', marginBottom: '1rem', fontFamily: 'Outfit' }}>Unified Dashboard</h3>
                        <p style={{ color: '#4b5563' }}>Connect your entire tech stack into a single, beautiful command center for your business.</p>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.6)', border: '1px solid rgba(255, 255, 255, 0.8)', padding: '3rem', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                        <h3 style={{ color: '#2563eb', marginBottom: '1rem', fontFamily: 'Outfit' }}>Predictive Analytics</h3>
                        <p style={{ color: '#4b5563' }}>Use machine learning to forecast trends and make data-driven decisions months in advance.</p>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.6)', border: '1px solid rgba(255, 255, 255, 0.8)', padding: '3rem', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', textAlign: 'left' }}>
                        <h3 style={{ color: '#2563eb', marginBottom: '1rem', fontFamily: 'Outfit' }}>Enterprise Security</h3>
                        <p style={{ color: '#4b5563' }}>Bank-grade encryption and compliance standards out of the box for total peace of mind.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LuminaShowcase;
