import React from 'react';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';

/**
 * Toast Notification Component
 * Renders brief cyberpunk popup when an item is added to cart.
 */
export default function Toast({ message, visible, onOpenCart }) {
  if (!visible) return null;

  return (
    <aside className="toast-container" role="status" aria-live="polite">
      <div className="toast-card">
        <CheckCircle2 size={20} className="toast-icon" />
        <div className="toast-text">
          <strong>Added to Cart!</strong>
          <span>{message}</span>
        </div>
        <button
          type="button"
          className="toast-btn"
          onClick={onOpenCart}
        >
          View Cart
        </button>
      </div>
    </aside>
  );
}
