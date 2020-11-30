<template>
<div class="cart-list">
<scroll class="content">
<!--  <li v-for="item in cartList">{{item}}</li>-->
  <cart-listitem
    v-for="(item,index) in cartList"
    :item="item"
    :key="index"/>
</scroll>
</div>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll";
import {mapGetters} from 'vuex'
import CartListitem from "./CartListitem";
export default {
name: "CartList",
  components:{
    Scroll,
    CartListitem
  },
  computed:{
  ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>
.cart-list{
  height: calc(100% - 44px - 49px - 40px );
}
.content{
  height: 100%;
  overflow: hidden;
}
</style>
