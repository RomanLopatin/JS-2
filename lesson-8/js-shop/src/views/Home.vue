<template>
  <div class="home">
    <header>
      <h3>Витрина</h3>
    </header>
    <main>
      <showcase> </showcase>
    </main>
    <div class="low_menu">
      <search v-on:searchButtonPushed="searchFilter"></search>
      <button class="cart_btn" v-on:click="onCartOpen" type="button">
        Корзина
      </button>
    </div>
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
// const API_URL = "/api/v1";

import cart from "../components/modal.vue";
import search from "../components/search.vue";
import showcase from "../components/showcase.vue";

import connectionErrorMessage from "../components/connectionErrorMessage.vue";

export default {
  name: "Home",
  components: {
    cart,
    showcase,
    search,
    // connectionErrorMessage,
  },
  data() {
    return {
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
    onCartOpen() {
      this.isCartVisible = !this.isCartVisible;
    },
  },
};
</script>
<style lang="scss">
.cart_btn {
  background: lightblue;
  padding: 3px;
  border-radius: 3px;
  margin-left: 50px;
}
.low_menu {
  background: lightcyan;
  padding: 15px;
  // border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
}
</style>
