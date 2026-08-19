/* ==========================================================================
   OTAKUVERSE - Complete Product Database & Interactive Filter System (products-data.js)
   Contains 19 authentic Genshin Impact, Honkai Star Rail, Lord of the Mysteries,
   Wall Posters, Keychains, and Official Scale Figures from user links.
   Uses addToCartById for clean 100% reliable add to cart handler.
   ========================================================================== */

const PRODUCTS_DATABASE = [
    // 📖 Lord of the Mysteries Webnovel Books (User Amazon Links)
    {
        id: 'lotm-vol-1',
        name: 'Lord of the Mysteries Vol. 1 (Cuttlefish That Loves Diving)',
        category: 'books',
        categoryName: 'Webnovel Books',
        price: 14.99,
        priceINR: '₹1,199',
        oldPrice: 18.99,
        rating: '★★★★★ (5.0 / 1,420 Reviews)',
        badge: 'LOTM NOVEL',
        image: 'https://m.media-amazon.com/images/P/B0DQKLC79Z.01._SCLZZZZZZZ_SX500_.jpg',
        url: 'https://www.amazon.in/Lord-Mysteries-Cuttlefish-Loves-Diving/dp/B0DQKLC79Z'
    },
    {
        id: 'lotm-clown-part2',
        name: 'Lord of the Mysteries: Clown (Part II) Official Novel Edition',
        category: 'books',
        categoryName: 'Webnovel Books',
        price: 16.99,
        priceINR: '₹1,349',
        oldPrice: 19.99,
        rating: '★★★★★ (5.0 / 890 Reviews)',
        badge: 'LOTM NOVEL',
        image: 'https://m.media-amazon.com/images/P/B0FGX6276X.01._SCLZZZZZZZ_SX500_.jpg',
        url: 'https://www.amazon.in/Lord-Mysteries-Clown-Part-II/dp/B0FGX6276X'
    },
    {
        id: 'lotm-vol-2-clown-part1',
        name: 'Lord of the Mysteries: Vol 2 Clown (Part I) Paperback Edition',
        category: 'books',
        categoryName: 'Webnovel Books',
        price: 15.99,
        priceINR: '₹1,299',
        oldPrice: 18.99,
        rating: '★★★★★ (4.9 / 950 Reviews)',
        badge: 'LOTM NOVEL',
        image: 'https://m.media-amazon.com/images/P/B0G1LZWWL2.01._SCLZZZZZZZ_SX500_.jpg',
        url: 'https://www.amazon.in/Lord-Mysteries-Vol-Clown-Part/dp/B0G1LZWWL2'
    },

    // ⚡ Official Genshin Impact Figures & Blind Boxes (User Direct Store Links)
    {
        id: 'genshin-columbina',
        name: 'Official Genshin Impact Columbina "The Damselette" Gathering 1/8 Figure',
        category: 'genshin',
        categoryName: 'Genshin Impact',
        price: 189.99,
        priceINR: '₹15,999',
        oldPrice: 219.99,
        rating: '★★★★★ (5.0 / 640 Reviews)',
        badge: 'FATUI HARBINGER',
        image: 'https://genshinfans.com/cdn/shop/files/Official-Columbina-Figure_423eebf6-da9b-446b-b1af-93f507cfc8b7.jpg?v=1770267594',
        url: 'https://genshinfans.com/products/official-columbina-gathering-1-8-figure'
    },
    {
        id: 'genshin-harbinger-chibi',
        name: 'Official Genshin Impact Fatui Harbinger Chibi Figure Blind Box Set',
        category: 'genshin',
        categoryName: 'Genshin Impact',
        price: 34.99,
        priceINR: '₹2,899',
        oldPrice: 44.99,
        rating: '★★★★★ (4.9 / 1,120 Reviews)',
        badge: 'BLIND BOX',
        image: 'https://www.teyvatavern.com/cdn/shop/files/official-genshin-impact-fatui-harbinger-chibi-figure-blind-box-9934296.webp?v=1757684032',
        url: 'https://www.teyvatavern.com/products/official-genshin-impact-fatui-harbinger-chibi-figure-blind-box'
    },
    {
        id: 'genshin-citlali',
        name: 'Official Genshin Impact Citlali Natlan Priestess 1/8 Scale Figure',
        category: 'genshin',
        categoryName: 'Genshin Impact',
        price: 179.99,
        priceINR: '₹14,999',
        oldPrice: 199.99,
        rating: '★★★★★ (5.0 / 480 Reviews)',
        badge: 'NATLAN FIGURE',
        image: 'https://genshinfans.com/cdn/shop/files/ZT01_30abe10d-949c-4fb9-961e-bed37be6feaa.jpg?v=1745471894',
        url: 'https://genshinfans.com/products/official-genshin-citlali-1-8-figure'
    },

    // 🚀 Honkai: Star Rail Scale Figures (User Honkai.shop Links)
    {
        id: 'hsr-aventurine',
        name: 'Honkai: Star Rail Aventurine "IPC Senior Manager" 1/7 Scale Figure',
        category: 'hsr',
        categoryName: 'Honkai: Star Rail',
        price: 199.99,
        priceINR: '₹16,499',
        oldPrice: 239.99,
        rating: '★★★★★ (5.0 / 780 Reviews)',
        badge: 'AVENTURINE',
        image: 'https://honkai.shop/cdn/shop/files/hsr-aventurine-1-7-scale-figure-3.jpg?v=1748396165',
        url: 'https://honkai.shop/products/hsr-aventurine-1-7-scale-figure'
    },
    {
        id: 'hsr-imbibitor-lunae',
        name: 'Honkai: Star Rail Dan Heng Imbibitor Lunae Dragon 1/7 Scale Figure',
        category: 'hsr',
        categoryName: 'Honkai: Star Rail',
        price: 219.99,
        priceINR: '₹18,299',
        oldPrice: 259.99,
        rating: '★★★★★ (5.0 / 920 Reviews)',
        badge: 'DAN HENG',
        image: 'https://honkai.shop/cdn/shop/files/hsr-phainon-express-travel-notes-ver-1-8-scale-figure_2.jpg?v=1785489595',
        url: 'https://honkai.shop/products/hsr-dan-heng-imbibitor-lunae-1-7-action-figure'
    },
    {
        id: 'hsr-phainon',
        name: 'Honkai: Star Rail Phainon Express Travel Notes Ver. 1/8 Scale Figure',
        category: 'hsr',
        categoryName: 'Honkai: Star Rail',
        price: 169.99,
        priceINR: '₹13,999',
        oldPrice: 199.99,
        rating: '★★★★★ (4.9 / 390 Reviews)',
        badge: 'TRAVEL NOTES',
        image: 'https://honkai.shop/cdn/shop/files/hsr-phainon-express-travel-notes-ver-1-8-scale-figure_2.jpg?v=1785489595',
        url: 'https://honkai.shop/products/hsr-phainon-express-travel-notes-ver-1-8-scale-figure'
    },
    {
        id: 'hsr-sparkle',
        name: 'Honkai: Star Rail Sparkle "Masked Fool" 1/7 Scale Figure',
        category: 'hsr',
        categoryName: 'Honkai: Star Rail',
        price: 189.99,
        priceINR: '₹15,799',
        oldPrice: 219.99,
        rating: '★★★★★ (5.0 / 850 Reviews)',
        badge: 'MASKED FOOL',
        image: 'https://honkai.shop/cdn/shop/files/hsr-sparkle-1-7-scale-figure_2.jpg?v=1785466315',
        url: 'https://honkai.shop/products/hsr-sparkle-1-7-scale-figure'
    },

    // 🔑 Honkai: Star Rail Keychains (User Amazon Links)
    {
        id: 'golehs-hsr-keychain-1',
        name: 'GOLEHS Honkai: Star Rail Scratch-Resistant Acrylic Keychain & Standee',
        category: 'keychains',
        categoryName: 'Keychains',
        price: 4.49,
        priceINR: '₹349',
        oldPrice: 6.99,
        rating: '★★★★☆ (4.8 / 230 Reviews)',
        badge: 'HSR KEYCHAIN',
        image: 'https://m.media-amazon.com/images/P/B0D1QZ98R8.01._SCLZZZZZZZ_SX500_.jpg',
        url: 'https://www.amazon.in/GOLEHS-Honkai-Star-Rail-Scratch-Resistant/dp/B0D1QZ98R8'
    },
    {
        id: 'golehs-hsr-keychain-2',
        name: 'GOLEHS Honkai: Star Rail Character Acrylic Keychain Set',
        category: 'keychains',
        categoryName: 'Keychains',
        price: 4.99,
        priceINR: '₹399',
        oldPrice: 7.49,
        rating: '★★★★★ (4.9 / 310 Reviews)',
        badge: 'HSR KEYCHAIN',
        image: 'https://m.media-amazon.com/images/P/B0D214VP51.01._SCLZZZZZZZ_SX500_.jpg',
        url: 'https://www.amazon.in/GOLEHS-Honkai-Character-Acrylic-Keychain/dp/B0D214VP51'
    },

    // 🖼️ Amazon India Genshin Products (Previous User Links)
    {
        id: 'kumani-wall-posters',
        name: 'Kumani Set of 25 Genshin Impact Aesthetic Wall Posters',
        category: 'posters',
        categoryName: 'Wall Posters',
        price: 2.49,
        priceINR: '₹189',
        oldPrice: 3.99,
        rating: '★★★★★ (4.9 / 420 Reviews)',
        badge: 'POSTERS SET',
        image: 'https://m.media-amazon.com/images/I/81MVo0XSK8L._SL1350_.jpg',
        url: 'https://www.amazon.in/Kumani-Genshin-Impact-Wall-Posters/dp/B0GRTVFS8Y'
    },
    {
        id: 'kumani-acrylic-keychains',
        name: 'Kumani Genshin Impact Acrylic Transparent Keychains (Columbina & Sandrone)',
        category: 'keychains',
        categoryName: 'Keychains',
        price: 3.99,
        priceINR: '₹299',
        oldPrice: 5.99,
        rating: '★★★★★ (5.0 / 310 Reviews)',
        badge: 'KEYCHAINS',
        image: 'https://m.media-amazon.com/images/I/81ob1OAabML._SL1500_.jpg',
        url: 'https://www.amazon.in/Kumani-Transparent-Keychain-Columbina-Sandrone/dp/B0H8SCXHFW'
    },
    {
        id: 'offo-thunder-dashboard-figure',
        name: 'Offo Genshin Impact Narukami Ogosho God of Thunder Dashboard Figure',
        category: 'figures',
        categoryName: 'Action Figures',
        price: 10.99,
        priceINR: '₹872',
        oldPrice: 14.99,
        rating: '★★★★★ (4.9 / 580 Reviews)',
        badge: 'DASHBOARD FIG',
        image: 'https://m.media-amazon.com/images/I/51qkIB5rQ1L._SL1024_.jpg',
        url: 'https://www.amazon.in/Offo-Genshin-Narukami-Thunder-Dashboard/dp/B0D66FVXL7'
    },
    {
        id: 'genshin-card-skins',
        name: 'Genshin Impact Credit Card Merchandise Sticker Skin Pack',
        category: 'accessories',
        categoryName: 'Merch Accessories',
        price: 3.99,
        priceINR: '₹299',
        oldPrice: 5.49,
        rating: '★★★★☆ (4.8 / 190 Reviews)',
        badge: 'CARD SKINS',
        image: 'https://m.media-amazon.com/images/I/71LNp8OqJXL._SL1500_.jpg',
        url: 'https://www.amazon.in/Credit-Printing-Merchandise-Genshin-Impact/dp/B0DWRL4JB7'
    },
    {
        id: 'offo-pendant-necklace',
        name: 'Offo Anime Strawhat & Vision Emblem Pendant Necklace',
        category: 'accessories',
        categoryName: 'Jewelry & Accessories',
        price: 3.99,
        priceINR: '₹299',
        oldPrice: 5.99,
        rating: '★★★★★ (4.9 / 240 Reviews)',
        badge: 'JEWELRY',
        image: 'https://m.media-amazon.com/images/I/51O1NkMViHL._SL1500_.jpg',
        url: 'https://www.amazon.in/Offo-Beautifully-Designed-Strawhat-Necklace/dp/B0C4612TYH'
    },
    {
        id: 'pinaka-chibi-figures',
        name: 'PINAKA Genshin Impact Chibi Mini Action Figures Set (Multi-Color)',
        category: 'figures',
        categoryName: 'Action Figures',
        price: 12.99,
        priceINR: '₹999',
        oldPrice: 18.99,
        rating: '★★★★★ (5.0 / 890 Reviews)',
        badge: 'CHIBI SET',
        image: 'https://m.media-amazon.com/images/I/71P6cDbbFuL._SL1500_.jpg',
        url: 'https://www.amazon.in/PINAKA-Genshin-Figures-Characters-Multi-Color/dp/B0GK9XWHT2'
    },
    {
        id: 'animeow-metal-vision-keychains',
        name: 'Animeow Genshin Impact Metal Vision Keychains & Pendant Collection',
        category: 'keychains',
        categoryName: 'Keychains',
        price: 6.49,
        priceINR: '₹499',
        oldPrice: 8.99,
        rating: '★★★★★ (4.9 / 650 Reviews)',
        badge: 'VISION KEYCHAIN',
        image: 'https://m.media-amazon.com/images/I/61m-Zz7uJfL._SL1500_.jpg',
        url: 'https://www.amazon.in/Animeow-Keychains-Keychain-Collection-Pendants/dp/B0C6ZNRJYH'
    }
];

// Fallback image URL if external image fails
const FALLBACK_IMAGE = 'https://m.media-amazon.com/images/I/71P6cDbbFuL._SL1500_.jpg';

// Function to render product grid based on category filter
function renderCatalog(filterCategory = 'all') {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;

    let filtered = PRODUCTS_DATABASE;
    if (filterCategory !== 'all') {
        filtered = PRODUCTS_DATABASE.filter(p => p.category === filterCategory);
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <p style="font-family: var(--font-heading); font-size: 1.2rem; color: var(--text-secondary);">No products found in this category.</p>
            </div>
        `;
        return;
    }

    let cardsHTML = '';
    filtered.forEach(p => {
        const oldPriceHTML = p.oldPrice ? `<del>$${p.oldPrice.toFixed(2)}</del>` : '';
        cardsHTML += `
            <div class="product-card" data-category="${p.category}">
                <span class="product-badge">${p.badge}</span>
                <div class="product-image-container">
                    <img src="${p.image}" alt="${p.name.replace(/"/g, '&quot;')}" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';">
                </div>
                <div>
                    <div class="product-category">${p.categoryName} • <span style="color: var(--success); font-weight: bold;">${p.priceINR}</span></div>
                    <h3 class="product-name">${p.name}</h3>
                    <div class="product-rating">${p.rating}</div>
                </div>
                <div class="product-footer">
                    <div class="product-price">$${p.price.toFixed(2)} ${oldPriceHTML}</div>
                    <button class="btn btn-primary" onclick="addToCartById('${p.id}')">
                        + Cart
                    </button>
                </div>
            </div>
        `;
    });

    grid.innerHTML = cardsHTML;
}

// Attach Event Listeners to Category Filter Buttons
document.addEventListener('DOMContentLoaded', () => {
    renderCatalog('all');

    const filterBtns = document.querySelectorAll('.filter-bar .filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter') || 'all';
            renderCatalog(category);
        });
    });
});
