"use client";

import { useState } from "react";
import Header from "@/Comp/Header";
import Hero from "@/Comp/Hero";
import About from "@/Comp/About";
import Catalog from "@/Comp/Catalog";
import Delivery from "@/Comp/Delivery";
import OrderForm from "@/Comp/OrderForm";
import Footer from "@/Comp/Footer";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedDelivery, setSelectedDelivery] = useState("");

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Header />
      <Hero />
      <About />
      <Catalog 
        selectedProduct={selectedProduct} 
        onSelectProduct={(prod) => setSelectedProduct(prod)} 
      />
      <Delivery 
        selectedDelivery={selectedDelivery} 
        onSelectDelivery={(del) => setSelectedDelivery(del)} 
      />
      <OrderForm 
        selectedProduct={selectedProduct} 
        selectedDelivery={selectedDelivery} 
      />
      <Footer />
    </main>
  );
}