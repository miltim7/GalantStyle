"use client";
import '../../styles/header.css';
import { useEffect } from 'react';

export default function Header() {
  useEffect(() => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav ul');
    if (burger && nav) {
      burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
      });
    }
  }, []);

  return (
    <header>
      <div className="container">
        <h1>Galant Style</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/clothes">Магазин</a></li>
            <li><a href="/about">О нас</a></li>
            <li><a href="/contact">Контакты</a></li>
          </ul>
          <button className="burger">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </div>
    </header>
  );
}
