import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import TextReveal from '../components/TextReveal';

const skillCategories = [
  {
    title: 'Languages & Tools',
    skills: ['Python', 'Dart', 'JavaScript', 'TypeScript', 'SQL', 'Git', 'Postman', 'Docker'],
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['React', 'Flutter', 'Node.js', 'Express.js', 'TailwindCSS', 'Firebase'],
  },
  {
    title: 'Core Concepts',
    skills: ['AI & ML', 'Generative AI', 'Data Structures', 'REST APIs', 'System Design'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function About() {
  const ref = useRef(null);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative bg-dark py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(232, 230, 225, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232, 230, 225, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cream/10 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Large Heading with character animation */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <motion.h2 
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-cream/10 tracking-tight leading-[0.9]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              >
                <TextReveal text="DEVELOPER" delay={0.4} />
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              >
                <TextReveal text="CREATOR/" delay={0.6} />
              </motion.span>
            </div>
          </motion.h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="lg:col-span-5"
            style={{ y: imageY }}
          >
            <motion.div 
              className="aspect-[3/4] rounded-xl overflow-hidden bg-dark-light relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              {/* Animated border */}
              <motion.div
                className="absolute inset-0 rounded-xl border-2 border-cream/0 z-10 pointer-events-none"
                whileHover={{ borderColor: 'rgba(232, 230, 225, 0.2)' }}
                transition={{ duration: 0.3 }}
              />
              
              <motion.img
                src="/akhil_image.jpeg"
                alt="Akhil Raj"
                className="w-full h-full object-cover"
                initial={{ filter: 'grayscale(100%)' }}
                whileHover={{ filter: 'grayscale(0%)', scale: 1.05 }}
                transition={{ duration: 0.7 }}
              />
              
              {/* Overlay with stats */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/90 to-transparent p-6"
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex gap-6">
                  <div>
                    <motion.span 
                      className="text-2xl font-bold text-cream block"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      3+
                    </motion.span>
                    <span className="text-cream/50 text-xs uppercase tracking-wider">Years Exp</span>
                  </div>
                  <div>
                    <motion.span 
                      className="text-2xl font-bold text-cream block"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      10+
                    </motion.span>
                    <span className="text-cream/50 text-xs uppercase tracking-wider">Projects</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div 
            className="lg:col-span-7"
            style={{ y: textY }}
          >
            {/* Quote with typewriter effect */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="text-xl sm:text-2xl lg:text-3xl text-cream/80 font-light leading-relaxed mb-12"
            >
              <TextReveal 
                text="I'm a software engineer driven by a passion for turning ideas into clean, intuitive digital experiences." 
                delay={0.5}
                staggerDelay={0.03}
              />
            </motion.p>

            {/* Skills Grid with 3D flip animation */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="mb-12"
              style={{ perspective: '1000px' }}
            >
              <motion.h3 
                className="text-sm text-cream/40 uppercase tracking-wider mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                Skills
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {skillCategories.map((category, catIndex) => (
                  <motion.div 
                    key={catIndex} 
                    variants={itemVariants}
                    className="group"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.h4 
                      className="text-xs text-cream/30 uppercase tracking-wider mb-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.7 + catIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {category.title}
                    </motion.h4>
                    <ul className="space-y-2">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.li
                          key={skillIndex}
                          className="text-cream/70 text-sm relative cursor-default overflow-hidden"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + catIndex * 0.1 + skillIndex * 0.05 }}
                          viewport={{ once: true }}
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          whileHover={{ x: 8, color: 'rgba(232, 230, 225, 1)' }}
                        >
                          <motion.span
                            className="relative z-10"
                          >
                            {skill}
                          </motion.span>
                          
                          {/* Animated underline */}
                          <motion.span
                            className="absolute bottom-0 left-0 h-px bg-cream/40"
                            initial={{ width: 0 }}
                            animate={{ width: hoveredSkill === skill ? '100%' : 0 }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          {/* Glow effect */}
                          <motion.span
                            className="absolute inset-0 bg-cream/5 -z-0"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: hoveredSkill === skill ? 1 : 0,
                              scale: hoveredSkill === skill ? 1 : 0.8,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* About Text with reveal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="border-t border-cream/10 pt-8"
            >
              <motion.span 
                className="text-xs text-cream/40 uppercase tracking-wider mb-4 block"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                (About Me)
              </motion.span>
              <div className="space-y-4 text-cream/60 text-sm sm:text-base leading-relaxed">
                {[
                  "I'm a full-stack developer and founder of Orchestrator, a web, app, and automation agency helping startups scale through AI-driven efficiency. I build fast, modern applications mostly with Flutter, React, and Python because they just work.",
                  "I work with businesses and startups to turn ideas into reliable, user-friendly products built to scale. My expertise spans across mobile development with Flutter, web development with React, and AI automation with Python.",
                  "I've been building applications long enough to have strong opinions about things that don't matter to most people, like whether a transition should be 150ms or 200ms. (It's 150ms, btw). Build the thing, make it work, make it feel good. That's the gig.",
                ].map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ color: 'rgba(232, 230, 225, 0.8)' }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
