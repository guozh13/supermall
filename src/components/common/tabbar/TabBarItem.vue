<template>
  <div class="tab-bar-item" @click="itemClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-active-icon"></slot>
    <div :style="activeStyle">
      <slot name="item-name"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.itemPath) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  props: {
    itemPath: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.itemPath);
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  margin-bottom: 2px;
}
</style>
