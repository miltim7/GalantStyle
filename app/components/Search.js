"use client";
import '@styles/search.css';
import '@styles/global.css';

export default function Search({ search, setSearch, minPrice, setMinPrice, maxPrice, setMaxPrice }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Поиск по названию"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />
      <input
        type="number"
        placeholder="Мин. цена"
        value={minPrice}
        onChange={e => setMinPrice(e.target.value)}
        className="search-input"
      />
      <input
        type="number"
        placeholder="Макс. цена"
        value={maxPrice}
        onChange={e => setMaxPrice(e.target.value)}
        className="search-input"
      />
    </div>
  );
}
