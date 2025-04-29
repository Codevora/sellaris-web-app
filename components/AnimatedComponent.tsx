'use client';

import { motion } from 'framer-motion';

export const MotionDiv = motion.div;
export const MotionH1 = motion.h1;
export const MotionP = motion.p;
export const MotionButton = motion.button;

export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const FadeIn = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <MotionDiv
    variants={fadeIn}
    className={className}
  >
    {children}
  </MotionDiv>
);

export const StaggerContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <MotionDiv
    variants={staggerContainer}
    initial="hidden"
    animate="visible"
    className={className}
  >
    {children}
  </MotionDiv>
);