var choiceColor = function(info) {
    switch(info) {
        case 'info':
            return '#cccccc';
        case 'success':
            return '#ecfcea';
        case 'error':
            return '#ffefef';
        default:
            return '#888888';
    }
}

function showMessage(egs, timeout, infocolor) {
    var div = document.createElement('div');
    div.setAttribute('class', 'global-message show-message')
    div.innerHTML = egs;
    div.style.backgroundColor = choiceColor(infocolor);
    document.body.appendChild(div);
    setTimeout(function () {
        div.remove();
    }, timeout * 1001);
}