<template>
  <div class="goods-list">
    <card
      v-for="item of list"
      v-bind:key="item.id_product"
      :good="item"
      :action_name="'Купить'"
      v-on:cardButtonPushed="addToCart"
    >
    </card>
  </div>
</template>

<script>
import card from "./card.vue";
export default {
  name: "showcase",
  components: {
    card,
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch("addToCart", product);
    },
  },
  computed: {
    list() {
      return this.$store.getters.getShowcase;
    },
  },
};
</script>