
const icon = document.getElementById('icon-table');
icon.style.color = '#F67F20';// note Đưa event và các nut button xóa sản phẩm
const deleteButtons = document.querySelectorAll('#button-delete-table');
const bodyNotification = document.getElementById('notification-delete-product');
deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const inputElement = this.parentElement.querySelector('input[name="id_table"]');
        console.log(inputElement);
        if (inputElement) {
            const postIdProduct = document.getElementById('post-id-table');
            var idProduct = inputElement.value;
            postIdProduct.value = idProduct;
            console.log(postIdProduct.value);
        }
        bodyNotification.classList.remove('notification-delete-product-none');
        bodyNotification.classList.add('notification-delete-product');
    });
});

// note Tạo hiện ứng click tắc thông báo 
const backNotification = document.getElementById('back-notification');
backNotification.addEventListener('click', function(){
    bodyNotification.classList.remove('notification-delete-product');
    bodyNotification.classList.add('notification-delete-product-none');
})
const buttonBackNotification = document.getElementById('button-no');
buttonBackNotification.addEventListener('click', function(e){
    bodyNotification.classList.remove('notification-delete-product');
    bodyNotification.classList.add('notification-delete-product-none');
})

// note Tạo sự kiên click Xóa sản phẩm
const deleteProduct = document.getElementById('button-yes');
deleteProduct.addEventListener('click', function(e){
    const inputElement = deleteProduct.parentElement.querySelector('input[name="post-id-table"]');
    // const array = {
    //     id_product : inputElement.value,
    // };
    const array = {
        id_table:inputElement.value
    }
    window.axios.post('api/delete-table',array)
    .then(response => {
        bodyNotification.classList.remove('notification-delete-product');
        bodyNotification.classList.add('notification-delete-product-none');
        alert('xóa role user thành công');
        const bodyUser = document.getElementById('table-'+response.data.id);
        bodyUser.remove();
        console.log(response);
    })
    .catch(error => {
        console.error('Error:', error);
    });
})


