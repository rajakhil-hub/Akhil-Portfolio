import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import TextReveal from '../components/TextReveal';

const services = [
  {
    number: '01',
    title: 'Full-Stack Development',
    description: 'From frontend interactions to backend APIs, I build complete web and mobile solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.',
    skills: ['React, Node.js, Express.js', 'Flutter, Dart, Python', 'REST APIs, Firebase, Docker'],
  },
  {
    number: '02',
    title: 'AI & Automation',
    description: 'I specialize in building AI-driven automation solutions that help businesses scale faster. From marketing automation to intelligent workflows, I leverage cutting-edge AI tools to optimize operations.',
    skills: ['Python, Generative AI', 'Marketing Automation', 'AI-integrated Workflows'],
  },
  {
    number: '03',
    title: 'Mobile App Development',
    description: 'I build cross-platform mobile applications using Flutter and Dart. From concept to deployment, I create smooth, responsive apps that deliver exceptional user experiences on both iOS and Android.',
    skills: ['Flutter, Dart', 'iOS & Android', 'UI/UX Implementation'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function Services() {
  const ref = useRef(null);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <section 
      id="services" 
      ref={containerRef}
      className="relative bg-dark py-20 sm:py-28 lg:py-36 overflow-hidden"
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />
        
        {/* Floating shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-cream/5 rounded-full"
            style={{
              left: `${10 + i * 20}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 20 + i * 5, repeat: Infinity, ease: 'linear' },
              scale: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}
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
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-cream/10 tracking-tight"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TextReveal text="What I Do /" delay={0.3} />
            </motion.h2>
            <motion.span 
              className="text-sm text-cream/40 uppercase tracking-wider"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              (Services)
            </motion.span>
          </div>
          <motion.p 
            className="text-cream/60 text-base sm:text-lg max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <TextReveal 
              text="I specialize in building fast, reliable, and user-friendly full-stack applications with AI integration. I help small businesses and startups turn ideas into high-quality products that actually work and scale." 
              delay={0.6}
              staggerDelay={0.02}
            />
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16 sm:space-y-20 lg:space-y-24"
        >
          {services.map((service, serviceIndex) => (
            <motion.div
              key={service.number}
              variants={itemVariants}
              className="relative"
            >
              {/* Animated divider line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-cream/20 via-cream/10 to-transparent origin-left"
                variants={lineVariants}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 pt-16 sm:pt-20">
                {/* Service Number */}
                <div className="lg:col-span-2">
                  <motion.span 
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold text-cream/20 block"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, color: 'rgba(232, 230, 225, 0.4)' }}
                  >
                    ({service.number})
                  </motion.span>
                </div>

                {/* Service Content */}
                <div className="lg:col-span-10">
                  <motion.h3 
                    className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-cream mb-4 sm:mb-6"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <TextReveal text={service.title} delay={0.3 + serviceIndex * 0.1} />
                  </motion.h3>
                  
                  <motion.p 
                    className="text-cream/60 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-3xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Skills with staggered animation */}
                  <div className="flex flex-wrap gap-3 sm:gap-4">
                    {service.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        className="flex items-center gap-2 sm:gap-3 group cursor-default"
                        initial={{ opacity: 0, x: -20, scale: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ 
                          delay: 0.4 + skillIndex * 0.1, 
                          duration: 0.4,
                          type: 'spring',
                          stiffness: 100
                        }}
                        viewport={{ once: true }}
                        whileHover={{ x: 8, scale: 1.05 }}
                      >
                        <motion.span 
                          className="text-cream/30 text-xs font-mono"
                          whileHover={{ color: 'rgba(232, 230, 225, 0.6)' }}
                        >
                          0{skillIndex + 1}
                        </motion.span>
                        <motion.span 
                          className="text-cream/80 text-sm sm:text-base relative"
                          whileHover={{ color: 'rgba(232, 230, 225, 1)' }}
                        >
                          {skill}
                          <motion.span
                            className="absolute -bottom-1 left-0 h-px bg-cream/40"
                            initial={{ width: 0 }}
                            whileHover={{ width: '100%' }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
