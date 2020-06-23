var express=require("express");
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//链接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/test-db');

mongoose.connection.on("connected",function(){
    console.log("MongoDB 连接成功!!")
});

mongoose.connection.on("error",function(){
    console.log("MongoDB 连接失败!!")
});

mongoose.connection.on("disconnected",function(){
    console.log("MongoDB 连接断开!!")
});



//查询商品列表数据
router.get("/list",function(req,res,next){
    // get取参req.param("参数") post取参req.bady.参数
    let page = parseInt(req.param("page"));
    let pagesize = parseInt(req.param("pagesize"));
    let priceChecked=req.param("priceChecked")
    let sort = req.param("sort");
    let skip = (page-1)*pagesize;
    let priceGt = 0,priceLte = 1000;
    let params = {};
    if(priceChecked !='all'){
        switch (priceChecked){
            case '0':priceGt= 0;priceLte=100;break;
            case '1':priceGt= 100;priceLte=200;break;
            case '2':priceGt= 200;priceLte=300;break;
            case '3':priceGt= 300;priceLte=500;break;
            case '4':priceGt= 500;priceLte=1000;break;
            case '5':priceGt= 1000;priceLte=100000000000000;break;
        }
        params = { 
            pri:{
                $gt:priceGt,
                $lte:priceLte
            }
        }
    }
    

    //.skip默认跳过多少条数据 limit获取多少条数据（一页多少条）
    let goodsmodel = Goods.find(params).skip(skip).limit(pagesize);
    goodsmodel.sort({'pri':sort});
    goodsmodel.exec(function(error,doc){
        if(error){
                    res.json({
                        status:'1',
                        msg:err.message
                    });
        }else{
            res.json({
                            status:'0',
                            msg:'',
                            result:{
                                count:doc.length,
                                list:doc
                            }
                        });
        }
    })
});

//    通过size车型查找
router.get("/bySize",function(req,res,next){
    let size = req.param("size");
    Goods.find({size:size},(err,doc)=>{
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:doc
            })
        }
    })
})

router.get("/byName",function(req,res,next){
    let name = req.param("name");
    Goods.find({name:{$regex:name}},(err,doc)=>{
        if(err){
            res.json({
                status:'1',
                msg:err.message,
                result:''
            })
        }else{
            res.json({
                status:'0',
                msg:'',
                result:doc
            })
        }
    })
})

// 加入购物车
router.post("/addCart",function(req,res,next){
    let userId = '100000077';
    // get取参req.param("参数") post取参req.bady.参数
    let productId = req.body.productId;
    let User = require('../models/user');
    // User.findOne({userId:userId},(err,userDoc)=》{}）第一个参数查询的条件
    // err：是否出错  userDoc返回当前查询到的文档
    User.findOne({userId:userId},function(err,userDoc){
        if(err){
            res.json({
                status:'1',
                msg:err.message
            })
        }else{
            if(userDoc){
                let goodsItem = '';
                userDoc.carList.forEach(function(item){
                    if(item.productId == productId){
                        goodsItem = item;
                        item.productNum ++;
                    }
                });
                if(goodsItem){
                    userDoc.save(function(err2,doc2){
                        if(err2){
                            res.json({
                                status:'1',
                                msg:err2.message
                                })
                        }else{
                            res.json({
                                status:'0',
                                msg:'',
                                result:'suc'
                                })
                        }
                    })
                }else{
                    Goods.findOne({productId:productId},function(err1,doc){
                        doc.productNum = 1;
                        doc.checked = 1;
                        if(err1){
                            res.json({
                            status:"1",
                            msg:err1.message
                            })
                        }else{
                            if(doc){
                                doc.productNum = 1;
                                doc.checked = 1;
                                userDoc.carList.push(doc);
                                userDoc.save(function(err2,doc2){
                                    if(err2){
                                        res.json({
                                            status:"1",
                                            msg:err2.message
                                            })
                                    }else{
                                        res.json({
                                            status:'0',
                                            msg:'',
                                            result:'success'
                                            })
                                    }
                                });
                            }
                            
                        }
                    })
                }
                
            }
        }
    });
});




module.exports = router;







