export default {
  addCart(context,payload){

    //payload新添加的商品
    // for (let item of state.cartList){
    //   if (item.iid===payload.iid){
    //     oldProduct = item
    //   }
    // }
    //数组的常用方法有哪些   push/pop/unshift/shift/sort/reverse/map/filter/reduce/join

    //查找之前数组中是否有该商品
   return new Promise((resolve,reject)=>{
     let oldProduct = context.state.cartList.find(function (item){
       return item.iid ===payload.iid
     })
     //判断oldProduct
     if (oldProduct){
       // oldProduct.count +=1
       context.commit('addCounter',oldProduct)
       resolve('当前的商品数量+1')
     }else {
       payload.count =1
       context.commit('addToCart',payload)
       resolve('添加了新的商品')


     }
   })

  }


}
