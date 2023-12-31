const icon = document.getElementById('icon-statistics');
icon.style.color = '#F67F20';
let now = new Date();
let vietnamTime = now.toLocaleString("en-US", {timeZone: "Asia/Ho_Chi_Minh"});
console.log(vietnamTime);

// Thống kê-------------------------------------------------------------------------------------------
// Array


// Get DOM revenue
const revenueDOM = document.querySelector('.revenue')
const specialDOM = document.querySelector('.special')
const productChart = document.querySelector('#chart_product')
const invoicesChart = document.querySelector('#chart_user')


window.axios.get('/api/statistics-day')
.then(response => {
    // Xử lý dữ liệu khi request thành công
    console.log('Dữ liệu nhận được:', response.data);
    const totalInvoices = document.getElementById('total-invoices');
    totalInvoices.textContent = formatNumberWithCommas(response.data.invoices)+'đ';
    const productChartDefaultdata = {
        labels: 
            response.data.category.map(cate => cate.category)
        ,
        datasets: [{
            label: 'My First Dataset',
            data: response.data.category.map(cate => cate.total),
            backgroundColor: [
               'rgb(246, 127, 32)',
                    'rgb(0, 0, 0)',
                    'rgb(221, 221, 221)',
                    'rgb(0, 204, 102)'
            ],
            hoverOffset: 4
        }]
    };
    var myProductChart = new Chart(productChart, {
        type: 'doughnut',
        data: productChartDefaultdata,
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'roboto',
                            size: 16,
                            weight: '500'
                        },
                        color: '#000000',
                        usePointStyle: true,
                    },
                    position: 'bottom',
    
                }
            },
            layout: {
                padding: {
                    bottom: 30
                }
            }
        }
    });
    // Tạo ra top sản phẩm
    var i = 0;
    const table = document.querySelector('#top-product');
    // Xóa hết các thẻ con bên trong phần tử có id là 'top-product'
    table.innerHTML = '';
    response.data.product.forEach((e)=>{
        const tr = document.createElement('tr');
        tr.classList.add( 'item-product','h-16');

        const td1 = document.createElement('td');
        td1.classList.add( 'body-show-product-top','flex', 'text-lg');
    
        const divImg = document.createElement('div');
        divImg.classList.add( 'body-img-product-statistics');

        const img = document.createElement('img');
        img.src = '/assets/img/'+e.img;
        img.alt = '';
    
        const div = document.createElement('div');
        div.classList.add('item-content');

        const span1 = document.createElement('span');
        span1.textContent = e.name;
    
        const lineBreak = document.createElement('br');
    
        const span2 = document.createElement('span');
        span2.textContent = formatNumberWithCommas(e.price)+'đ';
        span2.classList.add('text-[#F67F20]');
    
        const td2 = document.createElement('td');
        td2.classList.add('text-end');
        td2.textContent = response.data.productAmount[i].amount;
        i++;
        // Gắn các phần tử con vào phần tử cha
        div.appendChild(span1);
        div.appendChild(lineBreak);
        div.appendChild(span2);
    
        divImg.appendChild(img);
        td1.appendChild(divImg);
        td1.appendChild(div);
    
        tr.appendChild(td1);
        tr.appendChild(td2);
    
        // Thêm hàng mới vào bảng
        const table = document.querySelector('#top-product'); // Chọn bảng của bạn bằng cách thay thế 'table' bằng ID hoặc class tương ứng
        table.appendChild(tr);
    })

    // note Top table

    const tableAmount = document.querySelector('#top-table');
    // Xóa hết các thẻ con bên trong phần tử có id là 'top-product'
    tableAmount.innerHTML = '';
    response.data.invoicesTable.forEach((e)=>{
        const tr = document.createElement('tr');
        tr.classList.add( 'item-table','h-16');

        const td1 = document.createElement('td');
        td1.classList.add( 'body-show-product-top','flex', 'text-lg');
    
        const divImg = document.createElement('div');
        divImg.classList.add( 'body-img-table-statistics');

        const img = document.createElement('img');
        img.src = '/assets/img/table.svg';
        img.alt = '';
    
        const div = document.createElement('div');
        div.classList.add('item-content-table');

        const span1 = document.createElement('span');
        span1.textContent = e.table.name;
    
        const lineBreak = document.createElement('br');
    
        const td2 = document.createElement('td');
        td2.classList.add('text-end');
        td2.textContent = e.amount;

        // Gắn các phần tử con vào phần tử cha
        div.appendChild(span1);
        div.appendChild(lineBreak);
    
        divImg.appendChild(img);
        td1.appendChild(divImg);
        td1.appendChild(div);
    
        tr.appendChild(td1);
        tr.appendChild(td2);
    
        // Thêm hàng mới vào bảng
        const tableAmount = document.querySelector('#top-table'); // Chọn bảng của bạn bằng cách thay thế 'table' bằng ID hoặc class tương ứng
        tableAmount.appendChild(tr);
    })
  })
  .catch(error => {
    // Xử lý lỗi khi request thất bại
    console.error('Đã xảy ra lỗi:', error);
  });
 

// Click Gọi ra thống kê ngày -----------------------------------------------------------------------------------------------------------------------------
const clickDay = document.getElementById('filterDate');
clickDay.addEventListener('click' , function(e){
    window.axios.get('/api/statistics-day')
.then(response => {
    if (invoicesChart && Chart.getChart(invoicesChart)) {
        // Nếu có, tiêu huỷ biểu đồ cũ trên canvas
        Chart.getChart(invoicesChart ).destroy();
    }
    // Xử lý dữ liệu khi request thành công
    console.log('Dữ liệu nhận được:', response.data);
    const totalInvoices = document.getElementById('total-invoices');
    totalInvoices.textContent = formatNumberWithCommas(response.data.invoices)+'đ';
    const productChartDefaultdata = {
        labels: 
            response.data.category.map(cate => cate.category)
        ,
        datasets: [{
            label: 'My First Dataset',
            data: response.data.category.map(cate => cate.total),
            backgroundColor: [
               'rgb(246, 127, 32)',
                    'rgb(0, 0, 0)',
                    'rgb(221, 221, 221)',
                    'rgb(0, 204, 102)'
            ],
            hoverOffset: 4
        }]
    };
    if (productChart && Chart.getChart(productChart)) {
        // Nếu có, tiêu huỷ biểu đồ cũ trên canvas
        Chart.getChart(productChart ).destroy();
    }
    var myProductChart = new Chart(productChart, {
        type: 'doughnut',
        data: productChartDefaultdata,
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'roboto',
                            size: 16,
                            weight: '500'
                        },
                        color: '#000000',
                        usePointStyle: true,
                    },
                    position: 'bottom',
    
                }
            },
            layout: {
                padding: {
                    bottom: 30
                }
            }
        }
    });
    // Tạo ra top sản phẩm
  var i = 0;
  const table = document.querySelector('#top-product');
  // Xóa hết các thẻ con bên trong phần tử có id là 'top-product'
  table.innerHTML = '';
  response.data.product.forEach((e)=>{
      const tr = document.createElement('tr');
      tr.classList.add( 'item-product','h-16');

      const td1 = document.createElement('td');
      td1.classList.add( 'body-show-product-top','flex', 'text-lg');
  
      const divImg = document.createElement('div');
      divImg.classList.add( 'body-img-product-statistics');

      const img = document.createElement('img');
      img.src = '/assets/img/'+e.img;
      img.alt = '';
  
      const div = document.createElement('div');
      div.classList.add('item-content');

      const span1 = document.createElement('span');
      span1.textContent = e.name;
  
      const lineBreak = document.createElement('br');
  
      const span2 = document.createElement('span');
      span2.textContent = formatNumberWithCommas(e.price)+'đ';
      span2.classList.add('text-[#F67F20]');
  
      const td2 = document.createElement('td');
      td2.classList.add('text-end');
      td2.textContent = response.data.productAmount[i].amount;
      i++;
      // Gắn các phần tử con vào phần tử cha
      div.appendChild(span1);
      div.appendChild(lineBreak);
      div.appendChild(span2);
  
      divImg.appendChild(img);
      td1.appendChild(divImg);
      td1.appendChild(div);
  
      tr.appendChild(td1);
      tr.appendChild(td2);
  
      // Thêm hàng mới vào bảng
      const table = document.querySelector('#top-product'); // Chọn bảng của bạn bằng cách thay thế 'table' bằng ID hoặc class tương ứng
      table.appendChild(tr);
  })
  const tableAmount = document.querySelector('#top-table');
    // Xóa hết các thẻ con bên trong phần tử có id là 'top-product'
    tableAmount.innerHTML = '';
    response.data.invoicesTable.forEach((e)=>{
        const tr = document.createElement('tr');
        tr.classList.add( 'item-table','h-16');

        const td1 = document.createElement('td');
        td1.classList.add( 'body-show-product-top','flex', 'text-lg');
    
        const divImg = document.createElement('div');
        divImg.classList.add( 'body-img-table-statistics');

        const img = document.createElement('img');
        img.src = '/assets/img/table.svg';
        img.alt = '';
    
        const div = document.createElement('div');
        div.classList.add('item-content-table');

        const span1 = document.createElement('span');
        span1.textContent = e.table.name;
    
        const lineBreak = document.createElement('br');
    
        const td2 = document.createElement('td');
        td2.classList.add('text-end');
        td2.textContent = e.amount;

        // Gắn các phần tử con vào phần tử cha
        div.appendChild(span1);
        div.appendChild(lineBreak);
    
        divImg.appendChild(img);
        td1.appendChild(divImg);
        td1.appendChild(div);
    
        tr.appendChild(td1);
        tr.appendChild(td2);
    
        // Thêm hàng mới vào bảng
        const tableAmount = document.querySelector('#top-table'); // Chọn bảng của bạn bằng cách thay thế 'table' bằng ID hoặc class tương ứng
        tableAmount.appendChild(tr);
    })
  })
  .catch(error => {
    // Xử lý lỗi khi request thất bại
    console.error('Đã xảy ra lỗi:', error);
  });
})

// Click Gọi ra thống kê tuần -----------------------------------------------------------------------------------------------------------------------------
const clickWeek = document.getElementById('clickWeek');
clickWeek.addEventListener('click' , function(e){
    window.axios.get('/api/statistics-week')
    .then(response => {
        // Xử lý dữ liệu khi request thành công
        console.log('Dữ liệu nhận được:', response.data);
        const totalInvoices = document.getElementById('total-invoices');
        totalInvoices.textContent = formatNumberWithCommas(response.data.invoices)+'đ';
        const productChartDefaultdata = {
            labels: 
                response.data.category.map(cate => cate.category)
            ,
            datasets: [{
                label: 'My First Dataset',
                data: response.data.category.map(cate => cate.total),
                backgroundColor: [
                'rgb(246, 127, 32)',
                        'rgb(0, 0, 0)',
                        'rgb(221, 221, 221)',
                        'rgb(0, 204, 102)'
                ],
                hoverOffset: 4
            }]
        };
        if (productChart && Chart.getChart(productChart)) {
            // Nếu có, tiêu huỷ biểu đồ cũ trên canvas
            Chart.getChart(productChart ).destroy();
        }
        var myProductChart = new Chart(productChart, {
            type: 'doughnut',
            data: productChartDefaultdata,
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                family: 'roboto',
                                size: 16,
                                weight: '500'
                            },
                            color: '#000000',
                            usePointStyle: true,
                        },
                        position: 'bottom',
        
                    }
                },
                layout: {
                    padding: {
                        bottom: 30
                    }
                }
            }
        });

    //     // Biểu đề đường

    const userChartDefaultData = {
        labels: response.data.dataInvoices.map(cate =>  cate.day),
        datasets: [{
            // label: 'My First Dataset',
            data: response.data.dataInvoices.map(cate => cate.total),
            fill: false,
            borderColor: 'rgb(246, 127, 32)',
            tension: 0.1
        }]
    };
    if (invoicesChart && Chart.getChart(invoicesChart)) {
        // Nếu có, tiêu huỷ biểu đồ cũ trên canvas
        Chart.getChart(invoicesChart ).destroy();
    }
    var myUserChart = new Chart(invoicesChart, {
        type: 'line',
        data: userChartDefaultData,
        options: { 
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });


    // Tạo ra top sản phẩm
        var i = 0;
        const table = document.querySelector('#top-product');
        // Xóa hết các thẻ con bên trong phần tử có id là 'top-product'
        table.innerHTML = '';
        response.data.product.forEach((e)=>{
            const tr = document.createElement('tr');
            tr.classList.add( 'item-product','h-16');

            const td1 = document.createElement('td');
            td1.classList.add( 'body-show-product-top','flex', 'text-lg');
        
            const divImg = document.createElement('div');
            divImg.classList.add( 'body-img-product-statistics');

            const img = document.createElement('img');
            img.src = '/assets/img/'+e.img;
            img.alt = '';
        
            const div = document.createElement('div');
            div.classList.add('item-content');

            const span1 = document.createElement('span');
            span1.textContent = e.name;
        
            const lineBreak = document.createElement('br');
        
            const span2 = document.createElement('span');
            span2.textContent = formatNumberWithCommas(e.price)+'đ';
            span2.classList.add('text-[#F67F20]');
        
            const td2 = document.createElement('td');
            td2.classList.add('text-end');
            td2.textContent = response.data.productAmount[i].amount;
            i++;
            // Gắn các phần tử con vào phần tử cha
            div.appendChild(span1);
            div.appendChild(lineBreak);
            div.appendChild(span2);
        
            divImg.appendChild(img);
            td1.appendChild(divImg);
            td1.appendChild(div);
        
            tr.appendChild(td1);
            tr.appendChild(td2);
        
            // Thêm hàng mới vào bảng
            const table = document.querySelector('#top-product'); // Chọn bảng của bạn bằng cách thay thế 'table' bằng ID hoặc class tương ứng
            table.appendChild(tr);
        })

        const tableAmount = document.querySelector('#top-table');
    // Xóa hết các thẻ con bên trong phần tử có id là 'top-product'
    tableAmount.innerHTML = '';
    response.data.invoicesTable.forEach((e)=>{
        const tr = document.createElement('tr');
        tr.classList.add( 'item-table','h-16');

        const td1 = document.createElement('td');
        td1.classList.add( 'body-show-product-top','flex', 'text-lg');
    
        const divImg = document.createElement('div');
        divImg.classList.add( 'body-img-table-statistics');

        const img = document.createElement('img');
        img.src = '/assets/img/table.svg';
        img.alt = '';
    
        const div = document.createElement('div');
        div.classList.add('item-content-table');

        const span1 = document.createElement('span');
        span1.textContent = e.table.name;
    
        const lineBreak = document.createElement('br');
    
        const td2 = document.createElement('td');
        td2.classList.add('text-end');
        td2.textContent = e.amount;

        // Gắn các phần tử con vào phần tử cha
        div.appendChild(span1);
        div.appendChild(lineBreak);
    
        divImg.appendChild(img);
        td1.appendChild(divImg);
        td1.appendChild(div);
    
        tr.appendChild(td1);
        tr.appendChild(td2);
    
        // Thêm hàng mới vào bảng
        const tableAmount = document.querySelector('#top-table'); // Chọn bảng của bạn bằng cách thay thế 'table' bằng ID hoặc class tương ứng
        tableAmount.appendChild(tr);
    })


    })
    .catch(error => {
        // Xử lý lỗi khi request thất bại
        console.error('Đã xảy ra lỗi:', error);
    });
}) 


const clickMonth = document.getElementById('filterMonth');
clickMonth.addEventListener('click' , function(e){
    window.axios.get('/api/statistics-month')
    .then(response => {
        console.log(response);
        // Xử lý dữ liệu khi request thành công
        console.log('Dữ liệu nhận được:', response.data);
        const totalInvoices = document.getElementById('total-invoices');
        totalInvoices.textContent = formatNumberWithCommas(response.data.invoices)+'đ';
        const productChartDefaultdata = {
            labels: 
                response.data.category.map(cate => cate.category)
            ,
            datasets: [{
                label: 'My First Dataset',
                data: response.data.category.map(cate => cate.total),
                backgroundColor: [
                'rgb(246, 127, 32)',
                        'rgb(0, 0, 0)',
                        'rgb(221, 221, 221)',
                        'rgb(0, 204, 102)'
                ],
                hoverOffset: 4
            }]
        };
        if (productChart && Chart.getChart(productChart)) {
            // Nếu có, tiêu huỷ biểu đồ cũ trên canvas
            Chart.getChart(productChart ).destroy();
        }
        var myProductChart = new Chart(productChart, {
            type: 'doughnut',
            data: productChartDefaultdata,
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                family: 'roboto',
                                size: 16,
                                weight: '500'
                            },
                            color: '#000000',
                            usePointStyle: true,
                        },
                        position: 'bottom',
        
                    }
                },
                layout: {
                    padding: {
                        bottom: 30
                    }
                }
            }
        });

    //     // Biểu đề đường

    const userChartDefaultData = {
        labels: response.data.dataInvoices.map(cate =>  cate.day),
        datasets: [{
            // label: 'My First Dataset',
            data: response.data.dataInvoices.map(cate => cate.total),
            fill: false,
            borderColor: 'rgb(246, 127, 32)',
            tension: 0.1
        }]
    };
    if (invoicesChart && Chart.getChart(invoicesChart)) {
        // Nếu có, tiêu huỷ biểu đồ cũ trên canvas
        Chart.getChart(invoicesChart ).destroy();
    }
    var myUserChart = new Chart(invoicesChart, {
        type: 'line',
        data: userChartDefaultData,
        options: { 
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });


    // Tạo ra top sản phẩm
        var i = 0;
        const table = document.querySelector('#top-product');
        // Xóa hết các thẻ con bên trong phần tử có id là 'top-product'
        table.innerHTML = '';
        response.data.product.forEach((e)=>{
            const tr = document.createElement('tr');
            tr.classList.add( 'item-product','h-16');

            const td1 = document.createElement('td');
            td1.classList.add( 'body-show-product-top','flex', 'text-lg');
        
            const divImg = document.createElement('div');
            divImg.classList.add( 'body-img-product-statistics');

            const img = document.createElement('img');
            img.src = '/assets/img/'+e.img;
            img.alt = '';
        
            const div = document.createElement('div');
            div.classList.add('item-content');

            const span1 = document.createElement('span');
            span1.textContent = e.name;
        
            const lineBreak = document.createElement('br');
        
            const span2 = document.createElement('span');
            span2.textContent = formatNumberWithCommas(e.price)+'đ';
            span2.classList.add('text-[#F67F20]');
        
            const td2 = document.createElement('td');
            td2.classList.add('text-end');
            td2.textContent = response.data.productAmount[i].amount;
            i++;
            // Gắn các phần tử con vào phần tử cha
            div.appendChild(span1);
            div.appendChild(lineBreak);
            div.appendChild(span2);
        
            divImg.appendChild(img);
            td1.appendChild(divImg);
            td1.appendChild(div);
        
            tr.appendChild(td1);
            tr.appendChild(td2);
        
            // Thêm hàng mới vào bảng
            const table = document.querySelector('#top-product'); // Chọn bảng của bạn bằng cách thay thế 'table' bằng ID hoặc class tương ứng
            table.appendChild(tr);
        })

        const tableAmount = document.querySelector('#top-table');
    // Xóa hết các thẻ con bên trong phần tử có id là 'top-product'
    tableAmount.innerHTML = '';
    response.data.invoicesTable.forEach((e)=>{
        const tr = document.createElement('tr');
        tr.classList.add( 'item-table','h-16');

        const td1 = document.createElement('td');
        td1.classList.add( 'body-show-product-top','flex', 'text-lg');
    
        const divImg = document.createElement('div');
        divImg.classList.add( 'body-img-table-statistics');

        const img = document.createElement('img');
        img.src = '/assets/img/table.svg';
        img.alt = '';
    
        const div = document.createElement('div');
        div.classList.add('item-content-table');

        const span1 = document.createElement('span');
        span1.textContent = e.table.name;
    
        const lineBreak = document.createElement('br');
    
        const td2 = document.createElement('td');
        td2.classList.add('text-end');
        td2.textContent = e.amount;

        // Gắn các phần tử con vào phần tử cha
        div.appendChild(span1);
        div.appendChild(lineBreak);
    
        divImg.appendChild(img);
        td1.appendChild(divImg);
        td1.appendChild(div);
    
        tr.appendChild(td1);
        tr.appendChild(td2);
    
        // Thêm hàng mới vào bảng
        const tableAmount = document.querySelector('#top-table'); // Chọn bảng của bạn bằng cách thay thế 'table' bằng ID hoặc class tương ứng
        tableAmount.appendChild(tr);
    })


    })
    .catch(error => {
        console.error('Error:', error);
    });
})

const clickYear = document.getElementById('filterYear');
clickYear.addEventListener('click', function(e){
   window.axios.get('/api/statistics-year')
   .then(response => {
        // Xử lý dữ liệu khi request thành công
        console.log('Dữ liệu nhận được:', response.data);
        const totalInvoices = document.getElementById('total-invoices');
        totalInvoices.textContent = formatNumberWithCommas(response.data.invoices)+'đ';
        const productChartDefaultdata = {
            labels: 
                response.data.category.map(cate => cate.category)
            ,
            datasets: [{
                label: 'My First Dataset',
                data: response.data.category.map(cate => cate.total),
                backgroundColor: [
                'rgb(246, 127, 32)',
                        'rgb(0, 0, 0)',
                        'rgb(221, 221, 221)',
                        'rgb(0, 204, 102)'
                ],
                hoverOffset: 4
            }]
        };
        if (productChart && Chart.getChart(productChart)) {
            // Nếu có, tiêu huỷ biểu đồ cũ trên canvas
            Chart.getChart(productChart ).destroy();
        }
        var myProductChart = new Chart(productChart, {
            type: 'doughnut',
            data: productChartDefaultdata,
            options: {
                plugins: {
                    legend: {
                        labels: {
                            font: {
                                family: 'roboto',
                                size: 16,
                                weight: '500'
                            },
                            color: '#000000',
                            usePointStyle: true,
                        },
                        position: 'bottom',
        
                    }
                },
                layout: {
                    padding: {
                        bottom: 30
                    }
                }
            }
        });

    //     // Biểu đề đường

    const userChartDefaultData = {
        labels: response.data.dataInvoices.map(cate =>  cate.month),
        datasets: [{
            // label: 'My First Dataset',
            data: response.data.dataInvoices.map(cate => cate.total),
            fill: false,
            borderColor: 'rgb(246, 127, 32)',
            tension: 0.1
        }]
    };
    if (invoicesChart && Chart.getChart(invoicesChart)) {
        // Nếu có, tiêu huỷ biểu đồ cũ trên canvas
        Chart.getChart(invoicesChart ).destroy();
    }
    var myUserChart = new Chart(invoicesChart, {
        type: 'line',
        data: userChartDefaultData,
        options: { 
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });


    // Tạo ra top sản phẩm
        var i = 0;
        const table = document.querySelector('#top-product');
        // Xóa hết các thẻ con bên trong phần tử có id là 'top-product'
        table.innerHTML = '';
        response.data.productAmount.forEach((e)=>{
            const tr = document.createElement('tr');
            tr.classList.add( 'item-product','h-16');

            const td1 = document.createElement('td');
            td1.classList.add( 'body-show-product-top','flex', 'text-lg');
        
            const divImg = document.createElement('div');
            divImg.classList.add( 'body-img-product-statistics');

            const img = document.createElement('img');
            img.src = '/assets/img/'+e.product_product.img;
            img.alt = '';
        
            const div = document.createElement('div');
            div.classList.add('item-content');

            const span1 = document.createElement('span');
            span1.textContent = e.product_product.name;
        
            const lineBreak = document.createElement('br');
        
            const span2 = document.createElement('span');
            span2.textContent = formatNumberWithCommas(e.product_product.price)+'đ';
            span2.classList.add('text-[#F67F20]');
        
            const td2 = document.createElement('td');
            td2.classList.add('text-end');
            td2.textContent = e.totalAmount;
            i++;
            // Gắn các phần tử con vào phần tử cha
            div.appendChild(span1);
            div.appendChild(lineBreak);
            div.appendChild(span2);
        
            divImg.appendChild(img);
            td1.appendChild(divImg);
            td1.appendChild(div);
        
            tr.appendChild(td1);
            tr.appendChild(td2);
        
            // Thêm hàng mới vào bảng
            const table = document.querySelector('#top-product'); // Chọn bảng của bạn bằng cách thay thế 'table' bằng ID hoặc class tương ứng
            table.appendChild(tr);
        })

        const tableAmount = document.querySelector('#top-table');
    // Xóa hết các thẻ con bên trong phần tử có id là 'top-product'
    tableAmount.innerHTML = '';
    response.data.invoicesTable.forEach((e)=>{
        const tr = document.createElement('tr');
        tr.classList.add( 'item-table','h-16');

        const td1 = document.createElement('td');
        td1.classList.add( 'body-show-product-top','flex', 'text-lg');
    
        const divImg = document.createElement('div');
        divImg.classList.add( 'body-img-table-statistics');

        const img = document.createElement('img');
        img.src = '/assets/img/table.svg';
        img.alt = '';
    
        const div = document.createElement('div');
        div.classList.add('item-content-table');

        const span1 = document.createElement('span');
        span1.textContent = e.table.name;
    
        const lineBreak = document.createElement('br');
    
        const td2 = document.createElement('td');
        td2.classList.add('text-end');
        td2.textContent = e.amount;

        // Gắn các phần tử con vào phần tử cha
        div.appendChild(span1);
        div.appendChild(lineBreak);
    
        divImg.appendChild(img);
        td1.appendChild(divImg);
        td1.appendChild(div);
    
        tr.appendChild(td1);
        tr.appendChild(td2);
    
        // Thêm hàng mới vào bảng
        const tableAmount = document.querySelector('#top-table'); // Chọn bảng của bạn bằng cách thay thế 'table' bằng ID hoặc class tương ứng
        tableAmount.appendChild(tr);
    })


    })
   .catch(error => {
    console.log.error('Error:', error);
   })
})
const buttonRangeDate = document.getElementById('button-date-range');
const bodyRangeDate = document.getElementById('date-range');
buttonRangeDate.addEventListener('click', function(){
   
    if(bodyRangeDate.classList.value == 'date-range-none'){
        bodyRangeDate.classList.remove('date-range-none');
        bodyRangeDate.classList.add('date-range');
    }else{
        bodyRangeDate.classList.remove('date-range');
        bodyRangeDate.classList.add('date-range-none');
    }
})
const buttonSubmit = document.getElementById('button-submit-date-range');
buttonSubmit.addEventListener('click', function(){
    var parentDiv = buttonSubmit.closest('#date-range');
    const dateStart = parentDiv.querySelector('#start-date');
    const dateEnd = parentDiv.querySelector('#end-date');
    if(dateStart.value !== "" && dateEnd.value !== ""){
       if (dateStart.value > dateEnd.value) {
            alert('Ngày bắt đầu không được lớn hơn ngày kết thúc');
        }else{
            const  array = {
                dateStart : dateStart.value,
                dateEnd : dateEnd.value
            }
            window.axios.post('/api/push-date',array)
            .then(response => {
                console.log(response);
                // Xử lý dữ liệu khi request thành công
                console.log('Dữ liệu nhận được:', response.data);
                const totalInvoices = document.getElementById('total-invoices');
                totalInvoices.textContent = formatNumberWithCommas(response.data.invoices)+'đ';
                const productChartDefaultdata = {
                    labels: 
                        response.data.category.map(cate => cate.category)
                    ,
                    datasets: [{
                        label: 'My First Dataset',
                        data: response.data.category.map(cate => cate.total),
                        backgroundColor: [
                        'rgb(246, 127, 32)',
                                'rgb(0, 0, 0)',
                                'rgb(221, 221, 221)',
                                'rgb(0, 204, 102)'
                        ],
                        hoverOffset: 4
                    }]
                };
                if (productChart && Chart.getChart(productChart)) {
                    // Nếu có, tiêu huỷ biểu đồ cũ trên canvas
                    Chart.getChart(productChart ).destroy();
                }
                var myProductChart = new Chart(productChart, {
                    type: 'doughnut',
                    data: productChartDefaultdata,
                    options: {
                        plugins: {
                            legend: {
                                labels: {
                                    font: {
                                        family: 'roboto',
                                        size: 16,
                                        weight: '500'
                                    },
                                    color: '#000000',
                                    usePointStyle: true,
                                },
                                position: 'bottom',
                
                            }
                        },
                        layout: {
                            padding: {
                                bottom: 30
                            }
                        }
                    }
                });

            //     // Biểu đề đường

            const userChartDefaultData = {
                labels: response.data.dataInvoices.map(cate =>  cate.day),
                datasets: [{
                    // label: 'My First Dataset',
                    data: response.data.dataInvoices.map(cate => cate.total),
                    fill: false,
                    borderColor: 'rgb(246, 127, 32)',
                    tension: 0.1
                }]
            };
            if (invoicesChart && Chart.getChart(invoicesChart)) {
                // Nếu có, tiêu huỷ biểu đồ cũ trên canvas
                Chart.getChart(invoicesChart ).destroy();
            }
            var myUserChart = new Chart(invoicesChart, {
                type: 'line',
                data: userChartDefaultData,
                options: { 
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });


            // Tạo ra top sản phẩm
                var i = 0;
                const table = document.querySelector('#top-product');
                // Xóa hết các thẻ con bên trong phần tử có id là 'top-product'
                table.innerHTML = '';
                response.data.product.forEach((e)=>{
                    const tr = document.createElement('tr');
                    tr.classList.add( 'item-product','h-16');

                    const td1 = document.createElement('td');
                    td1.classList.add( 'body-show-product-top','flex', 'text-lg');
                
                    const divImg = document.createElement('div');
                    divImg.classList.add( 'body-img-product-statistics');

                    const img = document.createElement('img');
                    img.src = '/assets/img/'+e.img;
                    img.alt = '';
                
                    const div = document.createElement('div');
                    div.classList.add('item-content');

                    const span1 = document.createElement('span');
                    span1.textContent = e.name;
                
                    const lineBreak = document.createElement('br');
                
                    const span2 = document.createElement('span');
                    span2.textContent = formatNumberWithCommas(e.price)+'đ';
                    span2.classList.add('text-[#F67F20]');
                
                    const td2 = document.createElement('td');
                    td2.classList.add('text-end');
                    td2.textContent = response.data.productAmount[i].amount;
                    i++;
                    // Gắn các phần tử con vào phần tử cha
                    div.appendChild(span1);
                    div.appendChild(lineBreak);
                    div.appendChild(span2);
                
                    divImg.appendChild(img);
                    td1.appendChild(divImg);
                    td1.appendChild(div);
                
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                
                    // Thêm hàng mới vào bảng
                    const table = document.querySelector('#top-product'); // Chọn bảng của bạn bằng cách thay thế 'table' bằng ID hoặc class tương ứng
                    table.appendChild(tr);
                })
                const tableAmount = document.querySelector('#top-table');
                // Xóa hết các thẻ con bên trong phần tử có id là 'top-product'
                tableAmount.innerHTML = '';
                response.data.invoicesTable.forEach((e)=>{
                    const tr = document.createElement('tr');
                    tr.classList.add( 'item-table','h-16');

                    const td1 = document.createElement('td');
                    td1.classList.add( 'body-show-product-top','flex', 'text-lg');
                
                    const divImg = document.createElement('div');
                    divImg.classList.add( 'body-img-table-statistics');

                    const img = document.createElement('img');
                    img.src = '/assets/img/table.svg';
                    img.alt = '';
                
                    const div = document.createElement('div');
                    div.classList.add('item-content-table');

                    const span1 = document.createElement('span');
                    span1.textContent = e.table.name;
                
                    const lineBreak = document.createElement('br');
                
                    const td2 = document.createElement('td');
                    td2.classList.add('text-end');
                    td2.textContent = e.amount;

                    // Gắn các phần tử con vào phần tử cha
                    div.appendChild(span1);
                    div.appendChild(lineBreak);
                
                    divImg.appendChild(img);
                    td1.appendChild(divImg);
                    td1.appendChild(div);
                
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                
                    // Thêm hàng mới vào bảng
                    const tableAmount = document.querySelector('#top-table'); // Chọn bảng của bạn bằng cách thay thế 'table' bằng ID hoặc class tương ứng
                    tableAmount.appendChild(tr);
                })
                bodyRangeDate.classList.remove('date-range');
                bodyRangeDate.classList.add('date-range-none');
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }else{
        alert('Nhập đậy đủ');
    }
    console.log(parentDiv);
})
function formatNumberWithCommas(number) {
    return new Intl.NumberFormat().format(number);
}


