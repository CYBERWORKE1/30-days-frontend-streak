const products = [
  {
    name: "Wireless Earbuds Alpha",
    price: 899,
    oldPrice: 2499,
    rating: 4.9,
    image: "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg"
  },
  {
    name: "Nirvana Pro",
    price: 2499,
    oldPrice: 14999,
    rating: 4.6,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg"
  },
  {
    name: "Gaming Headphones",
    price: 1499,
    oldPrice: 8499,
    rating: 4.3,
    image: "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg"
  },
  {
    name: "Noise Cancelling Pro",
    price: 999,
    oldPrice: 3999,
    rating: 4.8,
    image: "https://images.pexels.com/photos/1591/technology-music-sound-things.jpg"
  },
  {
    name: "Budget Earphones",
    price: 699,
    oldPrice: 1999,
    rating: 4.2,
   image: "https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg"

  }
];

const productList = document.getElementById("productList");
const cartCount = document.getElementById("cartCount");

let cart = 0;

/* ================= RENDER PRODUCTS ================= */
products.forEach(product => {
  const discount = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="card-content">
      <h3>${product.name}</h3>
      <div class="rating">⭐ ${product.rating}</div>
      <div class="price">
        ₹${product.price}
        <span>₹${product.oldPrice}</span>
      </div>
      <div class="discount">${discount}% off</div>
      <button class="add-cart">Add to Cart</button>
    </div>
  `;

  const addToCartBtn = card.querySelector(".add-cart");
  addToCartBtn.addEventListener("click", () => {
    cart++;
    cartCount.textContent = cart;

    addToCartBtn.textContent = "Added ✓";
    addToCartBtn.disabled = true;
    addToCartBtn.style.backgroundColor = "#4CAF50";
  });

  productList.appendChild(card);
});

/* ================= SLIDER CONTROLS ================= */
function scrollLeft() {
  productList.scrollLeft -= 300;
}

function scrollRight() {
  productList.scrollLeft += 300;
}
