import React from 'react';
import { motion } from 'framer-motion';

/**
 * Fades + lifts content into view on scroll, mirroring the original
 * site's IntersectionObserver reveal but with spring physics.
 */
const AnimatedSection = ({ children, id, delay = 0, ...rest }) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
