var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var booklistSchema = new Schema({
    img: String,
    name: String,
    url: String,
    key: String
})

module.exports = booklistSchema;
