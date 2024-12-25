$(document).ready(function () {
    fetch('data/movieBanner.json')
    .then(response => response.json())
    .then(data => {
        const slidesContainer = document.getElementById('slides');
        data.forEach(item => {
            const slide = document.createElement('div'); 
            slide.style.flex = "0 0 100%"; 
            slide.style.display = "flex"; 
            slide.style.justifyContent = "center";
            slide.style.alignItems = "center";

            const img = document.createElement('img');
            img.src = item.imageUrl;
            img.alt = item.name;
            slide.appendChild(img);
            slidesContainer.appendChild(slide);

            // Điều hướng tới movie-detail.html khi click vào slide
            slide.style.cursor = 'pointer';
            slide.addEventListener('click', () => {
                window.location.href = `movie-detail.html?id=${item.id}`; 
            });
        });

        initializeCarousel();
    })
    .catch(error => console.error('Error loading JSON data:', error));


    // Thêm pagination cho carousel
    function initializeCarousel() {
        const slides = document.getElementById('slides');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');
        let index = 0;

        function updateCarousel() {
            slides.style.transform = `translateX(-${index * 100}%)`;
        }

        prevButton.addEventListener('click', () => {
            index = (index > 0) ? index - 1 : slides.children.length - 1;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            index = (index < slides.children.length - 1) ? index + 1 : 0;
            updateCarousel();
        });

        updateCarousel();
    }

    // Tự chuyển slide mỗi khi slide hiển thị được 5s
    setInterval(() => {
        const nextButton = document.getElementById('next');
        nextButton.click();
    }, 5000);


    $(".col-10 h5").on("click", function () {
        window.location.href = `schedule.html`;
    });

    // Add click event to navigate to the promotion page
    $(".col-2 h5").on("click", function () {
        window.location.href = `promotion.html`;
    });
    $(".col-10, .col-2").css("cursor", "pointer");


    let allMovies = []; // Lưu trữ tất cả các phim để sử dụng cho chức năng tìm kiếm

    // Lấy dữ liệu và hiển thị danh sách phim
    fetch('data/movie.json')
        .then(response => response.json())
        .then(data => {
            allMovies = data; // Lưu tất cả các phim vào biến
            displayMovies(data); // Hiển thị toàn bộ danh sách phim ban đầu
        })
        .catch(error => console.error('Lỗi khi tải dữ liệu JSON:', error));

    // Hàm hiển thị danh sách phim
    function displayMovies(movies) {
        const imageCardsContainer = document.getElementById('image-cards-container');
        imageCardsContainer.innerHTML = ''; // Xóa nội dung cũ
        const maxVisibleMovies = 16; // Số lượng phim tối đa hiển thị

        // Duyệt qua danh sách phim và thêm vào giao diện
        movies.slice(0, maxVisibleMovies).forEach(card => {
            const cardTemplate = document.createElement('div');
            cardTemplate.classList.add('col-6', 'col-md-4', 'col-lg-3', 'mb-4');

            cardTemplate.innerHTML = `
                <div class="card h-100 index-card">
                    <img src="${card.imageUrl || 'default-image.jpg'}" class="card-img-top rounded-lg" style="height:300px" alt="${card.name || 'Hình ảnh phim'}">
                    <div class="card-body">
                        <h5 class="card-title text-center">${card.name || 'Không có tiêu đề'}</h5>
                    </div>
                </div>
            `;
            imageCardsContainer.appendChild(cardTemplate);

            // Thêm sự kiện click để điều hướng tới trang chi tiết phim
            cardTemplate.style.cursor = 'pointer';
            cardTemplate.addEventListener('click', () => {
                window.location.href = `movie-detail.html?id=${card.id}`;
            });
        });

        // Thêm nút "Xem tất cả" nếu số lượng phim vượt quá giới hạn
        if (movies.length > maxVisibleMovies) {
            const seeAllButton = document.createElement('div');
            seeAllButton.classList.add('col-12', 'mt-3');
            seeAllButton.innerHTML = `
                <p class="mb-0">
                    <a href="movie-list.html" class="">Xem tất cả</a>
                </p>
            `;
            imageCardsContainer.appendChild(seeAllButton);
        }
    }

    // Xử lý sự kiện tìm kiếm
    $('#search-form').on('submit', function (event) {
        event.preventDefault(); // Ngăn chặn hành động submit mặc định của form
        const query = $('#search-input').val().toLowerCase(); // Lấy giá trị từ ô tìm kiếm và chuyển thành chữ thường

        // Lọc danh sách phim theo tên
        const filteredMovies = allMovies.filter(movie => 
            movie.name && movie.name.toLowerCase().includes(query)
        );

        // Hiển thị danh sách phim đã lọc
        displayMovies(filteredMovies);
    });


    // Hiển thị sự kiện
    fetch('data/promotion.json')
    .then(response => response.json())
    .then(data => {
        const eventListContainer = document.getElementById('event-list-container');
        const maxVisibleEvents = 6; 

        data.forEach((event, index) => {
            const eventTemplate = document.createElement('div');
            eventTemplate.classList.add('col-12', 'mb-4');
            
            eventTemplate.innerHTML = `
                <div class="card">
                    <img src="${event.image || 'default-image.jpg'}" class="card-img-top rounded-lg" alt="${event.name || 'Event image'}">
                </div>
            `;
            eventListContainer.appendChild(eventTemplate);

            // Điều hướng tới promition-detail.html khi click vào sự kiện
            eventTemplate.style.cursor = 'pointer';
            eventTemplate.addEventListener('click', () => {
                window.location.href = `promotion-detail.html?id=${event.id}`;
            });

            // Ẩn sự kiên nếu vượt quá số lượng sự kiện tối đa
            if (index >= maxVisibleEvents) {
                eventTemplate.style.display = 'none';
            }
        });

        // Thêm nút Xem tất cả 
        if (data.length > maxVisibleEvents) {
            const seeAllButton = document.createElement('div');
            seeAllButton.classList.add('col-12', 'mt-3');
            seeAllButton.innerHTML = `
                <p class="mb-0">
                    <a href="promotion.html" class="">Xem tất cả</a>
                </p>
            `;
            eventListContainer.appendChild(seeAllButton);
        }
    })
    .catch(error => console.error('Error loading JSON data:', error));
});