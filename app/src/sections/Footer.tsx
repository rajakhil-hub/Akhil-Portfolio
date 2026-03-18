import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';

const menuLinks = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#services' },
  { label: 'Works', href: '#works' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/akhil-raj-00a12b334' },
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [currentTime, setCurrentTime] = useState('');
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      });
      setCurrentTime(timeString + ', IST');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#') {
      e.preventDefault();
      scrollToTop();
      return;
    }
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.4,
      },
    }),
  };

  return (
    <footer className="relative bg-cream py-12 sm:py-16 lg:py-20 border-t border-dark/10 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-dark/10 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </div>

      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
        >
          {/* Menu */}
          <div>
            <motion.h3 
              className="text-sm font-semibold text-dark mb-4 uppercase tracking-wider"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Menu
            </motion.h3>
            <ul className="space-y-2">
              {menuLinks.map((link, index) => (
                <motion.li 
                  key={link.label}
                  custom={index}
                  variants={linkVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  <motion.a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-dark/60 text-sm relative inline-block"
                    onMouseEnter={() => setHoveredLink(link.label)}
                    onMouseLeave={() => setHoveredLink(null)}
                    whileHover={{ x: 5, color: 'rgba(26, 26, 26, 1)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-px bg-dark"
                      initial={{ width: 0 }}
                      animate={{ width: hoveredLink === link.label ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <motion.h3 
              className="text-sm font-semibold text-dark mb-4 uppercase tracking-wider"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Socials
            </motion.h3>
            <ul className="space-y-2">
              {socialLinks.map((link, index) => (
                <motion.li 
                  key={link.label}
                  custom={index}
                  variants={linkVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                >
                  <motion.a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark/60 text-sm relative inline-flex items-center gap-2 group"
                    whileHover={{ x: 5, color: 'rgba(26, 26, 26, 1)' }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                    <motion.span
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      ↗
                    </motion.span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Local Time */}
          <div className="sm:col-span-2 lg:col-span-2 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-sm font-semibold text-dark mb-2 uppercase tracking-wider">
                Local Time
              </h3>
              <motion.p 
                className="text-dark/60 text-sm font-mono"
                key={currentTime}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {currentTime}
              </motion.p>
            </motion.div>

            {/* Back to Top Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
              <MagneticButton
                onClick={scrollToTop}
                className="w-12 h-12 rounded-full bg-dark/10 hover:bg-dark/20 flex items-center justify-center text-dark/60 hover:text-dark transition-all duration-300"
                strength={0.5}
              >
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowUp size={20} strokeWidth={2} />
                </motion.div>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 sm:mt-16 pt-6 border-t border-dark/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <motion.p 
            className="text-dark/40 text-xs"
            whileHover={{ color: 'rgba(26, 26, 26, 0.7)' }}
          >
            © {new Date().getFullYear()} Akhil Raj. All rights reserved.
          </motion.p>
          <motion.p 
            className="text-dark/40 text-xs"
            whileHover={{ color: 'rgba(26, 26, 26, 0.7)' }}
          >
            Built with React, Tailwind CSS & Framer Motion
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
}
