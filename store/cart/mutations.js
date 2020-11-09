export default {

  fillCart(state, data) {
    state.items = data;
  },

  setCartCount(state, count) {
    state.count = count;
  },

  setLoader(state, value) {
    state.loading = value;
  },

  updateCartDetails(state, info) {
    let item = state.items.find(item => item.id == info.id)

    let event = info.checked
    let param = info.param;

    if(!event.target.checked) {
      item = Object.assign({}, item, {[param]:0});
    }
    else {
      item = Object.assign({}, item, {[param]:15});
    }

    state.items = Object.assign({}, state.items, item)

  },

  updateCartItem(state, item) {
    let state_item = state.items.find(state_item => item.id == state_item.id)
    Object.assign(state_item, item)
  },

  updateCartCharges(state, item) {
    let state_item = state.items.find(state_item => item.id == state_item.id)
    console.log(state_item)
    Object.assign(state_item, item)
  },

}
