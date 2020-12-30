<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" @finishLoad="detailSwiperFinishLoad"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-param-info :paramInfo="goodsParam"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import {getDetail, Goods, Shop, GoodsParam} from "@/network/detail";


export default {
  name: "Detail",
  data() {
    return {
      goods: {},
      shop: {},
      goodsParam: {},
      topImages: []
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailParamInfo,
    Scroll
  },
  methods: {
    detailSwiperFinishLoad() {
      this.$refs.scroll.refresh()
    }
  },
  created() {
    getDetail(this.$route.params.iid).then(res => {
      this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
      this.shop = new Shop(res.result.shopInfo)
      this.topImages = res.result.itemInfo.topImages
      this.goodsParam = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
      console.log(this.goodsParam);
    })
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}
</style>
