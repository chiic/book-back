var flagIcoN_2 = 'fa fa-arrows-h';
var flagIcoN_1 = 'fa fa-check-square-o';
var flag = true
var bookname = ['name', 'key', 'url', 'img'];
var revokeBtn = document.getElementById('revoke');

function removeThebook(item, self) {
    console.log(item);
    var _id = JSON.parse(item)._id;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            self.parentNode.parentNode.remove();
            showMessage('删除成功', 2, 'success');
            var o = JSON.parse(item)
            var obj = {
                name: o.name,
                key: o.key,
                url: o.url,
                img: o.img
            };
            Revoke(obj);
        }
    }
    xhr.open('DELETE', '/api/back/removebook');
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
        _id: _id
    }));
}

function updateThebook(item, self) {
    flag = !flag;
    self.children[0].children[0].className = flag ? flagIcoN_2 : flagIcoN_1;
    var parentNode = self.parentNode.parentNode;
    var obj = {};
    for (var i = 0; i < 4; i++) {
        if (!flag) {
            createInput(parentNode.children[i]);
        } else {
            getInput(parentNode.children[i], obj, i)
        }
    }
    if (JSON.stringify(obj) !== '{}') {
        obj._id = item._id;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                showMessage('更新成功', 2, 'success');
            }
        }
        xhr.open('PUT', '/api/back/updatebook');
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.send(JSON.stringify(obj))
    }

}

function createInput(parentNode) {
    var _text = parentNode.innerHTML;
    var input = document.createElement('input');
    input.style.outline = 0;
    input.style.width = '100%';
    input.style.height = '100%';
    input.setAttribute('class', 'input');
    input.value = _text.trim();
    parentNode.firstChild.remove();
    parentNode.appendChild(input);
}

function getInput(parentNode, obj, index) {
    var inputText = parentNode.children[0].value;
    parentNode.children[0].remove();
    parentNode.innerHTML = inputText;
    obj[bookname[index]] = inputText.trim();
}

function Revoke(val) {
    var removeBtn = document.getElementById('revoke');
    if(!removeBtn) {
        var removeBtn = document.createElement('div');
        var img = document.createElement('img');
        var txt = document.createTextNode('撤销删除');
        img.src = '/public/img/withdraw.png';
        removeBtn.setAttribute('id', 'revoke');
        removeBtn.appendChild(img);
        removeBtn.appendChild(txt);
        document.body.appendChild(removeBtn);
    }
    removeBtn.onclick = callBack.bind(val);
}

function callBack() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            showMessage('撤掉成功', 2, 'success');
            window.location.href = '/overview';
        }
    }
    xhr.open('POST', '/api/back/addbook');
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(this))
}