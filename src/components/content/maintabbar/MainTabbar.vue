<template>

    <tab-bar>
      <tab-baritem path="/home" activecolor="blue">
        <img slot="item-icon" src="~assets/img/tabbar/home.png" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/home2.png" alt="">
        <div slot="item-text">首页</div>
      </tab-baritem>
      <tab-baritem path="/category" activecolor="blue">
        <img slot="item-icon" src="../../../assets/img/tabbar/分类.png" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/分类(1).png" alt="">
        <div slot="item-text">分类</div>
      </tab-baritem>
      <tab-baritem path="/cart" activecolor="blue">
        <img slot="item-icon" src="../../../assets/img/tabbar/购物车.png" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/购物车(1).png" alt="">
        <div slot="item-text">购物车</div>
      </tab-baritem>
      <tab-baritem path="/profile" activecolor="blue">
        <img slot="item-icon" src="../../../assets/img/tabbar/我的.png" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/我的(1).png" alt="">
        <div slot="item-text">我的</div>
      </tab-baritem>

    </tab-bar>

</template>

<script>
import TabBar from "../../common/tabbar/TabBar";
import TabBaritem from "../../common/tabbar/TabBaritem";
export default {
  name: "MainTabbar",
  components:{
    TabBar,
    TabBaritem

  }
}
</script>

<style scoped>

</style>
