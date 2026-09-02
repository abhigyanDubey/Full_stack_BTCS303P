import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, X, ShieldCheck } from 'lucide-react';
import { SHIPPING_FEE } from '../data/products';

/**
 * Cart Component (Lab Sheet 3 - Task 6 & Task 9)
 * Receives cart array, onRemoveFromCart, and onUpdateQuantity via props.
 * Renders tabular layout with item thumbnails, unit prices, quantity controls,
 * calculated subtotals, shipping, and grand total.
 * Conditionally renders 'Your cart is empty' state when cart is empty (Task 9).
 */
export default function Cart({
  cart,
  onRemoveFromCart,
  onUpdateQuantity,
  onClearCart,
  onProceedToCheckout,
  onClose
}) {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shipping = cart.length > 0 ? (subtotal >= 150 ? 0 : SHIPPING_FEE) : 0;
  const grandTotal = subtotal + shipping;

  const fallbackImage = 'https://m.media-amazon.com/images/I/71P6cDbbFuL._SL1500_.jpg';

  return (
    <div className="cart-modal-backdrop" onClick={onClose}>
      <div
        className="cart-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        <div className="cart-header">
          <div className="cart-title-wrapper">
            <ShoppingBag className="cart-header-icon" size={24} />
            <h2 id="cart-heading">
              Shopping <span>Cart</span>
            </h2>
            <span className="cart-item-badge">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close Shopping Cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Task 9: Conditional Rendering - Empty State vs Cart Table */}
        {cart.length === 0 ? (
          <div className="empty-cart-view">
            <div className="empty-cart-icon-wrapper">
              <ShoppingBag size={64} className="empty-cart-icon" />
            </div>
            <h3>Your Cart is Empty</h3>
            <p>
              You haven't added any cyberpunk artifacts or anime collectibles to your loadout yet.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClose}
            >
              Explore Artifact Catalog
            </button>
          </div>
        ) : (
          <div className="cart-content-wrapper">
            {/* Cart Table for Desktop / Tablet */}
            <div className="cart-table-container">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const itemSubtotal = item.product.price * item.quantity;
                    return (
                      <tr key={item.product.id} className="cart-row">
                        <td className="product-col">
                          <div className="cart-item-info">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="cart-item-img"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = fallbackImage;
                              }}
                            />
                            <div className="cart-item-meta">
                              <span className="cart-item-badge-tag">
                                {item.product.categoryName || item.product.category}
                              </span>
                              <h4 className="cart-item-title">{item.product.name}</h4>
                            </div>
                          </div>
                        </td>
                        <td className="price-col">
                          <span className="unit-price">${item.product.price.toFixed(2)}</span>
                          {item.product.priceINR && (
                            <span className="unit-price-inr">{item.product.priceINR}</span>
                          )}
                        </td>
                        <td className="quantity-col">
                          <div className="quantity-control-group">
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              aria-label="Decrease quantity"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={14} />
                            </button>
                            <input
                              type="number"
                              min="1"
                              max="99"
                              value={item.quantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value, 10);
                                if (!isNaN(val) && val >= 1) {
                                  onUpdateQuantity(item.product.id, val);
                                }
                              }}
                              className="qty-input"
                              aria-label="Item quantity"
                            />
                            <button
                              type="button"
                              className="qty-btn"
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.quantity + 1)
                              }
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </td>
                        <td className="subtotal-col">
                          <span className="subtotal-amount">
                            ${itemSubtotal.toFixed(2)}
                          </span>
                        </td>
                        <td className="action-col">
                          <button
                            type="button"
                            className="remove-btn"
                            onClick={() => onRemoveFromCart(item.product.id)}
                            title="Remove item"
                            aria-label={`Remove ${item.product.name} from cart`}
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Cart Summary & Actions */}
            <div className="cart-footer-summary">
              <div className="cart-summary-left">
                <button
                  type="button"
                  className="btn-clear-cart"
                  onClick={onClearCart}
                >
                  <Trash2 size={15} /> Clear Entire Cart
                </button>
                <div className="secure-badge">
                  <ShieldCheck size={16} className="shield-icon" />
                  <span>256-Bit Encrypted Cyber Checkout</span>
                </div>
              </div>

              <div className="cart-summary-right">
                <div className="summary-row">
                  <span>Cart Subtotal</span>
                  <span className="summary-value">${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Express Dispatch</span>
                  <span className="summary-value">
                    {shipping === 0 ? (
                      <span className="free-shipping">FREE (Order &gt; $150)</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="summary-row grand-total-row">
                  <span>Grand Total</span>
                  <span className="grand-total-value">${grandTotal.toFixed(2)}</span>
                </div>

                <div className="cart-action-buttons">
                  <button
                    type="button"
                    className="btn btn-secondary btn-continue"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary btn-checkout"
                    onClick={onProceedToCheckout}
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
