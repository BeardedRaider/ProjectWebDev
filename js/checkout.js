$(document).ready(function() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  displayOrderSummary();

  // Function to display order summary with each product's name and quantity
  function displayOrderSummary() {
    $("#productList").empty(); // Clear any existing products

    let totalItems = 0;
    let totalCost = 0;

    cart.forEach(item => {
      const quantity = item.quantity || 1;
      const itemCost = item.price * quantity;
      totalItems += quantity;
      totalCost += itemCost;

      // Append each item in order summary
      $("#productList").append(`
        <p>
          <strong>${item.name}</strong> - Quantity: ${quantity} - $${itemCost.toFixed(2)}
        </p>
      `);
    });

    $("#totalItems").text(totalItems);
    $("#totalCost").text(totalCost.toFixed(2));
  }

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


  