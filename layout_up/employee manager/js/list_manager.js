const user = [
    {
        id: 1,
        id_shifts: 1,
        name: 'Nguyễn Vũ Lân',
        gmail: 'lan@gamil.com',
        password: '123456',
        img: "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
        sex: "Nam",
        role: "Quản lý",
        wage: 10000000,
        date: "Sun Oct 20 2023 20:46:55 GMT+0700"
    },
    {
        id: 2,
        id_shifts: 2,
        name: 'Nguyễn Vũ Lân',
        gmail: 'lan@gamil.com',
        password: '123456',
        img: "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
        sex: "Nam",
        role: "Quản lý",
        wage: 10000000,
        date: "Sun Oct 20 2023 20:46:55 GMT+0700"
    },
    {
        id: 3,
        id_shifts: 3,
        name: 'Nguyễn Vũ Lân',
        gmail: 'lan@gamil.com',
        password: '123456',
        img: "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
        sex: "Nam",
        role: "Quản lý",
        wage: 10000000,
        date: "Sun Oct 20 2023 20:46:55 GMT+0700"
    },
    {
        id: 4,
        id_shifts: 3,
        name: 'Nguyễn Vũ Lân',
        gmail: 'lan@gamil.com',
        password: '123456',
        img: "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
        sex: "Nam",
        role: "Quản lý",
        wage: 10000000,
        date: "Sun Oct 20 2023 20:46:55 GMT+0700"
    },
    {
        id: 5,
        id_shifts: 3,
        name: 'Nguyễn Vũ Lân',
        gmail: 'lan@gamil.com',
        password: '123456',
        img: "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
        sex: "Nam",
        role: "Quản lý",
        wage: 10000000,
        date: "Sun Oct 20 2023 20:46:55 GMT+0700"
    },
    {
        id: 6,
        id_shifts: 3,
        name: 'Nguyễn Vũ Lân',
        gmail: 'lan@gamil.com',
        password: '123456',
        img: "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
        sex: "Nam",
        role: "Quản lý",
        wage: 10000000,
        date: "Sun Oct 20 2023 20:46:55 GMT+0700"
    },
]
const shifts = [
    {
        id: 1,
        name: '1'
    },
    {
        id: 2,
        name: '2'
    },
    {
        id: 3,
        name: '3'
    }
]
let isShow = false

//GET DOM
const userDOM = document.querySelector('.user')
const menuContent = document.querySelector('#menu-content')
const cancel = document.querySelector('#cancel')
const menu = document.querySelector('#menu')

if (userDOM) {
    user.forEach(user => {
        const shift = shifts.find(s => s.id === user.id_shifts)
        const data = `
    <tr class="border border-solid border-[#DDDDDD]">
        <td class="border border-solid border-[#DDDDDD]">
            <div class="flex justify-center items-center">
                <img src="${user.img}"
                    class="w-16 sm:inline hidden" alt="">
                <p class="sm:text-base text-xs">${user.name}</p>
            </div>
        </td>
        <td class="border border-solid border-[#DDDDDD]">
        <p class="sm:text-base text-xs">${shift.name}</p>
        </td>
        <td class="border border-solid border-[#DDDDDD] text-[#F67F20]">
        <p class="sm:text-base text-xs">${user.wage.toLocaleString('vi')}</p>
        </td>
        <td class="border border-solid border-[#DDDDDD]">
        <p class="sm:text-base text-xs">${user.sex}</p>
        </td>
        <td class="border border-solid border-[#DDDDDD]">
        <p class="sm:text-base text-xs">${user.role}</p>
        </td>
        <td class="">
            <div class="flex justify-around items-center cursor-pointer">
                <div class="text-[#12991F]" 
                onclick="goToEditPage('edit')">
                    <i class="fa-solid fa-pencil"></i>
                    <span class="sm:inline hidden">Sửa</span>
                </div>
                <div class="text-[#F67F20]" 
                onclick="toggleConfirmDeleteModal()">
                    <i class="fa-solid fa-trash"></i>
                    <span class="sm:inline hidden">Xóa</span>
                </div>
            </div>
        </td>
    </tr>
    `
        userDOM.insertAdjacentHTML('beforeend', data)
    });
}

const toggleConfirmDeleteModal = (id) => {
    const modalElement = document.getElementById('confirmDeleteModal')
    if (isShow) {
        isShow = false
        modalElement.classList.add('hidden');
    } else {
        isShow = true
        modalElement.classList.remove('hidden');
    }
}

const goToEditPage = (id) => {
    if (id) {
        document.location = "html/update.html?id=" + id;
    } else {
        document.location = "html/update.html"
    }

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
