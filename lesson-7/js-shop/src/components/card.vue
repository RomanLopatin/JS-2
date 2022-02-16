<template>
  <div class="card">
    <h3>{{ good.product_name }}</h3>
    <p>{{ good.price }}</p>
    <button :data-id="good.id_product" v-on:click="onClick">
      {{ action_name }}
    </button>
  </div>
</template>

<script>
export default {
  name: "card",
  props: ["good", "action_name"],
  methods: {
    onClick() {
      this.$emit("cardButtonPushed", this.good.id_product);
    },
  },
};
</script>

<style lang="scss">
</style>