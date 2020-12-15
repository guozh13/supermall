<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">
        购物车
      </div>
    </nav-bar>
    {{ banners }}
    {{ recommend }}
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import {getHomeMultidata} from "@/network/home";

export default {
  name: "Home",
  data() {
    return {
      banners:[],
      recommend:[]
    }
  },
  components: {
    NavBar
  },
  created() {
    getHomeMultidata().then(res => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommend =res.data.recommend.list
    })
  }
}
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
