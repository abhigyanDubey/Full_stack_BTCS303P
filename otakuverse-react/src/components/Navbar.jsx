import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

/**
 * Navbar Component (Lab Sheet 3 - Task 7)
 * Displays site brand logo, navigation links, and Cart toggle button with dynamic badge count.
 */
export default function Navbar({
  totalCartItems,
  onOpenCart,
  currentView,
  onNavigate
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container navbar">
        <a
          href="#home"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('catalog');
          }}
        >
          OTAKU<span>VERSE</span>
          <span className="badge">⛩️ VAULT</span>
        </a>

        {/* Mobile menu trigger */}
        <button
          type="button"
          className="nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`nav-container ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li>
              <button
                type="button"
                className={`nav-link-btn ${currentView === 'catalog' ? 'active' : ''}`}
                onClick={() => handleNavClick('catalog')}
              >
                Catalog
              </button>
            </li>
            <li>
              <a
                href="#catalog"
                className="nav-link-btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('catalog');
                  const el = document.getElementById('catalog');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Featured
              </a>
            </li>
            <li>
              <button
                type="button"
                className="cart-toggle-btn"
                onClick={() => {
                  onOpenCart();
                  setMobileMenuOpen(false);
                }}
                aria-label={`Shopping Cart with ${totalCartItems} items`}
              >
                <ShoppingBag size={18} />
                <span>Cart</span>
                <span className={`cart-count ${totalCartItems > 0 ? 'has-items' : ''}`}>
                  {totalCartItems}
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
