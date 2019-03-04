exports.render = function(req, res) {
    console.log(req.cookies)
    if(req.cookies.name) {
        res.render('index', {title: '主页'});
    } else {
        res.redirect('/login');
    }        

}