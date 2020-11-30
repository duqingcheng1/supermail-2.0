import Vue from 'vue'
import Vuex from 'vuex'

import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
//安装插件
Vue.use(Vuex)

const state={
  cartList:[]
}
//创建store对象
const store =new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

//挂载到vue实例上
export default store

