// Модуль шапки с бургером

'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
 
  // Блокировка скролла страницы при открытом бургере
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  return () => {
    document.body.style.overflow = 'unset';
  };
}, [isOpen]);


  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--color-card)] bg-[var(--color-bg)]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-20">
          
          {/* Название */}
          <a 
            href="#" 
            className="text-xl font-black tracking-widest text-[var(--color-text)] transition-colors"
          >
            KVART COFFEE
          </a>

          {/* Навигация в десктоп версии */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a 
              href="#about" 
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
            >
              О нас
            </a>
            <a 
              href="#catalog" 
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
            >
              Каталог
             </a>
            <a 
              href="#delivery" 
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
            >
              Доставка
            </a>
            <a 
              href="#order" 
              className="text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors font-semibold"
            >
              Оформить заказ
            </a>
          </nav>

          {/* Бургер-кнопка */}
          <button
            type="button" 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-30 p-2 text-[var(--color-text)] hover:text-[var(--color-accent)] focus:outline-none focus:ring-0 active:outline-none cursor-pointer select-none transition-colors"
            aria-label="Переключить меню"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

{/* Меню бургера */}
        <div 
          className={`md:hidden absolute top-full left-0 w-60 bg-[var(--color-card)]/95 backdrop-blur-md border border-[var(--color-card)] rounded-2xl p-4 shadow-2xl transition-transform duration-300 ease-out z-40 ${
            isOpen 
              ? 'translate-x-4 pointer-events-auto' 
              : '-translate-x-full pointer-events-none'
          }`}
        >
          <nav className="flex flex-col text-sm font-medium -mx-4 -my-4 divide-y divide-[var(--color-bg)]/40">
            
            <a 
              href="#about" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-[var(--color-text)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg)]/50 transition-colors py-3.5 px-5"
            >
              <span>О нас</span>
              <svg className="w-4 h-4 text-[var(--color-text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a 
              href="#catalog" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-[var(--color-text)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg)]/50 transition-colors py-3.5 px-5"
            >
              <span>Каталог</span>
              <svg className="w-4 h-4 text-[var(--color-text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a 
              href="#delivery" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-[var(--color-text)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg)]/50 transition-colors py-3.5 px-5"
            >
              <span>Доставка</span>
              <svg className="w-4 h-4 text-[var(--color-text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a 
              href="#order" 
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between text-[var(--color-text)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg)]/50 transition-colors py-3.5 px-5 font-semibold"
            >
              <span>Оформить заказ</span>
              <svg className="w-4 h-4 text-[var(--color-text-subtle)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </nav>
        </div>   
      </header>

      {/* Размытие и затемнение при открытом бургере */}
      <div 
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 top-[65px] bg-black/60 backdrop-blur-sm z-30 transition-opacity duration-300 ease-in-out md:hidden ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  );
}