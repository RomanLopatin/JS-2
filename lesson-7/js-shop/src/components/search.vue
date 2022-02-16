<template>
  <input type="text" v-model="searchFilter" />
  <button id="search_btn" v-on:click="onClick">Поиск</button>
</template>

<script>
export default {
  name: "search",
  components: {},
  data() {
    return {
      searchFilter: "",
    };
  },
  props: [],
  methods: {
    onClick() {
      //   console.log("onClick", this.searchFilter);
      this.$emit("searchButtonPushed", this.searchFilter);
    },
  },
};
</script>

<style lang="scss">
</style>