<template>
  <div class="home">
    <header>
      <search v-on:searchButtonPushed="searchFilter"></search>
      <br /><br />
      <button v-on:click="onCartOpen" type="button">Корзина</button>
    </header>
    <main>
      <showcase
        :list="showcase_filtered"
        v-on:showcase-card-button-pushed="addToCart"
      ></showcase>
    </main>
    <cart
      v-if="isCartVisible"
      :list="cart"
      v-on:cart-close="onCartOpen"
      v-on:cart-card-button-pushed="delFromCart"
    >
    </cart>
    <custom_input v-on:input="searchFilter"></custom_input>
  </div>
</template>

<script>
// @ is an alias to /src
const API_URL = "/api/v1";

import cart from "../components/cart.vue";
import search from "../components/search.vue";
import showcase from "../components/showcase.vue";

export default {
  name: "Home",
  components: {
    cart,
    showcase,
    search,
  },
  data() {
    return {
      showcase: [],
      showcase_filtered: [],
      cart: [],
      isCartVisible: false,
    };
  },
  methods: {
    searchFilter(searchInput) {
      // console.log("searchButtonPushed", searchInput);
      const search = new RegExp(searchInput, "gi");
      this.showcase_filtered = this.showcase.filter((good) =>
        search.test(good.product_name)
      );
    },
    onCartOpen() {
      this.isCartVisible = !this.isCartVisible;
    },
    addToCart(card_id) {
      const productToAdd = this.showcase.find((el) => card_id == el.id_product);
      // this.cart.push(productToAdd);
      fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productToAdd),
      }).then((res) => {
        console.log("addToCart", res.status);
        if (res.status === 201) {
          this.cart.push(productToAdd);
        }
      });
      // }
    },
    delFromCart(card_id) {
      const idxToDel = this.cart.findIndex((el) => card_id == el.id_product);
      // this.cart.splice(idxToDel, 1);
      fetch(`${API_URL}/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.cart[idxToDel]),
      }).then((res) => {
        console.log("delFromCart", res.status);
        if (res.status === 200) {
          this.cart.splice(idxToDel, 1);
        }
      });
    },
  },
  mounted() {
    fetch(`${API_URL}/cart`)
      .then((res) => {
        console.log("1. mounted", res.status);
        return res.json();
      })
      .then((data) => {
        this.cart = data;
      });
    fetch(`${API_URL}/showcase`)
      .then((res) => {
        console.log("2.mounted", res.status);
        return res.json();
      })
      .then((data) => {
        this.showcase = data;
        this.showcase_filtered = this.showcase;
      });
  },
};
</script>
