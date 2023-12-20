var baseURL = window.location.origin;
var i = 0;
var totalAll = 0;
var dataBillHistory = [];
checkAmountProduct(0);
const buttonCategory = document.querySelectorAll('#button-category');
buttonCategory.forEach((category) =>{
    category.addEventListener('click', function(){
        const liItem = category.querySelector('#id_category').value;
        console.log(liItem);
        const bodyAllProduct = document.getElementById('body-all-product-cate');
        bodyAllProduct.innerHTML = '';
        const array = {
            id_category: liItem
        }
        window.axios.post('/api/order-mobile',array)
            .then(response => {
                // Tạo phần tử div có class là "list-group"
                const listGroupDiv = document.createElement('div');
                listGroupDiv.classList.add('list-group');

                // Tạo phần tử div có class là "row m-0"
                const rowDiv = document.createElement('div');
                rowDiv.classList.add('body-show-product');

                response.data.forEach(e=>{
                    // Tạo phần tử div có class là "col-6 mb-4"
                    const colDiv = document.createElement('div');
                    colDiv.classList.add('animation-show', 'item-body-show-product');

                    // Tạo phần tử div có class là "card"
                    const cardDiv = document.createElement('div');
                    cardDiv.classList.add('card');

                    // Tạo phần tử div có class là "item-img-product"
                    const itemImgProductDiv = document.createElement('div');
                    itemImgProductDiv.classList.add('item-img-product');

                    // Tạo phần tử img
                    const imgElement = document.createElement('img');
                    imgElement.src = baseURL+"/assets/img/" + e.img; // Thêm class nếu cần

                    // Thêm img vào div "item-img-product"
                    itemImgProductDiv.appendChild(imgElement);

                    // Tạo phần tử div có class là "card-body"
                    const cardBodyDiv = document.createElement('div');
                    cardBodyDiv.classList.add('card-body', 'p-0');

                    // Tạo các phần tử text
                    const itemProductNameDiv = document.createElement('div');
                    itemProductNameDiv.classList.add('item-product-name', 'd-flex', 'justify-content-center');

                    const cardTitle = document.createElement('h6');
                    cardTitle.classList.add('card-title');
                    cardTitle.textContent = e.name;

                    const itemProductPriceDiv = document.createElement('div');
                    itemProductPriceDiv.classList.add('d-flex', 'justify-content-center');
                    const textMain = document.createElement('h6');
                    textMain.classList.add('text-main');
                    textMain.textContent = formatNumberWithCommas(e.price)+ 'đ';

                    // Tạo các phần tử input
                    const inputIds = ['id_product', 'name', 'id_category', 'img', 'price'];
                    const inputValues = ['id_value', 'name_value', 'id_category_value', 'img_value', 'price_value'];

                    const formAddDiv = document.createElement('div');
                    formAddDiv.classList.add('form-add');

                    var idProduct = document.createElement("input");
                    idProduct.setAttribute("type", "hidden");
                    idProduct.setAttribute("id", "id_product");
                    idProduct.setAttribute("name", "id_product");
                    idProduct.setAttribute("value", e.id);
                    formAddDiv.appendChild(idProduct);

                    var inputCategory = document.createElement("input");
                    inputCategory.setAttribute("type", "hidden");
                    inputCategory.setAttribute("id", "id_category");
                    inputCategory.setAttribute("name", "id_category");
                    inputCategory.setAttribute("value", e.id_category);
                    formAddDiv.appendChild(inputCategory);

                    var inputImg = document.createElement("input");
                    inputImg.setAttribute("type", "hidden");
                    inputImg.setAttribute("id", "img");
                    inputImg.setAttribute("name", "img");
                    inputImg.setAttribute("value", e.img);
                    formAddDiv.appendChild(inputImg);
                    
                    var inputPrice = document.createElement("input");
                    inputPrice.setAttribute("type", "hidden");
                    inputPrice.setAttribute("id", "price");
                    inputPrice.setAttribute("name", "price");
                    inputPrice.setAttribute("value", e.price);
                    formAddDiv.appendChild(inputPrice);

                    var inputName = document.createElement("input");
                    inputName.setAttribute("type", "hidden");
                    inputName.setAttribute("id", "name");
                    inputName.setAttribute("name", "name");
                    inputName.setAttribute("value", e.name);
                    formAddDiv.appendChild(inputName);

                    // Tạo button "Thêm ngay"
                    const itemButtonAddDiv = document.createElement('div');
                    itemButtonAddDiv.classList.add('d-flex', 'justify-content-center', 'mt-3', 'Item-button-add');

                    const addButton = document.createElement('button');
                    addButton.classList.add('btn', 'btn-main');
                    addButton.id = 'add-product-mobile';
                    addButton.textContent = '+ Thêm ngay';
                    addButton.addEventListener('click', addNewProduct);

                    itemButtonAddDiv.appendChild(addButton);
                    formAddDiv.appendChild(itemButtonAddDiv);

                    itemProductNameDiv.appendChild(cardTitle);
                    cardBodyDiv.appendChild(itemProductNameDiv);

                    itemProductPriceDiv.appendChild(textMain);
                    cardBodyDiv.appendChild(itemProductPriceDiv);
                    cardBodyDiv.appendChild(formAddDiv);

                    cardDiv.appendChild(itemImgProductDiv);
                    cardDiv.appendChild(cardBodyDiv);

                    colDiv.appendChild(cardDiv);
                    rowDiv.appendChild(colDiv);
                })

                // Thêm các phần tử vào nhau theo cấu trúc HTML
               
                listGroupDiv.appendChild(rowDiv);

                // Đưa toàn bộ HTML vào trong body hoặc một phần tử khác trên trang
                bodyAllProduct.appendChild(listGroupDiv);


                console.log(response);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    })
})

const buttonShowCart = document.getElementById('button-show-cart');
const bodyCart = document.getElementById('body-cart-mobile');
buttonShowCart.addEventListener('click', function(){
    bodyCart.classList.remove('show-cart-mobile-none');
    bodyCart.classList.add('show-cart-mobile');
    console.log(buttonShowCart);
})
const bodyBackCart = document.getElementById('back-cart');
bodyBackCart.addEventListener('click', function(){
    bodyCart.classList.remove('show-cart-mobile');
    bodyCart.classList.add('show-cart-mobile-none');
})


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
            col8Div.classList.add("col-8","p-0");
        
            var mediaDiv = document.createElement("div");
            mediaDiv.classList.add("media");

            var bodyImgDiv = document.createElement("div");
            bodyImgDiv.classList.add("body-img-product-order");
        
            var imgTag = document.createElement("img");
            imgTag.classList.add();
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
        
            bodyImgDiv.appendChild(imgTag)
            mediaDiv.appendChild(bodyImgDiv);
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

function addNewProduct(event){
    checkAmountProduct(0);
    const clickedButton = event.target;
   
    const form = clickedButton.closest('.form-add');
        
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
            col8Div.classList.add("col-8","p-0");
        
            var mediaDiv = document.createElement("div");
            mediaDiv.classList.add("media");

            var bodyImgDiv = document.createElement("div");
            bodyImgDiv.classList.add("body-img-product-order");
        
            var imgTag = document.createElement("img");
            imgTag.classList.add();
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
        
            bodyImgDiv.appendChild(imgTag)
            mediaDiv.appendChild(bodyImgDiv);
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
}

const addButtonElements = document.querySelectorAll('.form-add button');

addButtonElements.forEach(button => {
    button.addEventListener('click', function (e) {
        checkAmountProduct(0);
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
                checkAmountProduct(0);  

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
                col8Div.classList.add("col-8","p-0");
            
                var mediaDiv = document.createElement("div");
                mediaDiv.classList.add("media");

                var bodyImgDiv = document.createElement("div");
                bodyImgDiv.classList.add("body-img-product-order");
            
                var imgTag = document.createElement("img");
                imgTag.classList.add();
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
            
                bodyImgDiv.appendChild(imgTag)
                mediaDiv.appendChild(bodyImgDiv);
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
                checkAmountProduct(0);
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
            checkAmountProduct(1);
            // console.log('Trần VĂn ANh');
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
            'status' : 3,
            'random_number': parseFloat(randumNumber)
        },
        product_order : filteredArray,
    };
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
                    alert('Đặt món thành công');
                })
                .catch(error => {
                    console.error('Error:', error);
                });
})

// Pphần tạo thanh toán--------------------------------------------------------------------------------------------------------------------------



// Phần event history --------------------------------------------------------------------------------------------------------------


function formatNumberWithCommas(number) {
    return new Intl.NumberFormat().format(number);
}
function checkAmountProduct(m){
    var myArrayString = sessionStorage.getItem('myArray');
    var myArray = myArrayString ? JSON.parse(myArrayString) : [];
    var index = 0;
    const table = document.getElementById('table');
    myArray.forEach(e => {
        if(e.table == table.value){
            index +=1;
            console.log(e);
        }
    })
    var amount = index - m;
    const amountCart = document.getElementById('amount-cart');
    amountCart.textContent = amount;
   
}
function generateRandomNumber() {
    let randomStr = '';
    for (let i = 0; i < 8; i++) {
        randomStr += Math.floor(Math.random() * 10); // Tạo số ngẫu nhiên từ 0 đến 9 và nối vào chuỗi
    }
    return randomStr;
}
const clickShowHistory = document.getElementById('button-show-history-order');
clickShowHistory.addEventListener('click', showOrder);
function showOrder(event){
    console.log('văn anh')
    const idTable = document.getElementById('table').value;
    const array = {
        id_table :idTable,
    };
    console.log(array)
    window.axios.post('/api/get-one-order',array)
    .then(response=>{
        const container = document.getElementById('body-show-order');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        const span1 = document.createElement('span');
        span1.textContent = 'Sản phẩm đã gọi';
        span1.classList.add('tital-history-order');
        container.appendChild(span1);
        response.data.product.reverse();
        response.data.product.forEach((e)=>{
            var classHistoryProduct = '';
            if(e.status == 0){
                classHistoryProduct = 'item-history-product';
            }else{
                classHistoryProduct = 'item-history-product-new';
            }
            const itemHistoryProduct = document.createElement('div');
            itemHistoryProduct.classList.add(classHistoryProduct);

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
            const container = document.getElementById('body-show-order'); // Thay your-container-id bằng id của phần tử cha bạn muốn chèn vào
            container.appendChild(itemHistoryProduct);
    })
        console.log(response);
    })
    .catch(error => {
        console.error('Error:', error);
    });


    const bodyHistoryOrder = document.getElementById('history-order');
    bodyHistoryOrder.classList.remove('history-order');
    bodyHistoryOrder.classList.add('history-order-block');
}
const bodyBack = document.getElementById('back-history-order');
bodyBack.addEventListener('click', backHistoryOrder);
function backHistoryOrder(event){
    const bodyHistoryOrder = document.getElementById('history-order');
    bodyHistoryOrder.classList.remove('history-order-block');
    bodyHistoryOrder.classList.add('history-order');
}





