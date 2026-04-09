import { FiX, FiShoppingCart, FiMessageCircle } from 'react-icons/fi';
import siteConfig from '../config/site';

export default function ProductDetailModal({ product, onClose, onBuyNow }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  // Split description by newlines for paragraphs
  const descParagraphs = product.description
    ? product.description.split('\n').filter((p) => p.trim())
    : [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal modal-detail" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><FiX /></button>
        <div className="detail-content">
          <div className="detail-image">
            <img src={product.image} alt={product.title} />
            {discount > 0 && <span className="product-discount">-{discount}%</span>}
          </div>
          <div className="detail-info">
            <span className="product-category">{product.category}</span>
            <h2>{product.title}</h2>
            <div className="product-pricing">
              <span className="product-price large">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="product-old-price">{formatPrice(product.oldPrice)}</span>
              )}
            </div>
            <div className="detail-description">
              {descParagraphs.map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>
            <div className="detail-actions">
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-lg"
              >
                <FiMessageCircle /> Contact Us
              </a>
              <button
                className="btn btn-primary btn-lg"
                onClick={() => {
                  onClose();
                  onBuyNow(product);
                }}
              >
                <FiShoppingCart /> Order Now — {formatPrice(product.price)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
