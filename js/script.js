$(document).ready(function() {
    const products = [
      { id: 1, name: "Product 1", price: 10 },
      { id: 2, name: "Product 2", price: 15 },
      { id: 3, name: "Product 3", price: 20 },
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
  
    // Handle "Add to Cart" button clicks
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    $(".addToCart").click(function() {
      const productId = $(this).data("id");
      const product = products.find(p => p.id === productId);
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} has been added to your cart.`);
    });
  });
  