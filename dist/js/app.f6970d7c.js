(function(t){function e(e){for(var r,s,o=e[0],c=e[1],l=e[2],d=0,f=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&f.push(a[s][0]),a[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(f.length)f.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},a={app:0},i=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},1190:function(t,e,n){},2494:function(t,e,n){},"29ba":function(t,e,n){},"2af1":function(t,e,n){},"36a3":function(t,e,n){"use strict";n("e643")},"3a24":function(t,e,n){"use strict";n("b654")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("gallery-view")],1)},i=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"gallery__view"},[n("search-row"),n("transition",{key:"stack",attrs:{name:"fade",mode:"out-in"}},[t.$store.state.gallery.IMGS.length?n("gallery-stack",{ref:"galleryStack",staticClass:"gallery-stack__custom",attrs:{"column-min-width":300,"gutter-width":3,"gutter-height":3,"monitor-images-loaded":""},on:{"images-loaded":t.imageLoaded}},t._l(t.$store.state.gallery.IMGS,(function(t,e){return n("img-card",{key:t.id+e},[n("img",{attrs:{src:t.images.downsized.url,alt:t.title}})])})),1):!t.$store.state.gallery.IMGS.length&&t.$store.state.gallery.SEARCH_REQ.length?n("SorryMessage",{key:"sorry"}):t._e()],1),n("load-trigger"),n("transition",{attrs:{name:"fade"}},[n("loading-bar",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.gallery.LOADING,expression:"$store.state.gallery.LOADING"}],staticClass:"load-status"})],1)],1)},o=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"load-trigger"})},l=[],u=(n("4160"),n("159b"),{name:"LoadTrigger",data:function(){return{observer:null}},mounted:function(){var t=function(t){var e=this;t.forEach((function(t){t&&t.isIntersecting&&e.$store.state.gallery.LOAD_TRIGGER_ACTIVE&&e.$store.dispatch("gallery/LOAD_IMGS")}))};this.observer=new IntersectionObserver(t.bind(this)),this.observer.observe(this.$el)}}),d=u,f=(n("f43c"),n("2877")),h=Object(f["a"])(d,c,l,!1,null,"75dda5db",null),m=h.exports,g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"images-loaded",rawName:"v-images-loaded:on.progress",value:t.imagesLoaded,expression:"imagesLoaded",arg:"on",modifiers:{progress:!0}}],ref:"container",staticClass:"gallery-stack"},[t._t("default")],2)},p=[],_=(n("a9e3"),n("8ff0")),E=n.n(_),y={name:"GalleryStack",props:{columnMinWidth:{type:Number,required:!0},gutterWidth:{type:Number,default:0},gutterHeight:{type:Number,default:0},monitorImagesLoaded:{type:Boolean,default:!1}},data:function(){return{containerWidth:0,columnCount:0,columnWidth:0,baseColumns:[]}},mounted:function(){window.addEventListener("resize",this.reflow),this.update()},destroyed:function(){window.removeEventListener("resize",this.reflow)},methods:{updateColumnData:function(){this.containerWidth=this.getContainerWidth(),this.columnCount=this.getColumnCount(),this.columnWidth=this.getColumnWidth()},getContainerWidth:function(){return this.$refs.container.clientWidth},getColumnCount:function(){for(var t=1;t<1e4;t++){var e=t*this.columnMinWidth+(t-1)*this.gutterWidth;if(e>this.containerWidth)return Math.max(t-1,1)}},getColumnWidth:function(){return(this.containerWidth-(this.columnCount-1)*this.gutterWidth)/this.columnCount},getBaseColumns:function(){for(var t=[],e=0;e<this.columnCount;e++)t.push({x:e*(this.columnWidth+this.gutterWidth),h:0});return t},update:function(){this.$nextTick(this.reflow)},reflow:function(){var t=this;this.updateColumnData();var e=this.getBaseColumns();this.$emit("reflow",{containerWidth:this.containerWidth,columnCount:this.columnCount,columnWidth:this.columnWidth}),this.$children.forEach((function(n,r){n.$el.style.width=t.columnWidth+"px";var a=0;if(r<t.columnCount)a=r;else{var i=-1;e.forEach((function(t,e){(-1==i||t.h<i)&&(a=e,i=t.h)}))}n.$el.style.transform="translate("+e[a].x+"px, "+e[a].h+"px)",e[a].h+=n.$el.offsetHeight+t.gutterHeight}));var n=0;e.forEach((function(t){return n=Math.max(n,t.h)})),this.$el.style.height=n+"px"},imagesLoaded:function(t,e){this.$emit("images-loaded",e,t),this.monitorImagesLoaded&&this.reflow()}},directives:{imagesLoaded:E.a}},A=y,v=(n("8ab6"),Object(f["a"])(A,g,p,!1,null,"6f367942",null)),C=v.exports,I=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"img__card"},[t._t("default")],2)},R=[],b={name:"ImgCard",props:{}},L=b,S=(n("a6d4"),Object(f["a"])(L,I,R,!1,null,"6dbc1dc5",null)),O=S.exports,w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"search-row"},[n("form",{attrs:{action:""}},[n("label",{attrs:{for:"search-input"}},[t._v("What are we looking for?")]),n("input",{attrs:{id:"search-input",type:"text",placeholder:"Click to enter"},domProps:{value:t.$store.getters["gallery/GET_SEARCH_REQ"]},on:{input:this.InputTimeout}})]),t._t("default")],2)},T=[],$=(n("498a"),{name:"SearchRow",data:function(){return{isNeedToUpdateImages:!1}},created:function(){this.InputTimeout=this.delay(this.searchReqEntered,1e3)},methods:{searchReqEntered:function(t){var e=t.target.value.trim();if(this.$store.commit("gallery/UPDATE_SEARCH_REQ",e),this.$store.getters["gallery/NORMALIZED_SEARCH_REQ"])this.$store.dispatch("gallery/CLEAR_LAY"),this.$store.dispatch("gallery/LOAD_IMGS"),this.isNeedToUpdateImages=!0;else{if(!this.isNeedToUpdateImages)return;this.$store.dispatch("gallery/CLEAR_LAY"),this.$store.dispatch("gallery/LOAD_IMGS"),this.isNeedToUpdateImages=!1}},delay:function(t,e){var n;return function(r){n&&clearTimeout(n),n=setTimeout(t.bind(null,r),e)}}}}),G=$,D=(n("3a24"),Object(f["a"])(G,w,T,!1,null,"1242af50",null)),M=D.exports,x=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},N=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"loader-row"},[n("div",{staticClass:"loader"})])}],k={name:"LoadingBar"},P=k,W=(n("d4ac"),Object(f["a"])(P,x,N,!1,null,"2d0e3ddb",null)),H=W.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sorry-message"},[n("h2",{staticClass:"sorry-message__title"},[t._v(" Sorry. Nothing found. Perhaps your tastes are too specific. ")]),n("div",{staticClass:"sorry-message_reset-btn",on:{click:t.resetSearch}},[t._v(" RESET SEARCH ")])])},Q=[],U={name:"SorryMessage",methods:{resetSearch:function(){this.$store.commit("gallery/UPDATE_SEARCH_REQ",""),this.$store.dispatch("gallery/CLEAR_LAY"),this.$store.dispatch("gallery/LOAD_IMGS")}}},V=U,q=(n("36a3"),Object(f["a"])(V,j,Q,!1,null,"55d459fa",null)),Y=q.exports,F={components:{LoadingBar:H,LoadTrigger:m,GalleryStack:C,ImgCard:O,SearchRow:M,SorryMessage:Y},comments:m,name:"GalleryView",data:function(){return{}},mounted:function(){this.$store.dispatch("gallery/LOAD_IMGS")},methods:{imageLoaded:function(t,e){t.img.classList.add("loaded"),e.isComplete&&(this.$store.commit("gallery/LOAD_TRIGGER_ACTIVE",!0),this.$store.commit("gallery/LOADING",!1),this.$refs.galleryStack.$el.clientHeight<=window.innerHeight&&this.$store.dispatch("gallery/LOAD_IMGS"))}}},B=F,Z=(n("69ee"),Object(f["a"])(B,s,o,!1,null,"2cc5022d",null)),z=Z.exports,J={name:"App",components:{GalleryView:z}},X=J,K=(n("034f"),Object(f["a"])(X,a,i,!1,null,null,null)),tt=K.exports,et=n("2f62"),nt=(n("99af"),n("d3b7"),n("ac1f"),n("25f0"),n("3ca3"),n("841c"),n("ddb0"),n("2b3d"),n("2909")),rt=(n("96cf"),n("1da1")),at=function(){return{API:{key:"HTcOek7tnrQkqHXqQWmQWp6fxt1N1jDU",links:{base:"https://api.giphy.com/v1/gifs/",trending:"trending",search:"search"},offset:0,limit:10,min_search_symbols_qty:3},SEARCH_REQ:"",IMGS:[],NEED_CLEAR_LAY:!1,LOADING:!1}},it={NORMALIZED_SEARCH_REQ:function(t){return t.SEARCH_REQ.length<3?"":t.SEARCH_REQ},GET_SEARCH_REQ:function(t){return t.SEARCH_REQ}},st={LOADING:function(t,e){t.LOADING=e},NEED_CLEAR_LAY:function(t,e){t.NEED_CLEAR_LAY=e},LOAD_TRIGGER_ACTIVE:function(t,e){t.LOAD_TRIGGER_ACTIVE=e},UPDATE_SEARCH_REQ:function(t,e){t.SEARCH_REQ=e},UPDATE_IMG_LIST:function(t,e){t.IMGS=e},INCREMENT_OFFSET:function(t,e){e?t.API.offset=+e:t.API.offset+=t.API.limit}},ot={LOAD_IMGS:function(t){return Object(rt["a"])(regeneratorRuntime.mark((function e(){var n,r,a,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n="".concat(t.state.API.links.base).concat(t.getters.NORMALIZED_SEARCH_REQ?t.state.API.links.search:t.state.API.links.trending),r=new URLSearchParams({offset:t.state.API.offset,limit:t.state.API.limit,api_key:t.state.API.key}),t.getters.NORMALIZED_SEARCH_REQ&&r.append("q",t.state.SEARCH_REQ),e.prev=3,t.commit("INCREMENT_OFFSET"),e.next=7,fetch("".concat(n,"?").concat(r.toString()));case 7:return a=e.sent,e.next=10,a.json();case 10:i=e.sent,i.data.length>0?(t.commit("LOADING",!0),t.commit("UPDATE_IMG_LIST",[].concat(Object(nt["a"])(t.state.IMGS),Object(nt["a"])(i.data)))):t.commit("LOAD_TRIGGER_ACTIVE",!0),e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](3),t.commit("LOAD_TRIGGER_ACTIVE",!0);case 17:case"end":return e.stop()}}),e,null,[[3,14]])})))()},CLEAR_LAY:function(t){t.commit("LOAD_TRIGGER_ACTIVE",!1),t.commit("UPDATE_IMG_LIST",[]),t.commit("INCREMENT_OFFSET","0")}},ct={namespaced:!0,state:at,getters:it,actions:ot,mutations:st};r["default"].use(et["a"]);var lt=new et["a"].Store({state:{},mutations:{},actions:{},modules:{gallery:ct}});r["default"].config.productionTip=!1,new r["default"]({store:lt,render:function(t){return t(tt)}}).$mount("#app")},"69ee":function(t,e,n){"use strict";n("df4c")},"85ec":function(t,e,n){},"8ab6":function(t,e,n){"use strict";n("29ba")},a6d4:function(t,e,n){"use strict";n("2af1")},b654:function(t,e,n){},d4ac:function(t,e,n){"use strict";n("2494")},df4c:function(t,e,n){},e643:function(t,e,n){},f43c:function(t,e,n){"use strict";n("1190")}});
//# sourceMappingURL=app.f6970d7c.js.map