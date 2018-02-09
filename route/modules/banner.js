/**
 * Created by chang on 2018/1/28.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 var banner = new Schema({
     "ID": Number,
     'title': String,
     'description': String,
     'href': String
 });

 module.exports = mongoose.model('banner_table',banner);