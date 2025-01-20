import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from './components/Header';
import Footer from './components/Footer';
import '../styles/landing.css';

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="../assets/favicon.png" type="image/png" />
      </Head>
      <Header />
      <main>

        <section className="hero">
          <div>
            <h1>GALANT STYLE</h1>
            <span>искусство носить вечную классику</span>
            <Link href="/catalog" className="btn">ПЕРЕЙТИ В КАТАЛОГ</Link>
          </div>
        </section>

        <section className="mini-blocks">
          <div className="mini-block">
            <img src="/path/to/icon1.png" alt="Icon 1" />
            <p>Рыба 1</p>
          </div>
          <div className="mini-block">
            <img src="/path/to/icon2.png" alt="Icon 2" />
            <p>Рыба 2</p>
          </div>
          <div className="mini-block">
            <img src="/path/to/icon3.png" alt="Icon 3" />
            <p>Рыба 3</p>
          </div>
        </section>

        <section className="about-us">
          <h2>О нас</h2>
          <div className="about-content">
            <img src="/path/to/about1.jpg" alt="About image 1" />
            <img src="/path/to/about2.jpg" alt="About image 2" />
            <p>Надписи о нас...</p>
          </div>
        </section>

        <section className="popular-products">
          <h2>Популярные товары</h2>
          <div className="products-grid">
            <div className="product-item">
              <img src="/path/to/product1.jpg" alt="Product 1" />
              <p>Описание товара 1</p>
            </div>
            <div className="product-item">
              <img src="/path/to/product2.jpg" alt="Product 2" />
              <p>Описание товара 2</p>
            </div>
            <div className="product-item">
              <img src="/path/to/product3.jpg" alt="Product 3" />
              <p>Описание товара 3</p>
            </div>
          </div>
        </section>

        <section className="feedback-form">
          <h2>Свяжитесь с нами</h2>
          <form>
            <input type="text" placeholder="Ваше имя" required />
            <input type="email" placeholder="Ваш email" required />
            <textarea placeholder="Ваше сообщение" required></textarea>
            <button type="submit" className="btn">Отправить</button>
          </form>
        </section>

      </main>
      <Footer />
    </>
  );
}
