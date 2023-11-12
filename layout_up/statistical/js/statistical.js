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
        name: 'Trà sữa 1',
        img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/HLC_New_logo_5.1_Products__TRA_THANH_DAO-09.jpg',
        price: 50000,
        status: 1,
        date: "Sun Oct 1 2023 20:46:55 GMT+0700 "
    },
    {
        id: 2,
        id_category: 2,
        name: 'Trà sữa 2',
        img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/HLC_New_logo_5.1_Products__TRA_THANH_DAO-09.jpg',
        price: 50000,
        status: 1,
        date: "Sun Oct 23 2023 20:46:55 GMT+0700 "
    },
    {
        id: 3,
        id_category: 3,
        name: 'Trà sữa 3',
        img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/HLC_New_logo_5.1_Products__TRA_THANH_DAO-09.jpg',
        price: 50000,
        status: 1,
        date: "Sun Oct 24 2023 20:46:55 GMT+0700 "
    }
]

const product_invoices = [
    {
        id: 1,
        id_product: 1,
        id_invoices: 1,
        amount: 1,
        date: "Sun Oct 1 2023 20:46:55 GMT+0700 "
    },
    {
        id: 2,
        id_product: 2,
        id_invoices: 2,
        amount: 1,
        date: "Sun Oct 20 2023 20:46:55 GMT+0700 "
    },
    {
        id: 3,
        id_product: 3,
        id_invoices: 3,
        amount: 1,
        date: "Sun Oct 21 2023 20:46:55 GMT+0700 "
    },
    {
        id: 4,
        id_product: 3,
        id_invoices: 4,
        amount: 1,
        date: "Sun Oct 22 2023 20:46:55 GMT+0700 "
    },
    {
        id: 5,
        id_product: 3,
        id_invoices: 4,
        amount: 1,
        date: "Sun Oct 22 2023 20:46:55 GMT+0700 "
    },
]

const special = [
    {
        id: 1,
        id_category: 1,
        name: 'Trà sữa 1',
        img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/HLC_New_logo_5.1_Products__TRA_THANH_DAO-09.jpg',
        price: 50000,
        status: 1,
        date: 1
    },
    {
        id: 2,
        id_category: 2,
        name: 'Trà sữa 2',
        img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/HLC_New_logo_5.1_Products__TRA_THANH_DAO-09.jpg',
        price: 60000,
        status: 1,
        date: 1
    },
    {
        id: 3,
        id_category: 3,
        name: 'Trà sữa 3',
        img: 'https://www.highlandscoffee.com.vn/vnt_upload/product/06_2023/HLC_New_logo_5.1_Products__TRA_THANH_DAO-09.jpg',
        price: 70000,
        status: 1,
        date: 1
    }
]

// Get DOM revenue
const revenueDOM = document.querySelector('.revenue')
const specialDOM = document.querySelector('.special')
const productChart = document.querySelector('#chart_product')
const menuContent = document.querySelector('#menu-content')
const cancel = document.querySelector('#cancel')
const menu = document.querySelector('#menu')

const productChartDefaultdata = {
    labels: [
        'Red',
        'Blue',
        'Yellow'
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
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

const userChartDefaultData = {
    labels: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    datasets: [{
        // label: 'My First Dataset',
        data: [0, 200000, 300000, 240000, 250000, 160000, 100000, 200000, 250000, 250600, 300200, 340200, 360200, 370200, 380200, 380200, 260200],
        fill: false,
        borderColor: 'rgb(246, 127, 32)',
        tension: 0.1
    }]
};
var myUserChart = new Chart(document.getElementById("chart_user"), {
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

// Function
const statisticByDate = () => {

    // Filter product_invoices in today 

    const today = new Date()
    const d = new Date(today)
    d.setDate(today.getDate() - 1)

    const todayInvoice = product_invoices.filter((invoice) => {
        const invoiceDate = new Date(invoice.date);
        return invoiceDate >= d;
    })


    //
    specialDOM.innerHTML = ""
    // Solve Data

    const revenue = todayInvoice.reduce((tong, invoice) => {
        const product = products.find(p => p.id === invoice.id_product)
        return tong + product.price * invoice.amount
    }, 0)

    revenueDOM.innerText = `${revenue.toLocaleString('vi')}đ`
    //Solve Data

    special.forEach(special => {
        const data = `
                <tr class="h-16">
                    <td class="flex text-lg">
                        <img src="${special.img}"
                            class="w-16 mb-2" alt="">
                        <div class="w-[150px]">
                            <span>${special.name}1</span>
                            <br>
                            <span class="text-[#F67F20]">${special.price}</span>
                        </div>
                    </td>
                    <td class="w-full text-end">50</td>
                </tr>
                `
        specialDOM.insertAdjacentHTML('beforeend', data)
    });

    // Chart_product
    // const canvas = document.createElement("canvas");
    // canvas.id = 'productChart'
    // productChart.appendChild(canvas)
    const getProductAmountByCategory = (id_category) => {
        return todayInvoice.reduce((acumulator, currentValue) => {
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
    myProductChart.destroy()
    myProductChart = new Chart(productChart, {
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


    //

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
    myUserChart.destroy()
    myUserChart = new Chart(document.getElementById("chart_user"), {
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

}

const statisticByWeek = () => {

    // Filter product_invoices in 7 days

    const today = new Date()
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    const sevenDaysInvoice = product_invoices.filter((invoice) => {
        const invoiceDate = new Date(invoice.date);
        return invoiceDate >= sevenDaysAgo;
    })


    specialDOM.innerHTML = ""
    // Solve Data

    const revenue = sevenDaysInvoice.reduce((tong, invoice) => {
        const product = products.find(p => p.id === invoice.id_product)
        return tong + product.price * invoice.amount
    }, 0)
    revenueDOM.innerText = `${revenue.toLocaleString('vi')}vnđ`
    //Solve Data

    special.forEach(special => {
        const data = `
                <tr class="h-16">
                    <td class="flex text-lg">
                        <img src="${special.img}"
                            class="w-16 mb-2" alt="">
                        <div class="w-[150px]">
                            <span>${special.name}2</span>
                            <br>
                            <span class="text-[#F67F20]">${special.price}</span>
                        </div>
                    </td>
                    <td class="w-full text-end">50</td>
                </tr>
                `
        specialDOM.insertAdjacentHTML('beforeend', data)
    });

    // Chart_product

    const getProductAmountByCategory = (id_category) => {
        return sevenDaysInvoice.reduce((acumulator, currentValue) => {
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
    myProductChart.destroy()
    myProductChart = new Chart(productChart, {
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
    //

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
    myUserChart.destroy()
    myUserChart = new Chart(document.getElementById("chart_user"), {
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

}

const statisticByMonth = () => {

    // Filter product_invoices in 30 days

    const today = new Date()
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const thirtyDaysInvoice = product_invoices.filter((invoice) => {
        const invoiceDate = new Date(invoice.date);
        return invoiceDate >= thirtyDaysAgo;
    })


    specialDOM.innerHTML = ""
    // Solve Data

    const revenue = thirtyDaysInvoice.reduce((tong, invoice) => {
        const product = products.find(p => p.id === invoice.id_product)
        return tong + product.price * invoice.amount
    }, 0)
    revenueDOM.innerText = `${revenue.toLocaleString('vi')}vnđđ`
    //Solve Data

    special.forEach(special => {
        const data = `
                <tr class="h-16">
                    <td class="flex text-lg">
                        <img src="${special.img}"
                            class="w-16 mb-2" alt="">
                        <div class="w-[150px]">
                            <span>${special.name}3</span>
                            <br>
                            <span class="text-[#F67F20]">${special.price}</span>
                        </div>
                    </td>
                    <td class="w-full text-end">50</td>
                </tr>
                `
        specialDOM.insertAdjacentHTML('beforeend', data)
    });

    // Chart_product

    const getProductAmountByCategory = (id_category) => {
        return thirtyDaysInvoice.reduce((acumulator, currentValue) => {
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

    myProductChart.destroy()
    myProductChart = new Chart(productChart, {
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
    //

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
    myUserChart.destroy()
    myUserChart = new Chart(document.getElementById("chart_user"), {
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

}

const statisticByYear = () => {

    // Filter product_invoices in 365 day 

    const today = new Date()
    const oneYearAgo = new Date(today);
    oneYearAgo.setDate(today.getDate() - 365);

    const oneYearInvoice = product_invoices.filter((invoice) => {
        const invoiceDate = new Date(invoice.date);
        return invoiceDate >= oneYearAgo;
    })


    specialDOM.innerHTML = ""
    // Solve Data

    const revenue = oneYearInvoice.reduce((tong, invoice) => {
        const product = products.find(p => p.id === invoice.id_product)
        return tong + product.price * invoice.amount
    }, 0)
    revenueDOM.innerText = `${revenue.toLocaleString('vi')}vnđđđ`
    //Solve Data

    special.forEach(special => {
        const data = `
                <tr class="h-16">
                    <td class="flex text-lg">
                        <img src="${special.img}"
                            class="w-16 mb-2" alt="">
                        <div class="w-[150px]">
                            <span>${special.name}4</span>
                            <br>
                            <span class="text-[#F67F20]">${special.price}</span>
                        </div>
                    </td>
                    <td class="w-full text-end">50</td>
                </tr>
                `
        specialDOM.insertAdjacentHTML('beforeend', data)
    });

    // Chart_product

    const getProductAmountByCategory = (id_category) => {
        return oneYearInvoice.reduce((acumulator, currentValue) => {
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

    myProductChart.destroy()
    myProductChart = new Chart(productChart, {
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
    //

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
    myUserChart.destroy()
    myUserChart = new Chart(document.getElementById("chart_user"), {
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

}

function toggleMenu(arg) {
    if (arg == 'open') {
        menuContent.classList.remove('hidden')
        cancel.classList.remove('hidden')
        menu.classList.add('hidden')
    }
    else{
        menuContent.classList.add('hidden')
        cancel.classList.add('hidden')
        menu.classList.remove('hidden') 
    }
}

menu.addEventListener('click',() => toggleMenu('open'))  
cancel.addEventListener('click',() => toggleMenu('close'))
