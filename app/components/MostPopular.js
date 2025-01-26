"use client";
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import '@styles/most-popular.css';

export default function MostPopular() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/data/most-popular.json');
      const data = await response.json();
      setProducts(data.slice(0, 4));
    }

    fetchData();
  }, []);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="most-popular-container" ref={ref}>
      <h2 className={`most-popular-title ${inView ? 'animate' : ''}`}>Самые популярные товары</h2>
      <div className="product-cards">
        {products.map((product, index) => {
          const oldPrice = (parseFloat(product.price.replace('$', '')) * 1.2).toFixed(2) + ' $';
          return (
            <div className={`product-card ${inView ? 'animate animate-delay-' + index : ''}`} key={product.id}>
              <div className="product-image-container">
                <img src={product.details.images[0]} alt={product.name} className="product-image"/>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-title">{product.name}</h3>
                <div className="product-card-price-container">
                  <span className="product-card-price">{product.price}</span>
                  <span className="product-card-old-price">{oldPrice}</span>
                </div>
                <button className="product-card-button">ЗАКАЗАТЬ</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}