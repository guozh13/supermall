<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="navClick" ref="detailNav"></detail-nav-bar>
    <scroll class="content2" :probe-type="3" @scroll="contentScroll" ref="scroll">
      <detail-swiper :top-images="topImages" @finishLoad="detailSwiperFinishLoad" ref="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="finishDetailInfoImg"></detail-goods-info>
      <detail-param-info :param-info="goodsParam" ref="goodsParam"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"></detail-comment-info>
      <goods-list :goods-item-list="recommends" ref="recommends"></goods-list>
    </scroll>
    <div><p>加入购物车</p>
    </div>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import GoodsList from "@/components/content/goods/GoodsList";
import {getDetail, getDetailRecommend, Goods, Shop, GoodsParam} from "@/network/detail";
import {itemListenMixin} from "@/common/mixin";


export default {
  name: "Detail",
  mixins: [itemListenMixin],
  data() {
    return {
      goods: {},
      shop: {},
      goodsParam: {},
      topImages: [],
      detailInfo: {},
      recommends: [],
      commentInfo: {},
      // offSetTopForNav: {
      //   goodsParam: 0,
      //   commentInfo: 0,
      //   recommends: 0
      // }

      offSetTopForNav: []

    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailParamInfo,
    DetailGoodsInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll
  },
  methods: {
    detailSwiperFinishLoad() {
      this.$refs.scroll.refresh()
    },
    finishDetailInfoImg() {
      this.$refs.scroll.refresh()
      // this.offSetTopForNav.goodsParam = this.$refs.goodsParam.$el.offsetTop
      // this.offSetTopForNav.commentInfo = this.$refs.commentInfo.$el.offsetTop
      // this.offSetTopForNav.recommends = this.$refs.recommends.$el.offsetTop
      this.offSetTopForNav = [
        0,
        this.$refs.goodsParam.$el.offsetTop,
        this.$refs.commentInfo.$el.offsetTop,
        this.$refs.recommends.$el.offsetTop,
        -this.$refs.scroll.scroll.maxScrollY
      ]
    },
    navClick(index) {
      if (index === 0) {
        this.$refs.scroll.scrollToElement(this.$refs.topImages.$el)
      } else if (index === 1) {
        this.$refs.scroll.scrollToElement(this.$refs.goodsParam.$el)
      } else if (index === 2) {
        this.$refs.scroll.scrollToElement(this.$refs.commentInfo.$el)
      } else if (index === 3) {
        this.$refs.scroll.scrollToElement(this.$refs.recommends.$el)
      }
    },

    contentScroll(position) {
      for (let i = 0; i < this.offSetTopForNav.length - 1; i++) {
        if (-position.y >= this.offSetTopForNav[i] && -position.y < this.offSetTopForNav[i + 1]) {
          this.$refs.detailNav.currentIndex = i
        }
      }


      // if (-position.y > this.offSetTopForNav.recommends) {
      //   this.$refs.detailNav.currentIndex = 3
      // } else if (-position.y > this.offSetTopForNav.commentInfo) {
      //   this.$refs.detailNav.currentIndex = 2
      // } else if (-position.y > this.offSetTopForNav.goodsParam) {
      //   this.$refs.detailNav.currentIndex = 1
      // } else {
      //   this.$refs.detailNav.currentIndex = 0
      // }
    }
  },
  created() {
    getDetail(this.$route.params.iid).then(res => {
      this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
      this.shop = new Shop(res.result.shopInfo)
      this.topImages = res.result.itemInfo.topImages
      this.goodsParam = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
      this.detailInfo = res.result.detailInfo
      if (res.result.rate.cRate !== 0)
        this.commentInfo = res.result.rate.list[0]
    })
    getDetailRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mounted() {
  },
  destroyed() {
    this.$bus.$off('finishLoadGoods', this.debounceRefreshScroll)
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
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;

  background-color: #fff;
}

.content2 {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /*height: calc(100% - 44px);*/
}
</style>
