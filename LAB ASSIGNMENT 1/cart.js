/* ==========================================================================
   OTAKUVERSE - Interactive Shopping Cart System (cart.js)
   Handles localStorage persistence, Add/Remove Cart actions, Quantity Updates,
   Grand Total Recalculation, Toast Notifications, and Navbar Badge Sync.
   ========================================================================== */

// Default sample products initial state
const DEFAULT_CART_ITEMS = [
    {
        id: 'pinaka-chibi-figures',
        name: 'PINAKA Genshin Impact Chibi Mini Action Figures Set',
        category: 'Action Figures',
        price: 12.99,
        image: 'https://m.media-amazon.com/images/I/71P6cDbbFuL._SL1500_.jpg',
        qty: 1
    },
    {
        id: 'genshin-columbina',
        name: 'Official Genshin Impact Columbina The Damselette 1/8 Figure',
        category: 'Genshin Impact',
        price: 189.99,
        image: 'https://genshinfans.com/cdn/shop/files/Official-Columbina-Figure_423eebf6-da9b-446b-b1af-93f507cfc8b7.jpg?v=1770267594',
        qty: 1
    },
    {
        id: 'hsr-aventurine',
        name: 'Honkai: Star Rail Aventurine 1/7 Scale Figure',
        category: 'Honkai Star Rail',
        price: 199.99,
        image: 'https://honkai.shop/cdn/shop/files/hsr-aventurine-1-7-scale-figure-3.jpg?v=1748396165',
        qty: 1
    }
];

const SHIPPING_COST = 1.99;

// Initialize & Fetch Cart State
function getCart() {
    const stored = localStorage.getItem('otakuverse_cart');
    if (!stored) {
        localStorage.setItem('otakuverse_cart', JSON.stringify(DEFAULT_CART_ITEMS));
        return DEFAULT_CART_ITEMS;
    }
    try {
        return JSON.parse(stored);
    } catch (e) {
        return DEFAULT_CART_ITEMS;
    }
}

// Save Cart State & Update UI
function saveCart(cart) {
    localStorage.setItem('otakuverse_cart', JSON.stringify(cart));
    updateCartBadge();
}

// Get Total Item Count
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

// Update Cart Count Badge in Header
function updateCartBadge() {
    const badges = document.querySelectorAll('.cart-count');
    const count = getCartItemCount();
    badges.forEach(badge => {
        badge.textContent = count;
    });
}

// Toast Notification
function showToast(message, type = 'success') {
    let toast = document.getElementById('otaku-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'otaku-toast';
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: rgba(15, 10, 30, 0.95);
            border: 1px solid var(--secondary-color, #00f0ff);
            color: #fff;
            padding: 14px 24px;
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
            font-family: var(--font-heading, sans-serif);
            font-size: 0.9rem;
            z-index: 9999;
            transition: all 0.3s ease;
            transform: translateY(100px);
            opacity: 0;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        document.body.appendChild(toast);
    }

    toast.innerHTML = `<span>✨</span> <div>${message}</div>`;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';

    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
    }, 3000);
}

// Add Item to Cart (Accepts object or ID lookup)
function addToCart(product) {
    if (!product || !product.id) return;

    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id);

    if (existingIndex > -1) {
        cart[existingIndex].qty += (product.qty || 1);
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            category: product.category || 'Anime Merch',
            price: parseFloat(product.price),
            image: product.image,
            qty: product.qty || 1
        });
    }

    saveCart(cart);
    showToast(`Added <strong>${product.name}</strong> to your cart!`);

    // If on cart page, re-render
    if (document.body.classList.contains('cart-page')) {
        renderCartPage();
    }
}

// Add to Cart by Product ID lookup from PRODUCTS_DATABASE
function addToCartById(productId) {
    if (typeof PRODUCTS_DATABASE !== 'undefined' && Array.isArray(PRODUCTS_DATABASE)) {
        const found = PRODUCTS_DATABASE.find(p => p.id === productId);
        if (found) {
            addToCart({
                id: found.id,
                name: found.name,
                category: found.categoryName || found.category,
                price: found.price,
                image: found.image,
                qty: 1
            });
            return;
        }
    }
}

// Remove Item from Cart
function removeFromCart(id) {
    let cart = getCart();
    const targetItem = cart.find(item => item.id === id);
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);

    if (targetItem) {
        showToast(`Removed <strong>${targetItem.name}</strong> from cart.`, 'info');
    }

    // Re-render pages if active
    if (document.body.classList.contains('cart-page')) {
        renderCartPage();
    }
    if (document.body.classList.contains('checkout-page')) {
        renderCheckoutPage();
    }
}

// Update Quantity
function updateQuantity(id, newQty) {
    let cart = getCart();
    const item = cart.find(item => item.id === id);
    if (item) {
        const qtyNum = parseInt(newQty);
        if (qtyNum > 0) {
            item.qty = qtyNum;
        } else {
            return removeFromCart(id);
        }
        saveCart(cart);
        if (document.body.classList.contains('cart-page')) {
            renderCartPage();
        }
        if (document.body.classList.contains('checkout-page')) {
            renderCheckoutPage();
        }
    }
}

// Render Cart Page Table & Totals (For cart.html)
function renderCartPage() {
    const tableBody = document.querySelector('.cart-table tbody');
    const totalsContainer = document.querySelector('.cart-totals');
    if (!tableBody || !totalsContainer) return;

    const cart = getCart();

    if (cart.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 3rem 1rem;">
                    <div style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--text-secondary); margin-bottom: 1rem;">
                        🛒 Your cart is currently empty!
                    </div>
                    <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Explore our catalog to add official anime products.</p>
                    <a href="products.html" class="btn btn-primary">Browse Products ⚔️</a>
                </td>
            </tr>
        `;

        totalsContainer.innerHTML = `
            <div class="total-row">
                <span>Items Subtotal:</span>
                <span>$0.00</span>
            </div>
            <div class="total-row">
                <span>Shipping:</span>
                <span>$0.00</span>
            </div>
            <div class="total-row grand-total">
                <span>Grand Total:</span>
                <span>$0.00</span>
            </div>
        `;
        return;
    }

    let rowsHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        rowsHTML += `
            <tr>
                <td>
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                        <div>
                            <div class="cart-item-title">${item.name}</div>
                            <small style="color: var(--text-muted);">Category: ${item.category}</small>
                        </div>
                    </div>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" class="qty-input" value="${item.qty}" min="1" 
                           onchange="updateQuantity('${item.id}', this.value)" 
                           onkeyup="updateQuantity('${item.id}', this.value)">
                </td>
                <td style="color: var(--primary-color); font-weight: bold;">$${itemTotal.toFixed(2)}</td>
                <td>
                    <button class="remove-btn" onclick="removeFromCart('${item.id}')" title="Remove Item">✖</button>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = rowsHTML;

    const grandTotal = subtotal + SHIPPING_COST;

    totalsContainer.innerHTML = `
        <div class="total-row">
            <span>Items Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="total-row">
            <span>Anime Vault Express Shipping:</span>
            <span>$${SHIPPING_COST.toFixed(2)}</span>
        </div>
        <div class="total-row">
            <span>Tax / Import Duty:</span>
            <span>$0.00</span>
        </div>
        <div class="total-row grand-total">
            <span>Grand Total:</span>
            <span>$${grandTotal.toFixed(2)}</span>
        </div>
        <div style="margin-top: 1.5rem;">
            <a href="checkout.html" class="btn btn-primary btn-block">Proceed to Checkout 💳</a>
        </div>
    `;
}

// Render Checkout Sidebar Summary (For checkout.html)
function renderCheckoutPage() {
    const summaryCard = document.querySelector('.order-summary-card');
    if (!summaryCard) return;

    const cart = getCart();

    if (cart.length === 0) {
        summaryCard.innerHTML = `
            <h3 class="form-header">🛒 Order Summary</h3>
            <p style="color: var(--text-muted);">Your cart is empty. Please add products before checking out.</p>
            <a href="products.html" class="btn btn-secondary btn-block" style="margin-top: 1rem;">Back to Products</a>
        `;
        return;
    }

    let itemsHTML = '<div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">';
    let subtotal = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        itemsHTML += `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.85rem; color: var(--text-secondary);">${item.qty}x ${item.name}</span>
                <span style="font-weight: 600; color: var(--primary-color);">$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    });
    itemsHTML += '</div>';

    const grandTotal = subtotal + SHIPPING_COST;

    summaryCard.innerHTML = `
        <h3 class="form-header">🛒 Order Summary</h3>
        ${itemsHTML}
        <div style="border-top: 1px dashed rgba(255,255,255,0.15); padding-top: 1rem;">
            <div class="total-row">
                <span>Items Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="total-row">
                <span>Express Shipping:</span>
                <span>$${SHIPPING_COST.toFixed(2)}</span>
            </div>
            <div class="total-row grand-total">
                <span>Amount Payable:</span>
                <span>$${grandTotal.toFixed(2)}</span>
            </div>
        </div>
        <div style="margin-top: 1.5rem; background: rgba(0,240,255,0.05); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-active);">
            <small style="color: var(--secondary-color);">🔒 256-Bit SSL Encrypted Checkout. Your order is backed by OtakuVerse Buyer Protection.</small>
        </div>
    `;
}

// Auto-run on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();

    if (document.body.classList.contains('cart-page')) {
        renderCartPage();
    }
    if (document.body.classList.contains('checkout-page')) {
        renderCheckoutPage();
    }
});
