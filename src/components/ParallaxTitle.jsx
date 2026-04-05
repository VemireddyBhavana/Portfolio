import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxTitle = ({ title, subTitle }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="section-header" style={{ position: 'relative', overflow: 'hidden' }}>
      <motion.div style={{ y, opacity }}>
        <h2 className="section-title">{title}</h2>
        <div className="title-underline"></div>
        {subTitle && <p className="section-subtitle">{subTitle}</p>}
      </motion.div>
    </div>
  );
};

export default ParallaxTitle;
