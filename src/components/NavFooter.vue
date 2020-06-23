<template>
  <div class="footer">
      <div class="container">
        <div class="cssmenu">
          <ul>
            <li class="active">
              <a href="#">隐私</a>
            </li>
            <li>
              <a href="#">条款</a>
            </li>
            <li>
              <a href="#">店铺</a>
            </li>
            <li>
              <a href="#">关于</a>
            </li>
            <li>
              <router-link v-bind:to="{name:'contact'}">联系</router-link>
            </li>
          </ul>
        </div>
        <ul class="social">
          <li>
            <a href>
              <i class="instagram"></i>
            </a>
          </li>
          <li>
            <a href>
              <i class="fb"></i>
            </a>
          </li>
          <li>
            <a href>
              <i class="tw"></i>
            </a>
          </li>
        </ul>
        <div class="clearfix"></div>
        <div class="copy">
          <p>
            Copyright &copy; 2016.Company name All rights reserved.
          </p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    data(){
      return{
        msg:'hello vue'
      }
    },
    methods:{
      
    }
}
</script>