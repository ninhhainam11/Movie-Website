$(document).ready(function () {

    // Load Promotion Cards
    $.get("./components/promotion-card.html", function (templateHtml) {
        // Fetch Promotion Data
        $.getJSON("./data/news.json", function (data) {
            const cardContainer = $("#card-container");

            // Iterate through the JSON data and create cards
            data.forEach(item => {
                const cardTemplate = $(templateHtml);

                // Populate the card template with data
                cardTemplate.find('.promotion-card').attr('data-id', item.id);
                cardTemplate.find('.card-img-top')
                    .attr('src', item.image)
                    .attr('alt', item.title);
                cardTemplate.find('.card-title').text(item.title);
                
                // Populate the start date
                cardTemplate.find('#start-date').text(item.startDate); // Assuming 'startDate' is in the JSON data  

                // Append the populated card to the container
                cardContainer.append(cardTemplate);
            });

            // Add click event to each card
            $(".promotion-card").on("click", function () {
                const promotionId = $(this).data("id");
                window.location.href = `news-detail.html?id=${promotionId}`;
            });
        }).fail(function () {
            console.error("Failed to load ./data/promotion.json");
        });
    }).fail(function () {
        console.error("Failed to load ./components/promotion-card.html");
    });
});