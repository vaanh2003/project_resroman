
var baseURL = window.location.origin;
var i = 0;
var totalAll = 0;
var dataBillHistory = [];
const table = document.getElementById('table');
const idUser = document.getElementById('id_user');
const tax = document.getElementById('tax');
const arrayProductOrder = sessionStorage.getItem('myArray');
if(arrayProductOrder){
    const myArray = JSON.parse(arrayProductOrder);
    console.log(myArray);
    myArray.reverse();
    myArray.forEach(e=>{
        if(e.table == table.value){
            totalAll = e.amount * e.price+totalAll; 
            const totalElement = document.getElementById('total');
            totalElement.textContent = formatNumberWithCommas(totalAll)+"đ"
            const afterTaxElement = document.getElementById('after-tax-price');
            const afterTax = totalAll + totalAll /100*tax.value;
            afterTaxElement.textContent = formatNumberWithCommas(afterTax)+"đ";

            var rowDiv = document.createElement("div");
            rowDiv.classList.add("row", "m-0", "my-2");
            rowDiv.setAttribute("id", "list-item");
        
            // Tạo div con đầu tiên (col-8)
            var col8Div = document.createElement("div");
            col8Div.classList.add("col-8");
        
            var mediaDiv = document.createElement("div");
            mediaDiv.classList.add("media");
        
            var imgTag = document.createElement("img");
            imgTag.classList.add("img-cart", "px-2");
            imgTag.setAttribute("src", baseURL+"/assets/img/" + e.img); // Thay URL hình ảnh vào đây
        
            var mediaBodyDiv = document.createElement("div");
            mediaBodyDiv.classList.add("media-body");
        
            var itemName = document.createElement("b");
            itemName.textContent = e.name;
        
            var itemPrice = document.createElement("b");
            itemPrice.classList.add("text-main");
            const numberPrice = e.amount * parseFloat(e.price.replace(',', ''));
            const formattedPrice = formatNumberWithCommas(numberPrice);
            itemPrice.textContent = formattedPrice+"đ";
        
            mediaBodyDiv.appendChild(itemName);
            mediaBodyDiv.appendChild(document.createElement("br"));
            mediaBodyDiv.appendChild(itemPrice);
        
            mediaDiv.appendChild(imgTag);
            mediaDiv.appendChild(mediaBodyDiv);
        
            col8Div.appendChild(mediaDiv);
        
            // Tạo div con thứ hai (col-4)
            var col4Div = document.createElement("div");
            col4Div.classList.add("col-4", "d-flex", "justify-content-between", "align-items-center");
        
            var exchangeDiv = document.createElement("div");
            exchangeDiv.setAttribute("id", "exchange");
            exchangeDiv.classList.add('product-item-'+e.id_product);
        
            var idProduct = document.createElement("input");
            idProduct.setAttribute("type", "hidden");
            idProduct.setAttribute("id", "id_product");
            idProduct.setAttribute("name", "id_product");
            idProduct.setAttribute("value", e.id_product);

            var idTable = document.createElement("input");
            idTable.setAttribute("type", "hidden");
            idTable.setAttribute("id", "id_table");
            idTable.setAttribute("name", "id_table");
            idTable.setAttribute("value", table.value);
        
            var minusButton = document.createElement("button");
            minusButton.classList.add("amount-detroy");
            minusButton.textContent = "-";
            minusButton.addEventListener('click', detroy);
        
            var amountDiv = document.createElement("div");
            amountDiv.setAttribute("id", "amount");
            amountDiv.classList.add("amount");
            amountDiv.textContent = e.amount;
        
            var plusButton = document.createElement("button");
            plusButton.classList.add("amount-plus");
            plusButton.textContent = "+";
            plusButton.addEventListener('click', plus);
        
            exchangeDiv.appendChild(idProduct);
            exchangeDiv.appendChild(idTable);
            exchangeDiv.appendChild(minusButton);
            exchangeDiv.appendChild(amountDiv);
            exchangeDiv.appendChild(plusButton);
        
            col4Div.appendChild(exchangeDiv);
        
            rowDiv.appendChild(col8Div);
            rowDiv.appendChild(col4Div);
        
            // Thêm rowDiv vào một phần tử cha trên trang web (ví dụ: một div có id là "container")
            var container = document.getElementById("list-product-order"); // Thay "container" bằng id của phần tử cha thực tế trên trang web của bạn
            container.appendChild(rowDiv);
        }
    });
}
openButton();
const addButtonElements = document.querySelectorAll('.form-add button');

addButtonElements.forEach(button => {
    button.addEventListener('click', function (e) {
        // Tìm phần tử cha chung (common ancestor) của nút được bấm và các input
        const form = button.closest('.form-add');
        
        // Lấy các trường input bên trong phần tử cha
        const table = document.getElementById('table');
        const idProductInput = form.querySelector('#id_product');
        const nameInput = form.querySelector('#name');
        const idCategoryInput = form.querySelector('#id_category');
        const imgInput = form.querySelector('#img');
        const priceInput = form.querySelector('#price');

        // Kiểm tra nếu tất cả các trường input tồn tại
        if (idProductInput && nameInput && idCategoryInput && imgInput && priceInput) {
            const arrayProduct = {
                table:table.value,
                id_product: idProductInput.value,
                name: nameInput.value,
                id_category: idCategoryInput.value,
                img: imgInput.value,
                price: priceInput.value,
                amount: 1
            };
            const listItemExchange = document.querySelectorAll('#exchange');
            listItemExchange.forEach(item=>{
                const itemIdProduct = item.querySelector('#id_product');
                if(arrayProduct.id_product==itemIdProduct.value){
                    i=1;
                }
            });
            if(i==1){
                var myArrayString = sessionStorage.getItem('myArray');
                var myArray = myArrayString ? JSON.parse(myArrayString) : [];
                for (var i = 0; i < myArray.length; i++) {
                    if (myArray[i].id_product === arrayProduct.id_product&&table.value==myArray[i].table) {
                        myArray[i].amount ++; // Đặt giá trị amount thành 2
                        const itemBoxExchange = document.querySelector('.product-item-' + arrayProduct.id_product);
                        const amount = itemBoxExchange.querySelector('.amount');
                        const closestListItem = itemBoxExchange.closest('#list-item');
                        const totalItem = closestListItem.querySelector('.text-main');
                        var total = myArray[i].amount*myArray[i].price;
                        totalItem.textContent = formatNumberWithCommas(total)+"đ";
                        amount.textContent = myArray[i].amount;

                        const totalElement = document.getElementById('total');
                        const totalAllUpdate = totalAll+parseFloat(myArray[i].price);
                        totalAll = totalAllUpdate;
                        totalElement.textContent = formatNumberWithCommas(totalAllUpdate)+"đ";
                        const afterTax = totalAll + totalAll /100*tax.value;
                        const afterTaxElement = document.getElementById('after-tax-price');
                        afterTaxElement.textContent = formatNumberWithCommas(afterTax)+"đ";
                        break; // Kết thúc vòng lặp sau khi tìm thấy phần tử cần thay đổi
                    }
                }
                openButton();       

                // Sau khi cập nhật xong, lưu lại mảng vào sessionStorage
                sessionStorage.setItem('myArray', JSON.stringify(myArray));
                                // sessionStorage.clear();
                var myArrayString = sessionStorage.getItem('myArray');
                var myArray = myArrayString ? JSON.parse(myArrayString) : [];
                i=0;
            }else{
                var myArrayString = sessionStorage.getItem('myArray');
                var myArray = myArrayString ? JSON.parse(myArrayString) : [];
                myArray.push(arrayProduct);
                sessionStorage.setItem('myArray', JSON.stringify(myArray));
                var myArrayString = sessionStorage.getItem('myArray');
                var myArray = myArrayString ? JSON.parse(myArrayString) : [];
                // tạo thêm một phần mới
                // 
                // 
                var rowDiv = document.createElement("div");
                rowDiv.classList.add("row", "m-0", "my-2");
                rowDiv.setAttribute("id", "list-item");
            
                // Tạo div con đầu tiên (col-8)
                var col8Div = document.createElement("div");
                col8Div.classList.add("col-8");
            
                var mediaDiv = document.createElement("div");
                mediaDiv.classList.add("media");
            
                var imgTag = document.createElement("img");
                imgTag.classList.add("img-cart", "px-2");
                imgTag.setAttribute("src", baseURL+"/assets/img/" + arrayProduct.img); // Thay URL hình ảnh vào đây
            
                var mediaBodyDiv = document.createElement("div");
                mediaBodyDiv.classList.add("media-body");
            
                var itemName = document.createElement("b");
                itemName.textContent = arrayProduct.name;
            
                var itemPrice = document.createElement("b");
                itemPrice.classList.add("text-main");
                const numberPrice = arrayProduct.amount * parseFloat(arrayProduct.price.replace(',', ''));
                const formattedPrice = formatNumberWithCommas(numberPrice);
                itemPrice.textContent = formattedPrice+"đ";
            
                mediaBodyDiv.appendChild(itemName);
                mediaBodyDiv.appendChild(document.createElement("br"));
                mediaBodyDiv.appendChild(itemPrice);
            
                mediaDiv.appendChild(imgTag);
                mediaDiv.appendChild(mediaBodyDiv);
            
                col8Div.appendChild(mediaDiv);
            
                // Tạo div con thứ hai (col-4)
                var col4Div = document.createElement("div");
                col4Div.classList.add("col-4", "d-flex", "justify-content-between", "align-items-center");
            
                var exchangeDiv = document.createElement("div");
                exchangeDiv.setAttribute("id", "exchange");
                exchangeDiv.classList.add('product-item-'+arrayProduct.id_product);
            
                var idProduct = document.createElement("input");
                idProduct.setAttribute("type", "hidden");
                idProduct.setAttribute("id", "id_product");
                idProduct.setAttribute("name", "id_product");
                idProduct.setAttribute("value", arrayProduct.id_product);

                var idTable = document.createElement("input");
                idTable.setAttribute("type", "hidden");
                idTable.setAttribute("id", "id_table");
                idTable.setAttribute("name", "id_table");
                idTable.setAttribute("value", arrayProduct.table);
            
                var minusButton = document.createElement("button");
                minusButton.classList.add("amount-detroy");
                minusButton.textContent = "-";
                minusButton.addEventListener('click', detroy);
            
                var amountDiv = document.createElement("div");
                amountDiv.setAttribute("id", "amount");
                amountDiv.classList.add("amount");
                amountDiv.textContent = arrayProduct.amount;
            
                var plusButton = document.createElement("button");
                plusButton.classList.add("amount-plus");
                plusButton.textContent = "+";
                plusButton.addEventListener('click', plus);
            
                exchangeDiv.appendChild(idProduct);
                exchangeDiv.appendChild(idTable);
                exchangeDiv.appendChild(minusButton);
                exchangeDiv.appendChild(amountDiv);
                exchangeDiv.appendChild(plusButton);
            
                col4Div.appendChild(exchangeDiv);
            
                rowDiv.appendChild(col8Div);
                rowDiv.appendChild(col4Div);
            
                // Thêm rowDiv vào một phần tử cha trên trang web (ví dụ: một div có id là "container")
                var container = document.getElementById("list-product-order");

                // Lấy phần tử con đầu tiên của container (nếu có)
                var firstChild = container.firstChild;

                // Chèn rowDiv trước phần tử con đầu tiên (nếu có)
                container.insertBefore(rowDiv, firstChild);

                const totalElement = document.getElementById('total');
                const totalAllUpdate = totalAll+parseFloat(arrayProduct.price);
                totalAll = totalAllUpdate;
                totalElement.textContent = formatNumberWithCommas(totalAllUpdate)+"đ";
                const afterTax = totalAll + totalAll /100*tax.value;
                const afterTaxElement = document.getElementById('after-tax-price');
                afterTaxElement.textContent = formatNumberWithCommas(afterTax)+"đ";
                // sessionStorage.clear();
                openButton();
            }
            
        }
    });
});
function plus(){
    var plusElement = event.target;
    const div = plusElement.closest('#exchange');
    if(div){
        const id_product = div.querySelector('#id_product');
        const amount = div.querySelector('#amount');
        const array = {
            id_product : id_product.value,
            amount:amount.textContent
        };
        var myArrayString = sessionStorage.getItem('myArray');
        var myArray = myArrayString ? JSON.parse(myArrayString) : [];
        for (var i = 0; i < myArray.length; i++) {
            if (myArray[i].id_product === array.id_product && table.value==myArray[i].table) {
                myArray[i].amount ++; // Đặt giá trị amount thành 2
                const itemBoxExchange = document.querySelector('.product-item-' + array.id_product);
                const amount = itemBoxExchange.querySelector('.amount');
                const closestListItem = itemBoxExchange.closest('#list-item');
                const totalItem = closestListItem.querySelector('.text-main');
                var total = myArray[i].amount*myArray[i].price;
                totalItem.textContent = formatNumberWithCommas(total);
                amount.textContent = myArray[i].amount;

                const totalElement = document.getElementById('total');
                const totalAllUpdate = totalAll+parseFloat(myArray[i].price);
                totalAll = totalAllUpdate;
                totalElement.textContent = formatNumberWithCommas(totalAllUpdate)+"đ";
                const afterTax = totalAll + totalAll /100*tax.value;
                const afterTaxElement = document.getElementById('after-tax-price');
                afterTaxElement.textContent = formatNumberWithCommas(afterTax)+"đ";
                break; // Kết thúc vòng lặp sau khi tìm thấy phần tử cần thay đổi
            }
            openButton();
        }

        // Sau khi cập nhật xong, lưu lại mảng vào sessionStorage
        sessionStorage.setItem('myArray', JSON.stringify(myArray));
                        // sessionStorage.clear();
        var myArrayString = sessionStorage.getItem('myArray');
        var myArray = myArrayString ? JSON.parse(myArrayString) : [];
        i=0;
    }else{
        console.log('không lấy ra được');
    }
    
}
function openButton(){
    const listItem = document.querySelectorAll('#list-item');
    const buttonItem = document.getElementById('add-order');
    
    if (listItem.length > 0) {
        buttonItem.classList.remove("d-none");
        buttonItem.classList.add("btn", "btn-dark", "py-3", "px-6");
    } else {
        buttonItem.classList.add("d-none");
        buttonItem.classList.remove("btn", "btn-dark", "py-3", "px-6");
    }
}
// Phần xóa sản phẩm đang order------------------------------------------------------------------------------------------------------------------------------
function detroy(){
    var plusElement = event.target;
    const div = plusElement.closest('#exchange');
    if(div){
        const id_product = div.querySelector('#id_product');
        const amount = div.querySelector('#amount');
        const array = {
            id_product : id_product.value,
            amount:amount.textContent
        };
        if(array.amount>1){
            var myArrayString = sessionStorage.getItem('myArray');
            var myArray = myArrayString ? JSON.parse(myArrayString) : [];
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].id_product === array.id_product && table.value==myArray[i].table) {
                    myArray[i].amount --; // Đặt giá trị amount thành 2
                    const itemBoxExchange = document.querySelector('.product-item-' + array.id_product);
                    const amount = itemBoxExchange.querySelector('.amount');
                    const closestListItem = itemBoxExchange.closest('#list-item');
                    const totalItem = closestListItem.querySelector('.text-main');
                    var total = myArray[i].amount*myArray[i].price;
                    totalItem.textContent = formatNumberWithCommas(total);
                    amount.textContent = myArray[i].amount;

                    const totalElement = document.getElementById('total');
                    const totalAllUpdate = totalAll-parseFloat(myArray[i].price);
                    totalAll = totalAllUpdate;
                    totalElement.textContent = formatNumberWithCommas(totalAllUpdate)+"đ";
                    const afterTax = totalAll + totalAll /100*tax.value;
                    const afterTaxElement = document.getElementById('after-tax-price');
                    afterTaxElement.textContent = formatNumberWithCommas(afterTax)+"đ";
                    break; // Kết thúc vòng lặp sau khi tìm thấy phần tử cần thay đổi
                }
                
            }
            openButton();
            // Sau khi cập nhật xong, lưu lại mảng vào sessionStorage
            sessionStorage.setItem('myArray', JSON.stringify(myArray));
                            // sessionStorage.clear();
            i=0;    
        }else{
            var myArrayString = sessionStorage.getItem('myArray');
            var myArray = myArrayString ? JSON.parse(myArrayString) : [];
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].id_product === array.id_product && table.value==myArray[i].table) {
                    const totalElement = document.getElementById('total');
                    const totalAllUpdate = totalAll-parseFloat(myArray[i].price);
                    totalAll = totalAllUpdate;
                    totalElement.textContent = formatNumberWithCommas(totalAllUpdate)+"đ";
                    const afterTax = totalAll + totalAll /100*tax.value;
                    const afterTaxElement = document.getElementById('after-tax-price');
                    afterTaxElement.textContent = formatNumberWithCommas(afterTax)+"đ";

                    myArray.splice(i, 1); // Đặt giá trị amount thành 2
                    const itemBoxExchange = document.querySelector('.product-item-' + array.id_product);
                    const amount = itemBoxExchange.querySelector('.amount');
                    const closestListItem = itemBoxExchange.closest('#list-item');
                    closestListItem.remove();
                    break; // Kết thúc vòng lặp sau khi tìm thấy phần tử cần thay đổi
                }
            }
            openButton();
            // Sau khi cập nhật xong, lưu lại mảng vào sessionStorage
            sessionStorage.setItem('myArray', JSON.stringify(myArray));
        };
    }else{
        console.log('không lấy ra được');
    };
    
}

// Phần tạo order mới ----------------------------------------------------------------------------------------------------------------------------------
const buttonAddOrder = document.getElementById('add-order');
buttonAddOrder.addEventListener('click', function (e){
    e.preventDefault();
    var randumNumber = generateRandomNumber();
    var myArrayString = sessionStorage.getItem('myArray');
    var myArray = myArrayString ? JSON.parse(myArrayString) : [];
    const filteredArray = myArray.filter(function(item) {
        return item.table === table.value;
    });
    const array = {
        order : {
            'id_user' :  idUser.value,
            'id_table' : table.value,
            'total' : totalAll + totalAll / 100 * tax.value,
            'status' : 1,
            'random_number': parseFloat(randumNumber)
        },
        product_order : filteredArray,
    };

    const billRandumNumber = document.getElementById('bill-randumNumber');
    billRandumNumber.textContent = 'Đơn hàng #'+ array.order.random_number;

    const bodyShowProductBill = document.getElementById('item-bill-product');
    // Xóa tất cả các phần tử con trước khi thêm phần tử mới
    while (bodyShowProductBill.firstChild) {
        bodyShowProductBill.removeChild(bodyShowProductBill.firstChild);
    }
    var total = 0;
    var ttBill = 0;
    var index = 0;
    filteredArray.forEach(e =>{
        const itemProduct = document.createElement('div');
        itemProduct.classList.add('item-product');

        // Tạo div cho tên sản phẩm
        const itemProductName = document.createElement('div');
        itemProductName.classList.add('item-product-name');

        // Tạo hai thẻ span trong div tên sản phẩm
        const spanNumber = document.createElement('span');
        index ++;
        spanNumber.textContent = index + ": ";
        const spanProductName = document.createElement('span');
        spanProductName.textContent = e.name;

        // Thêm các thẻ span vào div tên sản phẩm
        itemProductName.appendChild(spanNumber);
        itemProductName.appendChild(spanProductName);

        // Tạo hai thẻ span cho số lượng và giá
        const spanQuantity = document.createElement('span');
        spanQuantity.textContent = e.amount;
        const spanPrice = document.createElement('span');
        const priceBill = e.amount * e.price;
        spanPrice.textContent = formatNumberWithCommas(priceBill) + 'đ';

        const totalProduct = document.getElementById('total-product');
        total += priceBill;
        totalProduct.textContent =  formatNumberWithCommas(total) + 'đ';

        const totalBill = document.getElementById('total-bill');
        ttBill = total + total/100*tax.value;
        totalBill.textContent =  formatNumberWithCommas(ttBill) + 'đ';
        // Thêm tất cả các thẻ span vào div "item-product"
        itemProduct.appendChild(itemProductName);
        itemProduct.appendChild(spanQuantity);
        itemProduct.appendChild(spanPrice);
    
        // Sau khi xóa các phần tử con, thêm phần tử mới vào phần tử cha
        bodyShowProductBill.appendChild(itemProduct);
        
    });
    const bodyContent = document.getElementById('body-content');
    bodyContent.style = ' display: none;';
    const bodyBill = document.getElementById('bill');
    bodyBill.classList.remove('item-bill-none');
    bodyBill.classList.add('item-bill');
    const bodyAll = document.getElementById('body');
    window.print();
    bodyContent.style = '';
    bodyBill.classList.remove('item-bill');
    bodyBill.classList.add('item-bill-none');
    
    totalAll = 0;
    window.axios.post('/api/order',array)
                .then(response => {
                    var myArrayString = sessionStorage.getItem('myArray');
                    var myArray = myArrayString ? JSON.parse(myArrayString) : [];
                    var filteredArray = myArray.filter(function(item) {
                        return item.table !== table.value;
                    });
                        // Lưu mảng mới vào sessionStorage
                    sessionStorage.setItem('myArray', JSON.stringify(filteredArray));
                    console.log(response.data); // In ra giá trị trả về từ server
                    var listProductOrder = document.getElementById('list-product-order');
                    while (listProductOrder.firstChild) {
                        listProductOrder.firstChild.remove(); // Xóa từng phần tử con một
                    }
                    const totalElement = document.getElementById('total');
                    const afterTaxElement = document.getElementById('after-tax-price');
                    totalElement.textContent = "";
                    afterTaxElement.textContent = "";
                    openButton();
                })
                .catch(error => {
                    console.error('Error:', error);
                });
})

// Pphần tạo thanh toán--------------------------------------------------------------------------------------------------------------------------
const buttonAddInvoices = document.getElementById('add-invoices');
buttonAddInvoices.addEventListener('click' , function (e) {
    console.log(table);
    const array = {
        id_table :table.value,
        id_user : idUser.value
    };
    window.axios.post('/api/invoices',array)
        .then(response =>{
            console.log(response);
        })
        .catch(error => {
            console.error('Error:', error);
        });
})


// Phần event history --------------------------------------------------------------------------------------------------------------


const historyElement = document.getElementById('event-history');
const bodyHistory = document.getElementById('id-history-order');
historyElement.addEventListener('click' , function(e){
    const array = {
        id_table :table.value,
    };
    window.axios.post('/api/get-one-order',array)
        .then(response=>{
            dataBillHistory = response.data;
            if(response.data.error){
                const noOrder = document.querySelector('.no-order');
                // noOrder.style.display = 'block';
                const container = document.getElementById('show-product-history');
                while (container.firstChild) {
                    container.removeChild(container.firstChild);
                }
            }else{
                const idOrder = document.getElementById('history-#');
                idOrder.textContent = 'Đơn hàng #'+response.data.order.random_number; 
                
                const historyDate = document.getElementById('history-date');
                const datetime = new Date(response.data.order.created_at);
                historyDate.textContent = datetime.getHours() + ':' + datetime.getMinutes();

                const historyUsserOrrder = document.getElementById('history-user-order');
                historyUsserOrrder.textContent = response.data.order.user_order.name;
                

                const historyTable = document.getElementById('history-table');
                historyTable.textContent = response.data.order.table_order.name;
                response.data.product.forEach((e)=>{
                    const itemHistoryProduct = document.createElement('div');
                    itemHistoryProduct.classList.add('item-history-product');

                    const imgHistoryProduct = document.createElement('div');
                    imgHistoryProduct.classList.add('img-history-product');

                    const img = document.createElement('img');
                    img.src = "/assets/img/"+e.or_product.img;
                    img.alt = "";

                    imgHistoryProduct.appendChild(img);

                    const infoHistoryProduct = document.createElement('div');
                    infoHistoryProduct.classList.add('info-history-product');

                    const span = document.createElement('span');
                    span.textContent = e.or_product.name+" x "+e.amount;

                    const p = document.createElement('p');
                    const total = e.amount * e.or_product.price
                    p.textContent = formatNumberWithCommas(total)+'đ';

                    infoHistoryProduct.appendChild(span);
                    infoHistoryProduct.appendChild(p);

                    itemHistoryProduct.appendChild(imgHistoryProduct);
                    itemHistoryProduct.appendChild(infoHistoryProduct);

                    // Đưa phần tử HTML vào một phần tử cha hoặc DOM
                    const container = document.getElementById('show-product-history'); // Thay your-container-id bằng id của phần tử cha bạn muốn chèn vào
                    container.appendChild(itemHistoryProduct);
            })
            }
            
            console.log({response});
        })
        .catch(error => {
            console.error('Error:', error);
        });
    bodyHistory.classList.remove('order-history-none');
    bodyHistory.classList.add('order-history');
});

const buttonHistory = document.getElementById('history-button-invoices')
buttonHistory.addEventListener('click', function(e) {
    console.log(dataBillHistory);
    if(dataBillHistory.order !== undefined){
        const billRandumNumber = document.getElementById('bill-randumNumber');
        billRandumNumber.textContent = 'Đơn hàng #'+ dataBillHistory.order.random_number;

        const bodyShowProductBill = document.getElementById('item-bill-product');
        // Xóa tất cả các phần tử con trước khi thêm phần tử mới
        while (bodyShowProductBill.firstChild) {
            bodyShowProductBill.removeChild(bodyShowProductBill.firstChild);
        }
        var total = 0;
        var ttBill = 0;
        var index = 0;

        dataBillHistory.product.forEach(e =>{
            index ++;
            
            const itemProduct = document.createElement('div');
            itemProduct.classList.add('item-product');

            // Tạo div cho tên sản phẩm
            const itemProductName = document.createElement('div');
            itemProductName.classList.add('item-product-name');

            // Tạo hai thẻ span trong div tên sản phẩm
            const spanNumber = document.createElement('span');
            spanNumber.textContent = index + ': ';
            const spanProductName = document.createElement('span');
            spanProductName.textContent = e.or_product.name;

            // Thêm các thẻ span vào div tên sản phẩm
            itemProductName.appendChild(spanNumber);
            itemProductName.appendChild(spanProductName);

            // Tạo hai thẻ span cho số lượng và giá
            const spanQuantity = document.createElement('span');
            spanQuantity.textContent = e.amount;
            const spanPrice = document.createElement('span');
            const priceBill = e.amount * e.or_product.price;
            spanPrice.textContent = formatNumberWithCommas(priceBill) + 'đ';

            const totalProduct = document.getElementById('total-product');
            total += priceBill;
            totalProduct.textContent =  formatNumberWithCommas(total) + 'đ';

            const totalBill = document.getElementById('total-bill');
            ttBill = total + total/100*tax.value;
            totalBill.textContent =  formatNumberWithCommas(ttBill) + 'đ';
            // Thêm tất cả các thẻ span vào div "item-product"
            itemProduct.appendChild(itemProductName);
            itemProduct.appendChild(spanQuantity);
            itemProduct.appendChild(spanPrice);
        
            // Sau khi xóa các phần tử con, thêm phần tử mới vào phần tử cha
            bodyShowProductBill.appendChild(itemProduct);
        
    });

   
    const bodyContent = document.getElementById('body-content');
    bodyContent.style = ' display: none;';
    const bodyBill = document.getElementById('bill');
    bodyBill.classList.remove('item-bill-none');
    bodyBill.classList.add('item-bill');
    const bodyAll = document.getElementById('body');
    window.print();
    bodyContent.style = '';
    bodyBill.classList.remove('item-bill');
    bodyBill.classList.add('item-bill-none');
    }
});

const historyOutElement = document.getElementById('id-history-order-out');
historyOutElement.addEventListener('click', function(e){
    bodyHistory.classList.remove('order-history');
    bodyHistory.classList.add('order-history-none');
})
function formatNumberWithCommas(number) {
    return new Intl.NumberFormat().format(number);
}
function generateRandomNumber() {
    let randomStr = '';
    for (let i = 0; i < 8; i++) {
        randomStr += Math.floor(Math.random() * 10); // Tạo số ngẫu nhiên từ 0 đến 9 và nối vào chuỗi
    }
    return randomStr;
}





