<template>
  <div>
    <swiper class="detail-swaper">
      <swiper-item v-for="item in topImages" >
        <img :src="item" alt="" @load="finishLoad">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from "@/components/common/swiper"

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods:{
    finishLoad(){
      this.$emit('finishLoad')
    }

  }

}
</script>

<style scoped>
.detail-swaper {
  height: 300px;
  overflow: hidden;
}
</style>
