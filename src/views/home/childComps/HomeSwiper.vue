<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="finishLoad">
      </a>
    </swiper-item>

  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper"

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      finishLoadImgNumber: 0
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    finishLoad() {
      this.finishLoadImgNumber += 1
      if (this.finishLoadImgNumber === 1) {
        this.$emit('finishLoad')
      }
    }
  }
}
</script>

<style scoped>

</style>
