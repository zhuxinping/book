<template>
    <div class="footer">
      <router-link to="/home">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </router-link>
      <router-link to="/list">
        <i class="iconfont icon-yewubaobiao"></i>
        <span>列表</span>
      </router-link>
      <router-link to="/collect">
        <i class="iconfont icon-shoucang"></i>
        <span>收藏</span>
      </router-link>
      <router-link to="/add">
        <i class="iconfont icon-add"></i>
        <span>增加</span>
      </router-link>
    </div>
</template>
<!--
display:flex;
flex-direction:row/column;
justify-content:center;垂直居中
align-item:center;横向居中
flex:1;
/home /home               /home/a  /home
router-link-exact-active router-link-active
-->
<style scoped lang="less">
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    border-top: 1px solid #ccc;
    a{
      display: flex;
      color:yellowgreen;
      flex-direction: column;
      flex:1;
      align-items: center;
      justify-content: center;
    }
    a.router-link-active{
      color:#f90;
    }
  }
</style>
