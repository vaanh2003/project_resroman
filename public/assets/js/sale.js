const icon = document.getElementById('icon-sale');
icon.style.color = '#F67F20';
var baseURL = window.location.origin;
const product = document.querySelectorAll('#item-product');
product.forEach(product =>{
    product.addEventListener('click', function(){
        const bodyPickSale = document.querySelector('.item-body-pick-sale');
        if (bodyPickSale && bodyPickSale.children.length > 0) {
            // Xóa hết các phần tử con
            while (bodyPickSale.firstChild) {
                bodyPickSale.removeChild(bodyPickSale.firstChild);
            }
        }
        const productId = product.querySelector('[name="product-id"]').value;
        const productName = product.querySelector('[name="product->name"]').value;
        const productImg = product.querySelector('[name="product-img"]').value;
        const productPrice = product.querySelector('[name="product-price"]').value;

        window.axios.post('/api/sale-one',{id_product:productId})
        .then(response =>{
            if(response.data.check == 1){
                const imgDiv = document.createElement('div');
                imgDiv.classList.add('img-pick-sale');
                const img = document.createElement('img');
                img.setAttribute('src', baseURL+"/assets/img/" + productImg);
                img.setAttribute('alt', '');
                imgDiv.appendChild(img);

                const infoDiv = document.createElement('div');
                infoDiv.classList.add('info-pick-sale');

                const titleDiv = document.createElement('div');
                titleDiv.classList.add('title-id-product');
                const idSpan = document.createElement('span');
                idSpan.textContent = 'ID : '+productId;
                titleDiv.appendChild(idSpan);

                const itemInfoDiv = document.createElement('div');
                itemInfoDiv.classList.add('item-info-pick-sale');

                const defaultItemDiv = document.createElement('div');
                defaultItemDiv.classList.add('item-form-product', 'default-product');
                const productNameSpan = document.createElement('span');
                productNameSpan.textContent = 'Tên sản phẩm :';
                const productNameInput = document.createElement('input');
                productNameInput.setAttribute('type', 'text');
                productNameInput.value = productName;
                const productPriceSpan = document.createElement('span');
                productPriceSpan.textContent = 'Giá sản phẩm :';
                const productPriceInput = document.createElement('input');
                productPriceInput.setAttribute('type', 'text');
                productPriceInput.value = formatNumberWithCommas(productPrice) + 'đ';

                const dateStartSpan = document.createElement('span');
                dateStartSpan.textContent = 'Ngày bắt đầu sale:';
                const dateStartInput = document.createElement('input');
                dateStartInput.setAttribute('id', 'date-start');
                dateStartInput.setAttribute('name', 'date-start');
                dateStartInput.setAttribute('type', 'datetime-local');
                dateStartInput.setAttribute('value', response.data.itemSale.datestart);
                
                defaultItemDiv.appendChild(productNameSpan);
                defaultItemDiv.appendChild(productNameInput);
                defaultItemDiv.appendChild(productPriceSpan);
                defaultItemDiv.appendChild(productPriceInput);
                defaultItemDiv.appendChild(dateStartSpan);
                defaultItemDiv.appendChild(document.createElement('br'));
                defaultItemDiv.appendChild(dateStartInput);

                const saleItemDiv = document.createElement('div');
                saleItemDiv.classList.add('item-form-product', 'sale-product');
                const saleNameSpan = document.createElement('span');
                saleNameSpan.textContent = 'Tên sale :';
                const saleNameInput = document.createElement('input');
                saleNameInput.setAttribute('id', 'name-sale');
                saleNameInput.setAttribute('name', 'name-sale');
                saleNameInput.setAttribute('type', 'text');
                saleNameInput.setAttribute('value', response.data.itemSale.name_sale);

                const salePriceSpan = document.createElement('span');
                salePriceSpan.textContent = 'Giá sale :';
                const salePriceInput = document.createElement('input');
                salePriceInput.setAttribute('id', 'price-sale');
                salePriceInput.setAttribute('name', 'price-sale');
                salePriceInput.setAttribute('type', 'text');
                salePriceInput.setAttribute('value', response.data.itemSale.price_sale);

                const dateEndSpan = document.createElement('span');
                dateEndSpan.textContent = 'Ngày kết thúc sale:';
                const dateEndInput = document.createElement('input');
                dateEndInput.setAttribute('id', 'date-end');
                dateEndInput.setAttribute('name', 'date-start');
                dateEndInput.setAttribute('type', 'datetime-local');
                dateEndInput.setAttribute('value', response.data.itemSale.dateend);

                const idInput = document.createElement('input');
                idInput.setAttribute('id', 'id-product');
                idInput.setAttribute('name', 'id-product');
                idInput.setAttribute('type', 'hidden');
                idInput.setAttribute('value', productId);

                const idSaleInput = document.createElement('input');
                idSaleInput.setAttribute('id', 'id-sale');
                idSaleInput.setAttribute('name', 'id-sale');
                idSaleInput.setAttribute('type', 'hidden');
                idSaleInput.setAttribute('value', response.data.itemSale.id);

                const imgInput = document.createElement('input');
                imgInput.setAttribute('id', 'img');
                imgInput.setAttribute('name', 'img');
                imgInput.setAttribute('type', 'hidden');
                imgInput.setAttribute('value', productImg);

                saleItemDiv.appendChild(saleNameSpan);
                saleItemDiv.appendChild(document.createElement('br'));
                saleItemDiv.appendChild(saleNameInput);
                saleItemDiv.appendChild(document.createElement('br'));
                saleItemDiv.appendChild(salePriceSpan);
                saleItemDiv.appendChild(document.createElement('br'));
                saleItemDiv.appendChild(salePriceInput);
                saleItemDiv.appendChild(dateEndSpan);
                saleItemDiv.appendChild(document.createElement('br'));
                saleItemDiv.appendChild(dateEndInput);

                itemInfoDiv.appendChild(defaultItemDiv);
                itemInfoDiv.appendChild(saleItemDiv);

                const buttonDiv = document.createElement('div');
                buttonDiv.classList.add('button-create-sale');

                const updateButton = document.createElement('button');
                updateButton.setAttribute('id', 'button-sale');
                updateButton.textContent = 'Cập nhật';
                updateButton.addEventListener('click', updateSale);
                buttonDiv.appendChild(updateButton);

                const deleteButton = document.createElement('button');
                deleteButton.setAttribute('id', 'button-sale');
                deleteButton.textContent = 'Xóa';
                deleteButton.addEventListener('click', deleteSale);
                buttonDiv.appendChild(deleteButton);

                infoDiv.appendChild(titleDiv);
                infoDiv.appendChild(itemInfoDiv);
                infoDiv.appendChild(buttonDiv);

                // Thêm các phần tử vào trong body của trang
                bodyPickSale.appendChild(imgDiv);
                bodyPickSale.appendChild(infoDiv);
                bodyPickSale.appendChild(idInput);
                bodyPickSale.appendChild(idSaleInput);
                bodyPickSale.appendChild(imgInput);
                
                saleNameInput.addEventListener('input', function() {
                    const nameSaleValue = saleNameInput.value;
                    if (nameSaleValue.trim() === '') {
                        saleNameInput.style.borderColor = 'red';
                    } else {
                        saleNameInput.style.borderColor = 'rgb(221, 221, 221)';
                        console.log('Tên sale đã được nhập: ' + nameSaleValue);
                        // Thực hiện các hành động khác nếu trường này có giá trị
                    }
                });
                
                salePriceInput.addEventListener('input', function() {
                    const priceSaleValue = salePriceInput.value;
                    // Kiểm tra giá trị nhập vào có phải là số không
                    const isNumeric = /^\d+$/.test(priceSaleValue);
                    if (!isNumeric) {
                        console.log('Giá sale phải là số');
                        salePriceInput.style.borderColor = 'red';
                        // Thực hiện các hành động khác nếu giá trị nhập không phải là số
                    } else {
                        console.log('Giá sale đã được nhập: ' + priceSaleValue);
                        salePriceInput.style.borderColor = 'rgb(221, 221, 221)';
                        // Thực hiện các hành động khác nếu trường này có giá trị là số
                    }
                });
            }else{
                const imgDiv = document.createElement('div');
                imgDiv.classList.add('img-pick-sale');
                const img = document.createElement('img');
                img.setAttribute('src', baseURL+"/assets/img/" + productImg);
                img.setAttribute('alt', '');
                imgDiv.appendChild(img);

                const infoDiv = document.createElement('div');
                infoDiv.classList.add('info-pick-sale');

                const titleDiv = document.createElement('div');
                titleDiv.classList.add('title-id-product');
                const idSpan = document.createElement('span');
                idSpan.textContent = 'ID : '+productId;
                titleDiv.appendChild(idSpan);

                const itemInfoDiv = document.createElement('div');
                itemInfoDiv.classList.add('item-info-pick-sale');

                const defaultItemDiv = document.createElement('div');
                defaultItemDiv.classList.add('item-form-product', 'default-product');
                const productNameSpan = document.createElement('span');
                productNameSpan.textContent = 'Tên sản phẩm :';
                const productNameInput = document.createElement('input');
                productNameInput.setAttribute('type', 'text');
                productNameInput.value = productName;
                const productPriceSpan = document.createElement('span');
                productPriceSpan.textContent = 'Giá sản phẩm :';
                const productPriceInput = document.createElement('input');
                productPriceInput.setAttribute('type', 'text');
                productPriceInput.value = formatNumberWithCommas(productPrice) + 'đ';

                const dateStartSpan = document.createElement('span');
                dateStartSpan.textContent = 'Ngày sale:';
                const dateStartInput = document.createElement('input');
                dateStartInput.setAttribute('id', 'date-start');
                dateStartInput.setAttribute('name', 'date-start');
                dateStartInput.setAttribute('type', 'datetime-local');
                
                defaultItemDiv.appendChild(productNameSpan);
                defaultItemDiv.appendChild(productNameInput);
                defaultItemDiv.appendChild(productPriceSpan);
                defaultItemDiv.appendChild(productPriceInput);
                defaultItemDiv.appendChild(dateStartSpan);
                defaultItemDiv.appendChild(document.createElement('br'));
                defaultItemDiv.appendChild(dateStartInput);

                const saleItemDiv = document.createElement('div');
                saleItemDiv.classList.add('item-form-product', 'sale-product');
                const saleNameSpan = document.createElement('span');
                saleNameSpan.textContent = 'Tên sale :';
                const saleNameInput = document.createElement('input');
                saleNameInput.setAttribute('id', 'name-sale');
                saleNameInput.setAttribute('name', 'name-sale');
                saleNameInput.setAttribute('type', 'text');
                const salePriceSpan = document.createElement('span');
                salePriceSpan.textContent = 'Giá sale :';
                const salePriceInput = document.createElement('input');
                salePriceInput.setAttribute('id', 'price-sale');
                salePriceInput.setAttribute('name', 'price-sale');
                salePriceInput.setAttribute('type', 'text');

                const dateEndSpan = document.createElement('span');
                dateEndSpan.textContent = 'Ngày sale:';
                const dateEndInput = document.createElement('input');
                dateEndInput.setAttribute('id', 'date-end');
                dateEndInput.setAttribute('name', 'date-start');
                dateEndInput.setAttribute('type', 'datetime-local');

                const idInput = document.createElement('input');
                idInput.setAttribute('id', 'id-product');
                idInput.setAttribute('name', 'id-product');
                idInput.setAttribute('type', 'hidden');
                idInput.setAttribute('value', productId);

                

                const imgInput = document.createElement('input');
                imgInput.setAttribute('id', 'img');
                imgInput.setAttribute('name', 'img');
                imgInput.setAttribute('type', 'hidden');
                imgInput.setAttribute('value', productImg);

                saleItemDiv.appendChild(saleNameSpan);
                saleItemDiv.appendChild(document.createElement('br'));
                saleItemDiv.appendChild(saleNameInput);
                saleItemDiv.appendChild(document.createElement('br'));
                saleItemDiv.appendChild(salePriceSpan);
                saleItemDiv.appendChild(document.createElement('br'));
                saleItemDiv.appendChild(salePriceInput);
                saleItemDiv.appendChild(dateEndSpan);
                saleItemDiv.appendChild(document.createElement('br'));
                saleItemDiv.appendChild(dateEndInput);

                itemInfoDiv.appendChild(defaultItemDiv);
                itemInfoDiv.appendChild(saleItemDiv);

                const buttonDiv = document.createElement('div');
                buttonDiv.classList.add('button-create-sale');
                

                const addButton = document.createElement('button');
                addButton.setAttribute('id', 'button-sale');
                addButton.textContent = 'Thêm mới';
                addButton.addEventListener('click', craeteSale);
                buttonDiv.appendChild(addButton);

                infoDiv.appendChild(titleDiv);
                infoDiv.appendChild(itemInfoDiv);
                infoDiv.appendChild(buttonDiv);

                // Thêm các phần tử vào trong body của trang
                bodyPickSale.appendChild(imgDiv);
                bodyPickSale.appendChild(infoDiv);
                bodyPickSale.appendChild(idInput);
                bodyPickSale.appendChild(imgInput);
                
                saleNameInput.addEventListener('input', function() {
                    const nameSaleValue = saleNameInput.value;
                    if (nameSaleValue.trim() === '') {
                        saleNameInput.style.borderColor = 'red';
                    } else {
                        saleNameInput.style.borderColor = 'rgb(221, 221, 221)';
                        console.log('Tên sale đã được nhập: ' + nameSaleValue);
                        // Thực hiện các hành động khác nếu trường này có giá trị
                    }
                });
                
                salePriceInput.addEventListener('input', function() {
                    const priceSaleValue = salePriceInput.value;
                    // Kiểm tra giá trị nhập vào có phải là số không
                    const isNumeric = /^\d+$/.test(priceSaleValue);
                    if (!isNumeric) {
                        console.log('Giá sale phải là số');
                        salePriceInput.style.borderColor = 'red';
                        // Thực hiện các hành động khác nếu giá trị nhập không phải là số
                    } else {
                        console.log('Giá sale đã được nhập: ' + priceSaleValue);
                        salePriceInput.style.borderColor = 'rgb(221, 221, 221)';
                        // Thực hiện các hành động khác nếu trường này có giá trị là số
                    }
                });
            }
        })
        .catch(error =>{
            console.error('Error:', error);
        });
        
    })
})
function craeteSale(){
    const idProduct = document.getElementById('id-product').value;
    const nameSale = document.getElementById('name-sale').value;
    const priceSale = document.getElementById('price-sale').value;
    const dateStart = document.getElementById('date-start').value;
    const dateEnd = document.getElementById('date-end').value
    const img = document.getElementById('img').value
    if (nameSale.trim() === '' || priceSale.trim() === '' || dateStart.trim() === '' || dateEnd.trim() === '' ){
        alert('Nhập đầy đủ thông tin');
    } else {
        const isNumeric = /^\d+$/.test(priceSale);
        if (!isNumeric) {
            alert('Giá sale phải là số');
        }else{
            const array = {
                name_sale: nameSale,
                price_sale: priceSale,
                id_product: idProduct,
                datestart: dateStart,
                dateend: dateEnd,
                img: img
            };
            window.axios.post('/api/sale',array)
            .then(response =>{
                alert('Thêm sale sản phẩm mới thành công');

                const bodyItemSale = document.querySelector('.item-product-'+ response.data.id_product);
                console.log(bodyItemSale);

                const divElement = document.createElement("div");
                divElement.classList.add("icon-sale");

                // Tạo span chứa nội dung là "SALE"
                const spanElement = document.createElement("span");
                spanElement.textContent = "SALE";

                // Thêm span vào div
                divElement.appendChild(spanElement);

                // Thêm div vào body của trang
                bodyItemSale.appendChild(divElement);
                const bodyDivButton = document.querySelector('.button-create-sale');
                bodyDivButton.innerHTML = "";
                const updateButton = document.createElement('button');
                updateButton.setAttribute('id', 'button-sale');
                updateButton.textContent = 'Cập nhật';
                updateButton.addEventListener('click', updateSale);
                bodyDivButton.appendChild(updateButton);

                const deleteButton = document.createElement('button');
                deleteButton.setAttribute('id', 'button-sale');
                deleteButton.textContent = 'Xóa';
                deleteButton.addEventListener('click', deleteSale);
                bodyDivButton.appendChild(deleteButton);

                const idSaleInput = document.createElement('input');
                idSaleInput.setAttribute('id', 'id-sale');
                idSaleInput.setAttribute('name', 'id-sale');
                idSaleInput.setAttribute('type', 'hidden');
                idSaleInput.setAttribute('value', response.data.id);
                bodyDivButton.appendChild(idSaleInput);

            })
            .catch(error =>{
                console.error('Error:' , error);
            });
        }   
    }
}
function updateSale(){
    const idProduct = document.getElementById('id-product').value;
    const nameSale = document.getElementById('name-sale').value;
    const priceSale = document.getElementById('price-sale').value;
    const dateStart = document.getElementById('date-start').value;
    const dateEnd = document.getElementById('date-end').value
    const img = document.getElementById('img').value
    if (nameSale.trim() === '' || priceSale.trim() === '' || dateStart.trim() === '' || dateEnd.trim() === '' ){
        alert('Nhập đầy đủ thông tin');
    } else {
        var id = document.getElementById('id-sale').value;
        const array = {
            id: id,
            name_sale: nameSale,
            price_sale: priceSale,
            id_product: idProduct,
            datestart: dateStart,
            dateend: dateEnd,
            img: img
        };
        window.axios.post('/api/update-sale',array)
        .then(response =>{
            if(response.data !== null){
                if(response.data.check==1){
                    alert('Update thành công');
                }
            }
    
        })
        .catch(error =>{
            console.error('Error:' , error);
        });
    }
   
}
function deleteSale(){
    var id = document.getElementById('id-sale').value;
    const array = {
        id: id
    };
    window.axios.post('/api/sale-delete',array)
    .then(response =>{
        if(response.data !== null){
            const bodyDivButton = document.querySelector('.button-create-sale');
            bodyDivButton.innerHTML = "";
            const createButton = document.createElement('button');
            createButton.setAttribute('id', 'button-sale');
            createButton.textContent = 'Thêm mới';
            createButton.addEventListener('click', craeteSale);
            bodyDivButton.appendChild(createButton);
            const nameSale = document.getElementById('name-sale');
            const priceSale = document.getElementById('price-sale');
            const dateStart = document.getElementById('date-start');
            const dateEnd = document.getElementById('date-end');
            nameSale.value = '';
            priceSale.value = '';
            dateStart.value = '';
            dateEnd.value = '';
            const bodyItemSale = document.querySelector('.item-product-'+ response.data.id_product);
            const itemSale = bodyItemSale.querySelector('.icon-sale');
            itemSale.remove();
        }

    })
    .catch(error =>{
        console.error('Error:' , error);
    });
}
const bodyShowSale = document.getElementById('body-show-product-sale');
// const buttonShowSale = document.getElementById('button-show-sale');
// buttonShowSale.addEventListener('click', function(){
//     bodyShowSale.classList.remove('order-history-none');
//     bodyShowSale.classList.add('order-history');
// });
// const bodyBack = document.getElementById('body-back');
// bodyBack.addEventListener('click', function(){
//     bodyShowSale.classList.remove('order-history');
//     bodyShowSale.classList.add('order-history-none');
// });
function formatNumberWithCommas(number) {
    return new Intl.NumberFormat().format(number);
}
console.log('văn anh');