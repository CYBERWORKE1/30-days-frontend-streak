// Data with Images (Unsplash URLs)
const products = [
    { 
        id: 1, 
        name: "MacBook Pro M2", 
        category: "Electronics", 
        price: 23500, 
        // Changed to a more reliable Laptop URL
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
    },
    { 
        id: 2, 
        name: "Sony WH-1000XM5", 
        category: "Electronics", 
        price: 3500, 
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
    },
    { 
        id: 3, 
        name: "Nike Air Jordan", 
        category: "Fashion", 
        price: 1200, 
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
    },
    { 
        id: 4, 
        name: "Denim Jacket", 
        category: "Fashion", 
        price: 800, 
        image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=500&q=60" 
    },
    { 
        id: 5, 
        name: "Modern Sofa", 
        category: "Home", 
        price: 15000, 
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
    },
    { 
        id: 6, 
        name: "Minimalist Lamp", 
        category: "Home", 
        price: 400, 
        
        image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=600" 
    },
    { 
        id: 7, 
        name: "4K Monitor", 
        category: "Electronics", 
        price: 5000, 
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
    },
    { 
        id: 8, 
        name: "Mechanical Keyboard", 
        category: "Electronics", 
        price: 1200, 
        // Changed to a different Keyboard URL
        image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
    }
];

// DOM Elements
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const priceValue = document.getElementById("priceValue");
const sortFilter = document.getElementById("sortFilter");
const productContainer = document.getElementById("productContainer");
const noResults = document.getElementById("noResults");
const resetBtn = document.getElementById("resetBtn");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");

let cart = 0;

// Currency Formatter
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(price);
};

// Render Products
function renderProducts(items) {
    productContainer.innerHTML = "";

    if (items.length === 0) {
        noResults.classList.remove("hidden");
        return;
    } else {
        noResults.classList.add("hidden");
    }

    items.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("card");
        
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${product.image}" alt="${product.name}" class="card-img">
            </div>
            <div class="card-content">
                <span class="category-tag">${product.category}</span>
                <h3>${product.name}</h3>
                <div class="price-row">
                    <span class="price">${formatPrice(product.price)}</span>
                    <button class="add-btn" onclick="addToCart()">
                        <i class="fa-solid fa-plus"></i> Add
                    </button>
                </div>
            </div>
        `;
        productContainer.appendChild(card);
    });
}

// Filtering Logic
function filterAndSortProducts() {
    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const maxPrice = parseInt(priceFilter.value);
    const sortValue = sortFilter.value;

    // 1. Filter
    let filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchText);
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        const matchesPrice = product.price <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
    });

    // 2. Sort
    if (sortValue === "low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortValue === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    renderProducts(filtered);
}

// Add to Cart Simulation
window.addToCart = function() {
    cart++;
    cartCount.textContent = cart;
    
    // Show Toast
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// Event Listeners
searchInput.addEventListener("input", filterAndSortProducts);
categoryFilter.addEventListener("change", filterAndSortProducts);
sortFilter.addEventListener("change", filterAndSortProducts);

priceFilter.addEventListener("input", (e) => {
    priceValue.textContent = formatPrice(e.target.value);
    filterAndSortProducts();
});

resetBtn.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "all";
    priceFilter.value = 25000;
    priceValue.textContent = formatPrice(25000);
    sortFilter.value = "default";
    renderProducts(products);
});

// Initial Render
renderProducts(products);
priceValue.textContent = formatPrice(25000);