"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import Header from '@components/Header';
import UtilityBar from '@components/UtilityBar';
import Filters from '@components/Filters';
import Search from '@components/Search';
import ProductCards from '@components/ProductCards';
import Footer from '@components/Footer';
import '@styles/products.css';
import '@styles/global.css';

export default function ProductsPage() {
  const itemsPerPage = 20;
  const params = useParams();
  const initialItemType = params.itemType === "accessories" ? "accessories" : "clothes";
  const [itemType, setItemType] = useState(initialItemType);
  const searchParams = useSearchParams();
  const pageQuery = searchParams.get('page') || '1';
  const catQuery = searchParams.get('cat') || 'Все';
  const genderQuery = searchParams.get('gender') || 'Все';
  const currentPage = parseInt(pageQuery);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(catQuery);
  const [selectedGender, setSelectedGender] = useState(genderQuery);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      const fileName = itemType === "accessories" ? "accessories.json" : "clothes.json";
      const response = await fetch(`/data/${fileName}`, { cache: 'no-store' });
      const data = await response.json();
      const uniqueCategories = ["Все", ...new Set(data.map(item => item.type))];
      setCategories(uniqueCategories);
      setProducts(data);
      setFilteredProducts(data);
    }
    fetchCategories();
  }, [itemType]);

  useEffect(() => {
    setSelectedCategory(catQuery);
  }, [catQuery]);

  useEffect(() => {
    setSelectedGender(genderQuery);
  }, [genderQuery]);

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
      let inGender = selectedGender === 'Все' || p.gender === selectedGender;
      return inRange && inSearch && inCategory && inGender;
    });
    setFilteredProducts(list);
  }, [search, minPrice, maxPrice, selectedCategory, selectedGender, products]);

  useEffect(() => {
    const paramsObj = new URLSearchParams();
    paramsObj.set('page', '1');
    paramsObj.set('cat', selectedCategory);
    paramsObj.set('gender', selectedGender);
    router.replace(`/${itemType}?${paramsObj.toString()}`);
  }, [itemType, selectedCategory, selectedGender, search, minPrice, maxPrice, router]);

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
    paramsObj.set('gender', selectedGender);
    router.push(`/${itemType}?${paramsObj.toString()}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemTypeChange = (value) => {
    const paramsObj = new URLSearchParams();
    paramsObj.set('page', '1');
    paramsObj.set('cat', 'Все');
    paramsObj.set('gender', selectedGender);
    router.push(`/${value}?${paramsObj.toString()}`);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
  };

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  return (
    <>
      <UtilityBar />
      <Header isTransparent={false} />
      <main className="main-container">
        <div className='filters-sorting'>
          <Search
            search={search}
            setSearch={setSearch}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
          <Filters
            itemType={itemType}
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            handleItemTypeChange={handleItemTypeChange}
            setCategories={setCategories}
            selectedGender={selectedGender}
            handleGenderChange={handleGenderChange}
          />
        </div>
        <ProductCards
          currentItems={currentItems}
          itemType={itemType}
        />

        {totalPages > 1 && (
          <div className="pagination">
            <button className="left-button"
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}><svg aria-hidden="true" focusable="false" className="icon icon-caret prev" viewBox="0 0 10 6">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></path>
              </svg></button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={`page-button-${i + 1}`}
                onClick={() => handlePageChange(i + 1)}
                className={currentPage === (i + 1) ? 'active' : ''}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
            ><svg aria-hidden="true" focusable="false" className="icon icon-caret next" viewBox="0 0 10 6">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></path>
              </svg></button>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
