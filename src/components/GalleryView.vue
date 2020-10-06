<template>
  <div class="gallery__view">
    <search-row @searchReqEntered="searchReqUpdate">
      <p class="status-bar" v-if="status.isShown">
        {{ status.message || "Scroll down and never stop!!!" }}
      </p>
    </search-row>

    <gallery-stack
      class="gallery-stack__custom"
      ref="galleryStack"
      :column-min-width="300"
      :gutter-width="3"
      :gutter-height="3"
      monitor-images-loaded
      @images-loaded="imageLoaded"
    >
      <img-card v-for="(img, i) in $store.state.gallery.imgs" :key="img.id + i">
        <img :src="img.images.downsized.url" :alt="img.title" />
      </img-card>
    </gallery-stack>
    <load-trigger></load-trigger>
    <transition name="fade">
      <loading-bar
        class="load-status"
        v-show="$store.state.gallery.isLoading"
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

export default {
  components: { LoadingBar, LoadTrigger, GalleryStack, ImgCard, SearchRow },
  comments: LoadTrigger,
  name: "GalleryView",
  data: () => {
    return {
      status: {
        isShown: true,
        message: "",
      },
    };
  },
  mounted() {
    this.$store.dispatch("gallery/loadImgs");
  },
  methods: {
    imageLoaded(image, instance) {
      image.img.classList.add("loaded");
      if (instance.isComplete) {
        // this.status.message = "";
        this.$store.commit("gallery/changeLoadingStatus", false);
        if (this.$refs.galleryStack.$el.clientHeight <= window.innerHeight)
          this.$store.dispatch("gallery/loadImgs");
      }
    },
    searchReqUpdate(searchReq) {
      // if (this.searchReq === searchReq) return;
      this.searchReq = searchReq;
      // this.loadImgs();
      // this.clearLay();
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
.load-status {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  pointer-events: none;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-to {
  transition: 2s opacity;
}
</style>
