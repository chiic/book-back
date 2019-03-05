document.getElementsByClassName('book-col')

function removeThebook(item, self) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            self.parentNode.parentNode.remove();
        }
    }
    xhr.open('DELETE','/api/back/removebook');
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(item);
}