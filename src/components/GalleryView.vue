<template>
  <div class="gallery__view">
    <search-row @searchReqEntered="searchReqUpdate"></search-row>
    <ul class="gallery__list">
      <img-card
        v-for="(img, i) in imgs"
        :key="img.id + i"
        :img_options="img"
      ></img-card>
    </ul>
    <load-trigger @scrollInBottom="loadImgs"></load-trigger>
  </div>
</template>

<script>
import LoadTrigger from "@/components/LoadTrigger";
import ImgCard from "@/components/ImgCard";
import SearchRow from "@/components/SearchRow";

export default {
  components: { LoadTrigger, ImgCard, SearchRow },
  comments: LoadTrigger,
  name: "GalleryView",
  data: () => {
    return {
      searchReq: "",
      offset: 0,
      limit: 10,
      imgs: []
    };
  },
  methods: {
    async loadImgs() {
      //What API URL needs?
      const APIUrl = `https://api.giphy.com/v1/gifs/${
        this.searchReq ? "search" : "trending"
      }`;
      //What API search params needs?
      const searchParams = new URLSearchParams({
        offset: this.offset,
        limit: this.limit,
        api_key: "HTcOek7tnrQkqHXqQWmQWp6fxt1N1jDU"
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
    }
  }
};
</script>

<style lang="scss" scoped>
.gallery__list {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
