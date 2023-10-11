@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Dashboard') }}</div>

                <div class="card-body">
                    <form id="update-form">
                        <input type="hidden" id="table" value="1" name="">
                        <input id="id" type="hidden" name="id_category" value="1">
                        <input id="name" type="hidden" name="name" value="đan bị khùng">
                        <input id="img" type="hidden" name="img" value="okok">
                        <input id="price" type="hidden" name="price" value="1">
                        <input id="status" type="hidden" name="status" value="1">
                        <button id="button" type="submit">Update</button>
                    </form>
                    <form id="update-form">
                        @csrf
                        <input id="iddelete" type="hidden" name="" value="35">
                        <button id="buttondelete" type="submit">Delete</button>
                    </form>
                    <ul id="products">
                      <li>
                        for
                      </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
@push('scripts')
    <script type="module">
        const idtable = document.getElementById('table');
        const productsElement = document.getElementById('products');
        window.axios.get('api/product')
            .then((response) =>{
                const products =response.data;
                products.forEach((product,index) =>{
                    if(product.id_category == idtable.value){
                        const element =document.createElement('li');
                        element.setAttribute('id', product.id)
                        element.innerText = product.id_category

                        productsElement.appendChild(element)
                    }
                    
                })
            })
    </script>  
    <script type="module">
        const productsElement = document.getElementById('products');
        const idtable = document.getElementById('table');
        Echo.channel('products.'+idtable.value)
            .listen('ProductCreated', (e) =>{
                const element =document.createElement('li');
                element.setAttribute('id', e.product.id)
                element.innerText = product.id_category

                productsElement.appendChild(element)
            })
            .listen('ProductUpdated', (e) =>{
                const element = document.getElementById(e.product.id)
                element.innerText = product.id_category
            })
            .listen('ProductDeleted', (e) =>{
                const element = document.getElementById(e.product.id)
                element     .parentNode.removeChild(element)
            })

            const myArray = {
                id_category: document.getElementById('id').value,
                name: document.getElementById('name').value,
                img: document.getElementById('img').value,
                price: document.getElementById('price').value,
                status: document.getElementById('status').value
            };

            const buttonElement = document.getElementById('button')
            buttonElement.addEventListener('click', (e) => {
                e.preventDefault();
                window.axios.post('/api/product', myArray)
                    .then(response => {
                        console.log(response.data); // In ra giá trị trả về từ server
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            })
    </script>  
  <script type="module">
        const buttondeleteElement = document.getElementById('buttondelete');
        const element = document.getElementById('iddelete');
        const myArray = {
            id: element.value
        };
        const url = `/api/delete/${element.value}`; // Đổi URL để sử dụng route có {id}
        console.log(url);

        buttondeleteElement.addEventListener('click', (e) => {
            e.preventDefault();
            window.axios.delete(url,element.value) // Sử dụng axios.delete() để gửi yêu cầu DELETE
                .then(response => {
                    console.log(response.data); // In ra giá trị trả về từ server
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        })
</script>
@endpush