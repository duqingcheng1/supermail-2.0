<template>
<div>
  <nav-bar>
    <div slot="left" class="back" @click="backclick">
     <img src="../../../assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles"
           class="title-item"
      :class="{active:index===currentIndex }"
      @click="titleclick(index)">{{item}}</div>
    </div>
  </nav-bar>
</div>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar";
export default {
  name: "DetailNavbar",
  components:{
    NavBar
  },
  data(){
    return{
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods:{
    titleclick(index){
      this.currentIndex=index
      this.$emit('titleclick',index)
    },
    backclick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.title{
  display: flex;
  font-size: 13px;
}
.title-item{
  flex: 1;
}
.active{
  color: red;
}
.back img{
  margin-top: 13px;
}
</style>
