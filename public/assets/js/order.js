const buttonElement =document.querySelectorAll('#button');
buttonElement.forEach(button => {
    button.addEventListener('click',function(e){
        e.preventDefault();
        const form = button.closest('form');
        const myArray = {
            id_table : document.getElementById('table').value,
            id_product: form.querySelector('input[name="id_product"]').value,
            amount: form.querySelector('input[name="amount"]').value,
        };
        window.axios.post('/api/product-table', myArray)
            .then(response => {
                console.log(response.data); // In ra giá trị trả về từ server
            })
            .catch(error => {
                console.error('Error:', error);
            });

        console.log(myArray)
    });
});
const idtable = document.getElementById('table');
var text = 'productsTable.'+idtable.textContent;
console.log(text)
const productsElement = document.getElementById('products');
window.axios.get(' http://127.0.0.1:8000/api/product-table')
    .then((response) =>{
        const products =response.data;
        products.forEach((product,index) =>{
            if(product.id_table == idtable.value){
                var itemProduct = document.createElement('div');

                itemProduct.className = 'item-product';
                itemProduct.setAttribute('id', product.id)

                var nameSpan = document.createElement('span');
                nameSpan.textContent = product.product.name;

                var pricePara = document.createElement('p');
                pricePara.textContent = product.product.price;

                var destroyButton = document.createElement('button');
                destroyButton.id = 'button';
                destroyButton.name = 'destroy';
                destroyButton.textContent = '-';
                destroyButton.addEventListener('click', plus);

                var deleteButton = document.createElement('button');
                deleteButton.id = 'detete';
                deleteButton.name = 'delete';
                deleteButton.textContent = 'delete';
                deleteButton.addEventListener('click', deleted);

                var amountInput = document.createElement('input');
                amountInput.id = 'amount';
                amountInput.type = 'text';
                amountInput.name = 'amount';
                amountInput.value = product.amount;

                var idProductInput = document.createElement('input');
                idProductInput.id = 'id_product';
                idProductInput.type = 'hidden';
                idProductInput.name = 'id_product';
                idProductInput.value = product.id_product;

                var idTableInput = document.createElement('input');
                idTableInput.id = 'id_table';
                idTableInput.type = 'hidden';
                idTableInput.name = 'id_table';
                idTableInput.value = product.id_table;

                var idInput = document.createElement('input');
                idInput.id = 'id';
                idInput.type = 'hidden';
                idInput.name = 'id';
                idInput.value = product.id;

                var amInput = document.createElement('input');
                amInput.id = 'am';
                amInput.type = 'hidden';
                amInput.name = 'am';
                amInput.value = product.amount;

                var plusButton = document.createElement('button');
                plusButton.id = 'button';
                plusButton.name = 'plus';
                plusButton.textContent = '+';
                plusButton.addEventListener('click', plus);

                // Gắn các phần tử con vào phần tử cha
                itemProduct.appendChild(nameSpan);
                itemProduct.appendChild(pricePara);
                itemProduct.appendChild(deleteButton);
                itemProduct.appendChild(destroyButton);
                itemProduct.appendChild(amountInput);
                itemProduct.appendChild(idInput);
                itemProduct.appendChild(amInput);
                itemProduct.appendChild(idProductInput);
                itemProduct.appendChild(idTableInput);
                itemProduct.appendChild(plusButton);


                productsElement.appendChild(itemProduct)
            }
            
        })
})

Echo.channel('product'+idtable.value)
    .listen('ProductTableCreated', (e) =>{
        console.log({e});
        var itemProduct = document.createElement('div');

        itemProduct.className = 'item-product';
        itemProduct.setAttribute('id', e.product.id)

        var nameSpan = document.createElement('span');
        nameSpan.textContent = e.product.product.name;

        var pricePara = document.createElement('p');
        pricePara.textContent = e.product.product.price;

        var destroyButton = document.createElement('button');
        destroyButton.id = 'destroy';
        destroyButton.name = 'destroy';
        destroyButton.textContent = '-';
        destroyButton.addEventListener('click', plus);

        var deleteButton = document.createElement('button');
        deleteButton.id = 'detete';
        deleteButton.name = 'delete';
        deleteButton.textContent = 'delete';
        deleteButton.addEventListener('click', deleted);

        var amountInput = document.createElement('input');
        amountInput.id = 'amount';
        amountInput.type = 'text';
        amountInput.name = 'amount';
        amountInput.value = e.product.amount;

        var idProductInput = document.createElement('input');
        idProductInput.id = 'id_product';
        idProductInput.type = 'hidden';
        idProductInput.name = 'id_product';
        idProductInput.value = e.product.id_product;

        var idTableInput = document.createElement('input');
        idTableInput.id = 'id_table';
        idTableInput.type = 'hidden';
        idTableInput.name = 'id_table';
        idTableInput.value = e.product.id_table;

        var idInput = document.createElement('input');
        idInput.id = 'id';
        idInput.type = 'hidden';
        idInput.name = 'id';
        idInput.value = e.product.id;

        var plusButton = document.createElement('button');
        plusButton.id = 'plus';
        plusButton.name = 'plus';
        plusButton.textContent = '+';
        plusButton.addEventListener('click', plus);

        // Gắn các phần tử con vào phần tử cha
        itemProduct.appendChild(nameSpan);
        itemProduct.appendChild(pricePara);
        itemProduct.appendChild(deleteButton);
        itemProduct.appendChild(destroyButton);
        itemProduct.appendChild(amountInput);
        itemProduct.appendChild(idInput);
        itemProduct.appendChild(idProductInput);
        itemProduct.appendChild(idTableInput);
        itemProduct.appendChild(plusButton);


        productsElement.appendChild(itemProduct)

    })
    .listen('ProductTableUpdated',(e)=>{
        console.log({e});
        const div = document.getElementById(e.product.id)
        console.log(div);
        var amountInput = div.querySelector('#amount');
        amountInput.value = e.product.amount;
    })
    .listen('ProductTableDeleted',(e)=>{
        const element = document.getElementById(e.product.id)
        element.parentNode.removeChild(element)
    })
function plus (){
    var plusElement = event.target;
    
    const div = plusElement.closest('.item-product');

    const id_product = div.querySelector('#id_product').value;
    const id_table = div.querySelector('#id_table').value;
    const amount = div.querySelector('#amount').value;
    const id = div.querySelector('#id').value;

    const myArray = {
        id_product: id_product,
        id_table: id_table,
        amount: amount,
        id:id,
        button:plusElement.name
    };
    console.log(myArray);
    window.axios.post('/api/product-table-updata', myArray)
    .then(response => {
        console.log(response.data); // In ra giá trị trả về từ server
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
function deleted (){
    var plusElement = event.target;
    
    const div = plusElement.closest('.item-product');
    const id = div.querySelector('#id').value;
    const url = `/api/product-table-delete/${id}`;
    window.axios.delete(url,id.value) // Sử dụng axios.delete() để gửi yêu cầu DELETE
                .then(response => {
                    console.log(response.data); // In ra giá trị trả về từ server
                })
                .catch(error => {
                    console.error('Error:', error);
                });
}
var divElement = document.getElementById('products');
var childElements = divElement.children;
if(childElements.length>0){

}else{
    var orderElement = document.querySelector('.button');
    console.log(orderElement);
}
const buttonOrder = document.getElementById('order');
console.log(buttonOrder);
buttonOrder.addEventListener('click', function() {
    const dataIdTable = document.getElementById('table');
    const array = {
        id_table : dataIdTable.value,
    }
    window.axios.post('/api/order',array) // Sử dụng axios.delete() để gửi yêu cầu DELETE
                .then(response => {
                    console.log(response.data); // In ra giá trị trả về từ server
                })
                .catch(error => {
                    console.error('Error:', error);
                });
});

