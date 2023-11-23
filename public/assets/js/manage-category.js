// note Đưa event và các nut button xóa sản phẩm
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
const notificationElement = document.getElementById('notification');

// Function to show the notification and hide it after 5 seconds
function showNotification() {
    // Show the notification
    notificationElement.classList.add('show');

    // Hide the notification after 5 seconds
    setTimeout(() => {
        notificationElement.classList.remove('show');
    }, 5000); // 5000 milliseconds = 5 seconds
}

// Call the function to show the notification

const deleteProduct = document.getElementById('button-yes');
deleteProduct.addEventListener('click', function(e){
    const inputElement = deleteProduct.parentElement.querySelector('input[name="post-id-product"]');
    // const array = {
    //     id_product : inputElement.value,
    // };
    const url = `/api/delete-category/${inputElement.value}`;
    window.axios.delete(url, { data: inputElement.value })
    .then(response => {
        console.log(response);
        if(response.data.data){
            bodyNotification.classList.remove('notification-delete-product');
            bodyNotification.classList.add('notification-delete-product-none');
            const itemDestroy = document.getElementById('id-category-'+response.data.data.id);
            itemDestroy.remove();
        }
        if(response.data.nodata){
            bodyNotification.classList.remove('notification-delete-product');
            bodyNotification.classList.add('notification-delete-product-none');
            console.log('The function has run succsessfully');
            showNotification();
        }
        
        
    })
    .catch(error => {
        console.error('Error:', error);
    });
})


