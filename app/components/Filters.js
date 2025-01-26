"use client";
import { useEffect } from "react";
import '@styles/filters.css';

export default function Filters({ itemType, categories, selectedCategory, handleCategoryChange, handleItemTypeChange, setCategories }) {
  useEffect(() => {
    if (itemType === "accessories") {
      setCategories(["Все", "Чехлы для телефонов", "Кепки", "Барсетки", "Кошельки"]);
    } else {
      setCategories(["Все", "Футболки", "Брюки", "Обувь", "Джемпер", "Рубашки", "Носки"]);
    }
  }, [itemType, setCategories]);

  return (
    <div className="filter-bar">
      <select
        value={itemType}
        onChange={e => handleItemTypeChange(e.target.value)}
        className="filter-select"
      >
        <option value="clothes">Clothes</option>
        <option value="accessories">Accessories</option>
      </select>
      <div className="category-bar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`category-button ${selectedCategory === cat ? 'selected' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
