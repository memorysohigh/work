<template>
  <mo :w="isshow" @close="closeMo">
    <div slot="message"></div>
    <div slot="btnGroup">
      <a href="javascript:;" class="btn btn--m" @click="home">确认</a>
      <a href="javascript:;" class="btn btn--m" @click="quxiao">取消</a>
    </div>
  </mo>
</template>

<script>
import "./../assets/css/base.css";
import mo from "./../components/mo";
import axios from "axios";
export default {
  data() {
    return {
      isshow: true,
      orderId: this.$route.query.orderId
    };
  },
  components: {
    mo: mo
  },
  mounted() {
    this.init();
  },
  methods: {
    // init() {
    //   axios.post("users/getOrder", { orderId: this.orderId }).then(response => {
    //     let res = response.data;
    //     if (res.status == "0") {
    //       this.orderList = res;
    //       console.log(res);
    //     } else {
    //       alert("确认订单失败");
    //     }
    //   });
    // },
    closeMo() {
      this.isshow = false;
    },
    quxiao() {
      this.$router.push({
        path: "/orderConfirm"
      });
    },
    home() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style>
</style>