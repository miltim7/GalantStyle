'use client';
import { useState } from 'react';
import '@styles/details.css';

export default function Details({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.details.images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const handleImageClick = (imgSrc, index) => {
    setSelectedImage(imgSrc);
    setImageIndex(index);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handlePrevClick = () => {
    const prevIndex = (imageIndex - 1 + product.details.images.length) % product.details.images.length;
    setSelectedImage(product.details.images[prevIndex]);
    setImageIndex(prevIndex);
  };

  const handleNextClick = () => {
    const nextIndex = (imageIndex + 1) % product.details.images.length;
    setSelectedImage(product.details.images[nextIndex]);
    setImageIndex(nextIndex);
  };

  const getGenderIcon = (gender) => {
    switch (gender) {
      case 'женский':
        return '/assets/icons/female.png';
      case 'мужской':
        return '/assets/icons/male.png';
      default:
        return '/assets/icons/unisex.png';
    }
  };

  const handleWhatsappClick = () => {
    const message = `Добрый день, хотел бы у вас заказать этот товар, размер: ${selectedSize}. Ссылка на продукт: ${window.location.href}`;
    const url = `https://wa.me/994505529210?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleTelegramClick = () => {
    const message = `Добрый день, хотел бы у вас заказать этот товар, размер: ${selectedSize}. Ссылка на продукт: ${window.location.href}`;
    const url = `https://t.me/miltim7?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      <div className="product-detail-container">
        <div className="image-gallery">
          <div className="main-image-container">
            <img src={selectedImage} alt={`${product.name} main`} className="main-image" />
            {product.details.images.length > 1 && (
              <>
                <div className="slider-controls">
                  <button className="prev-button" onClick={handlePrevClick}>❮</button>
                  <button className="next-button" onClick={handleNextClick}>❯</button>
                </div>
                <div className="image-counter">
                  {imageIndex + 1}/{product.details.images.length}
                </div>
              </>
            )}
          </div>
          {product.details.images.length > 1 && (
            <div className="thumbnail-container">
              {product.details.images.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt={`${product.name} thumbnail ${index}`}
                  className={`thumbnail ${selectedImage === imgSrc ? 'active' : ''}`}
                  onClick={() => handleImageClick(imgSrc, index)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="description">{product.description}</p>
          <h4>${product.price}</h4>
          <p className='for-whom-details'>
            <img src={getGenderIcon(product.gender)} alt={product.gender} className="gender-icon" />
            {product.gender === 'женский' ? 'Для НЕЁ' : product.gender === 'мужской' ? 'Для НЕГО' : 'УНИСЕКС'}
          </p>
          {product.details.sizes && (
            <>
              <p className='available-sizes'>
                Доступные размеры:{' '}
                {product.details.sizes.map((size, index) => (
                  <span key={index}>
                    <b>{size}</b>
                    {index < product.details.sizes.length - 1 && ', '}
                  </span>
                ))}
              </p>
              <div className="custom-select-container" onClick={toggleSelect}>
                <select
                  className={`custom-select ${isSelectOpen ? 'open' : ''}`}
                  value={selectedSize}
                  onChange={handleSizeChange}
                  onBlur={() => setIsSelectOpen(false)}
                >
                  <option value="" disabled hidden>Выберите размер</option>
                  {product.details.sizes.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <span className={`select-arrow ${isSelectOpen ? 'open' : ''}`}></span>
              </div>
            </>
          )}
          <button className="buy-button" onClick={handleWhatsappClick}>
            Заказать через <img className="whatsapp-icon" src='/assets/icons/whatsapp1.png' alt="whatsapp icon"/>
          </button>
          <button className="buy-button" onClick={handleTelegramClick}>
            Заказать через <img className="telegram-icon" src='/assets/icons/telegram1.png' alt="telegram icon"/>
          </button>
        </div>
      </div>
      <div className="product-details">
        <p className='product-full-details'>{product.details.fullDescription}</p>
        <p><b>Материал</b>: {product.details.material}</p>
        <p><b>Инструкции по стирке</b>: {product.details.washingInstructions}</p>
      </div>
    </>
  );
}
