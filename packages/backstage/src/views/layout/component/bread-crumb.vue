<template>
  <el-breadcrumb :class="$style.breadcrumb" separator="/">
    <el-breadcrumb-item v-for="item in breadcrumbList"
                        :key="item.path"
                        :class="item.noClick ? $style.pointer : $style.default">
      <a v-if="item.noClick" :href="'#'+item.path">{{ item.title }}</a>
      <span v-else>{{ item.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

interface MenuInterFace {
  path: string,
  title: string,
  isHide?: boolean,
  icon?: string,
  zIndex?: number,
  children?: MenuInterFace[],
}
interface breadItem {
  path: string,
  title: string,
  query: string,
  noClick: boolean,
}
@Component
export default class breadcrumb extends Vue {
  private breadcrumbList: breadItem[] = [];

  private slideMenu = this.$store.state.user.menu

  private created () {
    this.getBreadcrumb()
  }

  get userMenu () {
    return this.$store.state.user.menu
  }

  @Watch('$route')
  private getRoute () {
    this.getBreadcrumb()
  }

  @Watch('userMenu')
  private changeUserMenu (val: any) {
    this.slideMenu = val
  }

  // 根据对应的路由去得到面包屑的路径
  private getBreadcrumb () {
    const url = this.$route.fullPath
    const breadArr:breadItem[] = []
    this.returnBreadcrumb(url, breadArr, this.slideMenu)
  }

  // 递归得到
  private returnBreadcrumb (
    url: string,
    breadArr: breadItem[],
    menuArr: MenuInterFace[],
  ) {
    menuArr.forEach((item) => {
      if (url.indexOf(item.path) >= 0) {
        breadArr.push({
          path: item.path,
          title: item.title,
          query: '',
          noClick: this.isClickFun(item.children || []),
        })
        if (url === item.path) {
          // eslint-disable-next-line
          breadArr[breadArr.length - 1].noClick = false
          this.breadcrumbList = JSON.parse(JSON.stringify(breadArr))
        } else {
          this.returnBreadcrumb(url, breadArr, item.children || [])
        }
      }
    })
  }

  // 进行判断当前可以点击的
  private isClickFun (childrenArr: MenuInterFace[]) {
    if (childrenArr.length === 0) {
      return false
    }
    let isClick = true
    childrenArr.forEach((item) => {
      if (!item.isHide) isClick = false
    })
    return isClick
  }
}
</script>

<style lang="scss" module>
.breadcrumb {
  float: left;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  background: #fff;
  .pointer span {
    cursor: pointer !important;
  }
  .default span {
    cursor: default !important;
  }
}
</style>
