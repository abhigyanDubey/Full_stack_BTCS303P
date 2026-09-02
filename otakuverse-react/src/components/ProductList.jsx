import React, { useState } from 'react';
import { products, CATEGORIES } from '../data/products';
import ProductCard from './ProductCard';
import { Filter, Sparkles, Search } from 'lucide-react';

/**
 * ProductList Component (Lab Sheet 3 - Task 4)
 * Imports products.js, maps over the array, and renders one ProductCard per product.
 * Uses strict unique keys (product.id, never array index).
 * Includes category filtering and real-time search.
 */
export default function ProductList({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.categoryName &&
        product.categoryName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.badge &&
        product.badge.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="product-catalog-section" id="catalog">
      <div className="container">
        <div className="section-header">
          <div className="catalog-eyebrow">
            <Sparkles size={16} className="sparkle-icon" />
            <span>NEO-TOKYO ARTIFACT VAULT</span>
          </div>
          <h2 className="section-title">
            Featured <span>Collectibles</span>
          </h2>
          <p className="section-subtitle">
            Authentic miHoYo figures, Lord of the Mysteries novel editions, and premium cyberpunk anime merchandise.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="catalog-controls">
          <div className="search-bar-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search by title, character, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              aria-label="Search catalog products"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>

          <div className="filter-bar" role="tablist" aria-label="Product categories">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="catalog-meta">
          <span>Showing <strong>{filteredProducts.length}</strong> of {products.length} Artifacts</span>
          {selectedCategory !== 'all' && (
            <button
              type="button"
              className="reset-filter-link"
              onClick={() => setSelectedCategory('all')}
            >
              Reset Category
            </button>
          )}
        </div>

        {/* Dynamic Product Grid with map() & unique product.id keys */}
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="no-products-found">
            <Filter size={48} className="no-products-icon" />
            <h3>No Artifacts Match Your Search</h3>
            <p>Try searching for a different character, volume, or switch category filters.</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
