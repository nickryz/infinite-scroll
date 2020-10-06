//state
const state = () => ({
  searchReq: "",
  offset: 0,
  limit: 10,
  imgs: [],
  loadTriggerIsActive: false,
  isLoading: false,
});

// getters
const getters = {
  getNormalizeSearchReq: (state) => {
    return state.searchReq.length < 3 ? "" : state.searchReq;
  },
};
// mutations
const mutations = {
  updateStateValue(state, arg) {
    state[arg[0]] = arg[1];
  },
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
      state.offset = +value;
    } else {
      state.offset += state.limit;
    }
  },
};

// actions
const actions = {
  /* loading img list from API*/
  async loadImgs(context) {
    context.commit("changeLoadingStatus", true);
    console.log(context.state.offset);
    //What API URL needs?
    const APIUrl = `https://api.giphy.com/v1/gifs/${
      context.getters.getNormalizeSearchReq ? "search" : "trending"
    }`;
    //What API search params needs?
    const searchParams = new URLSearchParams({
      offset: context.state.offset,
      limit: context.state.limit,
      api_key: "HTcOek7tnrQkqHXqQWmQWp6fxt1N1jDU",
    });
    if (context.getters.getNormalizeSearchReq) {
      searchParams.append("q", context.state.searchReq);
    }
    //Create finally request
    try {
      const response = await fetch(`${APIUrl}?${searchParams.toString()}`);
      let imgList = await response.json();
      context.commit("updateImgList", [...context.state.imgs, ...imgList.data]);
      context.commit("incrementOffset");
      if (state.imgs.length > 0) {
        // this.status.message = "Loading..."
      } else {
        // this.status.message ="Oops...nothing was found";
        // this.isLoading = false;
      }
      context.commit("updateStateValue", ["loadTriggerIsActive", true]);
      context.commit("changeLoadingStatus", false);
    } catch (err) {
      // this.status.message = "Oops...maybe it's a connection problem";
      context.commit("updateStateValue", ["loadTriggerIsActive", true]);
      context.commit("changeLoadingStatus", false);
    }
  },
  clearLay(context) {
    context.commit("updateStateValue", ["loadTriggerIsActive", false]);
    context.commit("updateImgList", []);
    context.commit("incrementOffset", "0");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
