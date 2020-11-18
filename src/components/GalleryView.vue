<template>
  <div class="gallery__view">
    <search-row></search-row>
    <transition name="fade" mode="out-in" key="stack">
      <gallery-stack
        v-if="$store.state.gallery.IMGS.length"
        class="gallery-stack__custom"
        ref="galleryStack"
        :column-min-width="300"
        :gutter-width="3"
        :gutter-height="3"
        monitor-images-loaded
        @images-loaded="imageLoaded"
      >
        <img-card
          v-for="(img, i) in $store.state.gallery.IMGS"
          :key="img.id + i"
        >
          <img :src="img.images.downsized.url" :alt="img.title" />
        </img-card>
      </gallery-stack>

      <SorryMessage
        v-else-if="
          !$store.state.gallery.IMGS.length &&
          $store.state.gallery.SEARCH_REQ.length
        "
        key="sorry"
      ></SorryMessage>
    </transition>
    <load-trigger></load-trigger>
    <transition name="fade">
      <loading-bar
        class="load-status"
        v-show="$store.state.gallery.LOADING"
      ></loading-bar>
    </transition>
  </div>
</template>

<script>
import LoadTrigger from "@/components/LoadTrigger";
import GalleryStack from "@/components/GalleryStack";
import ImgCard from "@/components/ImgCard";
import SearchRow from "@/components/SearchRow";
import LoadingBar from "@/components/LoadingBar";
import SorryMessage from "@/components/SorryMessage";

export default {
  components: {
    LoadingBar,
    LoadTrigger,
    GalleryStack,
    ImgCard,
    SearchRow,
    SorryMessage,
  },
  comments: LoadTrigger,
  name: "GalleryView",
  data: () => {
    return {};
  },
  mounted() {
    this.$store.dispatch("gallery/LOAD_IMGS");
  },
  methods: {
    imageLoaded(image, instance) {
      image.img.classList.add("loaded");
      if (instance.isComplete) {
        this.$store.commit("gallery/LOAD_TRIGGER_ACTIVE", true);
        this.$store.commit("gallery/LOADING", false);
        if (this.$refs.galleryStack.$el.clientHeight <= window.innerHeight)
          this.$store.dispatch("gallery/LOAD_IMGS");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.status-bar {
  text-align: center;
  color: #666;
  margin: 0.5em 0 0;
}
.gallery__view {
  max-width: 1920px;
  margin: 100px auto 0;
  display: flex;
  flex-direction: column;
}
.gallery-stack__custom {
  overflow: hidden;
}
.load-status {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  pointer-events: none;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s opacity;
}
</style>
