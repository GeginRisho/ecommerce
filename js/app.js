// Main Application Logic
const app = {
    cart: [],
    
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.renderProducts('All');
    },

    cacheDOM() {
        this.productGrid = document.getElementById('product-grid');
        this.categoryFilters = document.getElementById('category-filters');
        
        // Cart Sidebar
        this.cartToggle = document.getElementById('cart-toggle');
        this.closeCartBtn = document.getElementById('close-cart');
        this.cartOverlay = document.getElementById('cart-overlay');
        this.cartSidebar = document.getElementById('cart-sidebar');
        
        // Cart Items & Total
        this.cartItemsContainer = document.getElementById('cart-items-container');
        this.emptyCartMsg = document.getElementById('empty-cart-msg');
        this.cartCount = document.getElementById('cart-count');
        this.cartTotalAmount = document.getElementById('cart-total-amount');
        this.checkoutBtn = document.getElementById('checkout-btn');
        
        // Payment
        this.paymentModal = document.getElementById('payment-modal');
        this.paymentAmount = document.getElementById('payment-amount');
        this.successScreen = document.getElementById('success-screen');
        
        // Product Detail Modal
        this.productDetailModal = document.getElementById('product-detail-modal');
        this.detailBody = document.getElementById('detail-body');
        
        // Toasts
        this.toastContainer = document.getElementById('toast-container');
    },

    bindEvents() {
        // Category Filtering
        this.categoryFilters.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                // Update active state
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Render filtered
                const category = e.target.getAttribute('data-category');
                this.renderProducts(category);
            }
        });

        // Cart Toggling
        this.cartToggle.addEventListener('click', () => this.toggleCart(true));
        this.closeCartBtn.addEventListener('click', () => this.toggleCart(false));
        this.cartOverlay.addEventListener('click', () => {
            this.toggleCart(false);
            this.closePaymentModal();
        });

        // Checkout Button
        this.checkoutBtn.addEventListener('click', () => this.openPaymentModal());
    },

    renderProducts(category) {
        this.productGrid.innerHTML = '';
        
        const filteredProducts = category === 'All' 
            ? products 
            : products.filter(p => p.category === category);
            
        filteredProducts.forEach((product, index) => {
            // Slight delay for stagger effect
            const delay = index * 0.05;
            
            const card = document.createElement('div');
            card.className = 'product-card';
            card.style.animationDelay = `${delay}s`;
            
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy" style="cursor:pointer;" onclick="app.openProductDetail(${product.id})">
                <div class="product-info">
                    <span class="product-category">${product.category}</span>
                    <h3 class="product-title" style="cursor:pointer;" onclick="app.openProductDetail(${product.id})">${product.name}</h3>
                    <div class="product-footer">
                        <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                        <button class="add-to-cart" onclick="app.addToCart(${product.id})" aria-label="Add to cart">
                            <i data-feather="plus"></i>
                        </button>
                    </div>
                </div>
            `;
            this.productGrid.appendChild(card);
        });
        
        // Re-initialize feather icons for new DOM elements
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    },

    addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.updateCartUI();
        this.showToast(`Added ${product.name} to cart`);
        
        // Small pulse animation on cart icon
        this.cartToggle.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.cartToggle.style.transform = '';
        }, 200);
    },

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.updateCartUI();
    },

    updateQuantity(productId, delta) {
        const item = this.cart.find(i => i.id === productId);
        if (item) {
            item.quantity += delta;
            if (item.quantity <= 0) {
                this.removeFromCart(productId);
            } else {
                this.updateCartUI();
            }
        }
    },

    updateCartUI() {
        // Update Count
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        this.cartCount.textContent = totalItems;
        
        // Update Items List
        if (this.cart.length === 0) {
            this.cartItemsContainer.innerHTML = '';
            this.cartItemsContainer.appendChild(this.emptyCartMsg);
            this.checkoutBtn.style.opacity = '0.5';
            this.checkoutBtn.style.pointerEvents = 'none';
        } else {
            this.cartItemsContainer.innerHTML = '';
            this.checkoutBtn.style.opacity = '1';
            this.checkoutBtn.style.pointerEvents = 'auto';
            
            this.cart.forEach(item => {
                const cartItemEl = document.createElement('div');
                cartItemEl.className = 'cart-item';
                cartItemEl.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="qty-btn" onclick="app.updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="app.updateQuantity(${item.id}, 1)">+</button>
                        <button class="remove-item" onclick="app.removeFromCart(${item.id})">
                            <i data-feather="trash-2" style="width: 16px; height: 16px;"></i>
                        </button>
                    </div>
                `;
                this.cartItemsContainer.appendChild(cartItemEl);
            });
        }
        
        // Update Total Price
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.cartTotalAmount.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    },

    toggleCart(forceState) {
        const isActive = forceState !== undefined ? forceState : !this.cartSidebar.classList.contains('active');
        
        if (isActive) {
            this.cartOverlay.classList.add('active');
            this.cartSidebar.classList.add('active');
        } else {
            this.cartOverlay.classList.remove('active');
            this.cartSidebar.classList.remove('active');
        }
    },

    openPaymentModal() {
        if (this.cart.length === 0) return;
        
        // Prepare Payment UI
        const totalPrice = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.paymentAmount.textContent = `₹${totalPrice.toLocaleString('en-IN')}`;
        
        this.paymentModal.classList.add('active');
    },

    closePaymentModal() {
        this.paymentModal.classList.remove('active');
    },

    openProductDetail(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        // Generate mock reviews
        const reviewNames = ["Alex M.", "Sarah K.", "Raj P.", "Emma T.", "John D.", "Neha S."];
        const reviewTexts = [
            "Absolutely amazing! Exceeded my expectations.",
            "Great quality for the price. Highly recommend to everyone.",
            "I love the premium feel. The packaging was also very nice.",
            "Looks just like the pictures. Very satisfied with my purchase.",
            "A bit pricey but definitely worth the investment.",
            "Perfect for everyday use. Exactly what I was looking for."
        ];
        
        let reviewsHTML = '';
        const numReviews = Math.floor(Math.random() * 3) + 2; // 2 to 4 reviews
        for(let i=0; i<numReviews; i++) {
            const rName = reviewNames[Math.floor(Math.random() * reviewNames.length)];
            const rText = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
            reviewsHTML += `
                <div class="review-item">
                    <div class="review-user">
                        <div class="review-user-avatar">${rName.charAt(0)}</div>
                        <div style="color: white; font-weight: 600;">${rName}</div>
                        <div style="color: #FFD700; margin-left: auto; letter-spacing: 2px;">
                            ★★★★★
                        </div>
                    </div>
                    <div class="review-text">${rText}</div>
                </div>
            `;
        }

        this.detailBody.innerHTML = `
            <div class="detail-top">
                <div class="detail-image-container">
                    <img src="${product.image}" alt="${product.name}" class="detail-image">
                </div>
                <div class="detail-info">
                    <div class="detail-title">${product.name}</div>
                    <div class="detail-rating">
                        ★★★★★ <span>${product.rating} (${product.reviews} reviews)</span>
                    </div>
                    <div class="detail-price">₹${product.price.toLocaleString('en-IN')}</div>
                    <div class="detail-desc">${product.description}</div>
                    <div class="detail-actions">
                        <button class="btn-add-cart" onclick="app.addToCart(${product.id}); app.closeProductDetail();">Add to Cart</button>
                        <button class="btn-buy-now" onclick="app.buyNow(${product.id})">Buy Now</button>
                    </div>
                </div>
            </div>
            <div class="detail-bottom">
                <h3 class="reviews-header">Customer Reviews</h3>
                ${reviewsHTML}
            </div>
        `;

        this.productDetailModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    },

    closeProductDetail() {
        this.productDetailModal.classList.remove('active');
        document.body.style.overflow = '';
    },

    buyNow(productId) {
        this.closeProductDetail();
        // Trigger Add to Cart then open payment directly
        this.addToCart(productId);
        setTimeout(() => {
            this.openPaymentModal();
        }, 100);
    },

    processPayment(method) {
        this.showToast(`Processing via ${method}...`, false);
        this.closePaymentModal();
        
        // Disable interactions
        this.cartOverlay.classList.add('active');
        this.cartOverlay.style.zIndex = '1999';
        
        // Simulate API delay
        setTimeout(() => {
            this.successScreen.classList.add('active');
            this.cartToggle.style.display = 'none'; // hide cart temporally
        }, 1500);
    },

    resetApp() {
        this.successScreen.classList.remove('active');
        this.cartOverlay.classList.remove('active');
        this.cartOverlay.style.zIndex = '1000';
        this.cartSidebar.classList.remove('active');
        this.cartToggle.style.display = 'flex';
        
        // Clear Cart
        this.cart = [];
        this.updateCartUI();
        
        // Switch to All tab gracefully
        document.querySelector('.filter-btn[data-category="All"]').click();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    showToast(message, isSuccess = true) {
        const toast = document.createElement('div');
        toast.className = `toast ${isSuccess ? 'toast-success' : ''}`;
        
        toast.innerHTML = `
            <i data-feather="${isSuccess ? 'check-circle' : 'info'}"></i>
            <span>${message}</span>
        `;
        
        this.toastContainer.appendChild(toast);
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
        
        // Trigger reflow & add show class
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Start the application
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
