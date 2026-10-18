"use client";

interface DeliveryProps {
  selectedDelivery?: string;
  onSelectDelivery?: (method: string) => void;
}

export default function Delivery({ selectedDelivery, onSelectDelivery }: DeliveryProps) {
  const deliveryOptions = [
    {
      id: "Курьер по Минску",
      title: "Курьером по Минску",
      desc: "Развозим свежеобжаренное зерно строго по пятницам. Кофе приезжает прямо к вашей двери на 1–3 день после обжарки.",
      details: [
        { label: "День доставки:", value: "Пятница" },
        { label: "От 50 BYN:", value: "Бесплатно", accent: true },
        { label: "До 50 BYN:", value: "7 BYN" },
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: "Самовывоз (ул. Короля, 9)",
      title: "Самовывоз из ростерии",
      desc: "Заходите в мастерскую на Короля, 9. Заберите пачку сразу после обжарки и пообщайтесь с бариста.",
      details: [
        { label: "Адрес:", value: "ул. Короля, 9" },
        { label: "Пн–Пт:", value: "8:00 – 20:00" },
        { label: "Сб–Вс:", value: "10:00 – 18:00" },
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  const handleSelect = (method: string) => {
    if (onSelectDelivery) {
      onSelectDelivery(method);
    }
    
    // Даем задержку 300мс, чтобы сработал визуальный статус "Выбрано", затем скроллим к форме
    setTimeout(() => {
      const orderEl = document.getElementById("order");
      if (orderEl) {
        orderEl.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <section id="delivery" className="relative w-full py-16 px-6 sm:px-12 bg-[var(--color-bg)] scroll-mt-24 border-t border-[var(--color-card)]/40">
      <div className="max-w-7xl mx-auto">
        
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--color-text)] tracking-tight mb-3">
            Доставка и самовывоз
          </h2>
          <p className="text-[var(--color-text-muted)] text-base leading-relaxed">
            Выберите удобный способ получения заказа:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {deliveryOptions.map((opt) => {
            const isSelected = selectedDelivery === opt.id;

            return (
              <div 
                key={opt.id}
                className="p-8 rounded-3xl bg-[var(--color-card)]/30 border border-[var(--color-card)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-card)] flex items-center justify-center mb-6 text-[var(--color-accent)]">
                    {opt.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--color-text)] mb-3">
                    {opt.title}
                  </h3>

                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-6">
                    {opt.desc}
                  </p>

                  <div className="space-y-2 text-sm mb-8">
                    {opt.details.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-[var(--color-text-subtle)]">{item.label}</span>
                        <span className={`font-semibold ${item.accent ? "text-[var(--color-accent)]" : "text-[var(--color-text)]"}`}>
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelect(opt.id)}
                  disabled={isSelected}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm text-center whitespace-nowrap transition-all duration-300 ${
                    isSelected
                      ? "bg-[var(--color-bg)] text-[var(--color-text-subtle)] border border-[var(--color-text-subtle)]/30 cursor-default"
                      : "bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[var(--color-hover-bt)] active:scale-95 cursor-pointer"
                  }`}
                >
                  {isSelected ? "Выбрано ✓" : "Выбрать"}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}