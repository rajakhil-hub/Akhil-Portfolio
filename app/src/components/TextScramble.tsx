import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function TextScramble({ text, className = '', delay = 0 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState('');
  const [_isComplete, setIsComplete] = useState(false);
  const frameRef = useRef<number>(undefined);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let iteration = 0;
      const maxIterations = text.length * 3;
      
      const animate = () => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration / 3) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        iteration++;

        if (iteration < maxIterations) {
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayText(text);
          setIsComplete(true);
        }
      };

      animate();
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, delay]);

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText || text.split('').map(() => ' ').join('')}
    </motion.span>
  );
}
