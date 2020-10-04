<template>
  <li class="img__card">
    <img :src="img_options.images.downsized.url" :alt="img_options.title" />
  </li>
</template>

<script>
export default {
  name: "ImgCard",
  props: {
    img_options: Object
  }
};
</script>

<style scoped></style>
