import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Features from './components/Features';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';
import ProductDetailModal from './components/ProductDetailModal';
import SearchOverlay from './components/SearchOverlay';
import './App.css';

function App() {
  const [orderProduct, setOrderProduct] = useState(null);
  const [detailProduct, setDetailProduct] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  // Scroll-reveal: observe elements with [data-reveal]
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const revealEls = document.querySelectorAll('[data-reveal]');
    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleBuyNow = (product) => {
    setDetailProduct(null);
    setOrderProduct(product);
  };

  const handleViewDetails = (product) => {
    setDetailProduct(product);
  };

  return (
    <div className="app">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <Hero />
      <ProductGrid onBuyNow={handleBuyNow} onViewDetails={handleViewDetails} />
      <Features />
      <Footer />

      {searchOpen && (
        <SearchOverlay
          onClose={() => setSearchOpen(false)}
          onViewDetails={handleViewDetails}
          onBuyNow={handleBuyNow}
        />
      )}

      {orderProduct && (
        <OrderModal product={orderProduct} onClose={() => setOrderProduct(null)} />
      )}

      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onBuyNow={handleBuyNow}
        />
      )}
    </div>
  );
}

export default App;
