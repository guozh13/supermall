<template>
  <div>
    <tab-bar>
      <tab-bar-item item-path="/home">
        <img slot="item-icon" src="@/assets/img/tabbar/home.svg" alt="">
        <img slot="item-active-icon" src="~assets/img/tabbar/home_active.svg" alt="">
        <div slot="item-name">首页</div>
      </tab-bar-item>
      <tab-bar-item item-path="/category">
        <img slot="item-icon" src="@/assets/img/tabbar/category.svg" alt="">
        <img slot="item-active-icon" src="~assets/img/tabbar/category_active.svg" alt="">
        <div slot="item-name">分类</div>
      </tab-bar-item>
      <tab-bar-item item-path="/cart">
        <img slot="item-icon" src="@/assets/img/tabbar/shopcart.svg" alt="">
        <img slot="item-active-icon" src="~assets/img/tabbar/shopcart_active.svg" alt="">
        <div slot="item-name">购物车</div>
      </tab-bar-item>
      <tab-bar-item item-path="/profile">
        <img slot="item-icon" src="@/assets/img/tabbar/profile.svg" alt="">
        <img slot="item-active-icon" src="~assets/img/tabbar/profile_active.svg" alt="">
        <div slot="item-name">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
import TabBarItem from "../../common/tabbar/TabBarItem";
import TabBar from "../../common/tabbar/TabBar";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
