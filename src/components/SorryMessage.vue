<template>
  <div class="sorry-message">
    <h2 class="sorry-message__title">
      Sorry. Nothing found. Perhaps your tastes are too specific.
    </h2>
    <div class="sorry-message_reset-btn" @click="resetSearch">
      RESET SEARCH
    </div>
  </div>
</template>

<script>
export default {
  name: "SorryMessage",
  methods: {
    resetSearch() {
      this.$store.commit("gallery/UPDATE_SEARCH_REQ", "");
      this.$store.dispatch("gallery/CLEAR_LAY");
      this.$store.dispatch("gallery/LOAD_IMGS");
    }
  }
};
</script>

<style scoped>
.sorry-message {
  text-align: center;
  padding: 15px;
}
.sorry-message_reset-btn {
  display: inline-block;
  padding: 1em 2em;
  background: cornflowerblue;
  color: #fff;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
</style>
