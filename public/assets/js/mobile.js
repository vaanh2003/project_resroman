var btnCounter = document.querySelectorAll('.btn-qty');
var totalItem = document.querySelector('.total-item');
function countItems() {
    for (var i = 0; i < btnCounter.length; i++) {
        btnCounter[i].addEventListener('click', function () {
            var oldValue = totalItem.value;
            if (this.value === '+') {
                var newValue = parseInt(oldValue, 10) + 1;
            } else {
                if (oldValue > 1) {
                    var newValue = parseInt(oldValue, 10) - 1;
                } else {
                    newValue = 1;
                }
            }
            newValue = isNaN(newValue) ? 1 : newValue;
            totalItem.value = newValue;
        });
    }
}
countItems();

$(document).ready(function () {
    $('.items').slick({
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow:
            '<div class="slick-nav prev-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
        nextArrow:
            '<div class="slick-nav next-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>'
    });
});

$(document).ready(function () {
    $(".content-item").hide(); // Ẩn tất cả các phần tử có class "content-item"

    $(".more-btn").click(function () {
        var $content = $(this).closest('.list-group').find('.content-item');
        if ($content.is(":hidden")) {
            $content.slideDown();
            $(this).text("Rút gọn");
        } else {
            $content.slideUp();
            $(this).text("Xem thêm");
        }
    });
});