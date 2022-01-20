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
  props: ["list"],
  methods: {
    addToCart(card_id) {
      this.$emit("showcase-card-button-pushed", card_id);
    },
  },
};
</script>