$(document).ready(function () {
    // Lấy movieId từ query string
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');
    if (!movieId) {
        alert('Không tìm thấy movieId trong URL!');
        return;
    }

    // Tải dữ liệu từ movie.json
    $.getJSON('./data/movie.json')
        .done(function (cardData) {
            // Find the movie that matches the provided ID
            const movie = cardData.find(card => card.id.toString() === movieId);

            if (movie) {
                // Hiển thị thông tin phim
                $('#moviePoster').attr('src', movie.imageUrl);
                $('#movieTitle').text(movie.name);
                $('#movieType').text(movie.type.join(', '));
                $('#movieLength').text(`Thời lượng: ${movie.length}`);

                // Add date buttons
                if (movie.dates && movie.dates.length > 0) {
                    movie.dates.forEach(function (date) {
                        $('#dateButtons').append(
                            `<button class="btn btn-outline-primary date-button" data-date="${date}">${date}</button>`
                        );
                    });
                } else {
                    $('#dateButtons').html('<p>Không có ngày chiếu.</p>');
                }
            } else {
                // If the movie is not found
                $('body').html('<h1>Movie not found</h1>');
            }

            // Handle date selection
            let selectedDate = null;
            let selectedShowtime = null;
            let selectedSeats = [];

            $('#dateButtons').on('click', '.date-button', function () {
                selectedDate = $(this).data('date');
                $('#showtimeButtons').empty(); // Clear previous showtimes

                if (movie.showtimes && movie.showtimes[selectedDate]) {
                    // Add showtimes for the selected date
                    movie.showtimes[selectedDate].forEach(function (showtime) {
                        $('#showtimeButtons').append(
                            `<button class="btn btn-outline-success showtime-button" data-showtime="${showtime}">${showtime}</button>`
                        );
                    });
                } else {
                    $('#showtimeButtons').html('<p>Không có suất chiếu.</p>');
                }
            });

            // Handle showtime selection
            $('#showtimeButtons').on('click', '.showtime-button', function () {
                selectedShowtime = $(this).data('showtime');
                $('#seatSelection').show(); // Show seat selection

                // Generate seats dynamically
                generateSeats();
            });

            // Function to generate seats dynamically (A1 to H10)
            function generateSeats() {
                $('#seatContainer').empty(); // Clear previous seats
                const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // Row letters A-H
                const seatsPerRow = 10; // 1-10 seats per row

                // Create seats for each row
                rows.forEach(function (row) {
                    const rowDiv = $('<div class="row-seats"></div>'); // Create a div for each row
                    for (let i = 1; i <= seatsPerRow; i++) {
                        const seatId = `${row}${i}`;
                        rowDiv.append(
                            `<div class="seat regular" data-id="${seatId}">${seatId}</div>`
                        );
                    }
                    $('#seatContainer').append(rowDiv); // Append the row to the container
                });

                // Add event listener for seat selection
                $('#seatContainer').on('click', '.seat', function () {
                    $(this).toggleClass('selected');
                    calculateTotal();
                });
            }

            // Function to calculate total price
            function calculateTotal() {
                let total = 0;
                $('#seatContainer .seat.selected').each(function () {
                    if ($(this).hasClass('vip')) total += 150000;
                    else if ($(this).hasClass('couple')) total += 200000;
                    else total += 100000;
                });
                $('#ticketTotalAmount').text(`${total.toLocaleString()} VND`);
            }

            // Handle continue button click
            $('#continueButton').click(function () {
                // Get selected seats
                selectedSeats = [];
                $('#seatContainer .seat.selected').each(function () {
                    selectedSeats.push($(this).data('id'));
                });

                // Get total amount
                const totalAmount = $('#ticketTotalAmount').text().replace(' VND', '').replace(',', '');

                // Redirect to payment page with selected information
                window.location.href = `payment.html?movieTitle=${encodeURIComponent(movie.name)}&selectedDate=${encodeURIComponent(selectedDate)}&selectedShowtime=${encodeURIComponent(selectedShowtime)}&selectedSeats=${encodeURIComponent(selectedSeats.join(','))}&totalAmount=${encodeURIComponent(totalAmount)}`;
            });

        })
        .fail(function () {
            $('body').html('<h1>Failed to load movie data</h1>');
            console.error("Failed to load ./data/movie.json");
        });
});