var express = require('express');
var router = express.Router();

var User = require('./../models/user');

/* GET users listing. */
// req前端的数据请求接受过来，res向前端响应发数据，服务端的响应，next下一条
router.get('/', function(req, res, next) {
  res.send('users 路由');
});

router.post("/login",function(req,res,next){
  var param = {
    userName:req.body.userName,
    userPwd:req.body.userPwd
  }
 
  User.findOne(param,function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message
      });
    }else{
      if(doc){
        res.cookie("userId",doc.userId,{
          path:"/",
          maxAge:1000*60*60
        });
        res.cookie("userName",doc.userName,{
          path:"/",
          maxAge:1000*60*60
        });
        // req.session.user=doc;
        res.json({
          status:"0",
          msg:"",
          result:{
            userName:doc.userName
          }
        })
      }
    }
  })
})

// 登出接口
router.post("/logout",function(req,res,next){
  // userId置成空
  res.cookie("userId","",{
    path:"/",
    // 生命周期失效
    maxAge:-1
  })  
  // res往服务端去写，json往服务端去输出
  res.json({
    status:"0",
    msg:'',
    result:''
  })
})



// 校验
// status：0成功
router.get("/checkLogin",function(req,res,next){
  if(req.cookies.userId){
    res.json({
      status:'0',
      msg:'',
      result:req.cookies.userName || ''
    });
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
  });
  }
});

// 查询当前用户的购物车数据
// req是获取前端传过来的数据
// res是往前端写数据
router.get("/cartList",function(req,res,next){
  var userId = req.cookies.userId;
  User.findOne({userId:userId},function(err,doc){
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
        if(doc){
          res.json({
            status:'0',
            msg:'',
            result:doc.carList
          });
        }
    }
  });
});

// 删除购物车商品
router.post("/remove",(req,res,next)=>{
  var userId = req.cookies.userId;
  var productId = req.body.productId;
  User.update({
    userId:userId
  },{
    // 删除子文档
    $pull:{
      'carList':{
        'productId':productId
      }
    }
  },(err,doc)=>{
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
          result:'suc'
        })
       }
  });
});


// 控制购物车数量加减
router.post("/cartEdit",(req,res,next)=>{
  var userId = req.cookies.userId;
  var productId = req.body.productId;
  var productNum = req.body.productNum, 
      checked = req.body.checked;
  User.update({"userId":userId,"carList.productId":productId},{
    "carList.$.productNum":productNum,
    "carList.$.checked":checked,
  },(err,doc)=>{
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
          result:'suc'
        })
      }
  })
});

router.post("/editCheckAll",(req,res,next)=>{
  var userId = req.cookies.userId,
  checkedAll = req.body.checkedAll?'1':'0';
  User.findOne({userId:userId},(err,user)=>{
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:''
        })
      }else{
          if(user){
            user.carList.forEach((item)=>{
              item.checked = checkedAll;
            })
            user.save((err1,doc)=>{
                  if(err1){
                    res.json({
                      status:'1',
                      msg:err1.message,
                      result:''
                    })
                  }else{
                    res.json({
                      status:'0',
                      msg:'',
                      result:'suc'
                    })
                  }
            })
          }
      }
      
  });
});


// 加载地址列表
router.get("/addressList",(req,res,next)=>{
  var userId = req.cookies.userId;
  User.findOne({userId:userId},(err,doc)=>{
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
        result:doc.addressList
      })
    }
  })
})

// 设置默认地址
router.post("/setDefault",(req,res,next)=>{
  var userId = req.cookies.userId,
      addressId = req.body.addressId;
  if(!addressId){
    res.json({
      status:'1003',
      msg:"addressId is Null",
      result:''
  })
  }else{
    User.findOne({userId:userId},(err,doc)=>{
      if(err){
        res.json({
            status:'1',
            msg:err.message,
            result:''
        })
      }else{
        var addressList = doc.addressList
        addressList.forEach((item)=>{
          if(item.addressId == addressId)
              item.isDefault = true;
          else
              item.isDefault = false;
        });
        doc.save((err1,doc1)=>{
          if(err1){
            res.json({
              status:'1',
              msg:err.message,
              result:''
          })
          }else{
            res.json({
              status:'0',
              msg:"",
              result:''
          })
          }
        })
      }
  });
  }
 });


//  删除地址
router.post("/delAddress",(req,res,next)=>{
  var userId = req.cookies.userId,
      addressId = req.body.addressId;
      User.update({
        userId:userId
      },{
        // 删除子文档
        $pull:{
          'addressList':{
            'addressId':addressId
          }
        }
      },(err,doc)=>{
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
            result:''
          })
        }
      });
})

module.exports = router;
