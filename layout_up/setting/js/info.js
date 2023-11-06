const user =
{
    id: 1,
    id_shifts: 1,
    name: 'Nguyễn Vũ Lân',
    phone: '0912345678',
    gmail: 'lan@gmail.com',
    birthday: '3/11/2003',
    password: '123456',
    img: "https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg",
    sex: "Nam",
    role: "Quản lý",
    wage: 10000000,
    date: "Sun Oct 20 2023 20:46:55 GMT+0700"
}

let isShow = false

const info = document.querySelector('.info')
const phone = document.querySelector('.phone')
const birthday = document.querySelector('.birthday')
const role = document.querySelector('.role')
const gmail = document.querySelector('.gmail')
const password = document.querySelector('.password')

info.value = user.name
phone.value = user.phone
birthday.value = user.birthday
role.value = user.role
gmail.value = user.gmail
password.value = user.password

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

function openTabContent(evt, name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}