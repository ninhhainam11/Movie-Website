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
            // Tìm phim dựa trên movieId
            const movie = cardData.find(card => card.id.toString() === movieId);

            if (movie) {
                // Hiển thị thông tin phim
                $('#moviePoster').attr('src', movie.imageUrl);
                $('#movieTitle').text(movie.name);
                $('#movieType').text(movie.type.join(', '));
                $('#movieLength').text(`Thời lượng: ${movie.length}`);

                // Hiển thị các nút ngày chiếu
                if (movie.dates && movie.dates.length > 0) {
                    movie.dates.forEach(function (date) {
                        $('#dateButtons').append(
                            `<button class="btn btn-outline-primary date-button mr-3" data-date="${date}">${date}</button>`
                        );
                    });
                } else {
                    $('#dateButtons').html('<p>Không có ngày chiếu.</p>');
                }
            } else {
                // If the movie is not found
                $('body').html('<h1>Movie not found</h1>');
            }

            let selectedDate = null;
            let selectedShowtime = null;
            let selectedSeats = [];

            $('#dateButtons').on('click', '.date-button', function () {
                selectedDate = $(this).data('date');
                $('#showtimeButtons').empty(); 

                $('#dateButtons .date-button').removeClass('active');
                $(this).addClass('active');

                if (movie.showtimes && movie.showtimes[selectedDate]) {
                    // Thêm các nút showtime
                    movie.showtimes[selectedDate].forEach(function (showtime) {
                        $('#showtimeButtons').append(
                            `<button class="btn btn-outline-success showtime-button mr-3" data-showtime="${showtime}">${showtime}</button>`
                        );
                    });
                } else {
                    $('#showtimeButtons').html('<p>Không có suất chiếu.</p>');
                }
            });

            // Lựa chọn suất chiếu
            $('#showtimeButtons').on('click', '.showtime-button', function () {
                selectedShowtime = $(this).data('showtime');

                $('#showtimeButtons .showtime-button').removeClass('active');
                $(this).addClass('active');
                
                $('#seatSelection').show(); 

                generateSeats();
            });

            // Khởi tạo ghế ngồi
            function generateSeats() {
                $('#seatContainer').empty(); 
                const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; 
                const seatsPerRow = 10; 
                const vipSeats = [
                    'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10',
                    'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10',
                    'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10'
                ]; 
                const sweetboxSeats = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10']; 
            
                // Khởi tạo ghế cho từng hàng
                rows.forEach(function (row) {
                    const rowDiv = $('<div class="row-seats"></div>'); 
                    for (let i = 1; i <= seatsPerRow; i++) {
                        const seatId = `${row}${i}`;
                        let seatClass = 'regular'; 
            
                        // Kiểm tra xem ghế có phải là ghế VIP hoặc Sweetbox không
                        if (vipSeats.includes(seatId)) {
                            seatClass = 'vip';
                        } else if (sweetboxSeats.includes(seatId)) {
                            seatClass = 'sweetbox';
                        }
            
                        rowDiv.append(
                            `<div class="seat ${seatClass}" data-id="${seatId}">${seatId}</div>`
                        );
                    }
                    $('#seatContainer').append(rowDiv); 
                });
            
                //thêm sự kiện click vào ghế
                $('#seatContainer').on('click', '.seat', function () {
                    $(this).toggleClass('selected');
                    calculateTotal();
                });
            }

            // Tính tổng tiền vé dựa trên số lượng ghế đã chọn và loại ghế
            function calculateTotal() {
                let total = 0;
                $('#seatContainer .seat.selected').each(function () {
                    if ($(this).hasClass('vip')) total += 150000;
                    else if ($(this).hasClass('couple')) total += 200000;
                    else total += 100000;
                });
                $('#ticketTotalAmount').text(`${total.toLocaleString()} VND`);
            }

            $('#backButton').click(function () {
                window.location.href = 'index.html';
            });

            $('#continueButton').click(function () {
                selectedSeats = [];
                $('#seatContainer .seat.selected').each(function () {
                    selectedSeats.push($(this).data('id'));
                });
                const totalAmount = $('#ticketTotalAmount').text().replace(' VND', '').replace(',', '');

                window.location.href = `payment.html?movieTitle=${encodeURIComponent(movie.name)}&selectedDate=${encodeURIComponent(selectedDate)}&selectedShowtime=${encodeURIComponent(selectedShowtime)}&selectedSeats=${encodeURIComponent(selectedSeats.join(','))}&totalAmount=${encodeURIComponent(totalAmount)}`;
            });

        })
        .fail(function () {
            $('body').html('<h1>Failed to load movie data</h1>');
            console.error("Failed to load ./data/movie.json");
        });
});
