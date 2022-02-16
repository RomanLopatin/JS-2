<template>
  <div class="goods-list-cart">
    <card
      v-for="item of list"
      v-bind:key="item.id_product"
      :good="item"
      :action_name="'Удалить'"
      v-on:cardButtonPushed="removeFromCart"
    >
    </card>
  </div>
</template>

<script>
import card from "./card.vue";
export default {
  name: "cartlist",
  components: {
    card,
  },
  methods: {
    removeFromCart(product) {
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

<style lang="scss">
.goods-list-cart {
  background: lightskyblue;
  border: 1px solid rgba(0, 0, 0, 0.664);
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 3px 22px;
  border-radius: 5px;
}
</style>