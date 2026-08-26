# Full Stack Development — BTCS303P

Repository for **Full Stack Development Lab Assignments (BTCS303P)** — COER University.

---

## 📁 Repository Structure

### [📂 LAB ASSIGNMENT 1](./LAB%20ASSIGNMENT%201)
**Project Title:** OTAKUVERSE — Cyberpunk Anime E-Commerce Storefront  
**Lab Assignment:** Building the Storefront (HTML5 + CSS3 + Flexbox/Grid)  
**Covers:** Project Phase 1 & Phase 2 Specifications (COER University Lab Sheet 1)

---

### [📄 script.js](./script.js) — Lab Sheet 2: Making It Interactive (Vanilla JavaScript)
**Lab Assignment:** Making It Interactive (Vanilla JavaScript) — Project Phase 3  
**Covers:** COER University Lab Sheet 2 Specifications (Tasks 1 - 8)

#### ⚡ Lab Sheet 2 Features & Functions Implemented:
1. **Task 1 (Products Catalog Array):** `const products = [...]` containing 19 store products (`id`, `name`, `price`, `image`).
2. **Task 2 (Dynamic DOM Rendering):** `renderProducts()` dynamically builds product card elements on `products.html` using DOM methods & template literals.
3. **Task 3 (Add to Cart Handler):** `addToCart(productId)` appends items to cart array and persists to `localStorage` via `JSON.stringify()`.
4. **Task 4 (Dynamic Cart Rendering):** `renderCart()` dynamically renders cart table rows on `cart.html` with working quantity inputs and 'Remove' buttons (`removeFromCart()`).
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
2. Open `index.html` or `products.html` in your web browser.
