<template>
  <div :class="$style.layout">
    <el-container :class="$style['page-layout']">
      <div :class="$style['page-slider']" :style="{ width: asideWidth }"></div>
      <div :class="$style['page-container']">
        <el-container>
          <el-header :class="$style['page-header']">
            <NavBar
              :isCollapse="isCollapse"
              @toogle-collapse="toogleCollapse" />
          </el-header>
          <el-main :class="$style['page-main']" :style="{ marginLeft: `-${asideWidth}` }">
            <AppMain/>
          </el-main>
        </el-container>
      </div>
    </el-container>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { AppMain, Aside, NavBar } from './component'

@Component({
  components: { AppMain, Aside, NavBar },
})
export default class common extends Vue {
  public isCollapse: boolean = false // icon展示、完全展示

  private asideWidth: string = '240px'

  public toogleCollapse () {
    this.isCollapse = !this.isCollapse
    this.asideWidth = this.isCollapse ? '65px' : '240px'
  }
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
  height: 56px;
  width: 240px;
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
  height: calc(100vh - 56px);
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
