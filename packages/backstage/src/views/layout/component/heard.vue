<template>
<el-menu :default-active="defaultActive"
         :class="activeThemeClass"
         class="head-menu"
         mode="horizontal">
         <!-- @select="handleSelect"> -->
  <!-- 只进行一级展示 -->
  <template v-for="item in slideMenu">
    <el-menu-item disabled v-if="item.isBlank" :index="item.path" :key="item.path">
      <a :href="item.path" target="_blank">{{item.title}}</a>
    </el-menu-item>
    <el-menu-item v-else :index="item.path" :key="item.path">
      <a :href="'#'+item.path">{{item.title}}</a>
    </el-menu-item>
  </template>
</el-menu>
</template>
<script lang="ts">
import {
  Vue, Component, Watch,
} from 'vue-property-decorator'

@Component
export default class Aside extends Vue {
  private defaultActive = ''

  private slideMenu = this.$store.state.user.menu

  private activeThemeClass: string = 'el-menu-dark-theme'

  private mounted () {
    this.setDefaultActiveFun(this.$route.fullPath)
  }

  get userMenu () {
    return this.$store.state.user.menu
  }

  @Watch('$route')
  private changeRoute (val: any) {
    this.setDefaultActiveFun(val.fullPath)
  }

  @Watch('userMenu')
  private changeUserMenu (val: any) {
    this.slideMenu = val
  }

  private setDefaultActiveFun (url: string) {
    let str = url.substring(1)
    str = str.substring(0, str.indexOf('/'))
    this.defaultActive = `/${str}`
  }

  handleSelect (key: string, keyPath: string) {
    console.log(key, keyPath)
  }
}
</script>
<style lang="scss" scoped>
.el-menu.head-menu {
  margin-left: 20px;
  height: 56px;
  margin-top: -10px;
  .el-menu-item {
    opacity: 1;
    cursor: pointer;
    font-size: 14px;
    margin-top: -10px;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 10px;
    margin-right: 10px;
    height: 56px;
    line-height: 56px;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  .el-menu-item:hover{
    color: #fff;
    i,span {
      color: #fff;
    }
    background: #001529;
  }
  .el-menu-item.is-active{
    color: #fff;
    background: transparent;
    border-bottom: 2px solid $--color-primary;
  }
}
.el-menu.el-menu-dark-theme {
  background: #001529;
}
</style>
