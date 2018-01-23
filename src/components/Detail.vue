<template>
    <div class="detail">
      <MHeader :back="true">详情页</MHeader>
      <div>
        <ul>
          <li>
            <label for="bookName">书的名称</label>
            <input type="text" v-model="book.bookName" id="bookName">
          </li>
          <li>
            <label for="bookInfo">书的信息</label>
            <input type="text" v-model="book.bookInfo" id="bookInfo">
          </li>
          <li>
            <label for="bookPrice">书的价格</label>
            <input type="text" v-model.number="book.bookPrice" id="bookPrice">
          </li>
          <li>
            <button @click="update">确认修改</button>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue';
  import {bookDetail,updateBook}  from '../api';
    export default {
        data() {
            return {book:{}}
        },
      watch:{
          $route(){
           this.getData();//只要路径变化 重新获取数据
         }
      },
      created(){
          //页面一加载就要根据id发送请求
          this.getData();
      },
        methods: {
          async update(){//点击修改图书信息
           await updateBook(this.bid,this.book);//这里异步请求完毕才会继续执行下面的
           this.$router.push('/list');//修改完成后跳转页面
          },
          async getData(){//通过id找到某一项后赋给book数据
            this.book=await bookDetail(this.bid);
            //如果是空对象需要跳转会列表页
            Object.keys(this.book).length>0?void 0:this.$router.push('/list');
          }
        },
        computed: {
          bid(){
            return this.$route.params.bid;
          }
        },
        components: {MHeader}
    }
</script>
<style scoped lang="less">
  .detail{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 100;
    div{
      ul{
        margin: 0 10px;
        li{
          label{
            display: block;
            font-size: 25px;
          }
          input{
            margin: 10px 0;
            height: 25px;
            width: 100%;
            outline: none;
          }
          button{
            display: block;
            width: 120px;
            height: 35px;
            background: #2aabd2;
            color:#fff;
            border: none;
            border-radius: 5px;
            outline: none;
          }
        }
      }
    }
  }
</style>
