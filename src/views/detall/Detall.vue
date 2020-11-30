<template>
  <div id="detail">
    <DetailNavbar class="detail-nav" @titleclick="titleclick"  @backclick="backclick" ref="nav"/>
    <scroll class="content" ref="scroll" @scroll="contentscroll" :probe-type="3">
      <!--   <ul>-->
      <!--     <li v-for="item in $store.state.cartList">-->
      <!--       {{item}}-->
      <!--     </li>-->
      <!--   </ul>-->

      <detail-swiper :top-images="topimges"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <detail-bottom-bar @addCart="addCart"/>
    <back-top @click.native="backclick" v-show="isShowBackTop"/>
<!--    <toast :message='message' :show="show"></toast>-->
  </div>
</template>

<script>
import DetailNavbar from "./chidcomps/DetailNavbar";
import {getDetail, Goods, shop, GoodsParam, getRecommend} from "../../network/detail";
import DetailSwiper from "./chidcomps/DetailSwiper";
import DetailBaseInfo from "./chidcomps/DetailBaseInfo";
import DetailShopInfo from "./chidcomps/DetailShopInfo";
import Scroll from "../../components/common/scroll/Scroll";
import DetailGoodsInfo from "./chidcomps/DetailGoodsInfo";
import DetailParamInfo from "./chidcomps/DetailParamInfo";
import DetailCommentInfo from "./chidcomps/DetailCommentInfo";
import goodsList from "../../components/content/goods/goodsList";
import DetailBottomBar from "./chidcomps/DetailBottomBar";
import BackTop from "../../components/content/back top/BackTop";

// import Toast from "../../components/common/toast/Toast";
import {itemListenerMixin, BackTopMixin} from "../../common/mixin";
import {debounce} from "../../common/utils";

// import {mapActions} from 'vuex'

export default {
  name: "Detall",
  components: {
    DetailNavbar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    goodsList,
    DetailBottomBar,
    BackTop,
    // Toast
  },
  mixins: [itemListenerMixin, BackTopMixin],
  data() {
    return {
      iid: null,
      topimges: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopY: [],
      getThemeTopY: null,
      isLoad: true,
      // message:'',
      // show:false,
    }
  },
  methods: {
    // ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.refresh()
      this.getThemeTopY()
    },
    itemimgload() {
      this.$refs.scroll.refresh()

    },
    titleclick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200)
    },
    backclick() {
      this.topimges = []
      this.$router.back()
      this.$refs.scroll.scrollTo(0, 0)
    },
    addCart() {
      //获取购物车需要的信息
      const product = {}
      product.image = this.topimges[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      //将商品添加到购物车
      // this.$store.cartList.push(product)
      // this.$store.commit('addCart',product)

      // this.addCart(product).then(res=>{
      //   console.log(res);
      //
      // })
      this.$store.dispatch('addCart', product).then(res => {

        this.$toast.show(res,2000)
        // this.show=true
        // this.message=res
        //   setTimeout(()=>{
        //     this.show=false
        //   },1000)
        // })
      })

    },
    contentscroll(postion) {
      const positionY = -postion.y

      let length = this.themeTopY.length
      for (let i = 0; i < length; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopY[i] &&
          positionY < this.themeTopY[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
          this.$refs.scroll.refresh()
        }


        // parseInt(i)
        // if (positionY >this.themeTopY[i] && positionY <this.themeTopY[i+1]){
        //   console.log(i);
        // }
        // if (( i<length-1&& positionY> this.themeTopY[i] && positionY <
        //   this.themeTopY[i+1]) || (i===length-1 && positionY >this.themeTopY[i])){
        //   console.log(i);}

        // if (this.currentIndex!==i &&(( i<length-1&& positionY>= this.themeTopY[i] && positionY <
        //     this.themeTopY[i+1]) || (i===length-1 && positionY >=this.themeTopY[i]))){
        //   this.currentIndex=i
        //   this.$refs.nav.currentIndex=this.currentIndex
        // }

      }

      this.isShowBackTop = -(postion.y) > 1000


    },
  },
  created() {
    this.iid = this.$route.params.iid
    //请求详情数据
    getDetail(this.iid).then(res => {

      const data = res.result;
      //1 获取顶部的图片轮播数据
      this.topimges = res.result.itemInfo.topImages
      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      //创建店铺信息
      this.shop = new shop(data.shopInfo)
      //保存商品的详情数据
      this.detailInfo = data.detailInfo
      //获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //取得评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0]
      }


      this.getThemeTopY = debounce(() => {
        this.themeTopY = []
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.params.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopY);
        this.themeTopY.push(Number.MAX_VALUE)
      })


    })
    //请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  // }, watch: {
  //   $route(to, from) {
  //
  //     if (to.path == "/home")
  //       return
  //
  //
  //
  //     // 4、监听详情的图片加载完成
  //
  //     //
  //     // this.$nextTick(()=>{
  //     //   this.themeTopY =[]
  //     //   this.themeTopY.push(0);
  //     //   this.themeTopY.push(this.$refs.params.$el.offsetTop);
  //     //   this.themeTopY.push(this.$refs.comment.$el.offsetTop);
  //     //   this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
  //     //   console.log(this.themeTopY);
  //     // })
  //   }
  // },
  mounted() {

  },
  updated() {
    // this.themeTopY =[]
    // this.themeTopY.push(0);
    // this.themeTopY.push(this.$refs.params.$el.offsetTop);
    // this.themeTopY.push(this.$refs.comment.$el.offsetTop);
    // this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopY);

  },
  destroyed() {
    this.$bus.$off('itemimgload', this.itemImgListener)
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px);
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
