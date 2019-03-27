var fs = require('fs');
var model = require('../models')
exports.upload = function(req, res, next) {
    if(req.file) {
        fs.readFile(req.file.path, 'utf8', function(err, data) {
            if(!err) {
                const datas = Object.values(JSON.parse(data))[0];
                model.booklistModel.insertMany(datas, function(err, doc) {
                    if(!err) {
                        fs.unlink(req.file.path, (err) => {
                            if(!err) res.json({upload: 'success'})
                        })
                    }
                })
            }
        });
    }
}