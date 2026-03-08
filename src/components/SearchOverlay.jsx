import { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX, FiShoppingCart, FiEye } from 'react-icons/fi';
import products from '../data/products.json';

export default function SearchOverlay({ onClose, onViewDetails, onBuyNow }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Auto-focus input on mount
    setTimeout(() => inputRef.current?.focus(), 100);

    // Close on Escape key
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Prevent body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);

  const handleSelect = (product, action) => {
    onClose();
    if (action === 'view') onViewDetails(product);
    else onBuyNow(product);
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-overlay-inner" onClick={(e) => e.stopPropagation()}>
        <div className="search-header">
          <div className="search-input-wrap">
            <FiSearch className="search-input-icon" />
            <input
              ref={inputRef}
              type="text"
              className="search-input"
              placeholder="Search products by name, category..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button className="search-clear" onClick={() => setQuery('')}>
                <FiX />
              </button>
            )}
          </div>
          <button className="search-close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className="search-results">
          {query.trim() === '' && (
            <div className="search-empty">
              <FiSearch className="search-empty-icon" />
              <p>Start typing to search products...</p>
            </div>
          )}

          {query.trim() !== '' && filtered.length === 0 && (
            <div className="search-empty">
              <p>No products found for "<strong>{query}</strong>"</p>
              <span>Try a different keyword</span>
            </div>
          )}

          {filtered.length > 0 && (
            <>
              <div className="search-results-count">
                {filtered.length} product{filtered.length > 1 ? 's' : ''} found
              </div>
              <div className="search-results-list">
                {filtered.map((product) => (
                  <div className="search-result-item" key={product.id}>
                    <img src={product.image} alt={product.title} className="search-result-img" />
                    <div className="search-result-info">
                      <span className="search-result-category">{product.category}</span>
                      <h4 className="search-result-title">{product.title}</h4>
                      <span className="search-result-price">{formatPrice(product.price)}</span>
                    </div>
                    <div className="search-result-actions">
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleSelect(product, 'view')}
                        title="Quick View"
                      >
                        <FiEye />
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleSelect(product, 'buy')}
                        title="Buy Now"
                      >
                        <FiShoppingCart />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
