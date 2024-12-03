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
