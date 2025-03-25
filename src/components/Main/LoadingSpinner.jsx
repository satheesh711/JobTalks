import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <motion.div
        className="spinner-border text-primary"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;