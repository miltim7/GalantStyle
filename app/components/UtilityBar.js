"use client";
import { useEffect } from 'react';
import '@styles/utility-bar.css';

export default function UtilityBar() {
  useEffect(() => {
    const leftButton = document.querySelector('.left-button');
    const rightButton = document.querySelector('.right-button');
    const text = document.querySelector('.utility-bar div p');

    function changeText(newText, newClass, direction) {
      text.classList.add(direction === 'left' ? 'fade-out-left' : 'fade-out-right');

      setTimeout(() => {
        text.innerHTML = newText;

        text.classList.remove('first', 'second');
        text.classList.add(newClass);

        text.classList.remove('fade-out-left', 'fade-out-right');
        text.classList.add(direction === 'left' ? 'fade-in-left' : 'fade-in-right');

        setTimeout(() => {
          text.classList.remove('fade-in-left', 'fade-in-right');
        }, 300);
      }, 300);
    }

    rightButton.addEventListener('click', () => {
      if (text.classList.contains('first')) {
        changeText('galant.style7@gmail.com', 'second', 'right');
      } else {
        changeText('+994-50-552-92-10', 'first', 'right');
      }
    });

    leftButton.addEventListener('click', () => {
      if (text.classList.contains('second')) {
        changeText('+994-50-552-92-10', 'first', 'left');
      } else {
        changeText('galant.style7@gmail.com', 'second', 'left');
      }
    });
  }, []);

  return (
    <section className="utility-bar">
      <div>
        <button className="left-button" style={{ transform: 'rotate(90deg)' }}>
          <svg aria-hidden="true" focusable="false" className="icon icon-caret" viewBox="0 0 10 6">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></path>
          </svg>
        </button>
        <p className="first">+994-50-552-92-10</p>
        <button className="right-button" style={{ transform: 'rotate(-90deg)' }}>
          <svg aria-hidden="true" focusable="false" className="icon icon-caret" viewBox="0 0 10 6">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z" fill="currentColor"></path>
          </svg>
        </button>
      </div>
    </section>
  );
}
