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

<style lang="scss">
.goods-list {
  background: #8bc34a;
  border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 3px 22px;
  border-radius: 5px;
}
#search_btn {
  background: #ff572282;
  padding: 3px;
  border-radius: 3px;
}
</style>