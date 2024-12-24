$(document).ready(function () {
    // Get the movie ID from the URL (e.g., ?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    // Check if the movie ID is provided
    if (!movieId) {
        $('body').html('<h1>Movie ID is missing</h1>');
        return;
    }

    // Fetch the JSON data
    $.getJSON('./data/movie.json', function (cardData) {
        // Find the movie that matches the provided ID
        const movie = cardData.find(card => card.id.toString() === movieId);

        if (movie) {
            // Populate the movie details
            $('#movie-image').attr('src', movie.imageUrl || 'default-image.jpg');
            $('#movie-title').text(movie.name || 'Untitled');
            $('#movie-type').text(movie.type || 'N/A');
            $('#movie-length').text(movie.length || 'N/A');
            $('#movie-start-time').text(movie.startDate || 'N/A');
            $('#movie-description').text(movie.description || 'No description available.');
        } else {
            // If the movie is not found
            $('body').html('<h1>Movie not found</h1>');
        }
    }).fail(function () {
        $('body').html('<h1>Failed to load movie data</h1>');
        console.error("Failed to load ./data/movie.json");
    });


    // Button click event (redirect to booking.html)
    $('#booking-btn').on('click', function() {
    window.location.href = `booking.html?id=${movieId}`;  // Redirect with the movie ID
    });
});