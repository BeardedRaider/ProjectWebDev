document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".rotating-card");
  // Add class to trigger fade-in animation
  const introSection = document.querySelector('.intro-section');
  introSection.classList.add('visible');

  // Ensure the card exists to avoid errors
  if (card) {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      // Update CSS variables for the shine effect
      card.style.setProperty("--shine-x", `${x}%`);
      card.style.setProperty("--shine-y", `${y}%`);
    });

    card.addEventListener("mouseleave", () => {
      // Reset the shine effect when the mouse leaves the card
      card.style.setProperty("--shine-x", "50%");
      card.style.setProperty("--shine-y", "50%");
    });
  }
});

$(document).ready(function () {
  /*** Products & Cart Management ***/
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

  // Display products on the products page
  products.forEach((product) => {
    $("#productList").append(`
      <div class="product">
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button class="addToCart" data-id="${product.id}">Add to Cart</button>
      </div>
    `);
  });

  // Initialize cart from localStorage or use empty cart if not available
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  updateCartCount();

  // Handle "Add to Cart" button clicks
  $(".addToCart").click(function () {
    const productId = $(this).data("id");
    const product = products.find((p) => p.id === productId);
    addToCart(product);
    animateCartIcon();
  });

  // Function to add product to the cart
  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if item already in cart
    } else {
      cart.push({ ...product, quantity: 1 }); // Add new item to the cart
    }
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
    updateCartCount(); // Update cart count in the navbar
  }

  // Function to update cart count in the navbar
  function updateCartCount() {
    const totalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    $("#cartCount").text(totalCount);
  }

  // Function to animate the cart icon when item is added
  function animateCartIcon() {
    $("#cartCount")
      .css("background-color", "red")  // Ensure background color remains red
      .animate({ fontSize: "20px", opacity: 0.8 }, 200)
      .animate({ fontSize: "12px", opacity: 1 }, 200)
      .animate({ top: "-5px" }, 100)
      .animate({ top: "0px" }, 100);
  }

  /*** Cart Page Logic ***/
  if ($("#cartItems").length > 0) {
    renderCartItems();
    updateCartSummary();

    // Clear All Button Logic
    $("#clearCartButton").click(function () {
      const confirmClear = confirm("Are you sure you want to clear the cart?");
      if (confirmClear) {
        cart = []; // Clear the cart array
        localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
        renderCartItems(); // Re-render cart items
        updateCartSummary(); // Update cart summary
        updateCartCount(); // Update cart count in the navbar
        alert("Your cart has been cleared.");
      }
    });

    // Render cart items on the page
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

  /*** Rotating Card Animation ***/
  const cardContainer = document.querySelector(".rotating-card-container");
  const card = document.querySelector(".rotating-card");
  const flipButtons = document.querySelectorAll(".flip-button");

  cardContainer?.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = cardContainer.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = -(e.clientY - top - height / 2) / 20;

    card.style.transform = `rotateX(${y}deg) rotateY(${x}deg)`;
  });

  cardContainer?.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });

  flipButtons.forEach((button) =>
    button.addEventListener("click", () => {
      card.classList.toggle("flipped");
    })
  );
});
