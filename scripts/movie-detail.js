$(document).ready(function () {
    // Lấy ID của phim từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    // Check if the movie ID is provided
    if (!movieId) {
        $('body').html('<h1>Movie ID is missing</h1>');
        return;
    }

    $.getJSON('./data/movie.json', function (cardData) {
        // Tìm phim có ID trùng với ID truyền vào
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
            $('body').html('<h1>Movie not found</h1>');
        }
    }).fail(function () {
        $('body').html('<h1>Failed to load movie data</h1>');
        console.error("Failed to load ./data/movie.json");
    });


    // Thêm sự kiện click cho nút đặt vé
    $('#booking-btn').on('click', function() {
        window.location.href = `booking.html?id=${movieId}`;  
    });
});