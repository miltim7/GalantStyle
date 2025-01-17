export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import '../../../styles/products.css';
import Header from '../../components/Header';

export default async function ProductDetailPage({ params }) {
  const { itemType, id } = params;
  const clothesRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/data/clothes.json`, { cache: 'no-store' });
  const accessoriesRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/data/accessories.json`, { cache: 'no-store' });
  const clothesData = await clothesRes.json();
  const accessoriesData = await accessoriesRes.json();
  const currentData = itemType === 'accessories' ? accessoriesData : clothesData;
  const product = currentData.find(p => p.id === parseInt(id));
  if (!product) {
    notFound();
  }
  return (
    <>
      <Header />
      <main style={{ marginTop: '100px' }}>
        <div style={{ marginLeft: '50px', marginRight: '50px' }}>
          <h2>{product.name}</h2>
          <p style={{ fontStyle: 'italic' }}>{product.description}</p>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
            {product.details.images.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`${product.name} detail ${index}`}
                style={{ width: '300px', objectFit: 'cover' }}
              />
            ))}
          </div>
          <h4>Цена: {product.price}</h4>
          {product.details.sizes && <p>Размеры: {product.details.sizes.join(', ')}</p>}
          {product.details.colors && <p>Цвета: {product.details.colors.join(', ')}</p>}
          <p>Материал: {product.details.material}</p>
          <p style={{ marginTop: '10px' }}>{product.details.fullDescription}</p>
          <button style={{ marginTop: '20px' }}>Купить</button>
        </div>
      </main>
    </>
  );
}
