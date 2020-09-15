<template>
  <el-scrollbar class="scroll-container">
    <el-aside :width="asideWidth" class="aside-menu">
      <div class="logo-posi"></div>
      <el-menu
        :default-active="defaultActive"
        :class="activeThemeClass"
        :collapse="isCollapse"
      >
        <template v-for="item in slideMenu">
          <el-submenu :index="item.path"
                      :key="item.path"
                      v-if="item.children &&
                            item.children.length > 0 &&
                            isHaveChildren(item.children)">
            <template slot="title">
              <i v-if="item.icon" :class="['iconfont', item.icon]"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item-group>
              <template  v-for="child in item.children">
                <!-- 进行第三级路由的选择 -->
                <el-submenu :index="`${child.path}`"
                            :key="child.path"
                            v-if="child.children &&
                                  child.children.length > 0 &&
                                  isHaveChildren(child.children)">
                  <template slot="title">
                    <i v-if="child.icon" :class="['iconfont', child.icon]"></i>
                    <span>{{ child.title }}</span>
                  </template>
                  <el-menu-item-group>
                    <template v-for="childItem in child.children">
                      <router-link :to="childItem.path" :key="childItem.path">
                        <el-menu-item :index="childItem.path">
                          <i  v-if="childItem && childItem.icon"
                              :class="['iconfont', childItem.icon]"></i>
                          <span slot="title">{{ childItem.title }}</span>
                        </el-menu-item>
                      </router-link>
                    </template>
                  </el-menu-item-group>
                </el-submenu>
                <router-link :to="child.path" :key="child.path" v-else>
                  <el-menu-item :index="child.path">
                    <i v-if="child && child.icon" :class="['iconfont', child.icon]"></i>
                    <span slot="title">{{ child.title }}</span>
                  </el-menu-item>
                </router-link>
              </template>
            </el-menu-item-group>
          </el-submenu>
          <router-link v-else :to="item.path" :key="item.path">
            <el-menu-item :index="item.path">
              <i v-if="item.icon" :class="['iconfont', item.icon]"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-menu>
    </el-aside>
  </el-scrollbar>
</template>
<script lang="ts">
import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator'

interface MenuInterFace {
  path: string,
  title: string,
  isHide?: boolean,
  icon?: string,
  zIndex?: number,
  children?: MenuInterFace[],
}

@Component
export default class Aside extends Vue {
  @Prop({ default: false }) private readonly isCollapse!: boolean

  @Prop({ default: '240px' }) private readonly asideWidth!: string

  private slideMenu = this.$store.state.user.menu

  private onIndexArr: string[] = [] // 所有的缺失不展示的index集合

  private defaultActive = ''

  private activeThemeClass: string = 'el-menu-dark-theme'

  mounted () {
    this.getHideTrue(this.slideMenu)
    this.indexName(this.$route.fullPath)
  }

  get userMenu () {
    return this.$store.state.user.menu
  }

  @Watch('$route')
  private changeRoute (val: any) {
    this.indexName(val.fullPath)
  }

  @Watch('userMenu')
  private changeUserMenu (val: any) {
    this.slideMenu = val
  }

  private indexName (index: string) {
    if (this.onIndexArr.indexOf(index) >= 0) {
      // 如果是缺失本身就没有的index，直接去进行找到上一级的
      this.indexName(index.substring(0, index.lastIndexOf('/')))
    }
    if (this.onIndexArr.indexOf(index) === -1) {
      this.defaultActive = index
    }
    // 这边控制对应的左侧菜单展示
    let str = index.substring(1)
    str = str.substring(0, str.indexOf('/'))
    str = `/${str}`
    this.$store.state.user.menu.forEach((item: MenuInterFace) => {
      if (item.path === str) {
        this.slideMenu = item.children || []
      }
    })
  }

  // 得到全部的true的路由，进行对应的判断区分
  private getHideTrue (arr: MenuInterFace[]) {
    arr.forEach((item) => {
      if (item.children && item.children.length > 0) this.getHideTrue(item.children)
      if (item.isHide === true) this.onIndexArr.push(item.path)
    })
  }

  // 进行判断对应的是否全是isHide，就没有对应的展示内容
  // 对应列表里面去有对应的详情和编辑新建页面等
  private isHaveChildren (arr: MenuInterFace[]) {
    let isHave = false
    arr.forEach((item: MenuInterFace) => {
      if (item.isHide === false) isHave = true
      if (item.isHide === undefined) isHave = true
    })
    return isHave
  }
}
</script>
<style lang="scss">
.scroll-container {
  height: 100%;
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.aside-menu {
  .el-menu-item, .el-submenu__title {
    height: 40px;
    line-height: 40px;
    margin-top: 4px;
    margin-bottom: 4px;
  }
  .el-menu-item-group__title {
    display: none;
  }
}
.el-menu--vertical {
  .el-menu-item-group__title {
    display: none;
  }
  .el-submenu__title, .el-menu-item, .el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
}
</style>
<style lang="scss" scoped>
.logo-posi{
  width: 100%;
  height: 52px;
}
.aside-menu {
  position: relative;
  overflow-x: hidden;
}
.el-menu {
  .iconfont {
    margin-left: 6px;
  }
  border-right: 0;
  li {
    i, span{
      font-size: 14px;
    }
    span {
      padding-left: 10px;
    }
  }
  .el-menu-item {
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      border-right: 3px solid $--color-primary;
      transform: scaleY(.0001);
      opacity: 0;
      content: "";
    }
  }
}
.el-menu.el-menu-dark-theme {
  background: #001529;
  li {
    i, span {
      font-size: 14px;
      color: hsla(0,0%,100%,.65);
    }
    i {
      font-size: 14px;
    }
    span {
      font-size: 14px;
    }
    .el-submenu__title:hover {
      i,span {
        color: #fff;
      }
    }
  }
  .el-menu-item:hover{
    i,span {
      color: #fff;
    }
    background: #001529;
  }
  .router-link-active {
    .el-menu-item {
      background-color: #eff7ff !important;
      i, span {
        color: $--color-primary !important;
      }
      &:after {
        transform: scaleY(1);
        opacity: 1;
      }
    }
  }
}
.el-menu.el-menu--collapse {
  width: 65px;
  span {
    text-align: center;
  }
}
</style>
