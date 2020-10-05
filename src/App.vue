<template>
  <div id="app">
    <gallery-view></gallery-view>
  </div>
</template>

<script>
import GalleryView from "./components/GalleryView.vue";

export default {
  name: "App",
  components: {
    GalleryView,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  width: 100%;
  overflow-x: hidden;
}
body {
  margin: 0;
  width: 100%;
  /*background: #ebebeb;*/
  font-family: Arial, sans-serif;
}
</style>
