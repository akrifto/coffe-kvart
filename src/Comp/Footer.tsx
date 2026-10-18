// Футер 

export default function Footer() {
  return (
    <footer className="w-full py-10 px-6 sm:px-12 bg-[var(--color-bg)] border-t border-[var(--color-card)]/40 text-center">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xl font-black tracking-tight text-[var(--color-text)]">
          KVART COFFEE
        </div>
        <p className="text-xs text-[var(--color-text-subtle)]">
          Проект в рамках тестового задания
        </p>
      </div>
    </footer>
  );
}