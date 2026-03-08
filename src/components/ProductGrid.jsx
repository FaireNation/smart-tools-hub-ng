import { useState, useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import products from '../data/products.json';

const categories = ['All', ...new Set(products.map((p) => p.category))];

export default function ProductGrid({ onBuyNow, onViewDetails }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const gridRef = useRef(null);

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  // Re-observe cards when filter changes
  useEffect(() => {
    if (!gridRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const cards = gridRef.current.querySelectorAll('[data-reveal]');
    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCategory]);

  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="section-header" data-reveal>
          <span className="section-tag">Our Products</span>
          <h2>Featured Products</h2>
          <p>Browse our collection of premium quality smart tools and gadgets</p>
        </div>

        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="products-grid" ref={gridRef}>
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onBuyNow={onBuyNow}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
