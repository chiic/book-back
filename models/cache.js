var mongoose = require('mongoose');

var Schema = mongoose.Schema;
/**
 * state => 0 代表未激活， 1 代表激活
 * activeCode => 为激活码，通过md5生成
 */ 
var cacheSchema = new Schema({
    createTime: Date,
    username: String,
    psd: String,
    state: Number,
    activeCode: String
})

module.exports = cacheSchema;
