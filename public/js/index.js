var btn = document.getElementById('add-btn');
var closeBtn = document.getElementById('close-btn');
var indexWrapper = document.getElementById('index-wrapper');

function addData() {
    var img = document.getElementById('imgUrl').value;
    var name = document.getElementById('name').value;
    var url = document.getElementById('uploadUrl').value;
    var tags = document.getElementById('tags');
    var key = tags.options[tags.selectedIndex].value
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (req, res) {
        if (xhr.readyState === 4 && xhr.status === 200) {
            btn.removeAttribute('disabled');
            btn.addEventListener('click', addBtn);
            closeBtn.removeEventListener('click', closeBtnHandler);
            var html = document.getElementsByClassName('add-element')[0];
            html.remove();
            var messge = document.getElementById('global-message');
            messge.innerHTML = '添加成功';
            messge.className = 'global-message show-message';
            setTimeout(function () {
                messge.className = 'global-message hidden-message';
            }, 1001);

        }
    }
    xhr.open('POST', '/api/back/addbook');
    xhr.setRequestHeader('Content-type', "application/json");
    xhr.send(JSON.stringify({
        img: img,
        name: name,
        url: url,
        key: key
    }));
}

function closeBtnHandler() {
    this.setAttribute('disabled', 'disabled');
    this.removeEventListener('click', closeBtnHandler);
    btn.removeAttribute('disabled');
    btn.addEventListener('click', addBtn);
    var html = document.getElementsByClassName('add-element')[0];
    html.remove();
}

function addBtn() {
    this.setAttribute('disabled', 'disabled');
    closeBtn.removeAttribute('disabled');
    this.removeEventListener('click', addBtn);
    closeBtn.addEventListener('click', closeBtnHandler)
    var html = document.createElement('div');
    html.setAttribute('class', 'add-element');
    html.innerHTML = '<div class="control">' +
        '图片地址：<input class="input" id="imgUrl" type="text" placeholder="图片地址：">' +
        '名称：<input class="input" id="name" type="text" placeholder="名称">' +
        '下载地址：<input class="input" id="uploadUrl" type="text" placeholder="下载地址">' +
        '<div class="tag-span">关键词：</div>' +
        '<div class="select">' +
        '<select id="tags">' +
        '<option value="c/c++">c/c++</option>' +
        '<option value="java">java</option>' +
        '<option value="python">python</option>' +
        '<option value="js">javascript</option>' +
        '<option value="go">go</option>' +
        '</select></div>' +
        '<div class="add-btn"><a class="button is-info" id="click-btn-add">添加</a></div>' +
        '</div>';
    indexWrapper.appendChild(html);
    var clickbtnAdd = document.getElementById('click-btn-add');
    clickbtnAdd.addEventListener('click', addData);
}

btn.addEventListener('click', addBtn);

