/* ==========================================================================
   OTAKUVERSE - Lab Sheet 2: Interactive Storefront (Vanilla JavaScript)
   Fulfills COER University Lab Sheet 2 Tasks 1 - 8:
   - Task 1: Product objects array (id, name, price, image)
   - Task 2: Dynamic product rendering with DOM methods & template literals
   - Task 3: Add to cart handler with localStorage persistence
   - Task 4: Dynamic cart rendering with quantity input & Remove button
   - Task 5: Explicit calculateTotal() using reduce()
   - Task 6: Checkout form validation with inline error messages (no alert)
   - Task 7: Inline order confirmation message & clear cart from localStorage
   - Task 8: Universal navbar cart item count badge update from localStorage
   ========================================================================== */

// --------------------------------------------------------------------------
// Task 1: Store Catalog Array (at least 8 products)
// --------------------------------------------------------------------------
const products = [
    {
        id: 'lotm-vol-1',
        name: 'Lord of the Mysteries Vol. 1 (Cuttlefish That Loves Diving)',
        category: 'books',
        categoryName: 'Webnovel Books',
        price: 14.99,
        priceINR: '₹1,199',
        oldPrice: 18.99,
        badge: 'LOTM NOVEL',
        image: 'https://m.media-amazon.com/images/P/B0DQKLC79Z.01._SCLZZZZZZZ_SX500_.jpg'
    },
    {
        id: 'lotm-clown-part2',
        name: 'Lord of the Mysteries: Clown (Part II) Official Novel Edition',
        category: 'books',
        categoryName: 'Webnovel Books',
        price: 16.99,
        priceINR: '₹1,349',
        oldPrice: 19.99,
        badge: 'LOTM NOVEL',
        image: 'https://m.media-amazon.com/images/P/B0FGX6276X.01._SCLZZZZZZZ_SX500_.jpg'
    },
    {
        id: 'lotm-vol-2-clown-part1',
        name: 'Lord of the Mysteries: Vol 2 Clown (Part I) Paperback Edition',
        category: 'books',
        categoryName: 'Webnovel Books',
        price: 15.99,
        priceINR: '₹1,299',
        oldPrice: 18.99,
        badge: 'LOTM NOVEL',
        image: 'https://m.media-amazon.com/images/P/B0G1LZWWL2.01._SCLZZZZZZZ_SX500_.jpg'
    },
    {
        id: 'genshin-columbina',
        name: 'Official Genshin Impact Columbina "The Damselette" Gathering 1/8 Figure',
        category: 'genshin',
        categoryName: 'Genshin Impact',
        price: 189.99,
        priceINR: '₹15,999',
        oldPrice: 219.99,
        badge: 'FATUI HARBINGER',
        image: 'https://genshinfans.com/cdn/shop/files/Official-Columbina-Figure_423eebf6-da9b-446b-b1af-93f507cfc8b7.jpg?v=1770267594'
    },
    {
        id: 'genshin-harbinger-chibi',
        name: 'Official Genshin Impact Fatui Harbinger Chibi Figure Blind Box Set',
        category: 'genshin',
        categoryName: 'Genshin Impact',
        price: 34.99,
        priceINR: '₹2,899',
        oldPrice: 44.99,
        badge: 'BLIND BOX',
        image: 'https://www.teyvatavern.com/cdn/shop/files/official-genshin-impact-fatui-harbinger-chibi-figure-blind-box-9934296.webp?v=1757684032'
    },
    {
        id: 'genshin-citlali',
        name: 'Official Genshin Impact Citlali Natlan Priestess 1/8 Scale Figure',
        category: 'genshin',
        categoryName: 'Genshin Impact',
        price: 179.99,
        priceINR: '₹14,999',
        oldPrice: 199.99,
        badge: 'NATLAN FIGURE',
        image: 'https://genshinfans.com/cdn/shop/files/ZT01_30abe10d-949c-4fb9-961e-bed37be6feaa.jpg?v=1745471894'
    },
    {
        id: 'hsr-aventurine',
        name: 'Honkai: Star Rail Aventurine "IPC Senior Manager" 1/7 Scale Figure',
        category: 'hsr',
        categoryName: 'Honkai: Star Rail',
        price: 199.99,
        priceINR: '₹16,499',
        oldPrice: 239.99,
        badge: 'AVENTURINE',
        image: 'https://honkai.shop/cdn/shop/files/hsr-aventurine-1-7-scale-figure-3.jpg?v=1748396165'
    },
    {
        id: 'hsr-imbibitor-lunae',
        name: 'Honkai: Star Rail Dan Heng Imbibitor Lunae Dragon 1/7 Scale Figure',
        category: 'hsr',
        categoryName: 'Honkai: Star Rail',
        price: 219.99,
        priceINR: '₹18,299',
        oldPrice: 259.99,
        badge: 'DAN HENG',
        image: 'https://honkai.shop/cdn/shop/files/hsr-phainon-express-travel-notes-ver-1-8-scale-figure_2.jpg?v=1785489595'
    },
    {
        id: 'hsr-phainon',
        name: 'Honkai: Star Rail Phainon Express Travel Notes Ver. 1/8 Scale Figure',
        category: 'hsr',
        categoryName: 'Honkai: Star Rail',
        price: 169.99,
        priceINR: '₹13,999',
        oldPrice: 199.99,
        badge: 'TRAVEL NOTES',
        image: 'https://honkai.shop/cdn/shop/files/hsr-phainon-express-travel-notes-ver-1-8-scale-figure_2.jpg?v=1785489595'
    },
    {
        id: 'hsr-sparkle',
        name: 'Honkai: Star Rail Sparkle "Masked Fool" 1/7 Scale Figure',
        category: 'hsr',
        categoryName: 'Honkai: Star Rail',
        price: 189.99,
        priceINR: '₹15,799',
        oldPrice: 219.99,
        badge: 'MASKED FOOL',
        image: 'https://honkai.shop/cdn/shop/files/hsr-sparkle-1-7-scale-figure_2.jpg?v=1785466315'
    },
    {
        id: 'golehs-hsr-keychain-1',
        name: 'GOLEHS Honkai: Star Rail Scratch-Resistant Acrylic Keychain & Standee',
        category: 'keychains',
        categoryName: 'Keychains',
        price: 4.49,
        priceINR: '₹349',
        oldPrice: 6.99,
        badge: 'HSR KEYCHAIN',
        image: 'https://m.media-amazon.com/images/P/B0D1QZ98R8.01._SCLZZZZZZZ_SX500_.jpg'
    },
    {
        id: 'golehs-hsr-keychain-2',
        name: 'GOLEHS Honkai: Star Rail Character Acrylic Keychain Set',
        category: 'keychains',
        categoryName: 'Keychains',
        price: 4.99,
        priceINR: '₹399',
        oldPrice: 7.49,
        badge: 'HSR KEYCHAIN',
        image: 'https://m.media-amazon.com/images/P/B0D214VP51.01._SCLZZZZZZZ_SX500_.jpg'
    },
    {
        id: 'kumani-wall-posters',
        name: 'Kumani Set of 25 Genshin Impact Aesthetic Wall Posters',
        category: 'posters',
        categoryName: 'Wall Posters',
        price: 2.49,
        priceINR: '₹189',
        oldPrice: 3.99,
        badge: 'POSTERS SET',
        image: 'https://m.media-amazon.com/images/I/81MVo0XSK8L._SL1350_.jpg'
    },
    {
        id: 'kumani-acrylic-keychains',
        name: 'Kumani Genshin Impact Acrylic Transparent Keychains (Columbina & Sandrone)',
        category: 'keychains',
        categoryName: 'Keychains',
        price: 3.99,
        priceINR: '₹299',
        oldPrice: 5.99,
        badge: 'KEYCHAINS',
        image: 'https://m.media-amazon.com/images/I/81ob1OAabML._SL1500_.jpg'
    },
    {
        id: 'offo-thunder-dashboard-figure',
        name: 'Offo Genshin Impact Narukami Ogosho God of Thunder Dashboard Figure',
        category: 'figures',
        categoryName: 'Action Figures',
        price: 10.99,
        priceINR: '₹872',
        oldPrice: 14.99,
        badge: 'DASHBOARD FIG',
        image: 'https://m.media-amazon.com/images/I/51qkIB5rQ1L._SL1024_.jpg'
    },
    {
        id: 'genshin-card-skins',
        name: 'Genshin Impact Credit Card Merchandise Sticker Skin Pack',
        category: 'accessories',
        categoryName: 'Merch Accessories',
        price: 3.99,
        priceINR: '₹299',
        oldPrice: 5.49,
        badge: 'CARD SKINS',
        image: 'https://m.media-amazon.com/images/I/71LNp8OqJXL._SL1500_.jpg'
    },
    {
        id: 'offo-pendant-necklace',
        name: 'Offo Anime Strawhat & Vision Emblem Pendant Necklace',
        category: 'accessories',
        categoryName: 'Jewelry & Accessories',
        price: 3.99,
        priceINR: '₹299',
        oldPrice: 5.99,
        badge: 'JEWELRY',
        image: 'https://m.media-amazon.com/images/I/51O1NkMViHL._SL1500_.jpg'
    },
    {
        id: 'pinaka-chibi-figures',
        name: 'PINAKA Genshin Impact Chibi Mini Action Figures Set (Multi-Color)',
        category: 'figures',
        categoryName: 'Action Figures',
        price: 12.99,
        priceINR: '₹999',
        oldPrice: 18.99,
        badge: 'CHIBI SET',
        image: 'https://m.media-amazon.com/images/I/71P6cDbbFuL._SL1500_.jpg'
    },
    {
        id: 'animeow-metal-vision-keychains',
        name: 'Animeow Genshin Impact Metal Vision Keychains & Pendant Collection',
        category: 'keychains',
        categoryName: 'Keychains',
        price: 6.49,
        priceINR: '₹499',
        oldPrice: 8.99,
        badge: 'VISION KEYCHAIN',
        image: 'https://m.media-amazon.com/images/I/61m-Zz7uJfL._SL1500_.jpg'
    }
];

const SHIPPING_COST = 1.99;
const FALLBACK_IMAGE = 'https://m.media-amazon.com/images/I/71P6cDbbFuL._SL1500_.jpg';

// --------------------------------------------------------------------------
// Task 8: Navbar Cart Item Count Badge (Runs on Every Page)
// Read cart from localStorage using JSON.parse
// --------------------------------------------------------------------------
function getCartFromStorage() {
    const stored = localStorage.getItem('cart');
    if (!stored) {
        // Initial sample items for demonstration
        const initialCart = [
            { id: 'pinaka-chibi-figures', qty: 1 },
            { id: 'genshin-columbina', qty: 1 },
            { id: 'hsr-aventurine', qty: 1 }
        ];
        localStorage.setItem('cart', JSON.stringify(initialCart));
        return initialCart;
    }
    try {
        return JSON.parse(stored);
    } catch (e) {
        return [];
    }
}

function saveCartToStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const cart = getCartFromStorage();
    // Using reduce to count total items quantity
    const totalCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const badgeElements = document.querySelectorAll('.cart-count');
    badgeElements.forEach(badge => {
        badge.textContent = totalCount;
    });
}

// Toast notification feedback
function showToast(message) {
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
        `;
        document.body.appendChild(toast);
    }

    toast.innerHTML = `✨ ${message}`;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';

    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        toast.style.opacity = '0';
    }, 3000);
}

// --------------------------------------------------------------------------
// Task 3: 'Add to Cart' Click Handler
// Stores product in cart array & persists in localStorage
// --------------------------------------------------------------------------
function addToCart(productId) {
    const targetProduct = products.find(p => p.id === productId);
    if (!targetProduct) return;

    let cart = getCartFromStorage();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.qty = (existingItem.qty || 1) + 1;
    } else {
        cart.push({
            id: targetProduct.id,
            qty: 1
        });
    }

    saveCartToStorage(cart);
    showToast(`Added <strong>${targetProduct.name}</strong> to your cart!`);

    // Re-render if currently viewing cart page
    if (document.querySelector('.cart-table')) {
        renderCart();
    }
}

// --------------------------------------------------------------------------
// Task 2: Dynamically Render Product Cards on products.html
// Uses DOM methods (querySelector) & innerHTML with template literals
// --------------------------------------------------------------------------
function renderProducts(filterCategory = 'all') {
    const catalogGrid = document.getElementById('catalog-grid');
    if (!catalogGrid) return;

    let filteredProducts = products;
    if (filterCategory !== 'all') {
        filteredProducts = products.filter(p => p.category === filterCategory);
    }

    if (filteredProducts.length === 0) {
        catalogGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <p style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--text-secondary);">
                    No products found in this category.
                </p>
            </div>
        `;
        return;
    }

    // Using map() array method to generate product cards HTML
    const cardsHTML = filteredProducts.map(p => {
        const oldPriceTag = p.oldPrice ? `<del>$${p.oldPrice.toFixed(2)}</del>` : '';
        const priceINRTag = p.priceINR ? ` • <span style="color: var(--success); font-weight: bold;">${p.priceINR}</span>` : '';
        
        return `
            <div class="product-card" data-category="${p.category}">
                <span class="product-badge">${p.badge}</span>
                <div class="product-image-container">
                    <img src="${p.image}" alt="${p.name.replace(/"/g, '&quot;')}" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';">
                </div>
                <div>
                    <div class="product-category">${p.categoryName}${priceINRTag}</div>
                    <h3 class="product-name">${p.name}</h3>
                </div>
                <div class="product-footer">
                    <div class="product-price">$${p.price.toFixed(2)} ${oldPriceTag}</div>
                    <button class="btn btn-primary" onclick="addToCart('${p.id}')">
                        + Cart
                    </button>
                </div>
            </div>
        `;
    }).join('');

    catalogGrid.innerHTML = cardsHTML;
}

// --------------------------------------------------------------------------
// Task 4 & Task 5: Dynamic Cart Rendering & calculateTotal()
// Read cart from localStorage, render item rows with quantity input & Remove button
// calculateTotal() uses reduce() to compute grand total
// --------------------------------------------------------------------------
function calculateTotal() {
    const cart = getCartFromStorage();
    
    // Using array method reduce() to calculate subtotal
    const subtotal = cart.reduce((sum, cartItem) => {
        const product = products.find(p => p.id === cartItem.id);
        if (product) {
            return sum + (product.price * (cartItem.qty || 1));
        }
        return sum;
    }, 0);

    const totalsContainer = document.querySelector('.cart-totals');
    if (!totalsContainer) return { subtotal, grandTotal: subtotal };

    if (cart.length === 0) {
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
        return { subtotal: 0, grandTotal: 0 };
    }

    const grandTotal = subtotal + SHIPPING_COST;

    totalsContainer.innerHTML = `
        <div class="total-row">
            <span>Items Subtotal:</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="total-row">
            <span>Express Shipping:</span>
            <span>$${SHIPPING_COST.toFixed(2)}</span>
        </div>
        <div class="total-row grand-total">
            <span>Grand Total:</span>
            <span>$${grandTotal.toFixed(2)}</span>
        </div>
        <div style="margin-top: 1.5rem;">
            <a href="checkout.html" class="btn btn-primary btn-block">Proceed to Checkout 💳</a>
        </div>
    `;

    return { subtotal, grandTotal };
}

function renderCart() {
    const tableBody = document.querySelector('.cart-table tbody');
    if (!tableBody) return;

    const cart = getCartFromStorage();

    if (cart.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 3rem 1rem;">
                    <div style="font-family: var(--font-heading); font-size: 1.3rem; color: var(--text-secondary); margin-bottom: 1rem;">
                        🛒 Your shopping cart is empty!
                    </div>
                    <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Add products from our catalog to proceed.</p>
                    <a href="products.html" class="btn btn-primary">Browse Catalog ⚔️</a>
                </td>
            </tr>
        `;
        calculateTotal();
        return;
    }

    // Using map() to render cart table rows
    const rowsHTML = cart.map(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (!product) return '';

        const itemQty = cartItem.qty || 1;
        const itemSubtotal = product.price * itemQty;

        return `
            <tr>
                <td>
                    <div class="cart-item-info">
                        <img src="${product.image}" alt="${product.name.replace(/"/g, '&quot;')}" class="cart-item-img" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';">
                        <div>
                            <div class="cart-item-title">${product.name}</div>
                            <small style="color: var(--text-muted);">Category: ${product.categoryName || product.category}</small>
                        </div>
                    </div>
                </td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <input type="number" class="qty-input" value="${itemQty}" min="1" max="99" 
                           onchange="updateQuantity('${product.id}', this.value)" 
                           onkeyup="updateQuantity('${product.id}', this.value)">
                </td>
                <td style="color: var(--primary-color); font-weight: bold;">$${itemSubtotal.toFixed(2)}</td>
                <td>
                    <button class="remove-btn" onclick="removeFromCart('${product.id}')" title="Remove Item">✖</button>
                </td>
            </tr>
        `;
    }).join('');

    tableBody.innerHTML = rowsHTML;
    calculateTotal();
}

function updateQuantity(productId, newQty) {
    let cart = getCartFromStorage();
    const item = cart.find(i => i.id === productId);
    if (item) {
        const parsedQty = parseInt(newQty);
        if (parsedQty > 0) {
            item.qty = parsedQty;
        } else {
            return removeFromCart(productId);
        }
        saveCartToStorage(cart);
        calculateTotal();
        renderCart();
    }
}

function removeFromCart(productId) {
    let cart = getCartFromStorage();
    const targetProduct = products.find(p => p.id === productId);
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage(cart);

    if (targetProduct) {
        showToast(`Removed <strong>${targetProduct.name}</strong> from cart.`);
    }

    renderCart();
}

// --------------------------------------------------------------------------
// Task 6 & Task 7: Form Validation on checkout.html & Order Confirmation
// Validation Rules:
// - Name: required (non-empty)
// - Address: required (non-empty)
// - Pincode: exactly 6 digits (/^\d{6}$/)
// - Phone: exactly 10 digits (/^\d{10}$/)
// Displays inline error messages under fields without using alert()
// On success: Displays inline confirmation message & clears cart from localStorage
// --------------------------------------------------------------------------
function renderCheckoutSummary() {
    const summaryCard = document.querySelector('.order-summary-card');
    if (!summaryCard) return;

    const cart = getCartFromStorage();

    if (cart.length === 0) {
        summaryCard.innerHTML = `
            <h3 class="form-header">🛒 Order Summary</h3>
            <p style="color: var(--text-muted); padding: 1rem 0;">Your cart is empty. Please add items before checking out.</p>
            <a href="products.html" class="btn btn-secondary btn-block">Browse Store</a>
        `;
        return;
    }

    let subtotal = 0;
    const itemsHTML = cart.map(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (!product) return '';
        const itemTotal = product.price * (cartItem.qty || 1);
        subtotal += itemTotal;
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
                <span style="font-size: 0.85rem; color: var(--text-secondary);">${cartItem.qty || 1}x ${product.name}</span>
                <span style="font-weight: 600; color: var(--primary-color);">$${itemTotal.toFixed(2)}</span>
            </div>
        `;
    }).join('');

    const grandTotal = subtotal + SHIPPING_COST;

    summaryCard.innerHTML = `
        <h3 class="form-header">🛒 Order Summary</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
            ${itemsHTML}
        </div>
        <div style="border-top: 1px dashed rgba(255,255,255,0.15); padding-top: 1rem;">
            <div class="total-row">
                <span>Subtotal:</span>
                <span>$${subtotal.toFixed(2)}</span>
            </div>
            <div class="total-row">
                <span>Express Shipping:</span>
                <span>$${SHIPPING_COST.toFixed(2)}</span>
            </div>
            <div class="total-row grand-total">
                <span>Payable Amount:</span>
                <span>$${grandTotal.toFixed(2)}</span>
            </div>
        </div>
    `;
}

function validateCheckoutForm(event) {
    if (event) event.preventDefault();

    const nameInput = document.getElementById('fullName');
    const addressInput = document.getElementById('address');
    const cityInput = document.getElementById('city');
    const pincodeInput = document.getElementById('pincode');
    const phoneInput = document.getElementById('phone');

    const nameError = document.getElementById('name-error');
    const addressError = document.getElementById('address-error');
    const cityError = document.getElementById('city-error');
    const pincodeError = document.getElementById('pincode-error');
    const phoneError = document.getElementById('phone-error');
    const successBanner = document.getElementById('order-success-banner');

    // Reset error messages
    if (nameError) nameError.textContent = '';
    if (addressError) addressError.textContent = '';
    if (cityError) cityError.textContent = '';
    if (pincodeError) pincodeError.textContent = '';
    if (phoneError) phoneError.textContent = '';

    let isValid = true;

    // 1. Name Validation (must not be empty)
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal) {
        if (nameError) nameError.textContent = '❌ Name must not be empty.';
        isValid = false;
    }

    // 2. Address Validation (must not be empty)
    const addressVal = addressInput ? addressInput.value.trim() : '';
    if (!addressVal) {
        if (addressError) addressError.textContent = '❌ Address must not be empty.';
        isValid = false;
    }

    // 3. City Validation (must not be empty)
    const cityVal = cityInput ? cityInput.value.trim() : '';
    if (!cityVal) {
        if (cityError) cityError.textContent = '❌ City must not be empty.';
        isValid = false;
    }

    // 4. Pincode Validation (must be exactly 6 digits)
    const pincodeVal = pincodeInput ? pincodeInput.value.trim() : '';
    const pincodeRegex = /^\d{6}$/;
    if (!pincodeRegex.test(pincodeVal)) {
        if (pincodeError) pincodeError.textContent = '❌ Pincode must be exactly 6 digits.';
        isValid = false;
    }

    // 5. Phone Validation (must be exactly 10 digits)
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneVal)) {
        if (phoneError) phoneError.textContent = '❌ Phone number must be exactly 10 digits.';
        isValid = false;
    }

    if (isValid) {
        // Clear cart from localStorage on successful validation (Task 7)
        localStorage.removeItem('cart');
        localStorage.setItem('cart', JSON.stringify([]));
        updateCartBadge();

        // Hide checkout form and display inline confirmation message (Task 7)
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.style.display = 'none';
        }

        if (successBanner) {
            const trackingId = 'OTK-' + Math.floor(100000 + Math.random() * 900000);
            successBanner.innerHTML = `
                <div class="success-box">
                    <h2>🎉 Order Placed Successfully!</h2>
                    <p>Thank you for your purchase, <strong>${nameVal}</strong>!</p>
                    <p>Your order tracking ID is: <strong style="color: var(--secondary-color);">${trackingId}</strong></p>
                    <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.8rem;">
                        A confirmation dispatch email has been sent to your registered address.
                    </p>
                    <div style="margin-top: 1.5rem;">
                        <a href="products.html" class="btn btn-primary">Return to Storefront ⚔️</a>
                    </div>
                </div>
            `;
            successBanner.style.display = 'block';
        }

        renderCheckoutSummary();
    }
}

// --------------------------------------------------------------------------
// Initialize Page Event Handlers on DOM Ready
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // Task 8: Update cart badge on every page load
    updateCartBadge();

    // Task 2: Render products if on products.html
    if (document.getElementById('catalog-grid')) {
        renderProducts('all');

        const filterBtns = document.querySelectorAll('.filter-bar .filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.getAttribute('data-filter') || 'all';
                renderProducts(category);
            });
        });
    }

    // Task 4 & 5: Render cart if on cart.html
    if (document.querySelector('.cart-table')) {
        renderCart();
    }

    // Task 6 & 7: Setup checkout form validation handler if on checkout.html
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        renderCheckoutSummary();
        checkoutForm.addEventListener('submit', validateCheckoutForm);
    }
});
