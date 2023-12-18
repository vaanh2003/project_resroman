const icon = document.getElementById('icon-setting');
icon.style.color = '#F67F20';
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

// menu.addEventListener('click',() => toggleMenu('open'))  
// cancel.addEventListener('click',() => toggleMenu('close'))

const clickShowMenu = document.getElementById('click-show-menu');
    clickShowMenu.addEventListener('click', clickMenu);
    function clickMenu(event) {
        event.preventDefault();
        var clickedElement = event.target;
        const bodyHomeMenu = document.getElementById('body-home-menu');
        bodyHomeMenu.classList.remove('body-home-menu');
        bodyHomeMenu.classList.add('body-home-menu-block');
        console.log(clickedElement);
    }
    const clickBackMenu = document.getElementById('back-menu');
    clickBackMenu.addEventListener('click', backMenu);
    function backMenu(event){
        const bodyHomeMenu = document.getElementById('body-home-menu');
        bodyHomeMenu.classList.remove('body-home-menu-block');
        bodyHomeMenu.classList.add('body-home-menu');
    }
    