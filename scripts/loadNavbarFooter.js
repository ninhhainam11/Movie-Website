$(document).ready(function () {
    // Hiển thị navbar và footer
    $.get("./components/navbar.html", function (navbarHtml) {
        $('body').prepend(navbarHtml);
    }).fail(function () {
        console.error("Failed to load ./components/navbar.html");
    });

    $.get("./components/footer.html", function (footerHtml) {
        $('body').append(footerHtml);
    }).fail(function () {
        console.error("Failed to load ./components/footer.html");
    });
});