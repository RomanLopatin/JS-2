<template>
  <div class="home">
    <header>
      <h1>Cart</h1>
    </header>
    <main>
      <cart> </cart>
    </main>
    <!-- <cart
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
    </connectionErrorMessage> -->
  </div>
</template>

<script>
// @ is an alias to /src
// const API_URL = "/api/v1";

import cart from "../components/Cart.vue";
import connectionErrorMessage from "../components/connectionErrorMessage.vue";

export default {
  name: "Home",
  components: {
    cart,
    // connectionErrorMessage,
  },
  methods: {
    onServerConnectionEror(connError) {
      this.isServerConnectionError = true;
      this.connectionErrorStatus = connError;
    },
  },
};
</script>
