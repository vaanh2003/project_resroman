const icon = document.getElementById('icon-history-order');
icon.style.color = '#F67F20';
var baseURL = window.location.origin;
var saveIdInput = '';
const itemOrder = document.querySelectorAll('.item-order');
itemOrder.forEach((order) =>{
    order.addEventListener('click' , function(e){
        
        const idOrder = order.querySelector('#id_order').value;
        const array = {
            idOrder : idOrder
        }
        window.axios.post('api/one-order', array)
            .then(response => {
                const showId = document.getElementById('show-id');
                showId.textContent = 'Đơn hàng # '+ response.data.order.random_number;
                const showStatus = document.getElementById('show-status');
                if(response.data.order.status == 1){
                    showStatus.textContent='Chưa thanh toán';
                }else{
                    showStatus.textContent = 'Đã thanh toán'
                }
                let date = response.data.order.created_at;
                let dateOnly = date.substring(0, 10);
                const dateTimeString =  response.data.order.created_at;
                const dateTime = new Date(dateTimeString);

                const hours = dateTime.getHours(); // Lấy giờ
                const minutes = dateTime.getMinutes(); // Lấy phút
                const showDate = document.getElementById('show-date');
                showDate.textContent = dateOnly + ' '+ hours + ':'+ minutes;

                const showName = document.getElementById('show-name');
                showName.textContent = response.data.table.name;

                const showUser = document.getElementById('show-user');
                showUser.textContent = response.data.user.name;
                const bodyShowProductOrder = document.getElementById('show-product-order');
                bodyShowProductOrder.innerHTML = '';

                // Gọi các sản phẩm ra
                response.data.productOrder.forEach((e) =>{
                    // Tạo các phần tử HTML
                    const divProduct = document.createElement("div");
                    divProduct.id = "product-"+e.id;
                    divProduct.classList.add("card", "mb-3");

                    const idInput = document.createElement('input');
                    idInput.setAttribute('id', 'id-product-order');
                    idInput.setAttribute('name', 'id-product-order');
                    idInput.setAttribute('type', 'hidden');
                    idInput.setAttribute('value', e.id);

                    const divInner = document.createElement("div");
                    divInner.classList.add("d-flex", "justify-content-between", "p-2");

                    const imgElement = document.createElement("img");
                    imgElement.src = baseURL+"/assets/img/" + e.or_product.img;
                    imgElement.classList.add("img-order");

                    const divText1 = document.createElement("div");
                    divText1.classList.add("align-self-center", "mr-auto", "px-4", "font-weight-bolder", "h7");
                    divText1.textContent = e.or_product.name;

                    const spanElement = document.createElement("span");
                    spanElement.classList.add("ml-2", "h7");
                    spanElement.textContent = "x"+e.amount;

                    const divText2 = document.createElement("div");
                    divText2.classList.add("text-main", "align-self-center", "font-weight-bolder", "h7", "px-4");
                    var total = e.amount * e.or_product.price;
                    divText2.textContent =formatNumberWithCommas(total) + 'đ';

                    // Gắn các phần tử con vào cấu trúc
                    divText1.appendChild(spanElement);
                    divInner.appendChild(imgElement);
                    divInner.appendChild(divText1);
                    divInner.appendChild(divText2);
                    divProduct.appendChild(divInner);

                    bodyShowProductOrder.appendChild(divProduct);
                    
                    
                    if(response.data.order.status == 1){
                        const divItemButtonShow = document.createElement("div");
                        divItemButtonShow.classList.add("item-button-show");
                        
                        const buttonDelete = document.createElement("button");
                        buttonDelete.classList.add("button");
                        buttonDelete.id = "delete-product-order";
                        buttonDelete.textContent = "Xóa";
                        buttonDelete.addEventListener('click', deleteProductOrder);
                        
                        // Gắn các phần tử con vào cấu trúc
                        divItemButtonShow.appendChild(buttonDelete);
                        divItemButtonShow.appendChild(idInput);

                        divProduct.appendChild(divItemButtonShow);
                    }
                    
                })
            })
            .catch(error => {
                // Xử lý lỗi
                console.error('Error:', error);
            });
    })
})
function deleteProductOrder(event){
    const bodyNotification = document.getElementById('notification-delete-product');
    const clickedButton = event.target;
    const closestItemButtonShow = clickedButton.closest('.item-button-show');
    const idInput = closestItemButtonShow.querySelector('#id-product-order').value;
    const postId = document.getElementById('post-id-order');
    postId.setAttribute('value', idInput);
    bodyNotification.classList.remove('notification-delete-product-none');
    bodyNotification.classList.add('notification-delete-product');
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
}
const deleteProduct = document.getElementById('button-yes');
    deleteProduct.addEventListener('click', function(e){
        const inputElement = deleteProduct.parentElement.querySelector('input[name="post-id-order"]');
        console.log(inputElement.value);
        const array = {
            id_order : inputElement.value,
        };
        window.axios.post('api/delete-product-order',array)
        .then(response => {
            console.log(response);

            const itemProductOrder = document.getElementById('product-' + response.data.product_order.id);
            itemProductOrder.remove();

            const itemOrder = document.getElementById('order-' + response.data.order.id);

            const totalOrder = itemOrder.querySelector('#total-order');
            totalOrder.textContent = formatNumberWithCommas(response.data.order.total) + 'đ';

            const bodyNotification = document.getElementById('notification-delete-product');
            bodyNotification.classList.remove('notification-delete-product');
            bodyNotification.classList.add('notification-delete-product-none');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })

    // Phần Xóa order
    const deleteOrder = document.querySelectorAll('#delete-order');
    deleteOrder.forEach((deleOrder) =>{
        deleOrder.addEventListener('click', function(){
            const bodyNotification = document.getElementById('notification-delete-order');

            const closestItemButtonShow = deleOrder.closest('.item-button');
            const idOrder = closestItemButtonShow.querySelector('#id_order').value;
            
            const postId = document.getElementById('post-order-id');
            postId.setAttribute('value', idOrder);

            bodyNotification.classList.remove('notification-delete-product-none');
            bodyNotification.classList.add('notification-delete-product');

            const backNotification = document.getElementById('back-notification-order');
        
            backNotification.addEventListener('click', function(){
                bodyNotification.classList.remove('notification-delete-product');
                bodyNotification.classList.add('notification-delete-product-none');
            })
            const buttonBackNotification = document.getElementById('button-no-order');
            buttonBackNotification.addEventListener('click', function(e){
                bodyNotification.classList.remove('notification-delete-product');
                bodyNotification.classList.add('notification-delete-product-none');
            })
        });
    });

    const buttonDeleteOrder = document.getElementById('button-yes-order');
    buttonDeleteOrder.addEventListener('click', function(){
        const inputIdOrder = document.getElementById('post-order-id').value;
        const array = {
            idOrder : inputIdOrder
        }
        window.axios.post('api/delete-order',array)
            .then(response => {
                if(response.data.order){
                    console.log(response);

                    const bodyItemOrder = document.getElementById('order-'+response.data.order.id);
                    bodyItemOrder.remove();

                    const showUser = document.getElementById('show-user');
                    const showName = document.getElementById('show-name');
                    const showDate = document.getElementById('show-date');
                    const showStatus = document.getElementById('show-status');
                    const showId = document.getElementById('show-id');

                    showUser.textContent = '';
                    showName.textContent = '';
                    showDate.textContent = '';
                    showStatus.textContent = '';
                    showId.textContent = '';

                    const bodyShowProductOrder = document.getElementById('show-product-order');
                    bodyShowProductOrder.innerHTML = '';
                    const bodyNotification = document.getElementById('notification-delete-order');
                    bodyNotification.classList.remove('notification-delete-product');
                    bodyNotification.classList.add('notification-delete-product-none');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

    });

    // Phàn code change table
    const changeOrder = document.querySelectorAll('#change-table');
    changeOrder.forEach((chaOrder) =>{
        chaOrder.addEventListener('click', function(){
            const closestItemButtonShow = chaOrder.closest('.item-button');
            const idOrder = closestItemButtonShow.querySelector('#id_order').value;
            
            const tableChange = closestItemButtonShow.querySelector('#table').value;
            if(tableChange){
                const bodyNotification = document.getElementById('notification-change-table');

                const postChange = document.getElementById('post-table-change');
                postChange.setAttribute('value', tableChange);

                const postId = document.getElementById('post-order-change');
                postId.setAttribute('value', idOrder);
    
                bodyNotification.classList.remove('notification-delete-product-none');
                bodyNotification.classList.add('notification-delete-product');
    
                const backNotification = document.getElementById('back-notification-change-table');
            
                backNotification.addEventListener('click', function(){
                    bodyNotification.classList.remove('notification-delete-product');
                    bodyNotification.classList.add('notification-delete-product-none');
                })
                const buttonBackNotification = document.getElementById('button-no-change');
                buttonBackNotification.addEventListener('click', function(e){
                    bodyNotification.classList.remove('notification-delete-product');
                    bodyNotification.classList.add('notification-delete-product-none');
                })
            }else{
                alert('Phản chọn bàn bạn muốn đổi');
            }
        });
    });
    const buttonOrderChange = document.getElementById('button-yes-change');
    buttonOrderChange.addEventListener('click', function(){
        const tableChange = document.getElementById('post-table-change').value;
        const postId = document.getElementById('post-order-change').value;
        const array = {
            idOrder : postId,
            idTable : tableChange
        };
        window.axios.post('api/order-change-table',array)
        .then(response => {
            console.log(response);
            if(response.data.check == 0){
                alert('Bàn bạn muốn đổi qua hiện tại đang có order, không thể đổi!')
            }if(response.data.check == 1){
                const showName = document.getElementById('show-name');
                showName.textContent = response.data.table.name;
            }   
            

            const bodyNotification = document.getElementById('notification-change-table');
            bodyNotification.classList.remove('notification-delete-product');
            bodyNotification.classList.add('notification-delete-product-none');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    })


function formatNumberWithCommas(number) {
    return new Intl.NumberFormat().format(number);
}