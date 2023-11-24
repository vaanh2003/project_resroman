const icon = document.getElementById('icon-home');
icon.style.color = '#F67F20';
var baseURL = window.location.origin;
const bodyElement = document.getElementById('body-order');
window.axios.get('api/order')
    .then((response) =>{
        const order = response.data;
        console.log(order);
        order.reverse();
        order.forEach((order,index)=>{
            // Tạo một phần tử div với lớp 'col-12 p-0 mb-3'
            var colDiv = document.createElement('div');
            colDiv.className = 'col-12 p-0 mb-3';
            colDiv.setAttribute('data-index', order.id);

            var indexInput = document.createElement('input');
            indexInput.id = 'index-'+order.id;
            indexInput.type = 'hidden';
            indexInput.name = 'index';

            // Tạo phần tử card
            var cardDiv = document.createElement('div');
            cardDiv.className = 'card card-qr';

            // Tạo phần tử card-body
            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.className = 'card-body';

            // Tạo phần tử a với các thuộc tính data-toggle và data-target
            var aElement = document.createElement('a');
            aElement.href = baseURL+"/order/"+order.table_order.id;

            // Tạo phần tử row
            var rowDiv = document.createElement('div');
            rowDiv.className = 'row';
            
            // Tạo phần tử col-7
            var col7Div = document.createElement('div');
            col7Div.className = 'col-7';

            // Tạo tiêu đề h6
            var h6Element = document.createElement('h6');
            h6Element.className = 'font-weight-bold order';
            h6Element.textContent = 'Order #'+order.random_number;

            // Tạo các phần tử span và thêm nội dung vào chúng
            var span1 = document.createElement('span');
            span1.className = 'text-muted mr-5';
            span1.textContent = '19:10';

            var span2 = document.createElement('span');
            span2.className = 'text-muted';
            span2.textContent = order.table_order.name;

            // Tạo phần tử col-5 text-right
            var col5Div = document.createElement('div');
            col5Div.className = 'col-5 text-right';

            // Tạo phần tử b
            var bElement = document.createElement('b');
            bElement.className = 'text-main text-small';
            bElement.textContent = 'Đã order';

            // Gắn các phần tử con vào cấu trúc
            col7Div.appendChild(h6Element);
            col7Div.appendChild(span1);
            col7Div.appendChild(span2);

            col5Div.appendChild(bElement);

            rowDiv.appendChild(col7Div);
            rowDiv.appendChild(col5Div);

            aElement.appendChild(rowDiv);

            cardBodyDiv.appendChild(aElement);
            cardDiv.appendChild(cardBodyDiv);

            colDiv.appendChild(cardDiv);
            colDiv.appendChild(indexInput);

            // Gắn phần tử gốc vào vị trí cần thiết trong tài liệu
            var containerElement = document.getElementById('body-invoice-notifications'); // Thay 'yourContainerId' bằng id của vị trí bạn muốn thêm cấu trúc HTML
            containerElement.appendChild(colDiv);
        });
    });
Echo.channel('orders')
    .listen('OrderCreated',(e)=>{
        console.log({e});
        var tableActivity = document.getElementById('table-'+e.order.id_table);
        var backgroundActivity = tableActivity.querySelector('#table-condition');
        backgroundActivity.classList.remove('card');
        backgroundActivity.classList.add('card-activity');
        var colDiv = document.createElement('div');
            colDiv.className = 'col-12 p-0 mb-3';
            colDiv.setAttribute('data-index', e.order.id);

            // Tạo phần tử card
            var cardDiv = document.createElement('div');
            cardDiv.className = 'card card-qr';

            var indexInput = document.createElement('input');
            indexInput.id = 'index-'+e.order.id;
            indexInput.type = 'hidden';
            indexInput.name = 'index';

            // Tạo phần tử card-body
            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.className = 'card-body';

            // Tạo phần tử a với các thuộc tính data-toggle và data-target
            var aElement = document.createElement('a');
            aElement.href = '#';

            // Tạo phần tử row
            var rowDiv = document.createElement('div');
            rowDiv.className = 'row';

            // Tạo phần tử col-7
            var col7Div = document.createElement('div');
            col7Div.className = 'col-7';

            // Tạo tiêu đề h6
            var h6Element = document.createElement('h6');
            h6Element.className = 'font-weight-bold order';
            h6Element.textContent = 'Order #'+e.order.random_number;

            // Tạo các phần tử span và thêm nội dung vào chúng
            var span1 = document.createElement('span');
            span1.className = 'text-muted mr-5';
            span1.textContent = '19:10';

            var span2 = document.createElement('span');
            span2.className = 'text-muted';
            span2.textContent = e.order.table_order.name;

            // Tạo phần tử col-5 text-right
            var col5Div = document.createElement('div');
            col5Div.className = 'col-5 text-right';

            // Tạo phần tử b
            var bElement = document.createElement('b');
            bElement.className = 'text-main text-small';
            bElement.textContent = 'Đã order';

            // Gắn các phần tử con vào cấu trúc
            col7Div.appendChild(h6Element);
            col7Div.appendChild(span1);
            col7Div.appendChild(span2);

            col5Div.appendChild(bElement);

            rowDiv.appendChild(col7Div);
            rowDiv.appendChild(col5Div);

            aElement.appendChild(rowDiv);

            cardBodyDiv.appendChild(aElement);
            cardDiv.appendChild(cardBodyDiv);

            colDiv.appendChild(cardDiv);
            colDiv.appendChild(indexInput);

            // Gắn phần tử gốc vào vị trí cần thiết trong tài liệu
            var containerElement = document.getElementById('body-invoice-notifications'); // Thay 'yourContainerId' bằng id của vị trí bạn muốn thêm cấu trúc HTML
            var firstChild = containerElement.firstChild;
            containerElement.insertBefore(colDiv, firstChild);
    });
Echo.channel('Invoices')
    .listen('InvoicesCreated',(e)=>{
        const index = document.getElementById('index-'+e.invoices.id_order);
        const tableElement = document.getElementById('table-'+e.invoices.id_table);
        var closestDiv = index.closest('div');
        closestDiv.remove();
        const bodyTable = tableElement.querySelector('#table-condition');
        bodyTable.classList.remove('card-activity');
        bodyTable.classList.add('card');
    });

Echo.channel('order-change')
    .listen('OrderUpdated',(e)=>{
      console.log({e});
      var tableActivity = document.getElementById('table-'+e.order.id_table);
      var backgroundActivity = tableActivity.querySelector('#table-condition');
      backgroundActivity.classList.remove('card');
      backgroundActivity.classList.add('card-activity');

      var tableDow = document.getElementById('table-'+e.originalData.id_table);
      var backgroundDow = tableDow.querySelector('#table-condition');
      backgroundDow.classList.remove('card-activity');
      backgroundDow.classList.add('card');
    });