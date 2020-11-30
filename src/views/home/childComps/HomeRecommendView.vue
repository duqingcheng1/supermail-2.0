<template>
<div class="recommend">
  <div class="recommend-item" v-for="item in recommends">
    <a :href="item.line">
      <img :src="item.image" alt="">
      <div>{{item.title}}</div>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: "HomeRecommendView",
  props:{
    recommends:{
      type:Array,
      default(){

      }
    }
  }
}
</script>

<style scoped>
.recommend{
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 6px solid #ccc;
}
.recommend-item{
  flex: 1;
}
.recommend-item img{
  width: 65px;
  height: 65px;
  margin-bottom: 10px;

}
</style>
