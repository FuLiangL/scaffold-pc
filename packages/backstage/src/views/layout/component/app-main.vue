<template>
  <div>
    <!-- 面包屑只有在有左侧菜单的模式下面，才会进行对应展开显示 -->
    <Breadcrumb :class="$style.breadcrumb" v-if="isShowBreadcrumb"/>
    <div id="app-main" :class="$style['app-main']">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Breadcrumb from './bread-crumb.vue'

@Component({
  components: { Breadcrumb },
})
export default class AppMain extends Vue {
  get isShowBreadcrumb () {
    return `${this.$route.meta.layout || 'common'}-layout` === 'common-layout'
  }

  get key () {
    return (this.$router as any).path
  }
}
</script>
<style lang="scss" module>
.breadcrumb {
  width: calc(100% - 30px);
  height: 30px;
  padding: 4px 15px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
}
.app-main {
  padding: 20px;
  background-color: #fff;
  box-shadow: $--box-shadow-light;
}
</style>
