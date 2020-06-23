<template>
  <div>
    <nav-header></nav-header>
    <div class="men">
      <div class="container">
        <div class="col-md-4 sidebar_men">
          <h3>品牌</h3>
          <ul class="product-categories color">
            <li class="cat-item cat-item-61">
              <a href="#" @click="byName('法拉利')">法拉利</a>
              <span class="count">(3)</span>
            </li>
            <li class="cat-item cat-item-56">
              <a href="#" @click="byName('奔驰')">奔驰</a>
              <span class="count">(6)</span>
            </li>
            <li class="cat-item cat-item-57">
              <a href="#" @click="byName('保时捷')">保时捷</a>
              <span class="count">(13)</span>
            </li>
            <li class="cat-item cat-item-58">
              <a href="#" @click="byName('宝马')">宝马</a>
              <span class="count">(7)</span>
            </li>
            <li class="cat-item cat-item-62">
              <a href="#" @click="byName('奥迪')">奥迪</a>
              <span class="count">(2)</span>
            </li>
            <li class="cat-item cat-item-42">
              <a href="#" @click="byName('AMG')">AMG GT</a>
              <span class="count">(14)</span>
            </li>
            <li class="cat-item cat-item-60">
              <a href="#" @click="byName('曜影')">曜影</a>
              <span class="count">(2)</span>
            </li>
            <li class="cat-item cat-item-63">
              <a href="#" @click="byName('添越')">添越</a>
              <span class="count">(2)</span>
            </li>
            <li class="cat-item cat-item-54">
              <a href="#" @click="byName('迈凯伦')">迈凯伦</a>
              <span class="count">(8)</span>
            </li>
            <li class="cat-item cat-item-55">
              <a href="#" @click="byName('库里南')">库里南</a>
              <span class="count">(11)</span>
            </li>
            <li class="cat-item cat-item-64">
              <a href="#" @click="byName('幻影')">幻影</a>
              <span class="count">(3)</span>
            </li>
            <li class="cat-item cat-item-41">
              <a href="#">其他</a>
              <span class="count">(17)</span>
            </li>
          </ul>
      
          <h3>类型</h3>
          <ul class="product-categories color">
            <li class="cat-item cat-item-42">
              <a href="#" @click="bySize('大型SUV')">大型SUV</a>
              <span class="count">(3)</span>
            </li>
            <li class="cat-item cat-item-60">
              <a href="#" @click="bySize('大型车')">大型车</a>
              <span class="count">(9)</span>
            </li>
            <li class="cat-item cat-item-63">
              <a href="#" @click="bySize('紧凑型MPV')">紧凑型MPV</a>
              <span class="count">(7)</span>
            </li>
            <li class="cat-item cat-item-54">
              <a href="#" @click="bySize('跑车')">跑车</a>
              <span class="count">(26)</span>
            </li>
            <li class="cat-item cat-item-55">
              <a href="#" @click="bySize('小型车')">小型车</a>
              <span class="count">(1)</span>
            </li>
            <li class="cat-item cat-item-54">
              <a href="#" @click="bySize('中大型SUV')">中大型SUV</a>
              <span class="count">(24)</span>
            </li>
          </ul>
        </div>
        <div class="col-md-8 model-mar">
          <div class="dreamcrub">
            <ul class="breadcrumbs">
              <li class="home">
                <a href="index.html" title="Go to Home Page">首页</a>&nbsp;
                <span>&gt;</span>
              </li>
              <li class="home">
                &nbsp;
                商品 &nbsp;
              </li>
            </ul>
            <ul class="previous">
              <li>
                <a href="index.html">返回首页</a>
              </li>
            </ul>
            <div class="clearfix"></div>
          </div>
          <div class="mens-toolbar">
            <div class="sort">
              <div class="sort-by">
                <label>排序</label>
                <select>
                  <option value>定位</option>
                  <option value>名字</option>
                  <option value>价格</option>
                </select>
                <a href>
                  <img src="../images/arrow2.gif" alt class="v-middle" />
                </a>
              </div>
            </div>
            <ul class="women_pagenation dc_paginationA dc_paginationA06">
              <li>
                <a href="#" class="previous">页码 :</a>
              </li>
              <li class="active">
                <a href="#">1</a>
              </li>
              <li>
                <a href="#">2</a>
              </li>
            </ul>
            <div class="clearfix"></div>
          </div>
          <div id="cbp-vm" class="cbp-vm-switcher cbp-vm-view-grid">
            <div class="cbp-vm-options">
              <a
                href="#"
                class="cbp-vm-icon cbp-vm-grid cbp-vm-selected"
                data-view="cbp-vm-view-grid"
                title="grid"
              >首页</a>
              <a
                href="#"
                class="cbp-vm-icon cbp-vm-list"
                data-view="cbp-vm-view-list"
                title="list"
              >尾页</a>
            </div>
            <div class="pages">
              <div class="limiter visible-desktop">
                <label>展示</label>
                <select>
                  <option value selected="selected">9</option>
                  <option value>15</option>
                  <option value>30</option>
                </select>
              </div>
            </div>
            <div class="clearfix"></div>
            <ul>
				<li v-for="(item) in goodsList" :key="item.id">
						<div class="view view-first">
							<div class="inner_content clearfix">
								<div class="product_image">
								<div class="mask1">
									<img
									v-bind:src="'https://images.weserv.nl/?url='+item.img"
									:alt="item.img"
									class="img-responsive zoom-img"
									/>
								</div>
								<div class="mask">
									<div class="info">详情</div>
								</div>
								<div class="product_container">
									<h4>{{item.name}}</h4>
									<p>{{item.size}}</p>
									<div class="price">{{item.pri}}万</div>
								</div>
								</div>
							</div>
						</div>
				</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import "./../assets/css/bootstrap.css";
import "./../assets/css/component.css";
import "./../assets/css/style.css";
import NavFooter from "./../components/NavFooter";
import NavHeader from "./../components/NavHeader";
import axios from "axios";

export default {
  data() {
    return {
      goodsList:[],
      sortflag: true,
      page: 1,
      pagesize: 8
    };
  },

  components: {
    NavFooter: NavFooter,
    NavHeader: NavHeader
  },
  mounted: function() {
    this.getgoodslist();
  },
  methods: {
    getgoodslist() {
      var param = {
        page: this.page,
        pagesize: this.pagesize,
        sor: this.sortflag ? 1 : -1
      };
      axios.get("/goods/list", { params: param }).then(result => {
        var res = result.data;
        if (res.status == "0") {
    
          this.goodsList = res.result.list;
          console.log(this.goodsList);
          // console.log(this.goodsList)
        } else {
          this.goodsList = [];
        }
      });
    },

    bySize(size){
      axios.get("/goods/bySize", {params:{size:size}}).then(result => {
        var res = result.data;
        if (res.status == "0") {
    
          this.goodsList = res.result;
          console.log(this.goodsList);
          // console.log(this.goodsList)
        } else {
          return;
        }
      });
    },

    byName(name){
      axios.get("/goods/byName", {params:{name:name}}).then(result => {
        var res = result.data;
        if (res.status == "0") {
    
          this.goodsList = res.result;
          console.log(this.goodsList);
          // console.log(this.goodsList)
        } else {
          return;
        }
      });
    },

    sortgoodslist() {
      this.sortflag = !this.sortflag;
      this.page = 1;
    }
  }
};
</script>