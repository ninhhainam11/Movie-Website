$(document).ready(function () {

    $.get("./components/promotion-card.html", function (templateHtml) {
        $.getJSON("./data/news.json", function (data) {
            const cardContainer = $("#card-container");

            // Hiển thị thông tin từ JSON lên card
            data.forEach(item => {
                const cardTemplate = $(templateHtml);

                // Populate the card template with data
                cardTemplate.find('.promotion-card').attr('data-id', item.id);
                cardTemplate.find('.card-img-top')
                    .attr('src', item.image)
                    .attr('alt', item.title);
                cardTemplate.find('.card-title').text(item.title);
                
                // Hiển thị ngày bắt đầu
                cardTemplate.find('#start-date').text(item.startDate); 

                cardContainer.append(cardTemplate);
            });

            // Thêm sự kiện click vào từng card
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