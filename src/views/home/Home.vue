<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content"
            :probe-type="3"
            :pull-up-load="true"
            ref="scroll"
            @scroll="scroll"
            @pullingUp="pullingUp">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" @tabClick="tabClick"></tab-control>
      <goods-list :goods-item-list="goods[currentType].list"></goods-list>
      <ul>
        <li>list1</li>
        <li>list2</li>
        <li>list3</li>
      </ul>
    </scroll>
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

import {getHomeMultidata, getHomeProductData} from "@/network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    HomeSwiper,
    RecommendView,
    FeatureView,
    GoodsList
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop'
    }
  },
  methods: {
    tabClick(index) {
      if (index === 0) {
        this.currentType = 'pop'
      } else if (index === 1) {
        this.currentType = 'new'
      } else {
        this.currentType = 'sell'
      }
    },
    scroll(position) {
      console.log(position);
    },
    pullingUp() {
      console.log('hhh');
    },
    getHomeGoods(type) {
      this.goods[type].page += 1
      getHomeProductData(type, this.goods[type].page).then(
        res => {
          this.goods[type].list = res.data.list
        }
      )
    }
  },
  created() {
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list
    })
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    // getHomeProductData('pop',1).then(res=>{
    //   this.goodsItemList=res.data.list
    //   console.log(res);
    // })
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
