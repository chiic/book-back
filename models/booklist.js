var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var booklistSchema = new Schema({
    uid: String,
    img: String,
    name: String,
    url: String,
    key: String
})

module.exports = booklistSchema;
