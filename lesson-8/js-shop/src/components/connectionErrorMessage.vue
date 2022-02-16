<template>
  <div class="modal_1">
    <h1>Ошибка подключения к серверу! #{{ connError }}</h1>
    <button v-on:click="onClick">close</button>
  </div>
</template>

<script>
export default {
  name: "connectionErrorMessage",
  props: ["connError"],
  methods: {
    onClick() {
      this.$emit("connectionErrorMessageClose");
    },
  },
};
</script>

<style lang="scss">
.modal_1 {
  /* display: none; */
  width: 400px;
  min-height: 100px;
  position: absolute;
  top: 100px;
  left: calc(50% - 200px);
  border: 2px solid #ccc;
  background-color: red;
  border-radius: 3px;
  padding: 20px;
}
</style>