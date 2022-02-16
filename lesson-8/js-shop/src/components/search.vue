<template>
  <br />
  <div>
    <input type="text" class="search_field" v-model="searchInput" />
    <button class="search_btn" v-on:click="onClick">Поиск</button>
  </div>
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
.search_btn {
  background: #ff572282;
  padding: 3px;
  border-radius: 3px;
}
.search_field {
  background: lightgray;
  padding: 3px;
  border-radius: 3px;
}
</style>