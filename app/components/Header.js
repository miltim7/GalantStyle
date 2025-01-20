"use client";
import '../../styles/header.css';

export default function Header() {
  return (
    <header>
      <div className="container">
        <a className='logo-link' href='/'><img src='../assets/logos/1.png'/></a>
        <nav>
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/clothes">Магазин</a></li>
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