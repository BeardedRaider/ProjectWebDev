$(document).ready(function() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart.length === 0) {
      $("#cartItems").html("<p>Your cart is empty.</p>");
    } else {
      cart.forEach(item => {
        $("#cartItems").append(`
          <div class="product">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
          </div>
        `);
      });
    }
  
    $("#checkoutButton").click(function() {
      window.location.href = "checkout.html";
    });
  });
  