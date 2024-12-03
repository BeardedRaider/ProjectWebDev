$(document).ready(function () {
    // Function to process the text
    function countSpacesBeforeUWS() {
    const text = $("#feedbackText").val();
    const searchWord = "uws";

    // Find the index of the last occurrence of "uws" (case insensitive)
    const lastIndex = text.toLowerCase().lastIndexOf(searchWord);

    if (lastIndex !== -1) {
        // Extract the substring before the last occurrence of "uws"
        const beforeUWS = text.slice(0, lastIndex);
        const afterUWS = text.slice(lastIndex); // Include "uws" and the remaining text

        // Count the spaces before the last occurrence of "uws"
        const spaceCount = beforeUWS.split(" ").length - 1;

        // Highlight spaces in the text
        const highlightedText = beforeUWS
        .replace(/ /g, '<span class="highlight"> </span>') + 
        afterUWS;

        // Show the result
        $("#resultMessage").html(`
        <p>There are <strong>${spaceCount}</strong> spaces before the last occurrence of "uws".</p>
        <p>Here is the text with spaces highlighted:</p>
        <p class="highlighted-text">${highlightedText}</p>
        `);
    } else {
        // If "uws" is not found
        $("#resultMessage").html(`<p>The word "uws" was not found in the text.</p>`);
    }

    // Clear the textarea after processing
    $("#feedbackText").val("");
    }

    // Event handler for the process button
    $("#processButton").click(function () {
    countSpacesBeforeUWS(); // Process the text when the button is clicked
    });
});

$(document).ready(function () {
  // Datepicker
  $("#reviewDate").datepicker({
    showAnim: "slideDown",
    dateFormat: "dd-mm-yy"
  });

  // Accordion
  $("#reviewAccordion").accordion({
    collapsible: true,
    heightStyle: "content"
  });

  // Rating Slider
  $("#ratingSlider").slider({
    min: 1,
    max: 5,
    value: 3, // Default value
    step: 1, // Ensure the slider snaps to markers
    slide: function(event, ui) {// Update the slider value display when the slider is moved even shows its not used, but it makes the slider work.
        // Update the slider value display when the slider is moved
        $("#sliderValue").text(ui.value);
    }
});
});

