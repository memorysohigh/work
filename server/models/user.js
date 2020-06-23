var mongoose = require('mongoose')
var Schema = mongoose.Schema;
// 一定要和数据库名字类型对应上
var produtSchema = new Schema({
    "userId": String,
    "userName": String,
    "userPwd": String,
    "orderList":Array,
    "carList":[
        {
            "productId":String,
            "name":String,
            "pri":Number,
            "pingfen":String,
            "cheshen":String,
            "pailiang":String,
            "biansuxiang":String,
            "size":String,
            "img":String,
            "productNum":String,
            "checked":String
        }
    ],
    "addressList":[{
        "addressId" : String,
        "userName" : String,
        "streetName" : String,
        "postCode" : String,
        "tel" : String,
        "isDefault" : Boolean
    }]
});

//第三个参数是要关联的表名
module.exports = mongoose.model('User', produtSchema,'users')