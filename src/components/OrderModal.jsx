import { useState } from 'react';
import { FiX, FiUser, FiPhone, FiMapPin, FiCreditCard, FiTruck, FiMinus, FiPlus } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import config from '../config/site';

export default function OrderModal({ product, onClose }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    paymentOption: '',
  });
  const [quantity, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(price);

  const totalPrice = product.price * quantity;

  const incrementQty = () => setQuantity((q) => Math.min(q + 1, 50));
  const decrementQty = () => setQuantity((q) => Math.max(q - 1, 1));

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.phone.trim()) errs.phone = 'Phone number is required';
    if (!form.address.trim()) errs.address = 'Delivery address is required';
    if (!form.city.trim()) errs.city = 'City is required';
    if (!form.paymentOption) errs.paymentOption = 'Please select a payment option';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    // Build WhatsApp message
    const payLabel = form.paymentOption === 'pay-on-delivery' ? 'Pay on Delivery' : 'Pay Before Delivery';
    const msg = `\ud83d\uded2 *New Order \u2014 ${config.name}*\n\n` +
      `*Product:* ${product.title}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Unit Price:* ${formatPrice(product.price)}\n` +
      `*Total:* ${formatPrice(totalPrice)}\n\n` +
      `*Customer:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n` +
      `*Address:* ${form.address}, ${form.city}\n` +
      `*Payment:* ${payLabel}`;

    const waUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank');

    setSubmitted(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}><FiX /></button>
          <div className="modal-success">
            <div className="success-icon">\u2705</div>
            <h2>Order Sent to WhatsApp!</h2>
            <p>Thank you, <strong>{form.name}</strong>! Your order for <strong>{quantity}x {product.title}</strong> has been sent.</p>
            <p className="success-detail">Total: <strong>{formatPrice(totalPrice)}</strong></p>
            <p className="success-detail">Complete the message on WhatsApp to confirm your order.</p>
            <p className="success-detail">Payment: <strong>{form.paymentOption === 'pay-on-delivery' ? 'Pay on Delivery' : 'Pay Before Delivery'}</strong></p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><FiX /></button>
        
        <div className="modal-header">
          <h2>Place Your Order</h2>
          <p>Fill in the form below to order</p>
        </div>

        <div className="modal-product-summary">
          <img src={product.image} alt={product.title} />
          <div>
            <h4>{product.title}</h4>
            <span className="modal-price">{formatPrice(product.price)}</span>
          </div>
        </div>

        {/* Quantity Picker */}
        <div className="quantity-row">
          <label className="quantity-label">Quantity</label>
          <div className="quantity-picker">
            <button type="button" className="qty-btn" onClick={decrementQty} disabled={quantity <= 1}><FiMinus /></button>
            <span className="qty-value">{quantity}</span>
            <button type="button" className="qty-btn" onClick={incrementQty}><FiPlus /></button>
          </div>
          <span className="quantity-total">Total: <strong>{formatPrice(totalPrice)}</strong></span>
        </div>

        <form className="order-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label><FiUser /> Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={form.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label><FiPhone /> Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. 08012345678"
              value={form.phone}
              onChange={handleChange}
              className={errors.phone ? 'error' : ''}
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label><FiMapPin /> Delivery Address</label>
            <textarea
              name="address"
              placeholder="Enter your home/office address"
              rows={3}
              value={form.address}
              onChange={handleChange}
              className={errors.address ? 'error' : ''}
            />
            {errors.address && <span className="form-error">{errors.address}</span>}
          </div>

          <div className="form-group">
            <label><FiMapPin /> City</label>
            <input
              type="text"
              name="city"
              placeholder="e.g. Lagos, Abuja, Port Harcourt"
              value={form.city}
              onChange={handleChange}
              className={errors.city ? 'error' : ''}
            />
            {errors.city && <span className="form-error">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label><FiCreditCard /> Payment Option</label>
            <div className="payment-options">
              <label className={`payment-option ${form.paymentOption === 'pay-on-delivery' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentOption"
                  value="pay-on-delivery"
                  checked={form.paymentOption === 'pay-on-delivery'}
                  onChange={handleChange}
                />
                <FiTruck />
                <div>
                  <strong>Pay on Delivery</strong>
                  <span>Pay when you receive your order</span>
                </div>
              </label>
              <label className={`payment-option ${form.paymentOption === 'pay-before-delivery' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentOption"
                  value="pay-before-delivery"
                  checked={form.paymentOption === 'pay-before-delivery'}
                  onChange={handleChange}
                />
                <FiCreditCard />
                <div>
                  <strong>Pay Before Delivery</strong>
                  <span>Transfer payment before shipping</span>
                </div>
              </label>
            </div>
            {errors.paymentOption && <span className="form-error">{errors.paymentOption}</span>}
          </div>

          <button type="submit" className="btn btn-whatsapp btn-lg btn-submit">
            <FaWhatsapp /> Send Order via WhatsApp — {formatPrice(totalPrice)}
          </button>
        </form>
      </div>
    </div>
  );
}
