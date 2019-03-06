var models = require('../models/index');
exports.render = function (req, res) {
    var page = req.query.page;
    models.booklistModel.find(function(err, list) {
        if(!err) {
            var listLengNum = Math.ceil(list.length / 10);
            if(!page) {
                page = 1;
            }
            if(page > listLengNum) {
                page = listLengNum;
            }
            res.render('overview', {
                title: '概览',
                bookdataSet: list.slice((page - 1) * 10, page * 10),
                listLeng: listLengNum,
                page: page
            })
        }
    });
}