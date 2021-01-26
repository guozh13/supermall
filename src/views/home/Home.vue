<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control" @tabClick="tabClick" ref="topTabControl" v-show="isShowTopTabClick"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @finishLoad="finishLoadOneHomeSwiper"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" @tabClick="tabClick" ref="tabControl"></tab-control>
      <goods-list :goods-item-list="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";
import TabControl from "@/components/content/tabControl/TabControl";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/goods/BackTop";

import {getHomeMultiData, getHomeProductData} from "@/network/home";
import {itemListenMixin} from "@/common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList,
    BackTop
  },
  mixins: [itemListenMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      isShowTopTabClick: false,
      topTabControlOffsetTop: 0,
      currentScrollY: {
        'pop': 0,
        'new': 0,
        'sell': 0
      }
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    tabClick(index) {
      // this.currentScrollY[this.currentType] = this.$refs.scroll.scroll.y
      if (index === 0) {
        this.currentType = 'pop'
      } else if (index === 1) {
        this.currentType = 'new'
      } else {
        this.currentType = 'sell'
      }
      this.$refs.topTabControl.currentIndex = index
      this.$refs.tabControl.currentIndex = index
      setTimeout(() => {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0, this.currentScrollY[this.currentType], 0)

      })


    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000
      this.isShowTopTabClick = -position.y > this.topTabControlOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeProductData(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
          this.$refs.scroll.refresh()
        }
      )
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    getHomeMultiData() {
      getHomeMultiData().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list
      })
    },
    finishLoadOneHomeSwiper() {
      this.topTabControlOffsetTop = this.$refs.tabControl.$el.offsetTop
      this.currentScrollY["pop"] = -this.$refs.tabControl.$el.offsetTop
      this.currentScrollY["new"] = -this.$refs.tabControl.$el.offsetTop
      this.currentScrollY["sell"] = -this.$refs.tabControl.$el.offsetTop

    }
  },
  created() {
    this.getHomeMultiData()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    // getHomeProductData('pop',1).then(res=>{
    //   this.goodsItemList=res.data.list
    //   console.log(res);
    // })
  },
  mounted() {

  },
  deactivated() {
    this.$bus.$off('finishLoadGoods', this.debounceRefreshScroll)
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
