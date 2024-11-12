$(document).ready(function() {
    $("#submitOrder").click(function() {
      alert("Thank you! Your order has been submitted.");
      localStorage.removeItem("cart"); // Clear cart after checkout
      window.location.href = "index.html";
    });
  });
  