export default {
//mutations修改state中的状态
addCounter(state,payload){
  payload.count++
},
addToCart(state,payload){
  payload.checked=false
  state.cartList.push(payload)
}
}
