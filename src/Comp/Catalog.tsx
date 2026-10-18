"use client";

interface CatalogProps {
  selectedProduct?: string;
  onSelectProduct?: (productName: string) => void;
}

export default function Catalog({ selectedProduct, onSelectProduct }: CatalogProps) {
  const products = [
    {
      title: "Эфиопия Иргачеффе",
      desc: "Цветочный, бергамот, легкая и чистая чашка.",
      roast: "Светлая обжарка",
      weight: "250 г",
      price: "32 BYN",
    },
    {
      title: "Колумбия Уила",
      desc: "Карамель, сочное красное яблоко, сбалансированный вкус.",
      roast: "Светлая / Средняя",
      weight: "250 г",
      price: "29 BYN",
    },
    {
      title: "Бразилия Серрадо",
      desc: "Плотный орех, горький шоколад, идеальный выбор под эспрессо.",
      roast: "Средняя обжарка",
      weight: "250 г",
      price: "26 BYN",
    },
    {
      title: "Дрип-пакеты, ассорти",
      desc: "Кофе везде, где есть кипяток. 10 штук в упаковке — разные сорта.",
      roast: "Микс сортов",
      weight: "10 штук",
      price: "18 BYN",
    },
  ];

  const handleSelect = (name: string) => {
    if (onSelectProduct) {
      onSelectProduct(name);
    }

    // Даем 300мс задержки, чтобы пользователь увидел состояние "Выбрано", а затем плавно скроллим
    setTimeout(() => {
      const deliveryEl = document.getElementById("delivery");
      if (deliveryEl) {
        deliveryEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <section id="catalog" className="relative w-full py-16 px-6 sm:px-12 bg-[var(--color-bg)] scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Заголовок и описание */}
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--color-text)] tracking-tight mb-3">
            Каталог
          </h2>
          <p className="text-[var(--color-text-muted)] text-base leading-relaxed">
            Обжариваем микро-батчами строго по четвергам. Зерно приезжает к вам свежим на 1–3 день.
          </p>
        </div>

        {/* Сетка товаров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((item, index) => {
            const isSelected = selectedProduct === item.title;

            return (
              <div 
                key={index}
                className="p-6 rounded-2xl bg-[var(--color-card)]/30 border border-[var(--color-card)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-end mb-4">
                    <span className="text-xs text-[var(--color-text-subtle)] font-medium">
                      {item.weight}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-[var(--color-text-muted)] mb-4 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--color-card)] flex items-end justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-xl font-black text-[var(--color-text)] whitespace-nowrap">
                      {item.price}
                    </span>
                    <span className="text-xs text-[var(--color-text-subtle)] mt-0.5">
                      {item.roast}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleSelect(item.title)}
                    disabled={isSelected}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                      isSelected
                        ? "bg-[var(--color-bg)] text-[var(--color-text-subtle)] border border-[var(--color-text-subtle)]/30 cursor-default"
                        : "bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[var(--color-hover-bt)] active:scale-95 cursor-pointer"
                    }`}
                  >
                    {isSelected ? "Выбрано ✓" : "Выбрать"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Блок подписки */}
        {(() => {
          const isSubscriptionSelected = selectedProduct === "Подписка на месяц (54 BYN)";

          return (
            <div className="p-8 sm:p-10 rounded-3xl bg-[var(--color-card)]/40 border border-[var(--color-card)] flex flex-col gap-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-[var(--color-text)] mb-3">
                  Кофейная подписка на месяц
                </h3>
                <p className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed max-w-3xl">
                  2 пачки по 250 г свежеобжаренного зерна раз в месяц. Мы сами будем привозить новые сорта прямо к вашей двери, а доставка по Минску будет абсолютно бесплатной.
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--color-card)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-[var(--color-text)]">54 BYN</span>
                  <span className="text-sm text-[var(--color-text-muted)]">/ месяц</span>
                </div>

                <button
                  onClick={() => handleSelect("Подписка на месяц (54 BYN)")}
                  disabled={isSubscriptionSelected}
                  className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm text-center whitespace-nowrap transition-all duration-300 ${
                    isSubscriptionSelected
                      ? "bg-[var(--color-bg)] text-[var(--color-text-subtle)] border border-[var(--color-text-subtle)]/30 cursor-default"
                      : "bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[var(--color-hover-bt)] active:scale-95 cursor-pointer"
                  }`}
                >
                  {isSubscriptionSelected ? "Выбрано ✓" : "Оформить подписку"}
                </button>
              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
}