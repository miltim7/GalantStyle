'use client';
import { useState, useRef, useEffect } from 'react';
import '@styles/details.css';

export default function Details({ product }) {
  const [selectedImage, setSelectedImage] = useState(product.details.images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const sliderRef = useRef(null);

  // Обработчики свайпа
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches ? e.touches[0].clientX : e.clientX);
    setTranslateX(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = sliderRef.current.offsetWidth * 0.15;
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
    setTranslateX(0);
  };

  const handlePrev = () => {
    setCurrentIndex(prev =>
      (prev - 1 + product.details.images.length) % product.details.images.length
    );
    setSelectedImage(product.details.images[currentIndex]);
  };

  const handleNext = () => {
    setCurrentIndex(prev =>
      (prev + 1) % product.details.images.length
    );
    setSelectedImage(product.details.images[currentIndex]);
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

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setSelectedImage(product.details.images[index]);
  };

  return (
    <>
      <div className="product-detail-container">
        <div className="image-gallery">

          {/* <div className="desktop-thumbnails">
            {product.details.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`desktop-thumbnail ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div> */}

          <div
            className="slider-container"
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseMove={handleTouchMove}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}>

            <div
              className="slider-track"
              style={{
                transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`,
                transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
            >

              {product.details.images.map((img, index) => (
                <div
                  key={index}
                  className="slide"
                  style={{ width: `${100 / product.details.images.length}%` }}
                >
                  <img
                    src={img}
                    alt={`${product.name} slide ${index}`}
                    className="slide-image"
                    draggable="false"
                  />
                </div>
              ))}
            </div>



            {product.details.images.length > 1 && (
              <>
                <div className="slider-controls">
                  <button className="prev-button" onClick={handlePrev}>❮</button>
                  <button className="next-button" onClick={handleNext}>❯</button>
                </div>
                <div className="image-counter">
                  {currentIndex + 1}/{product.details.images.length}
                </div>
              </>
            )}
          </div>
        </div>



        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="description">{product.description}</p>
          <h4>{product.price} <img src='/assets/icons/manat.png'/></h4>
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
          <button className="buy-button buy-whatsapp" onClick={handleWhatsappClick}>
            Заказать через <img className="whatsapp-icon" src='/assets/icons/whatsapp1.png' alt="whatsapp icon" />
          </button>
          <button className="buy-button" onClick={handleTelegramClick}>
            Заказать через <img className="telegram-icon" src='/assets/icons/telegram1.png' alt="telegram icon" />
          </button>
        </div>
      </div>

      <div className="product-details">
        <p className='product-full-details'>{product.details.fullDescription}</p>
        {product.details.material && (
          <p><b>Материал</b>: {product.details.material}</p>
        )}
        {product.details.washingInstructions && (
          <p><b>Инструкции по стирке</b>: {product.details.washingInstructions}</p>
        )}
      </div>
    </>
  );
}