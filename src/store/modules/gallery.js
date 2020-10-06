//state
const state = () => ({
  API: {
    key: "HTcOek7tnrQkqHXqQWmQWp6fxt1N1jDU",
    links: {
      base: "https://api.giphy.com/v1/gifs/",
      trending: "trending",
      search: "search"
    },
    offset: 0,
    limit: 10,
    min_search_symbols_qty: 3
  },
  SEARCH_REQ: "",
  IMGS: [],
  NEED_CLEAR_LAY: false,
  LOADING: false
});

// getters
const getters = {
  NORMALIZED_SEARCH_REQ: state => {
    return state.SEARCH_REQ.length < 3 ? "" : state.SEARCH_REQ;
  },
  GET_SEARCH_REQ: state => {
    return state.SEARCH_REQ;
  }
};
// mutations
const mutations = {
  LOADING(state, status) {
    state.LOADING = status;
  },
  NEED_CLEAR_LAY(state, status) {
    state.NEED_CLEAR_LAY = status;
  },
  LOAD_TRIGGER_ACTIVE(state, status) {
    state.LOAD_TRIGGER_ACTIVE = status;
  },
  UPDATE_SEARCH_REQ(state, searchReq) {
    state.SEARCH_REQ = searchReq;
  },
  UPDATE_IMG_LIST(state, imgList) {
    state.IMGS = imgList;
  },
  INCREMENT_OFFSET(state, value) {
    if (value) {
      state.API.offset = +value;
    } else {
      state.API.offset += state.API.limit;
    }
  }
};

// actions
const actions = {
  /* loading img list from API*/
  async LOAD_IMGS(context) {
    //What API URL needs?
    const APIUrl = `${context.state.API.links.base}${
      context.getters.NORMALIZED_SEARCH_REQ
        ? context.state.API.links.search
        : context.state.API.links.trending
    }`;
    //What API search params needs?
    const searchParams = new URLSearchParams({
      offset: context.state.API.offset,
      limit: context.state.API.limit,
      api_key: context.state.API.key
    });
    if (context.getters.NORMALIZED_SEARCH_REQ) {
      searchParams.append("q", context.state.SEARCH_REQ);
    }
    //Create finally request
    try {
      context.commit("INCREMENT_OFFSET");
      const response = await fetch(`${APIUrl}?${searchParams.toString()}`);
      let imgList = await response.json();
      if (imgList.data.length > 0) {
        context.commit("LOADING", true);
        context.commit("UPDATE_IMG_LIST", [
          ...context.state.IMGS,
          ...imgList.data
        ]);
      } else {
        context.commit("LOAD_TRIGGER_ACTIVE", true);
      }
    } catch (err) {
      context.commit("LOAD_TRIGGER_ACTIVE", true);
    }
  },
  CLEAR_LAY(context) {
    context.commit("LOAD_TRIGGER_ACTIVE", false);
    context.commit("UPDATE_IMG_LIST", []);
    context.commit("INCREMENT_OFFSET", "0");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
