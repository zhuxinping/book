<template>
    <div class="header">
      <slot></slot>
      <i class="iconfont icon-fanhui" @click="goBack" v-if="back"></i>
    </div>
</template>
<script>
    export default {
      props:{
          back:{
            type:Boolean,
            default:false
          }
      },
        methods: {
          goBack(){
            this.$router.go(-1);
          }
        },
        computed: {},
        components: {}
    }
</script>
<style scoped lang="less">
.header{
  background: #afd9ee;
  height:40px;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  i{
    position: absolute;
    left: 10px;
    font-size: 20px;
  }
}
</style>
