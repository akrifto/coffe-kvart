{/* Модуль заголовка, картинки и краткого описания */}

import bgCoffee from '../img/Coffe_back.jpg';

export default function Hero() {
  return (
    <section className="relative overflow-hidden w-full flex items-center py-16 bg-[var(--color-bg)]">
      
      {/* Картинка */}
      <img
        src={bgCoffee.src}
        alt="Kvart Coffee Background"
        className="absolute inset-0 w-full h-full object-cover object-right-bottom z-0"
      />

      {/* Градиент по горизонтали */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/10 to-transparent pointer-events-none" />

      {/* 3. Градиент по вертикали */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-[var(--color-bg)]/75 via-50% to-[var(--color-bg)] pointer-events-none" />

      {/* Заголовок */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--color-text)] leading-[1.1] tracking-tight mb-4">
            Авторский кофе от обжарщиков Kvart
          </h1>

          {/* Краткое описание */}
          <p className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
            Мы - Аня и Дмитрий, бывшие бариста. 
            С 2019 года обжариваем кофе микро-батчами по 5 кг. 
            Обжариваем по четвергам, а в пятницу развозим свежие пачки по Минску.
          </p>
        </div>
      </div>

    </section>
  );
}