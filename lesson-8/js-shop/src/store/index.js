import { createStore } from 'vuex'
const API_URL = " /api/v1";

export default createStore({
  state: {
    showcase: [],
    cart: [],
    searchString: ''
  },
  getters: {
    getCart: (state) => state.cart.slice(), //делаем копию массива cart чтобы обезопасить данные
    getShowcase: (state) => state.showcase.filter(product => new RegExp(state.searchString, 'i').test(product.product_name)),
    getSearchString: (state) => state.searchString
  },
  mutations: {
    setShowcase: (state, payload) => state.showcase = payload,
    setSearchString: (state, payload) => {
      state.searchString = payload
      console.log('3. Mutation', payload)
    },
    addToCart: (state, payload) => state.cart.push(payload),
    RemoveFromCart: (state, id) => {
      //state.cart = state.cart.filter((product) => product.id !== id)
      const index = state.cart.findIndex((product) => product.id == id);
      state.cart.splice(index, 1);
    }
  },
  actions: {
    loadShowcase({ commit }) {
      fetch(`${API_URL}/showcase`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          commit('setShowcase', data)
        })
    },
    loadCart({ commit }) {
      fetch(`${API_URL}/cart`)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          data.forEach((product) => {
            commit('addToCart', product)
          })
        })
    },
    addToCart({ commit }, product) {
      fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => {
          commit('addToCart', product)
        });
    },
    RemoveFromCart({ commit }, product) {
      fetch(`${API_URL}/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((res) => {
          console.log('1. RemoveFromCart', product)
          commit('RemoveFromCart', product.id);
        });
    },
    setSearchString({ commit }, searchString) {
      commit('setSearchString', searchString)
    }
  }
})
