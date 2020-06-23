var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var produtSchema = new Schema({
    "id": Number,
    "name": String,
    "bfirstletter": String,
    "logo": String,
    "price": Number,
    "country": String,
    "checked":String,
    "countryid": Number
});

//第三个参数是要关联的表名
module.exports = mongoose.model('Good', produtSchema,'goods')

