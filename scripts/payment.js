$(document).ready(function () {
    // Lấy thông tin phim, ngày, suất, ghế và tổng tiền từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieTitle = urlParams.get('movieTitle');
    const selectedDate = urlParams.get('selectedDate');
    const selectedShowtime = urlParams.get('selectedShowtime');
    const selectedSeats = urlParams.get('selectedSeats').split(',');
    const totalAmount = urlParams.get('totalAmount');

    // Hiển thị thông tin phim, ngày, suất, ghế và tổng tiền
    $('#paymentMovieTitle').text(movieTitle);
    $('#paymentDate').text(`Ngày: ${selectedDate}`);
    $('#paymentShowtime').text(`Suất: ${selectedShowtime}`);
    $('#paymentSeats').text(`Ghế: ${selectedSeats.join(', ')}`);
    $('#paymentAmount').text(`Tổng tiền: ${totalAmount} VND`);

    // Thêm sự kiện click cho qr code (mẫu thay cho quét qr)
    $('#qrCode').on('click', function () {
        $('#successMessage').show();

        setTimeout(function () {
            window.location.href = 'index.html';
        }, 3000);
    });
});