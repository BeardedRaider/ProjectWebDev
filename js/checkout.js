$(document).ready(function() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Display Order Summary
  function displayOrderSummary() {
    const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
    const totalCost = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

    $("#totalItems").text(totalItems);
    $("#totalCost").text(totalCost.toFixed(2));
  }

  // Call displayOrderSummary on page load
  displayOrderSummary();

  // Handle form submission
  $("#submitOrder").click(function() {
    const name = $("#name").val();
    const address = $("#address").val();
    const card = $("#card").val();

    if (!name || !address || !card) {
      alert("Please complete all fields before submitting.");
      return;
    }

    // Mock submission
    alert("Order submitted successfully!\nThank you for your purchase.");
    localStorage.removeItem("cart"); // Clear the cart
    window.location.href = "index.html"; // Redirect to home or a confirmation page
  });
});

  