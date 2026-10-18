'use client';
// Импорты
import Header from '@/Comp/Header';
import Hero from '@/Comp/Hero';
import About from '@/Comp/About';

export default function Home() {
  return (
    
    // Разметка ко порядку сверху вниз
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text-muted)] selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)] flex flex-col justify-between">
      <Header /> 
      <Hero />
      <About />

      {/* Футер */}
      <footer className="border-t border-[var(--color-card)] py-8 px-6 text-center text-[var(--color-text-subtle)] text-sm">
        © 2026 Kvart Coffee Roaster. Все права защищены.
      </footer>
    </main>
  );
}