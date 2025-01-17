"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import '../../styles/products.css';
import Header from '../components/Header';

const clothesCategories = ["Все","Футболки","Брюки","Обувь","Джемпер","Рубашки","Носки"];
const accessoriesCategories = ["Все","Чехлы для телефонов","Кепки","Барсетки","Кошельки"];

export default function ProductsPage() {
  const itemsPerPage = 20;
  const params = useParams();
  const initialItemType = params.itemType === "accessories" ? "accessories" : "clothes";
  const [itemType, setItemType] = useState(initialItemType);
  const searchParams = useSearchParams();
  const pageQuery = searchParams.get('page') || '1';
  const catQuery = searchParams.get('cat') || 'Все';
  const currentPage = parseInt(pageQuery);
  const [categories, setCategories] = useState(itemType === "accessories" ? accessoriesCategories : clothesCategories);
  const [selectedCategory, setSelectedCategory] = useState(catQuery);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (itemType === "accessories") {
      setCategories(accessoriesCategories);
    } else {
      setCategories(clothesCategories);
    }
  }, [itemType]);

  // Обновляем выбранную категорию при смене query или типа
  useEffect(() => {
    setSelectedCategory(catQuery);
  }, [catQuery, itemType]);

  useEffect(() => {
    const fileName = itemType === "accessories" ? "accessories.json" : "clothes.json";
    fetch(`/data/${fileName}`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, [itemType]);

  useEffect(() => {
    let list = products.filter(p => {
      let priceNum = parseFloat(p.price.replace(/[^\d.]/g, ''));
      if (isNaN(priceNum)) priceNum = 0;
      let min = parseFloat(minPrice);
      if (isNaN(min)) min = 0;
      let max = parseFloat(maxPrice);
      if (isNaN(max)) max = Infinity;
      let inRange = priceNum >= min && priceNum <= max;
      let s = search.toLowerCase().replace(/\s/g, '').trim();
      let n = p.name.toLowerCase().replace(/\s/g, '').trim();
      let inSearch = s === '' || n.includes(s);
      let inCategory = selectedCategory === 'Все' || p.type === selectedCategory;
      return inRange && inSearch && inCategory;
    });
    setFilteredProducts(list);
  }, [search, minPrice, maxPrice, selectedCategory, products]);

  // Обновляем URL при смене параметров фильтра и категории
  useEffect(() => {
    const paramsObj = new URLSearchParams();
    paramsObj.set('page', '1');
    paramsObj.set('cat', selectedCategory);
    router.replace(`/${itemType}?${paramsObj.toString()}`);
  }, [itemType, selectedCategory, search, minPrice, maxPrice, router]);

  useEffect(() => {
    const items = document.querySelectorAll('.product');
    items.forEach((el, i) => {
      el.classList.remove('animate');
      void el.offsetWidth;
      el.style.transitionDelay = `${i * 0.09}s`;
      el.classList.add('animate');
    });
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    const paramsObj = new URLSearchParams();
    paramsObj.set('page', page.toString());
    paramsObj.set('cat', selectedCategory);
    router.push(`/${itemType}?${paramsObj.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemTypeChange = (value) => {
    const paramsObj = new URLSearchParams();
    paramsObj.set('page', '1');
    paramsObj.set('cat', 'Все');
    router.push(`/${value}?${paramsObj.toString()}`);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
  };

  return (
    <>
      <Header />
      <main style={{ marginTop: '100px' }}>
        <div style={{ marginLeft: '50px', marginRight: '50px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <select
              value={itemType}
              onChange={e => handleItemTypeChange(e.target.value)}
              style={{ padding: '10px', width: '150px' }}
            >
              <option value="clothes">Clothes</option>
              <option value="accessories">Accessories</option>
            </select>
            <input
              type="text"
              placeholder="Поиск по названию"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ padding: '10px', flex: '1' }}
            />
            <input
              type="number"
              placeholder="Мин. цена"
              value={minPrice}
              onChange={e => setMinPrice(e.target.value)}
              style={{ padding: '10px', width: '100px' }}
            />
            <input
              type="number"
              placeholder="Макс. цена"
              value={maxPrice}
              onChange={e => setMaxPrice(e.target.value)}
              style={{ padding: '10px', width: '100px' }}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  padding: '10px',
                  backgroundColor: selectedCategory === cat ? '#D4AF37' : '#fff',
                  border: '1px solid #000',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
          <section className="products">
            {currentItems.length > 0 ? (
              currentItems.map((product, idx) => (
                <div key={`${product.id}-${idx}`} className="product">
                  <Link href={`/${itemType}/${product.id}`}>
                    <img
                      src={product.details?.images?.[0] || ''}
                      alt={product.name}
                      onLoad={e => e.target.classList.add('loaded')}
                      style={{ cursor: 'pointer' }}
                    />
                  </Link>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <button>Купить за {product.price}</button>
                </div>
              ))
            ) : (
              <p>Ничего не найдено</p>
            )}
          </section>
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                style={{ marginRight: '10px' }}
              >
                Предыдущая
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={`page-button-${i + 1}`}
                  onClick={() => handlePageChange(i + 1)}
                  style={{
                    margin: '0 5px',
                    fontWeight: currentPage === (i + 1) ? 'bold' : 'normal'
                  }}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{ marginLeft: '10px' }}
              >
                Следующая
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
