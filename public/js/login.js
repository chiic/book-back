// var user = document.getElementById('username');
// var psd = document.getElementById('password');
// var btn = document.getElementById('submit');
// var errorMessage = document.getElementById('error-message');
// btn.addEventListener('click', function () {
//     var data_ = {};
//     data_.user = user.value;
//     data_.psd = psd.value;
//     console.log(data_)
//     if (!data_.user) {
//         errorMessage.innerHTML = '账号不能为空';
//         return false;
//     }
//     if (!data_.psd) {
//         errorMessage.innerHTML = '密码不能为空';
//         return false;
//     }
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         console.log(xhr.readyState)
//         if (xhr.status === 302 && xhr.readyState === 4) {
//             console.log(xhr)
//             window.location = '/'
//         }
//     }
//     xhr.open('POST', '/api/back/login');
//     xhr.setRequestHeader('Content-type',"application/json");
//     xhr.send(JSON.stringify(data_));
// })