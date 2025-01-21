"use client";
import { useState } from "react";
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';
import '@styles/header.css';

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header>
      <div className="container">
        <a className="logo-link" href="/">
          <motion.img 
            src={isMobile ? '/assets/logos/3.png' : '/assets/logos/2.png'} 
            alt="Logo" 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }} 
          />
        </a>
        <nav>
          <ul className={menuActive ? "active" : ""}>
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <a href="/">Главная</a>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="/clothes">Магазин</a>
            </motion.li>
            <motion.li
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <a href="/contact">Контакты</a>
            </motion.li>
          </ul>
          <button className={`burger ${menuActive ? "active" : ""}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  );
}
