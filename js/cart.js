$(document).ready(function () {
  /*** Cart Management ***/
  
  // Initialize cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();

  /*** Cart Page Logic ***/
  if ($("#cartItems").length > 0) {
    renderCartItems();
    updateCartSummary();

    // Clear All Button Logic
    $("#clearCartButton").click(function () {
      const confirmClear = confirm("Are you sure you want to clear the cart?");
      if (confirmClear) {
        cart = []; // Empty the cart array
        localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
        renderCartItems(); // Re-render cart items
        updateCartSummary(); // Update cart summary
        updateCartCount(); // Update cart count in the navbar
        alert("Your cart has been cleared.");
      }
    });

    // Checkout Button Logic
    $("#checkoutButton").click(function () {
      // Redirect to checkout page
      window.location.href = "checkout.html"; // Update with your actual checkout page path
    });

    // Function to render cart items
    function renderCartItems() {
      const cartItemsContainer = $("#cartItems");
      cartItemsContainer.empty(); // Clear existing cart items

      if (cart.length === 0) {
        cartItemsContainer.html("<p>Your cart is empty.</p>");
        $("#checkoutButton, #clearCartButton").prop("disabled", true); // Disable buttons if cart is empty
        return;
      }

      // Enable buttons if cart is not empty
      $("#checkoutButton, #clearCartButton").prop("disabled", false);

      // Loop through cart and display each item
      cart.forEach((item, index) => {
        cartItemsContainer.append(`
          <div class="cart-item">
            <div class="cart-item-details">
              <h3>${item.name}</h3>
              <p>Price: $${item.price}</p>
              <div class="quantity-controls">
                <button class="quantity-btn minus" data-index="${index}">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn plus" data-index="${index}">+</button>
              </div>
            </div>
            <div class="cart-item-controls">
              <button class="remove-item" data-index="${index}">Remove</button>
            </div>
          </div>
        `);
      });

      // Attach event listeners for quantity controls and remove buttons
      $(".quantity-btn.plus").click(function () {
        const index = $(this).data("index");
        cart[index].quantity += 1;
        updateCart();
      });

      $(".quantity-btn.minus").click(function () {
        const index = $(this).data("index");
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1); // Remove item if quantity is 0
        }
        updateCart();
      });

      $(".remove-item").click(function () {
        const index = $(this).data("index");
        cart.splice(index, 1); // Remove item from cart
        updateCart();
      });
    }

    // Function to update cart (save to localStorage, re-render items and update summary)
    function updateCart() {
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
      updateCartSummary();
      updateCartCount();
    }

    // Update the cart summary (total items and total cost)
    function updateCartSummary() {
      const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
      const totalCost = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

      $("#totalItems").text(totalItems);
      $("#totalCost").text(totalCost.toFixed(2));
    }
  }

  // Function to update the cart count in the navbar (if you still need it)
  function updateCartCount() {
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    $("#cartCount").text(totalCount);
  }
});


