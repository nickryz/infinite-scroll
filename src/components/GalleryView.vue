<template>
  <div class="gallery__view">
    <search-row @searchReqEntered="searchReqUpdate"></search-row>
    <gallery-stack
      :column-min-width="300"
      :gutter-width="10"
      :gutter-height="10"
      monitor-images-loaded
      @images-loaded="imageLoaded"
    >
      <img-card v-masonry-tile v-for="(img, i) in imgs" :key="img.id + i">
        <img :src="img.images.downsized.url" :alt="img.title" />
      </img-card>
    </gallery-stack>
    <load-trigger @scrollInBottom="loadImgs"></load-trigger>
  </div>
</template>

<script>
import LoadTrigger from "@/components/LoadTrigger";
import GalleryStack from "./GalleryStack";
import ImgCard from "@/components/ImgCard";
import SearchRow from "@/components/SearchRow";

export default {
  components: { LoadTrigger, GalleryStack, ImgCard, SearchRow },
  comments: LoadTrigger,
  name: "GalleryView",
  data: () => {
    return {
      searchReq: "",
      offset: 0,
      limit: 10,
      imgs: [],
    };
  },
  methods: {
    imageLoaded(image) {
      // console.log(image.img);
      image.img.classList.add("loaded");
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
        const response = await fetch(`${APIUrl}?${searchParams.toString()}`);
        const imgList = await response.json();
        this.offset += this.limit;

        this.imgs = [...this.imgs, ...imgList.data];
      } catch (err) {
        console.log(err);
      }
    },
    searchReqUpdate(searchReq) {
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
.gallery__view {
  min-height: calc(100vh - 1px);
  margin-top: 100px;
}
</style>
