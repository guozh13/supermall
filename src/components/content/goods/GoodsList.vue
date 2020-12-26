<template>
  <div class="goods">
    <goods-list-item v-for="item in goodsItemList" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsLIstItem";
export default {
  name: "Goods",
  props:{
    goodsItemList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components:{
    GoodsListItem
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}
</style>
