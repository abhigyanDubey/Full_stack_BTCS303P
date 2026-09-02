# Full Stack Development (BTCS303P) — Mini E-Commerce Project

**Department of Computer Science & Engineering — COER University**  
**Course Code:** BTCS303P — Full Stack Development Laboratory  
**Project Title:** OTAKUVERSE — Cyberpunk Anime & Gaming Storefront  
**Repository:** [https://github.com/cu24250214-dotcom/Full_stack_BTCS303P](https://github.com/cu24250214-dotcom/Full_stack_BTCS303P)

---

## 📅 Implementation Timeline & Lab Sheet Work Logs

### 🔹 Lab Sheet 1: Building the Storefront (HTML5 & CSS3)
- **Status:** Completed  
- **Date & Time Log:** August 19, 2026 — 06:45 PM IST (Evening)  
- **Objective:** Design and construct a multi-page, visually immersive, responsive e-commerce web interface using semantic HTML5 and modern CSS3 layout techniques.
- **Deliverables & HTML Files:**
  1. [`index.html`](./index.html) — Storefront homepage, hero section banner with call-to-action buttons, store features showcase, and featured collectibles.
  2. [`products.html`](./products.html) — Full catalog browsing page with interactive category filter bar.
  3. [`product-detail.html`](./product-detail.html) — Single product view featuring a thumbnail image gallery switcher, technical specifications table, and quantity adjuster.
  4. [`cart.html`](./cart.html) — Tabular shopping cart layout displaying item thumbnails, unit pricing, quantity fields, subtotal, and summary card.
  5. [`checkout.html`](./checkout.html) — Multi-section order finalization page with shipping address inputs and payment method selector.
- **Styling Architecture (`style.css`):**
  - **CSS Custom Properties (`:root`):** Cyberpunk dark palette featuring Sakura Pink (`#ff2a74`), Cyber Cyan (`#00f0ff`), Spirit Violet (`#9d4edd`), and glassmorphism translucent panels.
  - **Layout Models:** **Flexbox** for navbar headers, footers, and cards; **CSS Grid** for responsive product grids (`repeat(auto-fill, minmax(260px, 1fr))`) and cart layouts.
  - **Visual FX & Responsiveness:** Glassmorphism (`backdrop-filter: blur(12px)`), neon glow hover states, and `@media` queries supporting mobile, tablet, and desktop viewports.
- **Background FX (`particles.js`):**
  - HTML5 2D Canvas ambient animation with floating sakura petals and glowing energy particles.

---

### 🔹 Lab Sheet 2: Making It Interactive (Vanilla JavaScript)
- **Status:** Completed  
- **Date & Time Log:** August 26, 2026 — 09:40 PM IST (Today)  
- **Objective:** Add cart logic, dynamic rendering, and form validation using plain JavaScript (Vanilla JS) before migrating to React.  
- **Main Script File:** [`script.js`](./script.js) (Linked across all HTML pages)

#### Detailed Task Breakdown:
1. **Task 1: Catalog Data Array (`products`)**
   - Defined a catalog array of product objects in `script.js` containing 19 items (well above the minimum 8 items requirement).
   - Each item includes `id`, `name`, `category`, `categoryName`, `price`, `priceINR`, `oldPrice`, `badge`, and CDN-hosted `image` URLs.
2. **Task 2: Dynamic Product Rendering on `products.html`**
   - Implemented `renderProducts(filterCategory)` using DOM manipulation (`document.getElementById('catalog-grid')`) and ES6 template literals with `Array.prototype.map()`.
   - Replaced hardcoded HTML blocks with dynamically generated cards including category badges, prices, and Add to Cart buttons.
3. **Task 3: 'Add to Cart' Click Handler & Storage Persistence**
   - Implemented `addToCart(productId)` to add products to the cart array.
   - Persisted cart state across browser sessions and page reloads via `localStorage.setItem('cart', JSON.stringify(cart))`.
   - Displays real-time interactive toast notification feedback on each item addition.
4. **Task 4: Dynamic Cart Rendering on `cart.html`**
   - Implemented `renderCart()` reading cart array from `localStorage` using `JSON.parse(localStorage.getItem('cart'))`.
   - Generates tabular item rows with image thumbnails, unit prices, interactive quantity inputs, computed subtotals, and 'Remove' buttons (`removeFromCart()`).
5. **Task 5: Explicit `calculateTotal()` Function**
   - Implemented `calculateTotal()` utilizing `Array.prototype.reduce()` to compute order subtotal and express shipping.
   - Automatically recalculates and refreshes grand total values whenever item quantities change or items are removed.
6. **Task 6: Checkout Form Validation on `checkout.html`**
   - Implemented `validateCheckoutForm(event)` with comprehensive validation rules:
     - **Full Name:** Required (cannot be empty) ➔ Inline error message: `❌ Name must not be empty.`
     - **Delivery Address:** Required (cannot be empty) ➔ Inline error message: `❌ Address must not be empty.`
     - **Pincode:** Exactly 6 digits (validated via `/^\d{6}$/`) ➔ Inline error message: `❌ Pincode must be exactly 6 digits.`
     - **Phone Number:** Exactly 10 digits (validated via `/^\d{10}$/`) ➔ Inline error message: `❌ Phone number must be exactly 10 digits.`
   - Form feedback uses inline error labels (`.error-msg`) below inputs with zero `alert()` popups.
7. **Task 7: Order Confirmation & Cart Reset**
   - On successful checkout validation, generates a unique order tracking ID (e.g. `OTK-XXXXXX`) and displays an inline confirmation card (`🎉 Order Placed Successfully!`).
   - Clears the cart from `localStorage` (`localStorage.removeItem('cart')`) and resets the navbar badge.
8. **Task 8: Universal Navbar Cart Badge Sync**
   - Implemented `updateCartBadge()` executing on `DOMContentLoaded` across all HTML pages.
   - Reads `localStorage` and updates all `.cart-count` elements in the navbar header using `reduce()` sum of item quantities.

---

### 🔹 Lab Sheet 3: Rebuilding with React (Components, Props, useState)
- **Status:** Completed  
- **Objective:** Convert the product listing and cart into a proper React application using components, props, and state (`useState`).  
- **Directory / Package:** [`otakuverse-react/`](./otakuverse-react/) (Built with React 19 + Vite)

#### Detailed Task Breakdown:
1. **Task 1: Vite + React Project Setup (`otakuverse-react`)**
   - Initialized `otakuverse-react` using `npm create vite@latest otakuverse-react -- --template react`.
   - Installed dependencies including Lucide icons and modern bundling config.
2. **Task 2: Mock Product Data Source (`src/data/products.js`)**
   - Exported an array of 19 rich product objects with `id`, `name`, `category`, `categoryName`, `price`, `priceINR`, `oldPrice`, `badge`, `rating`, `reviews`, and CDN image assets.
3. **Task 3: Functional `ProductCard` Component (`src/components/ProductCard.jsx`)**
   - Receives a single `product` object and `onAddToCart` callback via props.
   - Renders product badge, image with fallback onError handling, category, title, ratings, dual currency pricing (USD & INR), and 'Add to Cart' button with animated confirmation feedback.
4. **Task 4: `ProductList` Component with Unique Keys (`src/components/ProductList.jsx`)**
   - Imports `products.js`, maps over the array, and renders `<ProductCard key={product.id} ... />` strictly using unique `product.id` (never array index).
   - Features real-time search input and interactive category filter tabs.
5. **Task 5: Centralized Cart State & Lifting State Up (`src/App.jsx`)**
   - Initialized cart state using `useState` as an array of `{ product, quantity }`.
   - Implemented `addToCart(product)` checking existing items to increment quantity or append new entries.
   - Persisted cart to browser `localStorage` and passed handler down via props.
6. **Task 6: `Cart` Component (`src/components/Cart.jsx`)**
   - Receives `cart`, `onRemoveFromCart`, `onUpdateQuantity`, `onClearCart`, and `onProceedToCheckout` via props.
   - Renders tabular cart layout with thumbnails, titles, unit prices, interactive quantity increment/decrement controls, computed item subtotals, express shipping calculation, and grand total.
7. **Task 7: Navbar Cart Badge & Show/Hide State Logic (`src/components/Navbar.jsx`)**
   - Implemented `isCartOpen` modal toggle state in `App.jsx`.
   - Dynamic navbar cart item count badge calculating `cart.reduce((sum, item) => sum + item.quantity, 0)`.
8. **Task 8: Controlled `CheckoutForm` Component (`src/components/CheckoutForm.jsx`)**
   - Controlled form inputs tied to `useState` for Name, Address, Pincode, Phone, and Payment Method.
   - Real-time inline regex validation for 6-digit pincode (`/^\d{6}$/`) and 10-digit phone (`/^\d{10}$/`).
   - Sticky live order summary sidebar and order dispatch authorization.
9. **Task 9: Conditional Rendering & Empty Cart Fallback**
   - If cart is empty, `Cart.jsx` conditionally renders a cyberpunk empty cart notice with a call-to-action button.
   - Dynamic conditional view transitions between Catalog, Checkout, and Order Confirmation (`OrderConfirmation.jsx`).

---

## 🛠️ Core Concepts Implemented

- **React Functional Components & Props:** Parent $\rightarrow$ child unidirectional data flow.
- **State Management (`useState`):** Cart items array, UI drawer/modal toggles, search/filter inputs, form fields, and error states.
- **Lists and Keys:** Dynamic list rendering with `.map()` using strict unique IDs (`product.id`).
- **Conditional Rendering:** Inline ternary operators, short-circuit `&&`, and early returns for empty states and order placement.
- **Lifting State Up:** Centralized state residing in `App.jsx` passing dispatch functions down to nested children.

---

## 📂 Project Directory Structure

```
Full_stack_BTCS303P/
├── README.md                  <-- Coursework Documentation & Lab Work Logs
├── index.html                 <-- Lab 1 & 2: HTML5 Homepage
├── products.html              <-- Lab 1 & 2: Vanilla JS Catalog
├── product-detail.html        <-- Lab 1 & 2: Single Product View
├── cart.html                  <-- Lab 1 & 2: Shopping Cart
├── checkout.html              <-- Lab 1 & 2: Vanilla JS Checkout
├── style.css                  <-- Lab 1 & 2 Stylesheet
├── script.js                  <-- Lab 2 Vanilla JS Script
├── particles.js               <-- HTML5 Particle Background
└── otakuverse-react/          <-- 🚀 Lab Sheet 3: Vite + React Application
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── main.jsx           <-- React Root Mount
        ├── App.jsx            <-- Top-Level App & State Hub (Cart, View, Modals)
        ├── App.css            <-- Component Stylesheet & Cyberpunk Theme
        ├── index.css          <-- CSS Custom Properties & Base Resets
        ├── data/
        │   └── products.js    <-- Task 2: 19 Product Objects Catalog Data
        └── components/
            ├── Navbar.jsx     <-- Task 7: Header & Cart Toggle Badge
            ├── Hero.jsx       <-- Storefront Banner & Guarantees
            ├── ProductCard.jsx<-- Task 3: Single Product Card
            ├── ProductList.jsx<-- Task 4: Filterable Dynamic Product Grid
            ├── Cart.jsx       <-- Task 6 & 9: Tabular Cart & Empty State
            ├── CheckoutForm.jsx<-- Task 8: Controlled Inputs & Validation
            ├── OrderConfirmation.jsx <-- Order Receipt & Tracking ID
            ├── ParticleCanvas.jsx   <-- Animated Canvas Background
            ├── Toast.jsx      <-- Real-Time Added to Cart Feedback
            └── Footer.jsx     <-- Coursework Attribution & Links
```

---

## 🚀 How to Run Locally

### 1. Static Storefront (Lab 1 & 2 - HTML5/CSS3/Vanilla JS)
- Double click `index.html` in any browser or launch with Live Server.

### 2. React Storefront (Lab Sheet 3 - React + Vite)
```bash
# Navigate to the React project directory
cd otakuverse-react

# Install dependencies (if not already installed)
npm install

# Start the Vite development server
npm run dev
```
Open your browser at `http://localhost:5173`.


