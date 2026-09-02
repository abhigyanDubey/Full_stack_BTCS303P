import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutForm from './components/CheckoutForm';
import OrderConfirmation from './components/OrderConfirmation';
import ParticleCanvas from './components/ParticleCanvas';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { products } from './data/products';
import './App.css';

/**
 * Top-Level App Component (Lab Sheet 3 - Task 5 & Lifting State Up)
 * - Manages centralized cart state: Array of { product, quantity }
 * - Manages UI modal toggles: isCartOpen
 * - Manages active application view: 'catalog' | 'checkout' | 'confirmation'
 * - Persists cart state in localStorage
 * - Passes addToCart, removeFromCart, updateQuantity callbacks to child components via props
 */
export default function App() {
  // Task 5: Centralized Cart State using useState (array of { product, quantity })
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('otakuverse_cart_react');
      if (savedCart) {
        return JSON.parse(savedCart);
      }
    } catch (err) {
      console.error('Failed to load cart from localStorage:', err);
    }
    // Default initial demonstration items (as in Lab Sheet 2)
    return [
      { product: products[0], quantity: 1 }, // LOTM Vol 1
      { product: products[3], quantity: 1 }  // Columbina Figure
    ];
  });

  // Task 7: Show/Hide Toggle State for Cart
  const [isCartOpen, setIsCartOpen] = useState(false);

  // App Navigation View: 'catalog' | 'checkout' | 'confirmation'
  const [currentView, setCurrentView] = useState('catalog');

  // Order Details State for confirmation view
  const [lastOrder, setLastOrder] = useState(null);

  // Toast Notification State
  const [toast, setToast] = useState({ visible: false, message: '' });

  // Sync cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('otakuverse_cart_react', JSON.stringify(cart));
    } catch (err) {
      console.error('Failed to save cart to localStorage:', err);
    }
  }, [cart]);

  // Compute total items count for the navbar badge
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Task 5: Add to Cart Callback (Lifting State Up)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingIndex > -1) {
        // Increment quantity if item already exists
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1
        };
        return updated;
      } else {
        // Append new item with quantity 1
        return [...prevCart, { product, quantity: 1 }];
      }
    });

    // Show feedback toast
    setToast({ visible: true, message: product.name });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  // Task 6: Remove from Cart Callback
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  // Task 6: Update Quantity Callback
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Clear Cart Callback
  const clearCart = () => {
    setCart([]);
  };

  // Switch to Checkout View
  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete Order & Switch to Confirmation
  const handlePlaceOrder = (orderPayload) => {
    setLastOrder(orderPayload);
    setCart([]);
    setCurrentView('confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset to Catalog View
  const handleContinueShopping = () => {
    setCurrentView('catalog');
    setIsCartOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-layout">
      {/* Ambient Cyberpunk Canvas Background */}
      <ParticleCanvas />

      {/* Task 7: Navbar with Cart Item Count Badge & Show/Hide Trigger */}
      <Navbar
        totalCartItems={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
      />

      {/* Main View Area */}
      <main className="main-content">
        {currentView === 'catalog' && (
          <>
            <Hero
              onExploreCatalog={() => {
                const el = document.getElementById('catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            {/* Task 4 & Task 5: ProductList with addToCart prop drilling to ProductCard */}
            <ProductList onAddToCart={addToCart} />
          </>
        )}

        {currentView === 'checkout' && (
          /* Task 8: Controlled Checkout Form */
          <CheckoutForm
            cart={cart}
            onPlaceOrder={handlePlaceOrder}
            onBackToCart={() => {
              setCurrentView('catalog');
              setIsCartOpen(true);
            }}
            onCancelCheckout={() => setCurrentView('catalog')}
          />
        )}

        {currentView === 'confirmation' && (
          /* Task 8 & 9: Order Confirmation View */
          <OrderConfirmation
            orderDetails={lastOrder}
            onContinueShopping={handleContinueShopping}
          />
        )}
      </main>

      {/* Task 6, 7 & 9: Cart Component (Conditional Modal Drawer with Empty State) */}
      {isCartOpen && (
        <Cart
          cart={cart}
          onRemoveFromCart={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onClearCart={clearCart}
          onProceedToCheckout={handleProceedToCheckout}
          onClose={() => setIsCartOpen(false)}
        />
      )}

      {/* Dynamic Toast Feedback */}
      <Toast
        message={toast.message}
        visible={toast.visible}
        onOpenCart={() => {
          setToast({ visible: false, message: '' });
          setIsCartOpen(true);
        }}
      />

      <Footer />
    </div>
  );
}
