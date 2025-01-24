"use client";
import { useState, useEffect } from "react";
import { useMediaQuery } from 'react-responsive';
import { motion } from 'framer-motion';
import '@styles/header.css';

export default function Header() {
  const [menuActive, setMenuActive] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerPosition, setHeaderPosition] = useState(40);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const toggleMenu = () => {
    setMenuActive(!menuActive);
    if (!menuActive) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > lastScrollY && scrollY > 1) {
        setVisible(false);
        setHeaderPosition(0);
      } else if (scrollY < lastScrollY) {
        setVisible(true);

        if (scrollY > 40) {
          setHeaderPosition(0);
        } else {
          setHeaderPosition(40);
        }
      }

      setLastScrollY(scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header style={{ transform: visible ? `translateY(${headerPosition}px)` : 'translateY(-100%)', transition: 'transform 0.3s ease' }}>
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
