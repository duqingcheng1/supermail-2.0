<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageload">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "../../../components/common/swper";

export default {
  name: "HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      isload:false
    }
  },
  components:{
    Swiper,
    SwiperItem,
  },
  methods:{
    imageload(){
      if(!this.isload) {
        this.$emit('swiperimageload')
        this.isload=true
      }
    }
  }
}
</script>

<style scoped>

</style>
