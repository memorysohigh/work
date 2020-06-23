<template>
  <div>
    <nav-header></nav-header>
    <div class="nav-breadcrumb-wrap">
      <div class="container">
        <nav class="nav-breadcrumb">
          <a href="/">Home</a>
          <span>My Address</span>
        </nav>
      </div>
    </div>

    <svga></svga>

    <div class="container">
      <div class="checkout-addr">
        <div class="page-title-normal">
          <h2 class="page-title-h2">
            <span>check out</span>
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
        <h2><span>Order content</span></h2>
    </div>
    <div class="item-list-wrap confirm-item-list-wrap">
        <div class="cart-item order-item">
            <div class="cart-item-head">
                <ul>
                    <li>order contents</li>
                    <li>price</li>
                    <li>Quantity</li>
                    <li>subtotal</li>
                </ul>
            </div>
            <ul class="cart-itrm-list">
                <li>
                    <div class="cart-tab-1">
                        <div class="cart-itrm-pic">
                            <img src=" " alt="">
                        </div>
                        <div class="cart-item-title">
                            <div class="item-name">小米6</div>
                        </div>
                    </div>
                    <div class="cart-tab-2">
                        <div class="item-price">2499</div>
                    </div>
                    <div class="cart-tab-3">
                        <div class="item-quantity">
                            <div class="selet-self">
                                <div class="selet-self-area">
                                    <span class="selet-ipt">x1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </li>
            </ul>
        </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import "./../assets/css/base.css";
import NavFooter from "./../components/NavFooter";
import NavHeader from "./../components/NavHeader";
import svga from "./../components/svga";
import mo from "./../components/mo";
import axios from "axios";
        
export default {
        data() {
            return {
            msg:''
            
            };
        },
        components: {
            NavFooter,
            NavHeader,
            mo,svga
        },

        }
</script>

<style>

</style>