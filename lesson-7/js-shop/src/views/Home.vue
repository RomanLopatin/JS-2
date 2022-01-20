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
    <connectionErrorMessage
      v-if="isServerConnectionError"
      v-on:connectionErrorMessageClose="this.isServerConnectionError = false"
      :connError="this.connectionErrorStatus"
    >
    </connectionErrorMessage>
  </div>
</template>

<script>
// @ is an alias to /src
const API_URL = "/api/v1";

import cart from "../components/cart.vue";
import search from "../components/search.vue";
import showcase from "../components/showcase.vue";
import connectionErrorMessage from "../components/connectionErrorMessage.vue";

export default {
  name: "Home",
  components: {
    cart,
    showcase,
    search,
    connectionErrorMessage,
  },
  data() {
    return {
      showcase: [],
      showcase_filtered: [],
      cart: [],
      isCartVisible: false,
      isServerConnectionError: false,
      connectionErrorStatus: 0,
    };
  },
  methods: {
    onServerConnectionEror(connError) {
      this.isServerConnectionError = true;
      this.connectionErrorStatus = connError;
    },
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
        if (res.status === 201) {
          this.cart.push(productToAdd);
        } else {
          console.log("addToCart", res.status);
          // this.isServerConnectionError = true;
          this.onServerConnectionEror(res.status);
        }
      });
      // .catch((err) => alert(err));
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
        if (res.status === 200) {
          this.cart.splice(idxToDel, 1);
        } else {
          console.log("delFromCart", res.status);
          // this.isServerConnectionError = true;
          this.onServerConnectionEror(res.status);
        }
      });
      // .catch((err) => alert(err));
    },
  },
  mounted() {
    fetch(`${API_URL}/cart`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("mounted cart", res.status);
          // this.isServerConnectionError = true;
          this.onServerConnectionEror(res.status);
        }
      })
      .then((data) => {
        this.cart = data;
      })
      .catch((err) => alert(err));
    fetch(`${API_URL}/showcase`)
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          console.log("mounted showcase", res.status);
          // this.isServerConnectionError = true;
          this.onServerConnectionEror(res.status);
        }
      })
      .catch((err) => {
        alert(err);
        console.log("mounted catch 1", err);
      })
      .then((data) => {
        this.showcase = data;
        this.showcase_filtered = this.showcase;
      })
      .catch((err) => {
        alert(err);
        console.log("mounted catch 2", err);
      });
  },
};
</script>
