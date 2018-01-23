<template>
    <div>
      <MHeader>首页</MHeader>
     <div class="content">
         <Loading v-if="loading">疯狂加载中</Loading>
      <template v-else>
          <Swiper :swiperSlides="sliders"></Swiper>
          <div class="container">
              <h3>热门图书</h3>
              <ul class="book-list">
                  <li v-for="(item,index) in hotBooks" :key="index" >
                      <img :src="item.bookCover" alt="">
                      <b>{{item.bookName}}</b>
                  </li>
              </ul>
          </div>
      </template>
     </div>
    </div>
</template>
<script>
  //1.引入组件 2.注册组件3.使用组件
  import MHeader from '../base/MHeader.vue';
  import Swiper from '../base/Swiper.vue';
  import Loading from'../base/Loading.vue';
  import {getAll,getSliders,getHotBooks} from '../api';//轮播图接口
    export default {
       created(){
          //this.getBanner();//获取轮播图
          //this.getHot();//获取图书列表
           this.getData();

      },
        data() {
            return {sliders:[],hotBooks:[],loading:true}
        },
        methods: {
        /* async getBanner(){
          //给data起别名对象中属性名字必须和得到结果名字一致
          //对象解构赋值
          //起个别名
           this.sliders=await getSliders();//promise实例
          //console.log(sliders);
          //将获取的数据放到sliders
        },
          async getHot(){
            this.hotBooks=await getHotBooks();//获取图书
          }*/
         async getData(){
            let [sliders,hotBooks]= await getAll();//[]
             this.sliders=sliders;
             console.log(sliders);
             this.hotBooks=hotBooks;//轮播图和热门图书完成请求
             this.loading=false;
             //console.log(hotBooks);
         }
        },
        computed: {},
        components: {
          MHeader,
          Swiper,
          Loading
        }
    }
</script>
<style scoped lang="less">
  h3{
    color:#999;
    padding: 5px 0;
  }
.container{
  width: 90%;
  margin: 0 auto;
  ul{
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 10px;
    li{
      width: 50%;
      text-align: center;
      margin: 5px 0;
      img{
        width: 100%;
      }
    }
  }
}
</style>
