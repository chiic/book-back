var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var rolesImgSchema = new Schema({
    uid: String,
    imgData: String
})

module.exports = rolesImgSchema;
