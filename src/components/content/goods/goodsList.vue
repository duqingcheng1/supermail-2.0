<template>
<div class="goods">
  <goods-listitem v-for="item in goods" :goods-item="item"/>
</div>
</template>

<script>
import goodsListitem from "./goodsListitem";
export default {
name: "goodsList",
  components:{
    goodsListitem
  },
  props:{
    goods: {
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 2px;
}

</style>
