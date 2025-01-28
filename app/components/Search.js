"use client";
import { useState } from "react";
import '@styles/search.css';

export default function Search({ search, setSearch }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearch('');
  };

  return (
    <div className="search-bar">
      <img src="/assets/icons/search.png" className="icon-search" alt="search icon" />
      <input
        type="text"
        placeholder="Поиск"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isFocused && search && (
        <img src="/assets/icons/close.png" className="icon-clear" alt="clear icon" onClick={handleClear} />
      )}
    </div>
  );
}
