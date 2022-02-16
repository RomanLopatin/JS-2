<template>
  <div class="modal">
    <!-- <button class="cart_btn_in" v-on:click="onClick">close</button> -->
    <div class="cart-list">
      <card
        v-for="item of list"
        v-bind:key="item.id_product"
        :good="item"
        :action_name="'Удалить'"
        v-on:cardButtonPushed="deleteFromCart"
      >
      </card>
    </div>
  </div>
</template>

<script>
import card from "./card.vue";
export default {
  name: "cart",
  components: {
    card,
  },
  methods: {
    onClick() {
      this.$emit("cart-close");
    },
    deleteFromCart(product) {
      // console.log("2. Cart: click-event-in-Card-cached", product);
      this.$store.dispatch("RemoveFromCart", product);
    },
  },
  computed: {
    list() {
      return this.$store.getters.getCart;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-list {
  /* display: none; */
  background: lightskyblue;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 3px 22px;
  border-radius: 5px;
}
.cart_btn_in {
  background: lightblue;
  padding: 3px;
  border-radius: 3px;
}
</style>