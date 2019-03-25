var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var rolesSchema = new Schema({
    username: String,
    psd: String,
    role: String
})

module.exports = rolesSchema;
