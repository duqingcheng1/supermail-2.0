import Toast from "./Toast";
const obj={}

obj.install=function (Vue){
  // console.log(Toast.$el);
  // document.body.appendChild(Toast.$el)
  //
  //1 创建组件构造器
  const toastContrustor = Vue.extend(Toast)

  // new 方式 根据组件构造器 可以创建一个组件对象
  const toast = new toastContrustor()

  //将组件对象 手动挂载道到某一个元素上

  toast.$mount(document.createElement('div'))

  //toast $el对应的就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}
export default obj
