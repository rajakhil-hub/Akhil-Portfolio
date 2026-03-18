import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { useRef } from 'react';
import TextScramble from '../components/TextScramble';
import MagneticButton from '../components/MagneticButton';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax transforms
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  
  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  const handleContactClick = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollDown = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Letter animation for name
  const nameLetters = 'AKHIL RAJ'.split('');
  
  const letterContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariant: import('framer-motion').Variants = {
    hidden: {
      opacity: 0,
      y: 100,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen bg-cream overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(26, 26, 26, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(26, 26, 26, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        
        {/* Floating orbs */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-dark/[0.02]"
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 pt-20 sm:pt-24 relative z-10">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[calc(100vh-6rem)]">
          
          {/* Left Column - Text Content */}
          <motion.div 
            className="lg:col-span-5 flex flex-col justify-center"
            style={{ y: springY1 }}
          >
            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-6 sm:mb-8"
            >
              <motion.button
                onClick={handleScrollDown}
                className="text-dark/60 hover:text-dark transition-colors relative group"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                >
                  <ArrowDown size={24} strokeWidth={1.5} />
                </motion.div>
                <motion.span
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Scroll
                </motion.span>
              </motion.button>
            </motion.div>

            {/* Description with word reveal */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-base sm:text-lg text-dark/80 leading-relaxed max-w-md mb-8"
            >
              <TextScramble 
                text="I build AI-powered, modern web and mobile applications that help businesses scale, available for freelance projects worldwide." 
                delay={800}
              />
            </motion.p>

            {/* Contact Button with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <MagneticButton
                onClick={handleContactClick}
                className="group inline-flex items-center gap-2 bg-dark text-cream px-6 py-3 rounded-full text-sm font-medium w-fit hover:bg-dark/90 transition-colors duration-300 relative overflow-hidden"
                strength={0.4}
              >
                <motion.span
                  className="absolute inset-0 bg-cream/10"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">CONTACT</span>
                <motion.span
                  className="relative z-10 inline-block"
                  whileHover={{ x: 3, y: -3, rotate: 45 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight size={16} strokeWidth={2} />
                </motion.span>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div 
            className="lg:col-span-7 flex items-center justify-center lg:justify-end"
            style={{ y: springY2 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-full max-w-lg lg:max-w-xl"
              style={{ perspective: '1000px' }}
            >
              {/* Image frame with animated border */}
              <motion.div 
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-dark/5"
                whileHover={{ scale: 1.02, rotateY: 5 }}
                transition={{ duration: 0.5 }}
              >
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(26,26,26,0.1), transparent)',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '200% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                
                <motion.img
                  src="/akhil_image.jpeg"
                  alt="Akhil Raj"
                  className="w-full h-full object-cover"
                  initial={{ filter: 'grayscale(100%)' }}
                  whileHover={{ filter: 'grayscale(0%)', scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                />
                
                {/* Overlay gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                />
              </motion.div>
              
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-dark text-cream px-4 py-2 rounded-full text-xs font-medium"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                whileHover={{ scale: 1.1 }}
              >
                Available for Work
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Large Name Typography - Bottom with letter animation */}
        <motion.div
          style={{ opacity, scale }}
          className="absolute bottom-8 sm:bottom-12 left-6 sm:left-8 lg:left-12 xl:left-16 right-6 sm:right-8 pointer-events-none"
        >
          <motion.h1 
            className="text-[12vw] sm:text-[10vw] lg:text-[9vw] font-bold text-dark leading-[0.85] tracking-tighter flex flex-wrap"
            variants={letterContainer}
            initial="hidden"
            animate="visible"
            style={{ perspective: '1000px' }}
          >
            {nameLetters.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariant}
                className="inline-block"
                style={{ 
                  transformStyle: 'preserve-3d',
                  marginRight: letter === ' ' ? '0.3em' : '0',
                }}
                whileHover={{ 
                  scale: 1.1, 
                  color: '#666',
                  rotateY: 10,
                  transition: { duration: 0.2 }
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        {/* Available for Work Badge */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 sm:bottom-12 right-6 sm:right-8 lg:right-12 xl:right-16 text-right"
        >
          <motion.p 
            className="text-xs sm:text-sm text-dark/60 uppercase tracking-wider mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            Available for work
          </motion.p>
          <motion.p 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 100 }}
          >
            <TextScramble text="MAR'26" delay={1500} />
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
