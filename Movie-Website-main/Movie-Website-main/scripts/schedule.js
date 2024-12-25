$(document).ready(function () {
    // Load the card template from ./components/schedule-card.html
    $.get("./components/schedule-card.html", function (templateHtml) {
        // Fetch the JSON data
        $.getJSON("./data/movie.json", function (cardData) {
            if (cardData && cardData.length > 0) {
                function displayCards(cards) {
                    // Clear the container before appending new cards
                    $('#image-cards-container').empty();

                    cards.forEach(function (card) {
                        // Create a new card using the loaded template
                        const cardTemplate = $(templateHtml);

                        // Populate the card with JSON data
                        cardTemplate.find('.card-img-left')
                            .attr('src', card.imageUrl || 'default-image.jpg') // Fallback image
                            .attr('alt', card.name || 'Movie image');
                        cardTemplate.find('.card-title').text(card.name || 'Untitled');
                        cardTemplate.find('.movie-type').text(card.type || 'N/A');
                        cardTemplate.find('.movie-length').text(card.length || 'N/A');
                        cardTemplate.find('.movie-start-time').text(card.startDate || 'N/A');
                        cardTemplate.find('.movie-description').text(card.description || 'No description available.');

                        // Add click event to navigate to the movie detail page
                        cardTemplate.css('cursor', 'pointer');
                        cardTemplate.on('click', function () {
                            window.location.href = `movie-detail.html?id=${card.id}`; // Pass the movie ID in the query string
                        });

                        // Append the populated card to the container
                        $('#image-cards-container').append(cardTemplate);
                    });
                }

                displayCards(cardData);

                // Get all unique dates from the card data
                const uniqueDates = [...new Set(cardData.flatMap(card => card.dates))];

                function formatDate(dateStr) {
                    const [day, month, year] = dateStr.split('/');
                    return new Date(`${year}-${month}-${day}`);
                }

                // Sort the dates in ascending order
                uniqueDates.sort((a, b) => {
                    const dateA = formatDate(a);
                    const dateB = formatDate(b);
                    return dateA - dateB; // Compare the Date objects
                });

                // Create a button for each unique date
                uniqueDates.forEach(date => {
                    const button = $('<button>')
                        .addClass('btn btn-secondary')
                        .text(date)
                        .on('click', function () {
                            const filteredMovies = cardData.filter(card => card.dates.includes(date));
                            displayCards(filteredMovies); // Display the filtered cards
                        });
                    $('#date-buttons-container').append(button);
                });

            } else {
                console.error("No data available in movie.json");
            }
        }).fail(function () {
            console.error("Failed to load ./data/movie.json. Check the path and the file.");
        });
    }).fail(function () {
        console.error("Failed to load ./components/schedule-card.html. Check the template file path.");
    });


});