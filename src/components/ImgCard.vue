<template>
  <div class="img__card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ImgCard",
  props: {},
};
</script>

<style lang="scss" scoped>
.img__card {
  font-size: 0;
  position: absolute;
  top: 0;
  left: 0;
  transform-style: preserve-3d;
  perspective: 800px;

  img {
    width: 100%;
    transform: translateY(20px) rotateX(5deg);
    transform-origin: center top;
    opacity: 0;
    transition: 1s opacity ease-in-out, 1s transform ease-in-out;

    &.loaded {
      transform: translateY(0px) rotateX(0);
      opacity: 1;
    }
  }
}
</style>
