<template>
    <header class="container">
        <ul class="menu">
            <li><a href="">首页</a></li>
            <li>
                <router-link v-bind:to="{name:'goodslist'}">商品</router-link>
            </li>
            <li><a href="#">即将来临</a>
                <ul class="submenu">
                    <li><a href="#">奥迪</a></li>
                    <li><a href="#">宝马</a></li>
                    <li><a href="#">美洲虎</a></li>
                    <li><a href="#">兰博基尼</a></li>
                    <li><a href="#">法拉利</a></li>
                    <li><a href="#">劳斯莱斯</a></li>
                </ul>
            </li>
            <li><router-link v-bind:to="{name:'brands'}">资讯</router-link></li>
            <li><a href="#">新闻</a></li>
            <li><router-link v-bind:to="{name:'models'}">其他</router-link></li> 
            <li><router-link to="/cart">购物车</router-link></li>
        </ul> 
        <div class="nav-bar">
            <div class="logo">
                <a href="/"><img src="/static/logo.png" alt=""></a>
            </div>
        </div>
        <div class="nav-cart">
            <span v-text="nickName" v-if="nickName"></span>
            <a href="javascript:;" @click="()=>{loginModalFlag=true}" v-if="!nickName">登录</a>
            <a href="javascript:;" @click="logOut" v-if="nickName">退出</a>
            <a href="javascript:;">
                <svg>
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
                </svg>
            </a>
        </div>
        <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':loginModalFlag}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">登录</div>
                    <button class="md-close" @click="()=>{loginModalFlag=false}">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <div class="error-wrap">
                            <span class="error error-show" v-show="errorTip">用户名或密码错误</span>
                        </div>
                        <ul>
                            <li class="regi_form_input">
                                <i class="icon IconPeople"></i>
                                <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input">
                            </li>
                            <li class="regi_form_input noMargin">
                                <i class="icon IconPwd"></i>
                                <input type="password" tabindex="2" name="password" v-model="userPwd" @keyup.enter="login" class="regi_login_input">
                            </li>
                        </ul>
                    </div>
                    <div class="login-wrap">
                        <a href="javascript:;" class="btn-login" @click="login">登录</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="loginModalFlag" @click="()=>{loginModalFlag=false}"></div>
    </header>
</template>

<script>
    import './../assets/css/login.css'
    import axios from 'axios'

    export default{
        data(){
            return{
                userName:'',
                userPwd:'',
                errorTip:false,
                loginModalFlag:false,
                nickName:''
            }
        },
        // 生命周期初始化
        mounted(){
            this.checkLogin();
        },



        methods:{
            checkLogin(){
                axios.get("/users/checkLogin").then((response)=>{
                    let res=response.data;
                    // 0成功
                    if(res.status=='0'){
                        this.nickName = res.result;
                    }
                });
            },


            login(){
                if(!this.userName||!this.userPwd){
                    this.errorTip = true;
                    return;
                }
                axios.post("/users/login",{
                    userName:this.userName,
                    userPwd:this.userPwd
                }).then((response)=>{
                    let res = response.data;
                    console.log(res)
                    if(res.status=="0"){
                        this.errorTip = false;
                        this.loginModalFlag = false;
                        this.nickName = res.result.userName;
                    }else{
                        this.errorTip = true;
                    }
                }).catch((response)=>{
                    this.errorTip = true;
                })
            },
            logOut(){
                axios.post("/users/logout").then((response)=>{
                    let res=response.data;
                    if(res.status=='0'){
                        this.nickName = '';
                    }
                })
            }
        },

    }
</script>


<style>
*{
    padding: 0;
    margin: 0;
    list-style: none;
}
.container{
    margin: 30px auto;
    width: 70%;
}
.container .menu>li{
    float: left;
    position: relative;
}
.container .menu>li:first-child{
    border-radius: 5px 0 0 0;
}
.container .menu li{
    min-width: 140px;
    background:linear-gradient(#3d3838,#999999);
}
.container .menu a{
    display: block;
    text-decoration: none;
    text-align: center;
    color: black;
    padding: 0 25px;
    font-size: 18px;
    line-height: 36px;
    border-left: 3px solid rgb(0, 0, 0,0);
    text-transform: uppercase;
}
.menu li:hover{
    background:linear-gradient(#111111,#424242);
}
.menu li:hover>a{
    color: white;
    border-left: 3px solid white;
}
.submenu{
    position: absolute;
    max-height: 0;
    left: 0;
    top: 100%;
    perspective: 1000px;
}
.submenu li{
    transform-origin: 0 0;
    visibility: hidden;
    transform: rotate3d(0,1,0,90deg);
    transition: all 0.5s;
}
.menu>li:hover .submenu{
    max-height: 999px;
    z-index: 10;
}
.menu>li:hover .submenu li{
    visibility: visible;
    transform: rotate3d(0,0,0,0);
}
.submenu li:nth-child(1){
    transition-delay: 0ms;
}
.submenu li:nth-child(2){
    transition-delay: 50ms;
}
.submenu li:nth-child(3){
    transition-delay: 100ms;
}
.submenu li:nth-child(4){
    transition-delay: 150ms;
}
.submenu li:nth-child(5){
    transition-delay: 200ms;
}
.submenu li:nth-child(6){
    transition-delay: 250ms;
}

</style>