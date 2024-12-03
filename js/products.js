$(document).ready(function () {
    /*** Product Search Logic ***/
    // Search functionality for products
    $("#productSearch").on("input", function () {
    const searchValue = $(this).val().toLowerCase();
    let productCount = 0;

    // Loop through each product
    $(".product").each(function () {
        const productName = $(this).find("h3").text().toLowerCase();

        // Show matching products and hide non-matching ones
        if (productName.includes(searchValue)) {
        $(this).show();
        productCount++;
        } else {
        $(this).hide();
        }
    });

    // Show or hide the "No products found" message
    if (productCount === 0) {
        $("#noProductsMessage").show();  // Show message
        $("#oopsMessage").show();        // Show "Ooops!" message
        $("#resetSearch").show();        // Show "Go Back" button
        $("#welcomeMessage, #productsHeading").hide(); // Hide headings
    } else {
        $("#noProductsMessage").hide(); // Hide message
        $("#oopsMessage").hide();       // Hide "Ooops!" message
        $("#resetSearch").hide();       // Hide "Go Back" button
        $("#welcomeMessage, #productsHeading").show(); // Show headings
    }
    });

    // Reset the search results when the "Go Back" button is clicked
    $("#resetSearch").click(function () {
    $("#productSearch").val("");   // Clear the search input
    $(".product").show();          // Show all products
    $("#noProductsMessage").hide(); // Hide "No products found"
    $("#oopsMessage").hide();       // Hide "Ooops!" message
    $(this).hide();                 // Hide "Go Back" button
    $("#welcomeMessage, #productsHeading").show(); // Show headings
    });
});

