const getUserInfo = () => {
    const parsedUrl = new URL(window.location.href);
    const userID = parsedUrl.searchParams.get("id")
    console.log(userID);
    if (userID) {
        //fetch data
        document.getElementById("title").innerHTML = "Chỉnh sửa thông tin nhân viên"
    }
}

getUserInfo()