$(document).ready(function () {
    $.get("./components/navbar.html", function (navbarHtml) {
        $('body').prepend(navbarHtml);

        // Check if the user is logged in
        const user = localStorage.getItem('accounts');

        if (user) {
            // User is logged in
            $('#registerButton').hide();
            $('#loginButton').hide();
            $('#logoutButton').show();

            // Display username
            const username = JSON.parse(user)[0].username;
            $('#navbarUser').show().text(username);
        } else {
            // User is not logged in
            $('#registerButton').show();
            $('#loginButton').show();
            $('#logoutButton').hide();
        }

        $('#logoutButton').click(function (e) {
            e.preventDefault();
            localStorage.removeItem('accounts');
            alert('Bạn đã đăng xuất!');
            window.location.reload(); 
        });
    }).fail(function () {
        console.error("Failed to load ./components/navbar.html");
    });

    $.get("./components/footer.html", function (footerHtml) {
        $('body').append(footerHtml);
    }).fail(function () {
        console.error("Failed to load ./components/footer.html");
    });
});
