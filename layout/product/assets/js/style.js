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