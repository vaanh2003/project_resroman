const icon = document.getElementById('icon-history-order');
icon.style.color = '#F67F20';
var baseURL = window.location.origin;
var saveIdInput = '';
const itemOrder = document.querySelectorAll('.item-order');
itemOrder.forEach((order) =>{
    order.addEventListener('click' , function(e){
        
        const idOrder = order.querySelector('#id_order').value;
        const array = {
            idInvoices : idOrder
        }
        window.axios.post('api/one-invoices', array)
            .then(response => {
                console.log(response);
                const showId = document.getElementById('show-id');
                showId.textContent = 'Đơn hàng # '+ response.data.invoices.invoices_order.random_number;
                const showStatus = document.getElementById('show-status');
                showStatus.textContent = 'Đã thanh toán'
                let date = response.data.invoices.created_at;
                let dateOnly = date.substring(0, 10);
                const dateTimeString =  response.data.invoices.created_at;
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
                response.data.productInvoices.forEach((e) =>{
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
                    imgElement.src = baseURL+"/assets/img/" + e.img;
                    imgElement.classList.add("img-order");

                    const divText1 = document.createElement("div");
                    divText1.classList.add("align-self-center", "mr-auto", "px-4", "font-weight-bolder", "h7");
                    divText1.textContent = e.name;

                    const spanElement = document.createElement("span");
                    spanElement.classList.add("ml-2", "h7");
                    spanElement.textContent = "x"+e.amount;

                    const divText2 = document.createElement("div");
                    divText2.classList.add("text-main", "align-self-center", "font-weight-bolder", "h7", "px-4");
                    var total = e.amount * e.price;
                    divText2.textContent =formatNumberWithCommas(total) + 'đ';

                    // Gắn các phần tử con vào cấu trúc
                    divText1.appendChild(spanElement);
                    divInner.appendChild(imgElement);
                    divInner.appendChild(divText1);
                    divInner.appendChild(divText2);
                    divProduct.appendChild(divInner);

                    bodyShowProductOrder.appendChild(divProduct);
                    
                    
                    // if(response.data.order.status == 1){
                    //     const divItemButtonShow = document.createElement("div");
                    //     divItemButtonShow.classList.add("item-button-show");
                        
                    //     const buttonDelete = document.createElement("button");
                    //     buttonDelete.classList.add("button");
                    //     buttonDelete.id = "delete-product-order";
                    //     buttonDelete.textContent = "Xóa";
                    //     buttonDelete.addEventListener('click', deleteProductOrder);
                        
                    //     // Gắn các phần tử con vào cấu trúc
                    //     divItemButtonShow.appendChild(buttonDelete);
                    //     divItemButtonShow.appendChild(idInput);

                    //     divProduct.appendChild(divItemButtonShow);
                    // }
                    
                })
            })
            .catch(error => {
                // Xử lý lỗi
                console.error('Error:', error);
            });
    })
})

function formatNumberWithCommas(number) {
    return new Intl.NumberFormat().format(number);
}
