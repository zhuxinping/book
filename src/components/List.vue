<template>
    <div>
      <MHeader :back="true">列表页</MHeader>
      <div class="content" ref="scroll" @scroll="loadMore">
        <ul>
          <router-link :to="{name:'detail',params:{bid:book.bookId}}" v-for="(book,index) in listBooks" :key="index" tag="li">
            <img v-lazy="book.bookCover" alt="">
            <div>
              <h4>{{book.bookName}}</h4>
              <p>{{book.bookInfo}}</p>
              <b>{{book.bookPrice}}</b>
              <button @click.stop="remove(book.bookId)">删除</button>
            </div>
          </router-link>
        </ul>
        <div @click.stop="more" class="more">加载更多</div>
      </div>
    </div>
</template>
<script>
  import MHeader from '../base/MHeader.vue';
  import {getAllBooks,removeBook,pagination} from '../api';
    export default {
        data() {
          //offset代表的是偏移量 hasMore代表是否有更多
            return {listBooks:[],offset:0,hasMore:true,loading:false}
        },
      created(){
          this.getData();
      },
      mounted(){
       /* this.$refs.scroll.addEventListener('scroll',function () {

        });*/
       let scroll=this.$refs.scroll;//获取到要拖拽的元素
         let top=scroll.offsetTop;
         let distance=0;
         scroll.addEventListener('touchstart',(e)=>{
           //滚动条在最顶端时 或者当盒子在顶端的时候才继续走
           if(scroll.scrollTop !=0||scroll.offsetTop!=top) return;
           let start=e.touches[0].pageY;//手指点击的开始
           let move=(e)=>{
               let current=e.touches[0].pageY;
                distance=current-start;//拉动的距离(负的不要)
               if(distance>0){//如果大于50px就设置为50px
                 if(distance<=50){
                   scroll.style.top=distance+top+'px';
                 }else{
                   distance=50;
                   scroll.style.top=top+50+'px';
                 }
               }else{
                 //如果不在考虑范围内应该移除move和end事件
                 scroll.removeEventListener('touchmove',move);
                 scroll.removeEventListener('touchend',end);
               }
           };
           let end=()=>{
             clearInterval(this.timer1);
            this.timer1 = setInterval(()=>{//一共distance每次减去1
               if(distance<=0){
                 clearInterval(this.timer1);
                 distance=0;
                 scroll.style.top=top+'px';
                 scroll.removeEventListener('touchmove',move);
                 scroll.removeEventListener('touchend',end);
                 //console.log('获取数据');
                 this.listBooks=[];//先清空数据再加载数据
                 this.offset=0;
                 this.getData();
                 console.log(this.listBooks);
                 return;
               }
               distance-=1;
             scroll.style.top=top+distance+'px';
             },1);
           };
           scroll.addEventListener('touchmove',move);
           scroll.addEventListener('touchend',end);
         },false);
      },
        methods: {
        loadMore(){
          //触发滚动事件 可能触发n次 先进来开一个定时器 下次触发时将上一个定时器清除
          clearTimeout(this.timer);//节流
          this.timer=setTimeout(()=>{
            let {scrollTop,clientHeight,scrollHeight}=this.$refs.scroll;
            if(scrollTop+clientHeight+20>scrollHeight){
              this.getData();//滚动加载更多
            }
          },60)
        },
        more(){
          this.getData();
        },
        async remove(id){
            await removeBook(id);//删除某一项
            //要删除前台数据
            this.listBooks=this.listBooks.filter(item=>item.bookId!==id);
        },
         async getData(){//这里可以try catch
            //this.listBooks=await getAllBooks();
           if(this.hasMore&&!this.loading){//有更多的时候获取更多
             this.loading=true;
             let {hasMore,books}=await pagination(this.offset);
             this.listBooks=[...this.listBooks,...books];//新书加老书
             this.hasMore=hasMore;
             this.loading=false;//加载完毕
             this.offset=this.listBooks.length;//维护偏移量就是总书的长度
           }
          }
        },
        computed: {},
        components: {
          MHeader
        }
    }
</script>
<style scoped lang="less">
.content{
  ul{
    padding: 10px;
    li{
      display: flex;
      padding: 10px 0;
      border-bottom: 1px solid #f1f1f1;
      img{
        width: 130px;
        height: 150px;
      }
      div{
        h4{
          font-size: 20px;
          line-height: 35px;
        }
        p{
          line-height: 25px;
          color:#2a2a2a;
        }
        b{
          color:red;
        }
        button{
          display: block;
          width: 60px;
          height: 35px;
          background: orangered;
          color:#fff;
          border: none;
          border-radius: 5px;
          outline: none;
        }
      }
    }
  }
}
.more{
  margin: 10px;
  background: #2afedd;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 25px;
  color:#fff;
}
</style>
