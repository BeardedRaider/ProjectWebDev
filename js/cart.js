$(document).ready(function() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  renderCartItems();
  updateCartSummary();

  // Check if item is already in cart and increment quantity if so
  function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  // Handle "Add to Cart" button clicks
  $(".addToCart").click(function() {
    const productId = $(this).data("id");
    const product = products.find(p => p.id === productId);
    addToCart(product);
  });

  function renderCartItems() {
    $("#cartItems").empty();
    if (cart.length === 0) {
      $("#cartItems").html("<p>Your cart is empty.</p>");
      $("#checkoutButton").prop("disabled", true);
      return;
    }

    cart.forEach((item, index) => {
      const quantity = item.quantity || 1;
      $("#cartItems").append(`
        <div class="cart-item">
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <div class="quantity-controls">
              <button class="quantity-btn minus" data-index="${index}">-</button>
              <span class="quantity-display">${quantity}</span>
              <button class="quantity-btn plus" data-index="${index}">+</button>
            </div>
          </div>
          <div class="cart-item-controls">
            <button class="remove-item" data-index="${index}">Remove</button>
          </div>
        </div>
      `);
    });
    $("#checkoutButton").prop("disabled", false);
  }

  // Update cart summary
  function updateCartSummary() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity || 1, 0);
    const totalCost = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    $("#totalItems").text(totalItems);
    $("#totalCost").text(totalCost.toFixed(2));
  }

  // Event listener for incrementing quantity
$(document).on("click", ".plus", function() {
  const index = $(this).data("index");
  cart[index].quantity = (cart[index].quantity || 1) + 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
  updateCartSummary();
});

// Event listener for decrementing quantity
$(document).on("click", ".minus", function() {
  const index = $(this).data("index");
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1); // Remove the item from the cart if quantity is 1 and minus is clicked
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
  updateCartSummary();
});

  // Event listener for removing an item
  $(document).on("click", ".remove-item", function() {
    const index = $(this).data("index");
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCartItems();
    updateCartSummary();
  });

  // Redirect to checkout page
  $("#checkoutButton").click(function() {
    window.location.href = "checkout.html";
  });
});
