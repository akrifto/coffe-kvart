import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kvart Roasters",
  description: "Авторский кофе от обжарщиков Kvart",
};

// ⚡ ВОТ ЭТА ШТУКА ПРИНУДИТ МОБИЛКУ ПОНЯТЬ РАЗМЕР ЭКРАНА И ВКЛЮЧИТЬ НОРМАЛЬНЫЙ ТАЧ
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--color-bg)] text-[var(--color-text-muted)]">
        {children}
      </body>
    </html>
  );
}