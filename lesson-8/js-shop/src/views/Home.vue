<template>
  <div class="home">
    <header>
      <search v-on:searchButtonPushed="searchFilter"></search>
      <br /><br />
      <button v-on:click="onCartOpen" type="button">Корзина</button>
    </header>
    <main>
      <showcase> </showcase>
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
