<template>
  <input type="text" v-model="searchInput" />
  <button id="search_btn" v-on:click="onClick">Поиск</button>
</template>

<script>
export default {
  name: "search",
  computed: {
    searchFilter: {
      get() {
        return this.$store.getters.getSearchString;
      },
      set(value) {
        this.$store.commit("setSearchString", value);
      },
    },
  },
  methods: {
    onClick() {
      this.searchFilter = this.searchInput;
    },
  },
};
</script>

<style lang="scss">
</style>