"use client";
import Link from 'next/link';
import '@styles/productCards.css';

export default function ProductCards({ currentItems, itemType }) {
  return (
    <section className="products">
      {currentItems.length > 0 ? (
        currentItems.map((product, idx) => (
          <Link href={`/${itemType}/${product.id}`}>
            <div key={`${product.id}-${idx}`} className="product">
              <img
                src={product.details?.images?.[0] || ''}
                alt={product.name}
                onLoad={e => e.target.classList.add('loaded')}
                style={{ cursor: 'pointer' }}
              />
              <div>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div>
                  <span>${product.price}</span>
                  <span className='old-price'>{(product.price.replace('$', '') * 1.2) + ' $'}</span>
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>Ничего не найдено</p>
      )}
    </section>
  );
}