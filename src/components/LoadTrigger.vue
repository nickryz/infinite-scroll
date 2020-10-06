<template>
  <div class="load-trigger"></div>
</template>

<script>
export default {
  name: "LoadTrigger",
  data: () => {
    return {
      observer: null
    };
  },
  mounted() {
    const callback = function(entries) {
      entries.forEach(entry => {
        if (
          entry &&
          entry.isIntersecting &&
          this.$store.state.gallery.LOAD_TRIGGER_ACTIVE
        ) {
          this.$store.dispatch("gallery/LOAD_IMGS");
        }
      });
    };
    this.observer = new IntersectionObserver(callback.bind(this));
    this.observer.observe(this.$el);
  }
};
</script>

<style scoped>
.load-trigger {
  height: 1px;
}
</style>
