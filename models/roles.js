var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var rolesSchema = new Schema({
    username: String,
    psd: String,
    roleName: String
})

module.exports = rolesSchema;
