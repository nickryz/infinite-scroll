<template>
  <div class="load-trigger"></div>
</template>

<script>
export default {
  name: "LoadTrigger",
  data: () => {
    return {
      observer: null,
    };
  },
  mounted() {
    const callback = function (entries) {
      entries.forEach((entry) => {
        if (
          entry &&
          entry.isIntersecting &&
          this.$store.state.gallery.loadTriggerIsActive
        ) {
          console.log(this.$store.state.gallery.loadTriggerIsActive);
          this.$store.dispatch("gallery/loadImgs");
        }
      });
    };
    this.observer = new IntersectionObserver(callback.bind(this));
    this.observer.observe(this.$el);
  },
};
</script>

<style scoped>
.load-trigger {
  height: 1px;
  background: #cb2025;
  /*margin-top: auto;*/
}
</style>
