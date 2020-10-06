<template>
  <div class="search-row">
    <form action="">
      <label for="search-input">What are we looking for?</label>
      <input
        id="search-input"
        type="text"
        @input="this.InputTimeout"
        placeholder="Click to enter"
      />
    </form>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "SearchRow",
  data: () => {
    return {
      isNeedToUpdateImages: false,
    };
  },
  created() {
    this.InputTimeout = this.delay(this.searchReqEntered, 1000);
  },
  methods: {
    searchReqEntered(e) {
      const value = e.target.value.trim();
      this.$store.commit("gallery/updateSearchReq", value);
      if (value.length >= 3) {
        this.$store.dispatch("gallery/clearLay");
        this.$store.dispatch("gallery/loadImgs");
        this.isNeedToUpdateImages = true;
      } else if (this.isNeedToUpdateImages) {
        this.$store.dispatch("gallery/clearLay");
        this.$store.dispatch("gallery/loadImgs");
        this.isNeedToUpdateImages = false;
      }
    },
    delay(callback, delay) {
      let timeout;

      return function (e) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(callback.bind(null, e), delay);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.search-row {
  position: fixed;
  padding: 1em 1em;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100vw;
  background: white;
  text-align: center;

  &:before {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 8px;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  label {
    padding-right: 1em;
    font-size: 1.2rem;
  }
  input {
    border: 1px solid gray;
    padding: 0.2em 0.3em;
    border-radius: 2px;
    font-size: 1.2rem;
  }
}
</style>
