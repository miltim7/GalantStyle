"use client";
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { FaShippingFast, FaThumbsUp, FaDollarSign, FaHeadset } from 'react-icons/fa';
import '@styles/advantages.css';

export default function Advantages() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    if (inView) {
      setAnimationPlayed(true);
    }
  }, [inView]);

  return (
    <section className="advantages" ref={ref}>
      <h2 className="title">Почему выбирают нас?</h2>
      <img src="../assets/logos/4.png" alt="Logo" className="logo" />
      
      <div className="advantages-list">
        {animationPlayed && (
          <>
            <motion.div className="advantage" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <FaDollarSign className="icon" />
              <span className="text">Только оригинал</span>
            </motion.div>
            <motion.div className="advantage" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <FaThumbsUp className="icon" />
              <span className="text">Легкость покупки</span>
            </motion.div>
            <motion.div className="advantage" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <FaShippingFast className="icon" />
              <span className="text">Бесплатная доставка по Баку</span>
            </motion.div>
            <motion.div className="advantage" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
              <FaHeadset className="icon" />
              <span className="text">Индивидуальный подход</span>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
