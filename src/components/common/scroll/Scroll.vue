<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default() {
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.probeType
    })
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })

    if (this.probeType !== 0) {
      this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        }
      )
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>
