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
            <li>
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

        
        <!-- address list -->
        <div class="page-title-normal checkout-title">
          <h2>
            <span>Shipping address</span>
          </h2>
        </div>
        <div class="addr-list-wrap">
          <div class="addr-list">
            <ul>
              <li
                v-for="(item,index) in addressListFilter"
                :key="item.id"
                v-bind:class="{'check':checkIndex==index}"
                @click="checkIndex = index;"
              >
                <dl>
                  <dt>{{item.userName}}</dt>
                  <dd class="address">{{item.streetName}}</dd>
                  <dd class="tel">{{item.tel}}</dd>
                </dl>
                <div class="addr-opration addr-del" @click="delAddressConfirm(item.addressId)">
                  <a href="javascript:;" class="addr-del-btn">
                    <svg class="icon icon-del">
                      <use xlink:href="#icon-del" />
                    </svg>
                  </a>
                </div>
                <div
                  class="addr-opration addr-default"
                  v-if="!item.isDefault"
                  @click="setDefault(item.addressId)"
                >设置为默认</div>
                <div
                  class="addr-opration addr-default"
                  v-if="item.isDefault"
                  style="color:blue"
                >默认地址</div>
              </li>


              <li class="addr-new">
                <div class="add-new-inner">
                  <svg class="icon icon-add">
                    <use xlink:href="#icon-add" />
                  </svg>
                </div>
              </li>
            </ul>
          </div>
          <div class="shipping-addr-mor">
            <a href="javascript:;" class="addr-more-btn up-down-btn" @click="expand">MORE</a>
          </div>
        </div>

        <!-- shipping method -->
        <div class="page-title-normal checkout-title">
          <h2>
            <span>Shipping method</span>
          </h2>
        </div>
        <div class="lemall-msg-info hidden">
          <span>dasfafrrqwwre</span>
        </div>
        <div class="shipping-method-wrap">
          <div class="next-btn-wrap">
            <router-link class="btn btn--m btn--red" v-bind:to="{path:'OrderConfirm',query:{'addressId':selectedAddrId}}">下一步</router-link>
          </div>
        </div>

      </div>
    </div>

    <mo :w="isMdShow" @close="closeMo">
      <p slot="message">是否删除此地址</p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="delAddress">确认</a>
        <a href="javascript:;" class="btn btn--m" @click="isMdShow = false">取消</a>
      </div>
    </mo>

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
      limit: 3,
      addressList: [],
      checkIndex: 0,
      isMdShow: false,
      addressId: "",
      
    };
  },
  components: {
    NavFooter,
    NavHeader,
    mo,svga
  },

  mounted() {
    this.init();
  },
  computed: {
    addressListFilter() {
      return this.addressList.slice(0, this.limit);
    },
    selectedAddrId(){
        let end = '';
        this.addressList.forEach((item)=>{
              if(item.isDefault) 
                end = item.addressId;
            });
            return end;
    }
  },
  methods: {
    init() {
      axios.get("/users/addressList").then(response => {
        let res = response.data;
        this.addressList = res.result;
      });
    },

    expand() {
      if (this.limit == 3) {
        this.limit = this.addressList.length;
      } else {
        this.limit = 3;
      }
    },
    setDefault(addressId) {
      axios
        .post("/users/setDefault", {
          addressId: addressId
        })
        .then(response => {
          let res = response.data;
          if (res.status == "0") {
            console.log("设置默认地址成功");
          }
        });
      this.init();
    },

    closeMo() {
      this.isMdShow = false;
    },

    delAddressConfirm(addressId) {
      this.isMdShow = true;
      this.addressId = addressId;
    },

    delAddress() {
      this.isMdShow = true;
      axios
        .post("/users/delAddress", {
          addressId: this.addressId
        })
        .then(response => {
          let res = response.data;
          if (res.status == "0") {
            this.isMdShow = false;
            console.log("删除成功");
            this.init();
          } else {
            alert("删除失败");
          }
        });
    }
  }
};
</script>

<style>
</style>