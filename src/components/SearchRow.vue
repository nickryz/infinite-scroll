<template>
  <div class="search-row">
    <form action="">
      <input type="search" v-model.trim="searchReq" />
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchRow",
  data: () => {
    return {
      searchReq: ""
    };
  },
  created() {
    this.timeout = this.delay(this.searchReqEntered, 1000);
  },
  watch: {
    searchReq() {
      this.timeout();
    }
  },
  methods: {
    searchReqEntered() {
      this.$emit("searchReqEntered", this.searchReq);
    },
    delay(callback, delay) {
      let timeout;

      return function() {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(callback, delay);
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.search-row {
  position: fixed;
  padding: 1em 0;
  left: 0;
  top: 0;
  width: 100%;
  background: white;
}
</style>
