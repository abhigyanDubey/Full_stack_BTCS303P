# Full Stack Development — BTCS303P

Repository for **Full Stack Development Lab Assignments (BTCS303P)** — COER University.

---

## 📁 Repository Assignments

### [📂 LAB ASSIGNMENT 1](./LAB%20ASSIGNMENT%201)
**Lab Sheet 1:** Mini E-Commerce Project — Building the Storefront (HTML5 & CSS3)  
**Covers:** Project Phase 1 & Phase 2 Specifications  
**Contents:** Static HTML5 pages (`index.html`, `products.html`, `product-detail.html`, `cart.html`, `checkout.html`), CSS Custom Properties (`style.css`), and HTML5 Canvas background (`particles.js`).

---

### [📂 LAB ASSIGNMENT 2](./LAB%20ASSIGNMENT%202)
**Lab Sheet 2:** Making It Interactive (Vanilla JavaScript)  
**Covers:** Project Phase 3 Specifications (Tasks 1 - 8)  
**Main Script:** [`script.js`](./LAB%20ASSIGNMENT%202/script.js) linked to all pages.

#### ⚡ Lab Sheet 2 Features & Tasks Implemented:
1. **Task 1 (Products Catalog Array):** `products` array containing 19 store items (`id`, `name`, `price`, `image`).
2. **Task 2 (Dynamic DOM Rendering):** `renderProducts()` dynamically generates product card elements on `products.html` using DOM methods & template literals (`map()`).
3. **Task 3 (Add to Cart Handler):** `addToCart(productId)` appends products to cart array and persists to `localStorage` (`JSON.stringify()`).
4. **Task 4 (Dynamic Cart Rendering):** `renderCart()` dynamically populates cart table rows on `cart.html` with working quantity inputs and 'Remove' buttons (`removeFromCart()`).
5. **Task 5 (Explicit `calculateTotal()`):** Function `calculateTotal()` recalculates subtotal and grand total using the `reduce()` array method whenever quantities change or items are removed.
6. **Task 6 (Inline Form Validation):** `validateCheckoutForm()` on `checkout.html` validates Name (non-empty), Address (non-empty), Pincode (exactly 6 digits), and Phone (exactly 10 digits). Displays **inline error messages under inputs without using `alert()`**.
7. **Task 7 (Order Confirmation & Cart Reset):** Displays an inline confirmation box (`'🎉 Order Placed Successfully!'`) upon valid submission and clears `cart` from `localStorage`.
8. **Task 8 (Navbar Cart Badge):** `updateCartBadge()` runs universally across all pages, reading total item quantity from `localStorage` (`JSON.parse()`).

---

## 🚀 How to Run

1. Clone or download this repository:
   ```bash
   git clone https://github.com/cu24250059-pixel/Full_stack_BTCS303P.git
   ```
2. Open `LAB ASSIGNMENT 2/index.html` or `LAB ASSIGNMENT 2/products.html` in your web browser.
