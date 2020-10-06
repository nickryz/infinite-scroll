//state
const state = () => ({
  searchReq: "",
  offset: 0,
  limit: 10,
  imgs: [],
  isLoading: false
});

// getters
const getters = {
  getNormalizeSearchReq: state => {
    return state.searchReq.length < 3 ? "" : state.searchReq;
  }
};
// mutations
const mutations = {
  updateSearchReq(state, searchReq) {
    state.searchReq = searchReq;
  },
  updateImgList(state, imgList) {
    state.imgs = imgList;
  },
  changeLoadingStatus(state, status) {
    state.isLoading = status;
  },
  incrementOffset(state, value) {
    if (value) {
      state.offset = value;
    } else {
      state.offset += state.limit;
    }
  }
};

// actions
const actions = {
  /* loading img list from API*/
  async loadImgs(context) {
    //What API URL needs?
    const APIUrl = `https://api.giphy.com/v1/gifs/${
      context.getters.getNormalizeSearchReq ? "search" : "trending"
    }`;
    //What API search params needs?
    const searchParams = new URLSearchParams({
      offset: context.state.offset,
      limit: context.state.limit,
      api_key: "HTcOek7tnrQkqHXqQWmQWp6fxt1N1jDU"
    });
    if (context.state.searchReq) {
      searchParams.append("q", context.state.searchReq);
    }
    //Create finally request
    try {
      context.commit("changeLoadingStatus", true);
      const response = await fetch(`${APIUrl}?${searchParams.toString()}`);
      let imgList = await response.json();
      context.commit("incrementOffset");
      context.commit("updateImgList", [...context.state.imgs, ...imgList.data]);
      if (state.imgs.length > 0) {
        // this.status.message = "Loading..."
      } else {
        // this.status.message ="Oops...nothing was found";
        // this.isLoading = false;
      }
    } catch (err) {
      // this.status.message = "Oops...maybe it's a connection problem";
      context.commit("changeLoadingStatus", false);
    }
  },
  clearLay(context) {
    context.commit("updateImgList", []);
    context.commit("incrementOffset", 0);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
