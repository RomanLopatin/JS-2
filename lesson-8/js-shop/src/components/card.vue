<template>
  <div class="goods-item">
    <h3>{{ good.product_name }}</h3>
    <p>{{ good.price }} руб.</p>
    <button class="action-btn" :data-id="good.id_product" v-on:click="onClick">
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
      this.$emit("cardButtonPushed", this.good);
    },
  },
};
</script>

<style lang="scss">
.goods-item {
  background: #4caf50;
  border: 1px solid black;
  // display: flex;
  flex-direction: column;
  padding: 25px 32px;
  /* width: 50px; */
  height: 100px;
  /* align-items: center; */
  margin: 10px;
  border-radius: 5px;
}
.action-btn {
  background: #00ff58;
  padding: 3px;
  border-radius: 3px;
  width: 70px;
}
</style>