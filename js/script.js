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


  // Handle "Add to Cart" button clicks
  $(".addToCart").click(function() {
    const productId = $(this).data("id");
    const product = products.find(p => p.id === productId);
    
    // Add product to cart
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart)); // Save to localStorage

    // Update cart count
    updateCartCount();

    alert(`${product.name} has been added to your cart.`);
  });

    // Function to update the cart count in the navbar
    function updateCartCount() {
      $("#cartCount").text(cart.length);
    }
    
});
  