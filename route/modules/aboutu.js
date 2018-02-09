/**
 * Created by chang on 2018/1/28.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var adoutu = new Schema({
    'ID': Number,
    'title': String,
    'content': String,
    'pic_src': String,
    'href': String
});
module.exports = mongoose.model('adoutu',adoutu);