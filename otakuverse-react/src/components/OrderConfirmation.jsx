import React from 'react';
import { CheckCircle2, PackageCheck, ShoppingBag, ArrowRight, Printer } from 'lucide-react';

/**
 * OrderConfirmation Component (Lab Sheet 3 - Task 8 & 9 Conditional Rendering)
 * Displays the confirmed order card with Order ID, customer details, item breakdown, and reset CTA.
 */
export default function OrderConfirmation({ orderDetails, onContinueShopping }) {
  if (!orderDetails) return null;

  const { orderId, customer, items, subtotal, shipping, grandTotal, date } = orderDetails;

  return (
    <section className="order-confirmation-section">
      <div className="container">
        <div className="success-box">
          <div className="success-icon-badge">
            <CheckCircle2 size={56} className="success-icon" />
          </div>

          <span className="order-badge-pill">TRANSACTION VERIFIED</span>
          <h2 className="success-title">Order Placed Successfully!</h2>
          <p className="success-subtitle">
            Thank you, <strong>{customer.name}</strong>! Your anime & gaming artifacts have been logged into our cyber-dispatch network.
          </p>

          <div className="order-tracking-card">
            <div className="tracking-header">
              <div>
                <span className="tracking-label">ORDER TRACKING ID</span>
                <div className="tracking-id">{orderId}</div>
              </div>
              <div>
                <span className="tracking-label">ORDER DATE</span>
                <div className="order-date">{date}</div>
              </div>
            </div>

            <div className="order-details-grid">
              <div className="detail-block">
                <h4>Delivery Address</h4>
                <p>{customer.address}</p>
                <p><strong>Pincode:</strong> {customer.pincode}</p>
                <p><strong>Phone:</strong> +91 {customer.phone}</p>
              </div>

              <div className="detail-block">
                <h4>Payment Details</h4>
                <p>
                  <strong>Method:</strong>{' '}
                  {customer.paymentMethod === 'upi'
                    ? 'Cyber UPI / QR Pay'
                    : customer.paymentMethod === 'card'
                    ? 'Credit / Debit Card'
                    : 'Cash on Delivery (COD)'}
                </p>
                <p><strong>Status:</strong> Confirmed & Queued</p>
                <p>
                  <strong>Grand Total:</strong>{' '}
                  <span className="order-total-highlight">${grandTotal.toFixed(2)}</span>
                </p>
              </div>
            </div>

            <div className="ordered-items-list">
              <h4>Ordered Items ({items.reduce((s, i) => s + i.quantity, 0)})</h4>
              <div className="ordered-items-scroll">
                {items.map((item) => (
                  <div key={item.product.id} className="ordered-item-row">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="ordered-item-thumb"
                    />
                    <div className="ordered-item-info">
                      <span className="ordered-item-name">{item.product.name}</span>
                      <span className="ordered-item-meta">
                        Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                      </span>
                    </div>
                    <span className="ordered-item-subtotal">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="order-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => window.print()}
            >
              <Printer size={16} /> Print Receipt
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onContinueShopping}
            >
              <ShoppingBag size={16} /> Return to Artifact Catalog
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
