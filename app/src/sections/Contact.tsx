import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import MagneticButton from '../components/MagneticButton';
import TextReveal from '../components/TextReveal';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ email: '', message: '' });
    
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative bg-cream py-20 sm:py-28 lg:py-36 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-dark/5"
            style={{
              width: 300 + i * 200,
              height: 300 + i * 200,
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 30 + i * 10, repeat: Infinity, ease: 'linear' },
              scale: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}
        
        {/* Floating dots */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute w-2 h-2 bg-dark/10 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Sparkles size={20} className="text-dark/40" />
            </motion.div>
            <span className="text-xs text-dark/40 uppercase tracking-wider">Get in touch</span>
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark leading-[0.95] tracking-tight mb-4">
            <div className="overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              >
                <TextReveal text="Let's" delay={0.4} />
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '100%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              >
                <TextReveal text="Make It Happen" delay={0.6} />
              </motion.span>
            </div>
          </h2>
          
          <motion.p
            className="text-dark/60 text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Have a project in mind?
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <a
              href="mailto:akhil_raj.sias24@krea.ac.in"
              className="text-dark/70 hover:text-dark text-sm transition-colors duration-300 underline underline-offset-4"
            >
              akhil_raj.sias24@krea.ac.in
            </a>
            <span className="hidden sm:inline text-dark/30">|</span>
            <a
              href="https://www.linkedin.com/in/akhil-raj-00a12b334"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark/70 hover:text-dark text-sm transition-colors duration-300 underline underline-offset-4"
            >
              LinkedIn
            </a>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="max-w-xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative"
            >
              <motion.label
                className="absolute left-4 text-xs text-dark/40 uppercase tracking-wider transition-all duration-300 pointer-events-none"
                animate={{
                  y: focusedField === 'email' || formData.email ? -24 : 14,
                  scale: focusedField === 'email' || formData.email ? 0.85 : 1,
                  color: focusedField === 'email' ? 'rgba(26, 26, 26, 0.6)' : 'rgba(26, 26, 26, 0.4)',
                }}
              >
                Your email address
              </motion.label>
              <motion.input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                className="w-full px-4 sm:px-6 py-4 bg-dark/5 border-2 border-dark/10 rounded-lg text-dark focus:outline-none transition-all duration-300 text-sm sm:text-base"
                whileFocus={{ 
                  borderColor: 'rgba(26, 26, 26, 0.3)',
                  backgroundColor: 'rgba(26, 26, 26, 0.07)',
                }}
              />
              {/* Focus line animation */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-dark"
                initial={{ width: 0 }}
                animate={{ width: focusedField === 'email' ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Message Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative"
            >
              <motion.label
                className="absolute left-4 text-xs text-dark/40 uppercase tracking-wider transition-all duration-300 pointer-events-none"
                animate={{
                  y: focusedField === 'message' || formData.message ? -24 : 14,
                  scale: focusedField === 'message' || formData.message ? 0.85 : 1,
                  color: focusedField === 'message' ? 'rgba(26, 26, 26, 0.6)' : 'rgba(26, 26, 26, 0.4)',
                }}
              >
                Tell me about your business or project
              </motion.label>
              <motion.textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                rows={5}
                className="w-full px-4 sm:px-6 py-4 bg-dark/5 border-2 border-dark/10 rounded-lg text-dark focus:outline-none transition-all duration-300 resize-none text-sm sm:text-base"
                whileFocus={{ 
                  borderColor: 'rgba(26, 26, 26, 0.3)',
                  backgroundColor: 'rgba(26, 26, 26, 0.07)',
                }}
              />
              {/* Focus line animation */}
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-dark"
                initial={{ width: 0 }}
                animate={{ width: focusedField === 'message' ? '100%' : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <MagneticButton
                className="w-full px-6 py-4 bg-dark text-cream rounded-lg font-medium text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-dark/90 transition-colors duration-300 disabled:opacity-70 relative overflow-hidden group"
                strength={0.2}
              >
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/10 to-transparent -translate-x-full"
                  animate={!isSubmitting && !submitted ? { x: ['-100%', '200%'] } : {}}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                
                <span className="relative z-10">
                  {isSubmitting ? (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Sending...
                    </motion.span>
                  ) : submitted ? (
                    'Message Sent!'
                  ) : (
                    'Get a quote'
                  )}
                </span>
                
                {!isSubmitting && !submitted && (
                  <motion.span
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send size={16} strokeWidth={2} />
                  </motion.span>
                )}
                
                {submitted && (
                  <motion.span
                    className="relative z-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    ✓
                  </motion.span>
                )}
              </MagneticButton>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
