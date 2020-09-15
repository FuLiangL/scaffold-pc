<template>
  <div :class="$style.layout">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class pop extends Vue {

}
</script>
<style lang="scss" module>
.page-layout {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: $--color-light-white;
}
.page-slider {
  box-shadow: 0 1px 9px -3px rgba(0,0,0,0.2);
  position: relative;
  background: $--color-background;
}
.page-header {
  margin: 0;
  padding: 0;
  height: auto !important;
  box-shadow: 4px 4px 40px 0 rgba(0,0,0,0.05);
  background: $--color-white;
  position: relative;
  width: 100%;
  z-index: 999;
  left: 0;
  top: 0;
}
.page-main {
  padding: 24px;
}
.page-container {
  flex: 1 1;
  position: relative;
  height: 100vh;
  .el-container {
    padding-top: 140px;
    overflow-y: auto;
    height: 100%;
  }
}
.el-footer {
  color: rgba(0,0,0,0.45);
  font-size: 12px;
  background: $--color-white;
}
</style>
