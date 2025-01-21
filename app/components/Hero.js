'use client';
import { motion } from 'framer-motion';
import styles from '@styles/landing/Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.2 }}
        >
          GALANT STYLE
        </motion.h1>
        <motion.span 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          ~ Искусство носить вечную классику
        </motion.span>
        <motion.a 
          href="/catalog" 
          className="btn" 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          ПЕРЕЙТИ В КАТАЛОГ <img className='go-catalog' src='../assets/landing/right-arrow.png' alt="Arrow" />
        </motion.a>
      </div>
    </section>
  );
}
