<template>
  <!-- ref/children-->
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>
</template>

<script>
import BScroll from "../../../../../11betterscroll/better-scroll.esm";
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default:0
      },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return{
      scroll:null
    }
  },
  mounted() {
    // 创建 Bscroll对象
    this.scroll =new BScroll(this.$refs.wrapper,{
      click:true,
      probeType: this.probeType,
      // probeType:3
      pullUpLoad: this.pullUpLoad
    })
    // 2、监听滚动的位置
    this.scroll.on('scroll',(postion)=>{
      // console.log(postion);
      this.$emit('scroll',postion)
    })
    //监听scroll 滚动到底部
    if (this.pullUpLoad){
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
    }
  },
  methods:{
    scrollTo(x,y,time=300){
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    },
    getScrolly(){
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
