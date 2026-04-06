import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextScramble from './TextScramble';
import AnimatedText from './AnimatedText';

const ParallaxTitle = ({ title, subTitle }) => {
  const ref = useRef(null);
  
  return (
    <div ref={ref} className="section-header" style={{ position: 'relative', overflow: 'hidden', textAlign: 'center', marginBottom: '4rem' }}>
      <TextScramble 
        text={title} 
        type="h2" 
        className="section-title" 
        duration={2}
      />
      <div className="title-underline"></div>
      {subTitle && (
        <AnimatedText 
          text={subTitle} 
          type="p" 
          className="section-subtitle" 
          direction="bottom"
          delay={0.5}
        />
      )}
    </div>
  );
};

export default ParallaxTitle;
