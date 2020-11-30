<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
                 :titles="['流行','新款','精选']"
                 @tabclick="tabclick"
                 ref="tabControl1"
                 class="tab-contorl"
                 v-show="istabfixed"
    />
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentscorll"
            :pull-up-load="true"
            @pullingUp="loadmore">
      <home-swiper :banners="banners" @swiperimageload="swiperimageload"/>
      <home-recommend-view :recommends="recommensds"></home-recommend-view>
      <Feature></Feature>
      <tab-control :titles="['流行','新款','精选']"
                   @tabclick="tabclick"
                   ref="tabControl2"
      />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backclick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import scroll from "../../components/common/scroll/Scroll";
import NavBar from "../../components/common/navbar/NavBar";
import {getHomeMultidata} from "../../network/home";
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommendView from "./childComps/HomeRecommendView";

import {getHomegoods} from "../../network/home";
import Feature from "./childComps/Feature";
import TabControl from "../../components/content/tbcontorl/TabControl";

import {debounce} from "../../common/utils";
import goodsList from "../../components/content/goods/goodsList";
import BackTop from "../../components/content/back top/BackTop";
import {itemListenerMixin,BackTopMixin} from "../../common/mixin";

export default {
  name: "Home",
  components:{
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    Feature,
    TabControl,
    goodsList,
    scroll,
    BackTop

  },
  mixins:[itemListenerMixin,BackTopMixin],
  data(){
    return{
     banners:[],
      recommensds:[],
      goods:{
       'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]},
      },
      currentType:'pop',
      taboffsettop:0,
      istabfixed:false,
      saveY:0,
    }

  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
},
  destroyed() {
    console.log('home destroyed');
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,50)
    this.$refs.scroll.refresh()


  },
  deactivated() {

    //保存y值
    this.saveY=this.$refs.scroll.getScrolly()
    //2.取消全局事件的监听

  },
  created() {
    console.log('home create');
    //1、请求多个数据
    this.getHomeMultidata()

      // this.result=res;})
      //请求商品数据
    this.getHomegoods('pop')
     this.getHomegoods('new')
     this.getHomegoods('sell')
    this.$bus.$on('itemimgload',()=>{
      this.$refs.scroll.refresh()
    })

  },
  mounted() {
   //  //1 图片加载完成的事件监听
   //
   // const refresh =debounce( this.$refs.scroll.refresh,200)
   //  // 监听item中图片加载完成
   //  // this.$bus.$on('itemimglod',()=>{
   //  //   refresh()
   //  //   //2 获取tabcontrol的offsetup
   //  //   //所有的组件都有一个属性
   //  // })
   // this.itemImgListener=()=>{
   //    newrefresh()
   //   }
   //  this.$bus.$on('itemimglod',this.itemImgListener)
  },

  methods:{
    loadmore(){
      this.getHomegoods(this.currentType)
    },
    /*
    * 事件监听相关方法
    * */
    tabclick(index){
     switch (index){
       case 0:
         this.currentType='pop'
         break
       case 1:
         this.currentType='new'
         break
       case 2:
         this.currentType='sell'
         break
     }

     if (this.$refs.tabControl1 !==undefined){
     this.$refs.tabControl1.currentindex=index
      this.$refs.tabControl2.currentindex=index
     }
    },
    backclick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentscorll(postion){
      //判断backtop 是否显示
      this.isShowBackTop=-(postion.y)>1000
      //决定tabcontrol是否吸顶
      this.istabfixed=-(postion.y)>this.taboffsettop
    },

    /*
    * 网络请求
    * */
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
        this.banners=res.data.banner.list;
        this.recommensds=res.data.recommend.list;

      })
    },
    getHomegoods(type){
      const page=this.goods[type].page+1
      getHomegoods(type,page)
        .then(res=>{
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1

          //完成上拉加载更多
          this.$refs.scroll.finishp()

        })
    },
    swiperimageload(){
      //
      this.taboffsettop=this.$refs.tabControl2.$el.offsetTop
    }
  }
}
</script>

<style scoped>
#home{
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: white;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}
.tab-contorl{
  position: relative;
  z-index: 9;
}
.content{
  /*height: 300px;*/
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/*.content{*/
/*  height: calc(100% - 93px );*/
/*  overflow:hidden;*/
/*  margin-top: 48px;*/
/*}*/
</style>
