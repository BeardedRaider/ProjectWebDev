$(document).ready(function() {
  $(".info-btn").click(function() {
    $(this).closest(".card").toggleClass("flipped");
  });
});

$(document).ready(function() {
  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 15 },
    { id: 3, name: "Product 3", price: 20 },
    { id: 4, name: "Product 4", price: 25 },
    { id: 5, name: "Product 5", price: 30 },
    { id: 6, name: "Product 6", price: 35 },
    { id: 7, name: "Product 7", price: 40 },
    { id: 8, name: "Product 8", price: 45 },
    { id: 9, name: "Product 9", price: 50 },
    { id: 10, name: "Product 10", price: 55 }
  ];

  // Display products
  products.forEach(product => {
    $("#productList").append(`
      <div class="product">
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button class="addToCart" data-id="${product.id}">Add to Cart</button>
      </div>
    `);
  });

  // Retrieve cart from localStorage or set up a new one
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();

  // Handle "Add to Cart" button clicks with animation
  $(".addToCart").click(function() {
    const productId = $(this).data("id");
    const product = products.find(p => p.id === productId);

    // Add product to cart
    addToCart(product);  // Consolidate quantity for items already in cart
    animateCartIcon();   // Animate cart icon on addition
  });

  // Function to add item to cart with quantity consolidation
  function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        // If item already in cart, increase its quantity
        existingItem.quantity += 1;
    } else {
    // Add new item with quantity property set to 1
    cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));  // Save to localStorage
    updateCartCount();
  }

  // Function to update the cart count in the navbar
  function updateCartCount() {
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    $("#cartCount").text(totalCount);
  }

  // Function to animate the cart icon on item addition
  function animateCartIcon() {
    $("#cartCount")
    .css("background-color", "red")  // Ensure background color remains red
    .animate({
      fontSize: "20px",
      opacity: 0.8
    }, 200)
    .animate({
      fontSize: "12px",
      opacity: 1
    }, 200)
    .animate({
      top: "-5px"
    }, 100)
    .animate({
      top: "0px"
    }, 100);
}
});

  