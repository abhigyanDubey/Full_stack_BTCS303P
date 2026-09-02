import React, { useState } from 'react';
import { ShoppingCart, Check, Star } from 'lucide-react';

/**
 * ProductCard Component (Lab Sheet 3 - Task 3)
 * Receives a single product object and onAddToCart callback via props.
 * Renders product image, title, category, price, and interactive 'Add to Cart' button.
 */
export default function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  const fallbackImage = 'https://m.media-amazon.com/images/I/71P6cDbbFuL._SL1500_.jpg';

  return (
    <article className="product-card">
      {product.badge && (
        <span className="product-badge">{product.badge}</span>
      )}

      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImage;
          }}
        />
      </div>

      <div className="product-info">
        <span className="product-category">{product.categoryName || product.category}</span>
        <h3 className="product-name" title={product.name}>
          {product.name}
        </h3>

        {product.rating && (
          <div className="product-rating">
            <Star className="star-icon" size={14} fill="#ffb703" color="#ffb703" />
            <span className="rating-score">{product.rating}</span>
            <span className="rating-reviews">({product.reviews || 40}+ reviews)</span>
          </div>
        )}

        <div className="product-footer">
          <div className="price-box">
            <span className="product-price">${product.price.toFixed(2)}</span>
            {product.priceINR && <span className="product-price-inr">({product.priceINR})</span>}
            {product.oldPrice && <del className="product-old-price">${product.oldPrice.toFixed(2)}</del>}
          </div>

          <button
            type="button"
            className={`btn btn-add-cart ${isAdded ? 'btn-success' : 'btn-primary'}`}
            onClick={handleAdd}
            aria-label={`Add ${product.name} to Cart`}
          >
            {isAdded ? (
              <>
                <Check size={16} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
