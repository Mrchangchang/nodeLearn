/**
 * Created by chang on 2018/1/28.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var custom_evaluation = new Schema({
    'ID': Number,
    'title': String,
    'description': String,
    'src': String
});
module.exports = mongoose.model('custom_evaluation_table',custom_evaluation);