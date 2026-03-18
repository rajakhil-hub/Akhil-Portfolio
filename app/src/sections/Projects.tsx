import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import TextReveal from '../components/TextReveal';

const projects = [
  {
    number: '01',
    type: 'Digital Economy Platform',
    title: 'CAMPUS COIN',
    tags: ['Development', '2025'],
    description: 'A full-stack digital economy platform built with Flutter and Python for secure peer-to-peer transactions within university ecosystems.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
    link: '#',
  },
  {
    number: '02',
    type: 'AI Automation Agency',
    title: 'ORCHESTRATOR',
    tags: ['Development', '2025'],
    description: 'A web, app, and automation agency helping startups scale through AI-driven efficiency and intelligent workflows.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    link: '#',
  },
  {
    number: '03',
    type: 'Mobile Application',
    title: 'FLUTTER PROJECTS',
    tags: ['Development', '2024'],
    description: 'Cross-platform mobile applications built with Flutter and Dart, delivering smooth user experiences on iOS and Android.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    link: '#',
  },
  {
    number: '04',
    type: 'AI Solutions',
    title: 'GEN AI TOOLS',
    tags: ['Development', '2025'],
    description: 'Python-based AI tools and scripts for marketing automation, customer engagement, and lead generation.',
    image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80',
    link: '#',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function Projects() {
  const ref = useRef(null);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section 
      id="works" 
      ref={containerRef}
      className="relative bg-dark py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: backgroundY }}
      >
        {/* Gradient orbs */}
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full bg-cream/[0.02] blur-3xl"
          style={{ top: '10%', left: '-10%' }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-cream/[0.02] blur-3xl"
          style={{ bottom: '20%', right: '-5%' }}
          animate={{
            scale: [1.2, 1, 1.2],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-7xl font-bold text-cream/10 tracking-tight mb-4"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <TextReveal text="SELECTED WORKS /" delay={0.3} />
          </motion.h2>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <motion.span 
              className="text-sm text-cream/40 uppercase tracking-wider"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              (PROJECTS)
            </motion.span>
            <motion.p 
              className="text-cream/50 text-sm sm:text-base max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <TextReveal 
                text="Thoughtfully crafted digital experiences that blend utility with elegance." 
                delay={0.7}
              />
            </motion.p>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-20 sm:space-y-28 lg:space-y-36"
        >
          {projects.map((project, index) => (
            <motion.a
              key={project.number}
              href={project.link}
              variants={itemVariants}
              className="group block relative"
              onMouseEnter={() => setHoveredProject(project.number)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hover background glow */}
              <motion.div
                className="absolute inset-0 bg-cream/5 rounded-3xl -z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: hoveredProject === project.number ? 1 : 0,
                  scale: hoveredProject === project.number ? 1 : 0.9,
                }}
                transition={{ duration: 0.4 }}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Project Number */}
                <div className="lg:col-span-2 relative">
                  <motion.span 
                    className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold text-cream/10 block"
                    animate={{
                      color: hoveredProject === project.number ? 'rgba(232, 230, 225, 0.25)' : 'rgba(232, 230, 225, 0.1)',
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {project.number}
                  </motion.span>
                  
                  {/* Animated line from number */}
                  <motion.div
                    className="absolute top-1/2 left-full w-0 h-px bg-cream/20"
                    animate={{
                      width: hoveredProject === project.number ? '50px' : '0px',
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Project Content */}
                <div className="lg:col-span-10">
                  {/* Project Type */}
                  <motion.p 
                    className="text-cream/40 text-sm uppercase tracking-wider mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    {project.type}
                  </motion.p>

                  {/* Project Title & Tags */}
                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
                    <motion.h3 
                      className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-cream relative"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <TextReveal text={project.title} delay={0.4 + index * 0.1} />
                      
                      {/* Underline animation */}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-0.5 bg-cream"
                        initial={{ width: 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.4 }}
                      />
                    </motion.h3>
                    
                    <div className="flex items-center gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          className="px-3 py-1 text-xs text-cream/60 border border-cream/20 rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + tagIndex * 0.1, type: 'spring' }}
                          viewport={{ once: true }}
                          whileHover={{ 
                            backgroundColor: 'rgba(232, 230, 225, 0.1)',
                            scale: 1.05,
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    
                    <motion.span
                      className="text-cream/40"
                      animate={{
                        x: hoveredProject === project.number ? [0, 5, 0] : 0,
                        rotate: hoveredProject === project.number ? 45 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight size={20} strokeWidth={1.5} />
                    </motion.span>
                  </div>

                  {/* Project Image with advanced hover effects */}
                  <motion.div
                    className="relative overflow-hidden rounded-lg bg-dark-light"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  >
                    <div className="aspect-[16/10] overflow-hidden relative">
                      {/* Image with parallax */}
                      <motion.div
                        className="w-full h-full"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      
                      {/* Gradient overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                      />
                      
                      {/* Shine effect on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/10 to-transparent -translate-x-full"
                        animate={hoveredProject === project.number ? { x: '200%' } : { x: '-100%' }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                      />
                    </div>
                    
                    {/* Corner accents */}
                    <motion.div
                      className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-cream/30"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-cream/30"
                      initial={{ opacity: 0, scale: 0 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  {/* Project Description */}
                  <motion.p 
                    className="text-cream/50 text-sm sm:text-base mt-4 max-w-2xl"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    {project.description}
                  </motion.p>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
