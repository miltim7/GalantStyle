"use client";
import { useEffect, useRef } from "react";
import '@styles/filters.css';

export default function Filters({ itemType, categories, selectedCategory, handleCategoryChange, handleItemTypeChange, setCategories, selectedGender, handleGenderChange }) {
  const filterBarRef = useRef(null);

  useEffect(() => {
    async function fetchCategories() {
      const fileName = itemType === "accessories" ? "accessories.json" : "clothes.json";
      const response = await fetch(`/data/${fileName}`, { cache: 'no-store' });
      const data = await response.json();
      const uniqueCategories = ["Все", ...new Set(data.map(item => item.type))];
      setCategories(uniqueCategories);
    }
    fetchCategories();
  }, [itemType, setCategories]);

  const handleMouseDown = (event) => {
    const filterBar = filterBarRef.current;
    if (filterBar) {
      filterBar.isDragging = true;
      filterBar.startX = event.pageX - filterBar.offsetLeft;
      filterBar.scrollLeftStart = filterBar.scrollLeft;
    }
  };

  const handleMouseMove = (event) => {
    const filterBar = filterBarRef.current;
    if (filterBar && filterBar.isDragging) {
      event.preventDefault();
      const x = event.pageX - filterBar.offsetLeft;
      const walk = (x - filterBar.startX) * 1;
      filterBar.scrollLeft = filterBar.scrollLeftStart - walk;
    }
  };

  const handleMouseUp = () => {
    const filterBar = filterBarRef.current;
    if (filterBar) {
      filterBar.isDragging = false;
    }
  };

  return (
    <div
      className="filter-bar"
      ref={filterBarRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="select-namer">
        <span>Выберите пол: </span>
        <div>
          <select
            value={selectedGender}
            onChange={e => handleGenderChange(e.target.value)}
            className="filter-select"
          >
            <option value="Все">Все</option>
            <option value="мужской">Мужской</option>
            <option value="женский">Женский</option>
            <option value="унисекс">Унисекс</option>
          </select>
          <svg className="custom-arrow for-select" aria-hidden="true" focusable="false" viewBox="0 0 10 6">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      <div className="select-namer">
        <span>Выберите продукцию: </span>
        <div>
          <select
            value={itemType}
            onChange={e => handleItemTypeChange(e.target.value)}
            className="filter-select">
            <option value="clothes">Одежда</option>
            <option value="accessories">Аксессуары</option>
          </select>
          <svg className="custom-arrow for-select" aria-hidden="true" focusable="false" viewBox="0 0 10 6">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></path>
          </svg>
        </div>
      </div>

      <div className="select-namer">
        <span>Выберите категорию: </span>
        <div>
          <select
            value={selectedCategory}
            onChange={e => handleCategoryChange(e.target.value)}
            className="filter-select">
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <svg className="custom-arrow for-select" aria-hidden="true" focusable="false" viewBox="0 0 10 6">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}