
export default {

  fillCart({commit}, data) {
    commit('fillCart', data);
  },

  updateCartDetails({commit}, {checked, item_id}) {

    this.$axios.post(`update-cart-evob-charges`, {'add_evob_charges' : checked, item_id})
    .then(({data}) => {
      this.$toast.success("Cart updated").goAway(2000)
      commit('updateCartItem', data)
    })
    .catch(() => {
      this.$toast.error("Could not update cart").goAway(2000)
    })

  },

  updateCartCharges({commit}, {checked, item_id, type}) {
    this.$axios.post(`update-cart-charges`, {'add_charge': checked, item_id, 'type': type})
    .then(({data}) => {
      this.$toast.success("Cart updated").goAway(2000)
      commit('updateCartCharges', data)
    })
    .catch(() => {
      this.$toast.error("Could not update cart").goAway(2000)
    })
  },

  fillCartTable(context, data) {

    return new Promise((resolve, reject) => {

      this.$axios.post(`add-to-cart`, {

        location        : data.location,
        treatment       : data.treatment,
        averageCost     : data.averageCost,
        purchaseCost    : data.purchaseCost,
        savedCost       : data.savedCost,
        negotiatedCost  : data.negotiatedCost,
        date_of_service : data.date_of_service,
        time_of_service : data.time_of_service,
        speciality      : data.speciality,
        doctor          : data.doctor,
        cpt             : data.cpt,
        treatment_id    : data.treatment_id

      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });

    });

  },

  fetchCart({dispatch, commit}) {

    commit('setLoader', true);

    return new Promise((resolve, reject) => {

      this.$axios.post(`get-cart`).then(({data}) => {
        dispatch('fillCart', data);
        commit('setLoader', false);
        resolve(data);
      })
      .catch((err) => {
        commit('setLoader', false);
        reject(err);
      });

    });

  },

  updateCart({commit, state}, item) {
    let items = state.items.filter((this_item) => {
      return this_item.id != item.id;
    });
    commit('fillCart', items)
  },

  async getCartCount({commit}) {

    await this.$axios.post('cart/total')
    .then(({data}) => {
      commit('setCartCount', data);
    });

  },

  setCartCount({commit}, count) {
    commit('setCartCount', count);
  }

}
