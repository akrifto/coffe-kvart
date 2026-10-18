"use client";

import { useState, useEffect, useRef } from "react";

interface OrderFormProps {
  selectedProduct?: string;
  selectedDelivery?: string;
}

export default function OrderForm({ selectedProduct, selectedDelivery }: OrderFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    product: selectedProduct || "",
    delivery: selectedDelivery || "",
    comment: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  const productRef = useRef<HTMLDivElement>(null);
  const deliveryRef = useRef<HTMLDivElement>(null);

  const productsOptions = [
    { label: "Эфиопия Иргачеффе (32 BYN / 250 г)", value: "Эфиопия Иргачеффе" },
    { label: "Колумбия Уила (29 BYN / 250 г)", value: "Колумбия Уила" },
    { label: "Бразилия Серрадо (26 BYN / 250 г)", value: "Бразилия Серрадо" },
    { label: "Дрип-пакеты, ассорти (18 BYN / 10 шт)", value: "Дрип-пакеты, ассорти" },
    { label: "Кофейная подписка на месяц (54 BYN)", value: "Подписка на месяц (54 BYN)" },
  ];

  const deliveryOptions = [
    { label: "Курьером по Минску (по пятницам)", value: "Курьер по Минску" },
    { label: "Самовывоз из ростерии (ул. Короля, 9)", value: "Самовывоз (ул. Короля, 9)" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (productRef.current && !productRef.current.contains(e.target as Node)) {
        setIsProductOpen(false);
      }
      if (deliveryRef.current && !deliveryRef.current.contains(e.target as Node)) {
        setIsDeliveryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({ ...prev, product: selectedProduct }));
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (selectedDelivery) {
      setFormData((prev) => ({ ...prev, delivery: selectedDelivery }));
    }
  }, [selectedDelivery]);

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, "");
    return cleanPhone.startsWith("375") && cleanPhone.length === 12;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validatePhone(formData.phone)) {
      setErrorMessage("Введите корректный белорусский номер (+375 (00) 000-00-00)");
      return;
    }

    if (!formData.product) {
      setErrorMessage("Пожалуйста, выберите кофе или подписку из списка");
      return;
    }

    if (!formData.delivery) {
      setErrorMessage("Пожалуйста, выберите способ получения заказа");
      return;
    }

    setStatus("loading");

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source") || "direct";
      const utmMedium = urlParams.get("utm_medium") || "none";

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          utmSource,
          utmMedium,
          pageUrl: window.location.href,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Ошибка при отправке заявки");
      }

      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Не удалось отправить заявку. Попробуйте еще раз.");
    }
  };

  return (
    <section id="order" className="relative w-full py-16 px-6 sm:px-12 bg-[var(--color-bg)] scroll-mt-24 border-t border-[var(--color-card)]/40">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--color-text)] tracking-tight mb-3">
            Оформление заказа
          </h2>
          <p className="text-[var(--color-text-muted)] text-base">
            Заполните данные — менеджер перезвонит для подтверждения заказа.
          </p>
        </div>

        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--color-card)]/30 border border-[var(--color-card)]">
          {status === "success" ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[var(--color-accent)]/20 text-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-text)]">
                Заявка принята!
              </h3>
              <p className="text-[var(--color-text-muted)] max-w-md mx-auto">
                Спасибо за заказ! Мы вам перезвоним в ближайшее время.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[var(--color-card)] text-[var(--color-text)] text-sm font-semibold hover:bg-[var(--color-card)]/80 transition-colors cursor-pointer"
              >
                Отправить еще один заказ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Имя и Телефон */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-subtle)] mb-2">
                    Ваше имя *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[var(--color-bg)] border border-[var(--color-card)] text-[var(--color-text)] placeholder-[var(--color-text-subtle)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-subtle)] mb-2">
                    Телефон (Беларусь) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+375 (00) 000-00-00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-[var(--color-bg)] border border-[var(--color-card)] text-[var(--color-text)] placeholder-[var(--color-text-subtle)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm"
                  />
                </div>
              </div>

              {/* Кастомный селект: Выбранный кофе */}
              <div className="relative" ref={productRef}>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-subtle)] mb-2">
                  Что вас интересует? *
                </label>
                <div
                  onClick={() => setIsProductOpen(!isProductOpen)}
                  className="w-full px-4 py-3.5 rounded-xl bg-[var(--color-bg)] border border-[var(--color-card)] text-[var(--color-text)] focus:border-[var(--color-accent)] text-sm cursor-pointer flex justify-between items-center"
                >
                  <span className={formData.product ? "text-[var(--color-text)]" : "text-[var(--color-text-subtle)]"}>
                    {productsOptions.find((p) => p.value === formData.product)?.label || "Выберите кофе из каталога..."}
                  </span>
                  <span className="text-xs text-[var(--color-text-subtle)]">▼</span>
                </div>

                {isProductOpen && (
                  <div className="absolute z-50 left-0 right-0 mt-2 bg-[#18181b] border border-[var(--color-card)] rounded-xl overflow-hidden shadow-2xl">
                    {productsOptions.map((opt) => (
                      <div
                        key={opt.value}
                        onClick={() => {
                          setFormData({ ...formData, product: opt.value });
                          setIsProductOpen(false);
                        }}
                        className="px-4 py-3 text-sm text-[var(--color-text)] hover:bg-[#27272a] transition-colors cursor-pointer"
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Кастомный селект: Способ получения */}
              <div className="relative" ref={deliveryRef}>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-subtle)] mb-2">
                  Способ получения *
                </label>
                <div
                  onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                  className="w-full px-4 py-3.5 rounded-xl bg-[var(--color-bg)] border border-[var(--color-card)] text-[var(--color-text)] focus:border-[var(--color-accent)] text-sm cursor-pointer flex justify-between items-center"
                >
                  <span className={formData.delivery ? "text-[var(--color-text)]" : "text-[var(--color-text-subtle)]"}>
                    {deliveryOptions.find((d) => d.value === formData.delivery)?.label || "Выберите способ получения..."}
                  </span>
                  <span className="text-xs text-[var(--color-text-subtle)]">▼</span>
                </div>

                {isDeliveryOpen && (
                  <div className="absolute z-50 left-0 right-0 mt-2 bg-[#18181b] border border-[var(--color-card)] rounded-xl overflow-hidden shadow-2xl">
                    {deliveryOptions.map((opt) => (
                      <div
                        key={opt.value}
                        onClick={() => {
                          setFormData({ ...formData, delivery: opt.value });
                          setIsDeliveryOpen(false);
                        }}
                        className="px-4 py-3 text-sm text-[var(--color-text)] hover:bg-[#27272a] transition-colors cursor-pointer"
                      >
                        {opt.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Комментарий */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-text-subtle)] mb-2">
                  Комментарий к заказу
                </label>
                <textarea
                  rows={3}
                  placeholder="Напишите комментарий (не обязательно)"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[var(--color-bg)] border border-[var(--color-card)] text-[var(--color-text)] placeholder-[var(--color-text-subtle)] focus:outline-none focus:border-[var(--color-accent)] transition-colors text-sm resize-none"
                />
              </div>

              {/* Вывод ошибок */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-sm">
                  {errorMessage}
                </div>
              )}

              {/* Кнопка отправки */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg)] font-bold text-base hover:bg-[var(--color-hover-bt)] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {status === "loading" ? "Отправляем..." : "Подтвердить заказ"}
              </button>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}