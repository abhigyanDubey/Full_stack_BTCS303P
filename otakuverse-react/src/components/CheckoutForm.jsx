import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, CheckCircle2, CreditCard, Banknote, QrCode, Lock } from 'lucide-react';
import { SHIPPING_FEE } from '../data/products';

/**
 * CheckoutForm Component (Lab Sheet 3 - Task 8)
 * Controlled form inputs tied to useState for Name, Address, Pincode, Phone, and Payment Method.
 * Real-time inline error validation without browser alert popups.
 */
export default function CheckoutForm({
  cart,
  onPlaceOrder,
  onBackToCart,
  onCancelCheckout
}) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    pincode: '',
    phone: '',
    paymentMethod: 'upi'
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal >= 150 ? 0 : SHIPPING_FEE;
  const grandTotal = subtotal + shipping;

  // Validation Logic
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return '❌ Name must not be empty.';
        if (value.trim().length < 2) return '❌ Name must be at least 2 characters.';
        return '';
      case 'address':
        if (!value.trim()) return '❌ Delivery address must not be empty.';
        if (value.trim().length < 6) return '❌ Please enter a detailed delivery address.';
        return '';
      case 'pincode':
        if (!value.trim()) return '❌ Pincode is required.';
        if (!/^\d{6}$/.test(value.trim())) return '❌ Pincode must be exactly 6 digits.';
        return '';
      case 'phone':
        if (!value.trim()) return '❌ Phone number is required.';
        if (!/^\d{10}$/.test(value.trim())) return '❌ Phone number must be exactly 10 digits.';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = {
      name: true,
      address: true,
      pincode: true,
      phone: true
    };
    setTouched(allTouched);

    // Validate all fields
    const formErrors = {
      name: validateField('name', formData.name),
      address: validateField('address', formData.address),
      pincode: validateField('pincode', formData.pincode),
      phone: validateField('phone', formData.phone)
    };

    setErrors(formErrors);

    const hasErrors = Object.values(formErrors).some((msg) => msg !== '');

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);

    // Simulate cyber-checkout transaction processing
    setTimeout(() => {
      const randomId = Math.floor(100000 + Math.random() * 900000);
      const orderId = `OTK-${randomId}`;

      const orderPayload = {
        orderId,
        customer: formData,
        items: [...cart],
        subtotal,
        shipping,
        grandTotal,
        date: new Date().toLocaleString()
      };

      setIsSubmitting(false);
      onPlaceOrder(orderPayload);
    }, 600);
  };

  return (
    <section className="checkout-section">
      <div className="container">
        <div className="checkout-header-bar">
          <button
            type="button"
            className="back-btn"
            onClick={onBackToCart}
          >
            <ArrowLeft size={18} /> Back to Cart
          </button>
          <div className="checkout-security-pill">
            <Lock size={14} />
            <span>Secure 256-bit Encrypted Checkout</span>
          </div>
        </div>

        <div className="checkout-grid">
          {/* Shipping & Payment Form */}
          <div className="form-card">
            <h2 className="form-header">
              <span>01.</span> Delivery & Customer Details
            </h2>

            <form onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${
                    touched.name && errors.name ? 'is-invalid' : ''
                  }`}
                  placeholder="e.g. Klein Moretti"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.name && errors.name && (
                  <span className="error-msg">{errors.name}</span>
                )}
              </div>

              {/* Delivery Address */}
              <div className="form-group">
                <label htmlFor="address" className="form-label">
                  Street Address & Landmark *
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  className={`form-control ${
                    touched.address && errors.address ? 'is-invalid' : ''
                  }`}
                  placeholder="e.g. Unit 404, Cyberpunk District, Roorkee, Uttarakhand"
                  value={formData.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                />
                {touched.address && errors.address && (
                  <span className="error-msg">{errors.address}</span>
                )}
              </div>

              {/* Pincode & Phone Grid */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pincode" className="form-label">
                    Postal Pincode (6 Digits) *
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    maxLength="6"
                    className={`form-control ${
                      touched.pincode && errors.pincode ? 'is-invalid' : ''
                    }`}
                    placeholder="e.g. 247667"
                    value={formData.pincode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {touched.pincode && errors.pincode && (
                    <span className="error-msg">{errors.pincode}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Mobile Phone (10 Digits) *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    maxLength="10"
                    className={`form-control ${
                      touched.phone && errors.phone ? 'is-invalid' : ''
                    }`}
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  {touched.phone && errors.phone && (
                    <span className="error-msg">{errors.phone}</span>
                  )}
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="payment-method-section">
                <h2 className="form-header" style={{ marginTop: '2rem' }}>
                  <span>02.</span> Payment Method
                </h2>

                <div className="payment-methods" role="radiogroup">
                  <label
                    className={`radio-option ${
                      formData.paymentMethod === 'upi' ? 'selected' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                    />
                    <QrCode size={20} className="payment-icon" />
                    <div className="radio-text">
                      <strong>Cyber UPI / QR Pay</strong>
                      <small>Instant scan & pay via Google Pay, PhonePe, Paytm</small>
                    </div>
                  </label>

                  <label
                    className={`radio-option ${
                      formData.paymentMethod === 'card' ? 'selected' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <CreditCard size={20} className="payment-icon" />
                    <div className="radio-text">
                      <strong>Credit / Debit Card</strong>
                      <small>Visa, Mastercard, RuPay & Amex supported</small>
                    </div>
                  </label>

                  <label
                    className={`radio-option ${
                      formData.paymentMethod === 'cod' ? 'selected' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                    />
                    <Banknote size={20} className="payment-icon" />
                    <div className="radio-text">
                      <strong>Cash on Delivery (COD)</strong>
                      <small>Pay upon arrival at your doorstep</small>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary btn-block submit-order-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Processing Secure Order...</span>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    <span>Authorize & Confirm Order (${grandTotal.toFixed(2)})</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Review Sidebar */}
          <aside className="order-summary-sidebar">
            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>
              <div className="checkout-item-list">
                {cart.map((item) => (
                  <div key={item.product.id} className="checkout-item-row">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="checkout-item-thumb"
                    />
                    <div className="checkout-item-details">
                      <div className="checkout-item-name">{item.product.name}</div>
                      <div className="checkout-item-sub">
                        Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                      </div>
                    </div>
                    <div className="checkout-item-total">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="checkout-totals">
                <div className="total-line">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="total-line">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="total-line grand-total-line">
                  <span>Total Amount</span>
                  <span className="total-value">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="guarantee-box">
                <ShieldCheck size={18} className="guarantee-icon" />
                <span>100% Authentic miHoYo & Novel Merchandise Guarantee</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
