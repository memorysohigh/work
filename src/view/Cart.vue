<template>
  <div>
    <nav-header></nav-header>
    <div class="nav-breadcrumb-wrap">
      <div class="container">
        <nav class="nav-breadcrumb">
          <a href="/">Home</a>
          <span>My Cart</span>
        </nav>
      </div>
    </div>
    <svga></svga>
    <div class="container">
      <div class="cart">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>My Cart</span></h2>
        </div>
        <div class="item-list-wrap">
          <div class="cart-item">
            <div class="cart-item-head">
              <ul>
                <li>Items</li>
                <li>Price</li>
                <li>Quantity</li>
                <li>Subtotal</li>
                <li>Edit</li>
              </ul>
            </div>
            <ul class="cart-item-list">
              <li  v-for="item in cartList" :key="item.id">
                <div class="cart-tab-1">
                  <div class="cart-item-check">
                    <a href="javascipt:;" class="checkbox-btn item-check-btn" @click="edit('checked',item)" v-bind:class="{'checked':item.checked == '1'}">
                      <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg>
                    </a>
                  </div>
                  <div class="cart-item-pic">
                    <img v-bind:src="'https://images.weserv.nl/?url='+item.img" v-bind:alt="item.img">
                  </div>
                  <div class="cart-item-title">
                    <div class="item-name">{{item.name}}</div>
                  </div>
                </div>
                <div class="cart-tab-2">
                  <div class="item-price">{{item.pri}}万</div>
                </div>
                <div class="cart-tab-3">
                  <div class="item-quantity">
                    <div class="select-self select-self-open">
                      <div class="select-self-area">
                        <a class="input-sub" @click="edit('minu',item)">-</a>
                        <span class="select-ipt">{{item.productNum}}</span>
                        <a class="input-add" @click="edit('add',item)">+</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="cart-tab-4">
                  <div class="item-price-total">{{item.productNum*item.pri}}万</div>
                </div>
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="removeConfirm(item.productId)">
                      <svg class="icon icon-del">
                        <use xlink:href="#icon-del"></use>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <a href="javascipt:;" @click="selectAll">
                  <span class="checkbox-btn item-check-btn" v-bind:class="{'checked':checkedAll}">
                      <svg class="icon icon-ok"><use xlink:href="#icon-ok"/></svg>
                  </span>
                  <span>Select all</span>
                </a>
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                Item total: <span class="total-price">{{totalPrice}}万</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red" v-bind:class="{'btn--dis':checkedCount==0}" @click="checkOut">Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mo  :w="cartflag" @close="closeMo"> 
      <p slot="message">你确认要删除吗</p>
      <div slot="btnGroup">
        <a href="">关闭</a>
        <a href="javascript:;" class="btn btn--m" @click="remove">确认</a>
        <a href="javascript:;" class="btn btn--m" @click="cartflag = false">取消</a>
      </div>
    </mo>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
// import './../assets/css/checkout'
import "./../assets/css/base.css"
import NavFooter from "./../components/NavFooter"
import NavHeader from "./../components/NavHeader"
import svga from "./../components/svga"
import mo from "./../components/mo"
import axios from "axios"

    export default {
        data(){
            return{
              cartList:[],
              productId:'',
              cartflag:false,
              total:'',
              
            }
        },

        mounted(){
              this.init();
            },

        computed:{
          checkedCount(){
            let i = 0;
            this.cartList.forEach((item)=>{
              if(item.checked == "1") i++;
            });
            return i;
          },

          checkedAll(){
            return this.cartList.length == this.checkedCount;
          },

          totalPrice(){
            var sum = 0;
            this.cartList.forEach((item)=>{
              if(item.checked == '1')
              sum +=parseFloat(item.pri)*parseInt(item.productNum);
            });
            return sum;
          }
          
        },

        components:{
          NavFooter,
          NavHeader,
          mo,svga,
        },


        methods:{ 
              init(){
                axios.get('/users/cartList').then((response)=>{
                  let res = response.data;
                  this.cartList = res.result;

                });
              },

            removeConfirm(productId){
                this.cartflag = true;
                this.productId = productId;
            },

            remove(){
                axios.post('/users/remove',{productId:this.productId}).then((response)=>{
                  let res = response.data;
                  if(res.status == '0'){
                    this.cartflag = false;
                    this.init();
                  }
                  // this.cartList = res.result;
                });
            },


            closeMo(){
              this.cartflag = false;
            },



            edit(flag,item){
                if(flag == 'add'){
                  item.productNum++;
                }else if(flag == 'minu'){
                  if(item.productNum <= 1){
                    return;
                  }else{
                    item.productNum--;
                  }
                }else{
                  if(item.checked == '1')
                  item.checked = '0';
                  else
                  item.checked = '1'
                }
                axios.post("/users/cartEdit",{
                  productId:item.productId,
                  productNum:item.productNum,
                  checked:item.checked,
                }).then((response)=>{
                  let res = response.data;
                  if( res.status == '0'){
                    console.log('更新成功')
                  }else{
                    console.log('更新失败')
                  }
                })   
              },

            selectAll(){
                var flag = !this.checkedAll;
                this.cartList.forEach((item)=>{
                  item.checked = flag?'1':'0';
              })

              axios.post("/users/editCheckAll",{
                checkedAll:flag
              }).then((response)=>{
                let res = response.data;
                if(res.status == '0'){
                  console.log("updata success!")
                }
              })
            } ,  

            checkOut(){
              if(this.checkedCount>0){
                this.$router.push({
                  path:"/address"
                });
              }
            }

        
        
        
        }   
  }
</script>

<style>
  .input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .item-quantity .select-self-area{
    background:none;
    border: 1px solid #f0f0f0;
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
</style>
    