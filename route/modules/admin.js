/**
 * Created by chang on 2018/1/28.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    'username': String,
    'password': String
});
module.exports = mongoose.model('admin_table',adminSchema);