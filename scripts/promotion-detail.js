$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const promotionId = urlParams.get('id');

    // Hiển thị thông tin chi tiết của promotion
    $.getJSON("./data/promotion.json", function (data) {
        const promotion = data.find(item => item.id == promotionId);

        if (promotion) {
            const detailHtml = `
                <h1>${promotion.title}</h1>
                <img src="${promotion.image}" alt="${promotion.title}">
                <p>${promotion.description}</p>
            `;
            $("#promotion-detail").html(detailHtml);
        } else {
            $("#promotion-detail").html("<p>Promotion not found.</p>");
        }
    }).fail(function () {
        console.error("Failed to load ./data/promotion.json");
    });
});