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

if (userDOM) {
    user.forEach(user => {
        const shift = shifts.find(s => s.id === user.id_shifts)
        const data = `
    <tr class="border border-solid border-[#DDDDDD]">
        <td class="border border-solid border-[#DDDDDD]">
            <div class="flex justify-center items-center">
                <img src="${user.img}"
                    class="w-16" alt="">
                <span class="">${user.name}</span>
            </div>
        </td>
        <td class="border border-solid border-[#DDDDDD]">
        ${shift.name}
        </td>
        <td class="border border-solid border-[#DDDDDD] text-[#F67F20]">
        ${user.wage.toLocaleString('vi')}
        </td>
        <td class="border border-solid border-[#DDDDDD]">
        ${user.sex}
        </td>
        <td class="border border-solid border-[#DDDDDD]">
        ${user.role}
        </td>
        <td class="">
            <div class="flex justify-around items-center cursor-pointer">
                <div class="text-[#12991F]" 
                onclick="goToEditPage('edit')">
                    <i class="fa-solid fa-pencil"></i>
                    <span>Sửa</span>
                </div>
                <div class="text-[#F67F20]" 
                onclick="toggleConfirmDeleteModal()">
                    <i class="fa-solid fa-trash"></i>
                    <span>Xóa</span>
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
