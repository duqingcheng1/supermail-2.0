import {debounce} from "./utils";
import BackTop from "../components/content/back top/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newrefresh: null
    }
  },
  mounted() {
    this.newrefresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgListener = () => {
      this.newrefresh()

    }
    this.$bus.$on('itemimgload', this.itemImgListener)
    console.log(this.iid);
  },

}
export const BackTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }

  },
  methods: {
    backclick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
  }

}
