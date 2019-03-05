var btn = document.getElementById('add-btn');
var indexWrapper = document.getElementById('index-wrapper');

btn.addEventListener('click', function() {
    this.setAttribute('disabled', 'disabled');
    var html = document.createElement('div');
    html.setAttribute('class', 'add-element');
    html.innerHTML = '<div class="control">' + 
    '图片地址：<input class="input" id="imgUrl" type="text" placeholder="图片地址：">' + 
    '名称：<input class="input" id="name" type="text" placeholder="名称">' + 
    '下载地址：<input class="input" id="uploadUrl" type="text" placeholder="下载地址">' + 
    '<div class="tag-span">关键词：</div>' +
    '<div class="select">' +
        '<select id="tags">'+
            '<option value="c/c++">c/c++</option>'+
            '<option value="java">java</option>'+
            '<option value="python">python</option>'+
            '<option value="js">javascript</option>'+
            '<option value="go">go</option>'+
        '</select></div>' +
    '<div class="add-btn"><a class="button is-info" id="click-btn-add">添加</a></div>' +
    '</div>';
    indexWrapper.appendChild(html);
    var clickbtnAdd = document.getElementById('click-btn-add');
    clickbtnAdd.addEventListener('click', addData);
});

function addData() {
    var img = document.getElementById('imgUrl').value;
    var name = document.getElementById('name').value;
    var url = document.getElementById('uploadUrl').value;
    var tags = document.getElementById('tags');
    var key = tags.options[tags.selectedIndex].value
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(req, res) {
        if(xhr.readyState === 4 && xhr.status === 200) {
            btn.removeAttribute('disabled');
            var html = document.getElementsByClassName('add-element')[0];
            html.remove();
        }
    }
    xhr.open('POST', '/api/back/addbook');
    xhr.setRequestHeader('Content-type',"application/json");
    xhr.send(JSON.stringify({img: img, name: name, url: url, key: key}));
}
