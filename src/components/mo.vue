<template>
<div>
  <div class="md-modal modal-msg md-modal-transition" v-bind:class="{'md-show':w}">
            <div class="md-modal-inner">
                <div class="md-top">
                    <button class="md-close" @click="closeMo">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <slot name="message"></slot>
                    </div>
                    <div class="btn-wrap">
                        <slot name="btnGroup"></slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="w" @click="closeMo"></div>
</div>
</template>

<script> 

    export default {
        props:["w"],
        data(){
            return{
                
            }
        },

        methods:{
            closeMo(){
                // 触发父组件中的close函数
                this.$emit("close");
                // 触发事件的方式为点击
                trigger("click");
            }
        }

    }
</script>

<style>

</style>