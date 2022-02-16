<template>
  <div class="main_manu">
    <router-link to="/">Главная</router-link>
    <span> </span>
    <router-link to="/cart">Корзина</router-link>
  </div>
  <div id="nav">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("loadShowcase");
    this.$store.dispatch("loadCart");
  },
};
</script>

<style lang="scss">
.main_manu {
  background: lightcyan;
  padding: 15px;
  // border: 1px solid black;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
