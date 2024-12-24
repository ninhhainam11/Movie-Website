$(document).ready(function () {
    // Load navbar and footer using jQuery

    // Get URL parameters using URLSearchParams
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('movieTitle');
    const selectedDate = urlParams.get('selectedDate');
    const selectedShowtime = urlParams.get('selectedShowtime');
    const selectedSeats = urlParams.get('selectedSeats').split(',');
    const totalAmount = urlParams.get('totalAmount');

    // Update the content using jQuery
    $('#paymentMovieTitle').text(movieTitle);
    $('#paymentDate').text(`Ngày: ${selectedDate}`);
    $('#paymentShowtime').text(`Suất: ${selectedShowtime}`);
    $('#paymentSeats').text(`Ghế: ${selectedSeats.join(', ')}`);
    $('#paymentAmount').text(`Tổng tiền: ${totalAmount} VND`);
});