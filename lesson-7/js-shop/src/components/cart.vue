<template>
  <div class="modal">
    <button v-on:click="onClick">close</button>
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
  props: ["list"],
  methods: {
    onClick() {
      this.$emit("cart-close");
    },
    deleteFromCart(card_id) {
      this.$emit("cart-card-button-pushed", card_id);
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  /* display: none; */
  width: 800px;
  min-height: 600px;
  position: absolute;
  top: 100px;
  left: calc(50% - 400px);
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 3px;
  padding: 20px;
}
</style>