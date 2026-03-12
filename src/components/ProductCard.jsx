import { FiShoppingCart, FiEye } from 'react-icons/fi';

export default function ProductCard({ product, onBuyNow, onViewDetails }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="product-card" data-reveal>
      <div className="product-image-wrapper">
        <img src={product.image} alt={product.title} className="product-image" />
        {product.badge && <span className="product-badge">{product.badge}</span>}
        {discount > 0 && <span className="product-discount">-{discount}%</span>}
        <div className="product-overlay">
          <button className="overlay-btn" onClick={() => onViewDetails(product)} title="Quick View">
            <FiEye />
          </button>
          <button className="overlay-btn" onClick={() => onBuyNow(product)} title="Buy Now">
            <FiShoppingCart />
          </button>
        </div>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-pricing">
          <span className="product-price">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="product-old-price">{formatPrice(product.oldPrice)}</span>
          )}
        </div>
        <div className="product-card-actions">
          <button className="btn btn-outline btn-about" onClick={() => onViewDetails(product)}>
            <FiEye /> About
          </button>
          <button className="btn btn-primary btn-buy" onClick={() => onBuyNow(product)}>
            <FiShoppingCart /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
