const icon = document.getElementById('icon-product');
icon.style.color = '#F67F20';// note Đưa event và các nut button xóa sản phẩm
const deleteButtons = document.querySelectorAll('#button-delete-product');
const bodyNotification = document.getElementById('notification-delete-product');
deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
        const inputElement = this.parentElement.querySelector('input[name="id_product"]');
        if (inputElement) {
            const postIdProduct = document.getElementById('post-id-product');
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
    const inputElement = deleteProduct.parentElement.querySelector('input[name="post-id-product"]');
    // const array = {
    //     id_product : inputElement.value,
    // };
    const url = `/api/delete/${inputElement.value}`;
    window.axios.delete(url, { data: inputElement.value })
    .then(response => {
        bodyNotification.classList.remove('notification-delete-product');
        bodyNotification.classList.add('notification-delete-product-none');
        alert('Xóa sản phẩm thành công ');
        const itemProduct = document.getElementById('product-'+response.data.id);
        itemProduct.remove();
    })
    .catch(error => {
        console.error('Error:', error);
    });
})
const buttonCreate = document.querySelector('.button-create-product');
buttonCreate.addEventListener('click', function(){
    const valueFile = document.querySelector('.inputfile').value;
    // if(valueFile == null){
    //     alert('Nhập ảnh của sản phẩm');
    // }
    console.log(valueFile)
})


