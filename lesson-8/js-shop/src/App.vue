<template>
  <router-link to="/">Главная</router-link>
  <span> </span>
  <router-link to="/cart">Cart</router-link>
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
</style>
