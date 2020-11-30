<template>
    <div class="tab-bar-item" @click="itemclick">
      <div v-if="!isActive" > <slot name="item-icon"></slot></div>
      <div v-else  > <slot name="item-icon-active"></slot></div>
      <div :style="activestyle" >
      <slot name="item-text"></slot>
      </div>
      <!--      <img src="../../assets/img/tabbar/home.png"alt="">-->
<!--      <div>首页</div>-->
    </div>
</template>

<script>
export default {
  name: "TabBaritem",
  props:{
    path:String,
    activecolor:{
      type:String,
      default:'red'
    }
  },
  data(){
    return{
      // isActive: true
    }
  },
  computed:{
    isActive(){
      //home >item1
      return this.$route.path.indexOf(this.path)!==-1
    },
    activestyle(){
      return this.isActive?{color:this.activecolor}:{}
    }
  },
  methods:{
    itemclick(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  font-size: 14px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;

}

</style>
