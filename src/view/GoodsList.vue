<template>
  <div>
    <nav-header></nav-header>
    <div class="nav-breadcrumb-wrap">
      <div class="container">
        <nav class="nav-breadcrumb">
          <a href="/">Home</a>
          <span>Goods</span>
        </nav>
      </div>
    </div>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:;" class="price" @click="sortgoods()">
            Price
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd>
                <a href="javascript:void(0)" @click="()=>{this.priceChecked='all';this.page=1;getgoodslist()}">All</a>
              </dd>
              <dd>
                <a href="javascript:void(0)" @click="()=>{this.priceChecked=0;this.page=1;getgoodslist()}">0 - 100万</a>
              </dd>
              <dd>
                <a href="javascript:void(0)" @click="()=>{this.priceChecked=1;this.page=1;getgoodslist()}">100 - 200万</a>
              </dd>
              <dd>
                <a href="javascript:void(0)" @click="()=>{this.priceChecked=2;this.page=1;getgoodslist()}">200 - 300万</a>
              </dd>
              <dd>
                <a href="javascript:void(0)" @click="()=>{this.priceChecked=3;this.page=1;getgoodslist()}">300 - 500万</a>
              </dd>
              <dd>
                <a href="javascript:void(0)" @click="()=>{this.priceChecked=4;this.page=1;getgoodslist()}">500 - 1000万</a>
              </dd>
              <dd>
                <a href="javascript:void(0)" @click="()=>{this.priceChecked=5;this.page=1;getgoodslist()}">1000万以上</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item) in goodsList" :key="item.id">
                  <div class="pic">
                    <a href="#">
                      <img v-bind:src="'https://images.weserv.nl/?url='+item.img" v-bind:alt="item.img" />
                    </a>
                  </div>
                  <div class="main">
                    <div class="name" style="color:red">{{item.name}}</div>
                    <div class="name">排量：{{item.pailiang}}</div>
                    <div class="name">定位：{{item.size}}</div>
                    <div class="name">变速箱：{{item.biansuxiang}}</div>
                    <div class="price">{{item.pri}}万</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <!-- 滚动加载 -->
              <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                  加载中...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <mo v-bind:w="mdShow" v-on:close="closeMo">
      <p slot="message">
        请先登录，否则无法加入到购物车中！
      </p>

      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="mdShow = false">关闭</a>
      </div>
    </mo>


    <mo v-bind:w="mdShowCart" v-on:close="closeMo">
      <p slot="message">
        <span>加入购物车成功</span>
      </p>

      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="mdShowCart = false">继续购物</a>
        <router-link href="javascript:;" class="btn btn--m" to="/cart">查看购物车</router-link>
      </div>
    </mo>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import "./../assets/css/base.css";
import "./../assets/css/checkout.css";
import "./../assets/css/product.css";
import "./../assets/css/login.css";
import NavFooter from "./../components/NavFooter";
import NavHeader from "./../components/NavHeader";
import axios from "axios";
import mo from "./../components/mo"

export default {
  data() {
    return {
      goodsList: [],
      sortflag: true,
      page: 1,
      pagesize: 8,
      priceChecked:'all',
      mdShow:false,
      mdShowCart:false,
      
    };
  },

// 值和名字一样就不用了写值了
  components: {
    NavFooter: NavFooter,
    NavHeader: NavHeader,
    mo
  },
  mounted: function() {
    this.getgoodslist();
    
  },
  methods: {
    getgoodslist(flag) {
      var param = {
        page: this.page,
        pagesize: this.pagesize,
        sort: this.sortflag?1:-1,
        busy:true,
        priceChecked:this.priceChecked
      };
      axios.get("/goods/list", { params: param }).then((result) => {
        var res = result.data;
        if (res.status == "0") {
            if(flag){
                this.goodsList=this.goodsList.concat(res.result.list);
                if(res.result.count == 0){
                    this.busy = true;
                }else{
                    this.busy = false;
                }
            }else{
                this.goodsList=res.result.list;
                this.busy=false;
            }
          
          // console.log(this.goodsList)
        } else {
          this.goodsList = [];
        }
      });
    },

    sortgoods() {
      this.sortflag = !this.sortflag;
      this.page = 1;
      this.getgoodslist();
    },

    setPriceFilter(index){
        this.priceChecked = index;
        this.page = 1;
        this.getgoodslist();
    },
    
    loadMore(){
        this.busy=true;
        setTimeout(() => {
            this.page++;
            this.getgoodslist(true);
      }, 500);
    },

    addCart(productId){
        axios.post("/goods/addCart",{
          productId:productId
          }).then((response)=>{
          var res = response.data
          if(res.status =='0'){
             this.mdShowCart = true;
              }else{
                this.mdShow = true;
              }
          })
    },

    closeMo(){
        this.mdShow = false;
    },
  }
};
</script>

<style>
.list-wrap ul::after{
    clear:both;
    content :'';
    height :0;
    display :block;
    visibility:hidden;
}
.load-more{
    height: 100px;
    line-height: 100px;
    text-align: center;
}
</style>

