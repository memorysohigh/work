<template>
  <div>
    <nav-header></nav-header>
    <div class="nav-breadcrumb-wrap">
      <div class="container">
        <nav class="nav-breadcrumb">
          <a href="/">首页</a>
          <span>查看订单</span>
        </nav>
      </div>
    </div>

    <svga></svga>

    <div class="container">
      <div class="checkout-addr">
        <div class="page-title-normal">
          <h2 class="page-title-h2">
            <span>查看订单</span>
          </h2>
        </div>
        <!-- process step -->
        <div class="check-step">
          <ul>
            <li class="cur">
              <span>确认</span>地址
            </li>
            <li class="cur">
              <span>查看</span>订单
            </li>
            <li>
              <span>支</span>付
            </li>
            <li>
              <span>订单</span>确认
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- order list -->
    <div class="page-title-ormal checkout-title">
      <h2>
        <span>订单</span>
      </h2>
    </div>
    <div class="item-list-wrap confirm-item-list-wrap">
      <div class="cart-item order-item">
        <div class="cart-item-head">
          <ul>
            <li>商品名称</li>
            <li>价格</li>
            <li>数量</li>
            <li>小计</li>
          </ul>
        </div>
        <ul class="cart-item-list">
          <li v-for="item in cartList" :key="item.id" v-if="item.checked=='1'">
            <div class="cart-tab-1">
              <div class="cart-item-pic">
                <img v-bind:src="'https://images.weserv.nl/?url='+item.img" v-bind:alt="item.img" />
              </div>
              <div class="cart-item-title">
                <div class="item-name">{{item.name}}</div>
              </div>
            </div>
            <div class="cart-tab-2">
              <div class="item-price">{{item.pri}}</div>
            </div>
            <div class="cart-tab-3">
              <div class="item-quantity">
                <div class="selet-self">
                  <div class="selet-self-area">
                    <span class="selet-ipt">x{{item.productNum}}</span>
                  </div>
                </div>
                <div class="item-stock item-stock-no">有货</div>
              </div>
            </div>
            <div class="cart-tab-4">
              <div class="item-price-total">{{item.productNum*item.pri}}w</div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="price-count-wrap">
        <div class="price-count">
            <ul>
                <li>
                    <span>总金额：</span>
                    <span>￥{{orderTotal}}万元</span>
                </li>
            </ul>
        </div>
    </div>

    <div class="order-foot-wrap">
        <div class="prev-btn-wrap">
            <router-link class="btn btn--m" to="/address">上一步</router-link>
        </div>
        <div class="next-btn-wrap">
            <button class="btn btn--m btn--red" @click="payMent">下一步</button>
        </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import "./../assets/css/base.css";
import "./../assets/css/base.css";
import NavFooter from "./../components/NavFooter";
import NavHeader from "./../components/NavHeader";
import svga from "./../components/svga";
import mo from "./../components/mo";
import axios from "axios";

export default {
  data() {
    return {
      cartList: []
    };
  },
  components: {
    NavFooter,
    NavHeader,
    mo,
    svga
  },
  mounted() {
    this.init();
  },
  computed:{
      orderTotal(){
            var sum = 0;
            this.cartList.forEach((item)=>{
              if(item.checked == '1')
              sum +=parseFloat(item.pri)*parseInt(item.productNum);
            });
            return sum;
          }
  },
  methods: {
    init() {
      axios.get("users/cartList").then(respones => {
        let res = respones.data;
        this.cartList = res.result;
      });
    },
    payMent(){
        var addressId = this.$route.query.addressId;
        axios.post("users/payMent",{
            addressId:addressId,
            orderTotal:this.orderTotal
        }).then((respones)=>{
            let res=respones.data;
            if(res.status == "0")
            {
                this.$router.push({
                    path:'/orderSuccess?orderId='+res.result.orderId
                })
            }else{
                alert("添加失败");
            }
        })
    },
  }
}
</script>
<style >
</style>