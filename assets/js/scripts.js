// Custom Scripts
// @@include('modal.js');
// @@include('main.js')


$(".modal .modal__container").on("click", function (e) {
    e.stopPropagation();
});

$(".open__modal").on("click", function (e) {
    e.preventDefault();
    $("body").css("overflow", "hidden");
    const open = $(this).data('open');
    $(open).fadeIn();
});

$(".modal .close, .modal ").on("click", function (e) {
    e.preventDefault();
    $(".modal").fadeOut(function () {
        $("body").css("overflow", "auto");
    });
});