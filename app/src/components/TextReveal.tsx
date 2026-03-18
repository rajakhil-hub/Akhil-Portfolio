import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export default function TextReveal({ 
  text, 
  className = '', 
  delay = 0,
  staggerDelay = 0.03,
  once = true
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-50px' });
  
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (_i = 1) => ({
      opacity: 1,
      transition: { 
        staggerChildren: staggerDelay, 
        delayChildren: delay,
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ perspective: '1000px' }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className="mr-[0.25em] inline-block"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
