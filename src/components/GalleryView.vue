<template>
  <div class="gallery__view">
    <search-row @searchReqEntered="searchReqUpdate">
      <p class="status-bar" v-if="status.isShown">{{ status.message || "Scroll down and never stop!!!"}}</p>
    </search-row>

    <gallery-stack
      v-if="imgs.length > 0"
      ref="galleryStack"
      :column-min-width="300"
      :gutter-width="3"
      :gutter-height="3"
      monitor-images-loaded
      @images-loaded="imageLoaded"
    >
      <img-card v-masonry-tile v-for="(img, i) in imgs" :key="img.id + i">
        <img :src="img.images.downsized.url" :alt="img.title" />
      </img-card>
    </gallery-stack>
    <load-trigger @scrollInBottom="loadImgs"></load-trigger>
    <transition name="fade">
      <loading-bar class="load-status" v-show="isLoading"></loading-bar>
    </transition>
  </div>
</template>

<script>
import LoadTrigger from "@/components/LoadTrigger";
import GalleryStack from "./GalleryStack";
import ImgCard from "@/components/ImgCard";
import SearchRow from "@/components/SearchRow";
import LoadingBar from "@/components/LoadingBar";

export default {
  components: {LoadingBar, LoadTrigger, GalleryStack, ImgCard, SearchRow },
  comments: LoadTrigger,
  name: "GalleryView",
  data: () => {
    return {
      searchReq: "",
      offset: 0,
      limit: 10,
      imgs: [],
      isLoading: false,
      status: {
        isShown: true,
        message: ""
      }

    };
  },
  methods: {
    imageLoaded(image, instance) {
      image.img.classList.add("loaded");
      if(instance.isComplete) {
        this.status.message = "";
        this.isLoading = false;
        if(this.$refs.galleryStack.$el.clientHeight <= window.innerHeight) this.loadImgs();
      }
    },
    async loadImgs() {
      //What API URL needs?
      const APIUrl = `https://api.giphy.com/v1/gifs/${
        this.searchReq ? "search" : "trending"
      }`;
      //What API search params needs?
      const searchParams = new URLSearchParams({
        offset: this.offset,
        limit: this.limit,
        api_key: "HTcOek7tnrQkqHXqQWmQWp6fxt1N1jDU",
      });
      if (this.searchReq) {
        searchParams.append("q", this.searchReq);
      }
      //Create finally request
      try {
        this.isLoading = true;
        const response = await fetch(`${APIUrl}?${searchParams.toString()}`);
        const imgList = await response.json();
        this.offset += this.limit;
        this.imgs = [...this.imgs, ...imgList.data];
        if(this.imgs.length > 0) {
          this.status.message = "Loading..."
        } else {
          this.status.message ="Oops...nothing was found";
          this.isLoading = false;
        }
      } catch (err) {
        this.status.message = "Oops...maybe it's a connection problem";
        this.isLoading = false;
      }

    },
    searchReqUpdate(searchReq) {
      if(this.searchReq === searchReq) return;
      this.searchReq = searchReq;
      this.loadImgs();
      this.clearLay();
    },
    clearLay() {
      this.imgs = [];
      this.offset = 0;
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
  margin-top: 100px;
  max-width: 1920px;
  margin: 100px auto;
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
