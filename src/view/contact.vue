<template>
<div>
    <nav-header></nav-header>
    <div class="men">
   	 <div class="container">
   	  <div class="grid_1">
	   	  <h1>联系资料</h1>
	   	  <p>从广义上讲，如果一件事物能使另一件事物发生改变，那么这两件事物便有联系，任何事物间的联系都会构成框架，事物能够依次联系抽象概念的数量就是事物的维度。</p>
      </div>
      
      <div class="grid_2 preffix_1">
	      <ul class="iphone">
	      	<i class="phone"> </i>
	      	<li class="phone_desc">电话 : +1 800 245 2365 </li>
	      	<div class="clearfix"> </div>
	      </ul>
	      <ul class="iphone">
	      	<i class="flag"> </i>
	        <li class="phone_desc">网址 : <a href="#">www.demolink.com</a></li>
	      	<div class="clearfix"> </div>
	      </ul>
	  </div>
	  <div class="grid_3">
	      <ul class="iphone">
	      	<i class="msg"> </i>
	        <li class="phone_desc">邮箱 : <a href="malito:mail@demolink.com">455501628@qq.com</a> </li>
	      	<div class="clearfix"> </div>
	      </ul>
	      <ul class="iphone">
	      	<i class="home"> </i>
	        <li class="phone_desc">地址 : 山东省青岛市胶州市福州南路 </li>
	      	<div class="clearfix"> </div>
	      </ul>
	  </div>
	  <div class="clearfix"> </div>
	 </div>
	 <div class="contact_form">
	 	<h2>反馈</h2>
	    <form method="post" action="contact-post.html">
					<div class="col-md-6 to">
                     	<input type="text" class="text" value="姓名" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Name';}">
					 	<input type="text" class="text" value="邮箱" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Email';}">
					 	<input type="text" class="text" value="主题" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Subject';}">
					</div>
					<div class="col-md-6 text">
	                   <textarea value="信息" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Message';}">信息</textarea>
	                </div>
	                <div class="clearfix"></div>
	                <div class="but__center"><input type="submit" value="发送信息 &gt;&gt;"></div>
        </form>
     </div>
    </div>
    <nav-footer></nav-footer>
</div>
</template>
<script>
import './../assets/css/bootstrap.css'
import './../assets/css/component.css'
import './../assets/css/style.css'
import NavFooter from './../components/NavFooter'
import NavHeader from './../components/NavHeader'
    
    export default {
        data(){
            return{

            }
        },
        components:{
            NavFooter:NavFooter,
            NavHeader:NavHeader,
        }
    }
</script>