import React, { useEffect, useState, useCallback, useRef } from 'react';
import { 
  motion, 
  useSpring, 
  useMotionValue, 
  useVelocity, 
  useTransform 
} from 'framer-motion';

const CustomCursor = () => {
  const [cursorState, setCursorState] = useState('default'); // 'default', 'hover', 'magnetic', 'click'
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Outer ring spring: more lag, more "liquid"
  const ringX = useSpring(cursorX, { damping: 20, stiffness: 150, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 150, mass: 0.5 });

  // Speed tracking for "Stretching" effect
  const velocityX = useVelocity(cursorX);
  const velocityY = useVelocity(cursorY);
  
  const scaleX = useTransform(velocityX, [-3000, 0, 3000], [1.5, 1, 1.5]);
  const scaleY = useTransform(velocityY, [-3000, 0, 3000], [1.5, 1, 1.5]);
  
  // Use a smoother spring for the actual stretching to prevent high-frequency jitters
  const smoothScaleX = useSpring(scaleX, { stiffness: 300, damping: 50 });
  const smoothScaleY = useSpring(scaleY, { stiffness: 300, damping: 50 });

  // Inner dot spring: faster, more precise
  const dotX = useSpring(cursorX, { damping: 30, stiffness: 300, mass: 0.2 });
  const dotY = useSpring(cursorY, { damping: 30, stiffness: 300, mass: 0.2 });

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
    if (!isTouch) setIsVisible(true);
  }, []);

  const moveCursor = useCallback((e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    
    // Update CSS variables for mouse-glow effect
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  }, [cursorX, cursorY]);

  const handleMouseOver = useCallback((e) => {
    const target = e.target;
    const isInteractive = 
      target.tagName.toLowerCase() === 'a' || 
      target.tagName.toLowerCase() === 'button' ||
      target.closest('a') || 
      target.closest('button') ||
      target.classList.contains('interactive') ||
      target.closest('.interactive');

    const isMagnetic = target.closest('.magnetic-wrapper') || target.classList.contains('magnetic-wrapper');

    if (isMagnetic) {
      setCursorState('magnetic');
    } else if (isInteractive) {
      setCursorState('hover');
    } else {
      setCursorState('default');
    }
  }, []);

  const handleMouseDown = () => setCursorState('click');
  const handleMouseUp = () => setCursorState('hover');

  useEffect(() => {
    if (isTouchDevice) return;

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [moveCursor, handleMouseOver, isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  const variants = {
    default: {
      dot: { scale: 1, opacity: 1, backgroundColor: 'var(--accent-color)' },
      ring: { scale: 1, opacity: 0.3, borderWidth: '1.5px', borderColor: 'var(--accent-color)' }
    },
    hover: {
      dot: { scale: 0, opacity: 0 },
      ring: { 
        scale: 1.5, 
        opacity: 1, 
        backgroundColor: 'rgba(0, 245, 255, 0.15)', 
        borderWidth: '0px',
        backdropFilter: 'blur(4px)',
        mixBlendMode: 'difference' 
      }
    },
    magnetic: {
      dot: { scale: 0, opacity: 0 },
      ring: { 
        scale: 2, 
        opacity: 1, 
        backgroundColor: 'rgba(0, 245, 255, 0.2)', 
        borderWidth: '2px',
        borderColor: 'var(--accent-color)',
        backdropFilter: 'blur(2px)'
      }
    },
    click: {
      dot: { scale: 0.5, opacity: 1 },
      ring: { scale: 0.8, opacity: 0.8, borderWidth: '4px', borderColor: 'var(--accent-color)' }
    }
  };

  return (
    <div className="custom-cursor-container" style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 99999 }}>
      {/* Outer Ring */}
      <motion.div
        className="custom-cursor-outline"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          scaleX: smoothScaleX,
          scaleY: smoothScaleY,
        }}
        animate={variants[cursorState].ring}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="custom-cursor"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={variants[cursorState].dot}
        transition={{ type: 'spring', damping: 30, stiffness: 400 }}
      />
    </div>
  );
};

export default CustomCursor;

