// Load banner images
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

        // Add click event to navigate to the movie detail page
        slide.style.cursor = 'pointer';
        slide.addEventListener('click', () => {
            window.location.href = `card-detail.html?id=${item.id}`; 
        });
    });

    initializeCarousel();
})
.catch(error => console.error('Error loading JSON data:', error));


// Carousel navigation
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

// Add click event to navigate to the schedule page
$(".col-10 h5").on("click", function () {
    window.location.href = `schedule.html`;
});

// Add click event to navigate to the promotion page
$(".col-2 h5").on("click", function () {
    window.location.href = `promotion.html`;
});
$(".col-10, .col-2").css("cursor", "pointer");



// Load movie cards
fetch('data/movie.json')
.then(response => response.json())
.then(data => {
    const imageCardsContainer = document.getElementById('image-cards-container');
    const maxVisibleMovies = 16; // Maximum number of movies to display

    // Display the cards
    data.slice(0, maxVisibleMovies).forEach(card => {
        const cardTemplate = document.createElement('div');
        cardTemplate.classList.add('col-6', 'col-md-4', 'col-lg-3', 'mb-4');

        cardTemplate.innerHTML = `
            <div class="card">
                <img src="${card.imageUrl || 'default-image.jpg'}" class="card-img-top rounded-lg" alt="${card.name || 'Movie image'}">
                <div class="card-body">
                    <h5 class="card-title">${card.name || 'Untitled'}</h5>
                </div>
            </div>
        `;
        imageCardsContainer.appendChild(cardTemplate);

        // Add click event to navigate to the movie detail page
        cardTemplate.style.cursor = 'pointer';
        cardTemplate.addEventListener('click', () => {
            window.location.href = `card-detail.html?id=${card.id}`; 
        });
    });

    // Add a 'See All' button if there are more movies than the maximum visible movies
    if (data.length > maxVisibleMovies) {
        const seeAllButton = document.createElement('div');
        seeAllButton.classList.add('col-12', 'mt-3');
        seeAllButton.innerHTML = `
            <p class="mb-0">
                <a href="movie-list.html" class="">Xem tất cả</a>
            </p>
        `;
        imageCardsContainer.appendChild(seeAllButton);
    }
})
.catch(error => console.error('Error loading JSON data:', error));


// Load promotional events and display their image
fetch('data/promotion.json')
.then(response => response.json())
.then(data => {
    const eventListContainer = document.getElementById('event-list-container');
    const maxVisibleEvents = 6; // Maximum number of events to display

    data.forEach((event, index) => {
        const eventTemplate = document.createElement('div');
        eventTemplate.classList.add('col-12', 'mb-4');
        
        eventTemplate.innerHTML = `
            <div class="card">
                <img src="${event.image || 'default-image.jpg'}" class="card-img-top rounded-lg" alt="${event.name || 'Event image'}">
            </div>
        `;
        eventListContainer.appendChild(eventTemplate);

        // Add click event to navigate to the promotion detail page
        eventTemplate.style.cursor = 'pointer';
        eventTemplate.addEventListener('click', () => {
            window.location.href = `promotion-detail.html?id=${event.id}`;
        });

        // Hide the event if it exceeds the maximum number of visible events
        if (index >= maxVisibleEvents) {
            eventTemplate.style.display = 'none';
        }
    });

    // Add a 'See All' button if there are more events than the maximum visible events
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