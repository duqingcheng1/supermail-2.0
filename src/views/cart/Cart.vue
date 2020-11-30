<template>
<div class="cart">
  <nav-bar class="nav-bar">
    <div slot="center">购物车({{length}})</div>
  </nav-bar>

<!--  商品的列表-->
  <cart-list></cart-list>
  <cart-bottom-bar/>
<!--  底部的汇总-->
</div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import CartList from "./childcomps/CartList";
import CartBottomBar from "./childcomps/CartBottomBar";
import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components:{
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length:'cartLength',
      list:'cartList'
    })
  }
}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: white;
  font-weight: 700;
  z-index: 9;
}
</style>
