<template>
  <div class="goods-list">
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