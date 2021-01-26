import {debounce} from "@/common/utils";

export const itemListenMixin = {
  data() {
    return {
      debounceRefreshScroll: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 0)
    this.debounceRefreshScroll = () => {
      refresh()
    }
    this.$bus.$on('finishLoadGoods', this.debounceRefreshScroll)
  }
}
