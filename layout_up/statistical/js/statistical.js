const data_user = {
    labels: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    datasets: [{
        // label: 'My First Dataset',
        data: [0, 200000, 300000, 240000, 250000, 160000, 100000, 200000, 250000, 250600, 300200, 340200, 360200, 370200, 380200, 380200, 260200],
        fill: false,
        borderColor: 'rgb(246, 127, 32)',
        tension: 0.1
    }]
};

new Chart(document.getElementById("chart_user"), {
    type: 'line',
    data: data_user,
    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

// Array
const categories = [
    {
        id: 1,
        name: 'Thức ăn'
    },
    {
        id: 2,
        name: 'Thức uống'
    },
    {
        id: 3,
        name: 'Ăn vặt'
    }
]

const products = [
    {
        id: 1,
        id_category: 1,
        name: 'Trà sữa',
        img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/HLC_New_logo_5.1_Products__TRA_THANH_DAO-09.jpg',
        price: 50000,
        status: 1,
        date: 1
    },
    {
        id: 2,
        id_category: 2,
        name: 'Trà sữa',
        img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/HLC_New_logo_5.1_Products__TRA_THANH_DAO-09.jpg',
        price: 50000,
        status: 1,
        date: 1
    },
    {
        id: 3,
        id_category: 3,
        name: 'Trà sữa',
        img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/HLC_New_logo_5.1_Products__TRA_THANH_DAO-09.jpg',
        price: 50000,
        status: 1,
        date: 1
    }
]

const product_invoices = [
    {
        id: 1,
        id_product: 1,
        id_invoices: 1,
        amount: 1,
        date: 1
    },
    {
        id: 2,
        id_product: 2,
        id_invoices: 2,
        amount: 1,
        date: 1
    },
    {
        id: 3,
        id_product: 3,
        id_invoices: 3,
        amount: 1,
        date: 1
    },
    {
        id: 4,
        id_product: 3,
        id_invoices: 3,
        amount: 1,
        date: 1
    },
]

// Get DOM revenue

const revenueDOM = document.querySelector('.revenue')

// Solve Data

const revenue = product_invoices.reduce((tong, invoice) => {
    const product = products.find(p => p.id === invoice.id_product)
    return tong + product.price * invoice.amount
}, 0)

revenueDOM.innerText = `${revenue.toLocaleString('vi')}đ`

// Chart_product

const getProductAmountByCategory = (id_category) => {
    return product_invoices.reduce((acumulator, currentValue) => {
        const product = products.find(p => p.id === currentValue.id_product)
        if (product.id_category === id_category) {
            return acumulator + currentValue.amount
        }
        return acumulator + 0
    }, 0)
}

const data_product = {
    labels: categories.map(cate => cate.name),
    datasets: [{
        label: 'My First Dataset',
        data: categories.map(cate => getProductAmountByCategory(cate.id)),
        backgroundColor: [
            'rgb(246, 127, 32)',
            'rgb(0, 0, 0)',
            'rgb(221, 221, 221)',
        ],
        cutout: '0%',
        hoverOffset: 4
    }]
};

new Chart(document.getElementById("chart_product"), {
    type: 'doughnut',
    data: data_product,
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