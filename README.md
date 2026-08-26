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

## 🛠️ Core JavaScript Concepts Implemented

- **Array Methods:** `map()` (card & row generation), `filter()` (category filtering & item removal), `find()` (item lookup), `reduce()` (grand total calculation & cart count badge).
- **DOM Manipulation:** `querySelector()`, `querySelectorAll()`, `getElementById()`, `addEventListener()`, `innerHTML`, and template literals.
- **Browser Web Storage:** `localStorage.getItem()`, `localStorage.setItem()`, `localStorage.removeItem()`, `JSON.stringify()`, `JSON.parse()`.
- **Form Validation & Regex:** Pattern matching for 6-digit postal pincodes (`/^\d{6}$/`) and 10-digit telephone numbers (`/^\d{10}$/`) with inline error feedback.

---

## 📂 Project Directory Structure

```
Full_stack_BTCS303P/
├── README.md               <-- Complete Coursework Documentation & Lab Work Logs
├── index.html              <-- Homepage, Hero Section & Featured Collectibles
├── products.html           <-- Catalog Page (Dynamic JS Rendering)
├── product-detail.html     <-- Single Product View with Image Gallery Switcher
├── cart.html               <-- Shopping Cart Table & calculateTotal() Logic
├── checkout.html           <-- Form Validation & Inline Order Confirmation
├── style.css               <-- Central Stylesheet (Glassmorphism & Cyberpunk Theme)
├── script.js               <-- Central Vanilla JS Script (Lab Sheet 2 Tasks 1-8)
└── particles.js            <-- HTML5 Canvas 2D Particle Background
```

---

## 🚀 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/cu24250214-dotcom/Full_stack_BTCS303P.git
   ```
2. **Navigate to the project folder:**
   ```bash
   cd Full_stack_BTCS303P
   ```
3. **Open the project:**
   - Simply double click `index.html` or `products.html` to open in any web browser (Chrome, Edge, Firefox, Safari).
   - Or run with VS Code Live Server extension.

