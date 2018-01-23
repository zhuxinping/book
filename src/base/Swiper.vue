<template>
  <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide v-for="(slide,index) in swiperSlides" :key="index">
      <img :src="slide" alt="">
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carousel',
    props:['swiperSlides'],
    data() {
      return {
        swiperOption: {
          autoplay:true,
          setWrapperSize:true,
          pagination: {
            el: '.swiper-pagination'
          },
          observeParents:true,
        },
      }
    }
  }
</script>
<style scoped>
  img{
    width: 100%;
  }
</style>
