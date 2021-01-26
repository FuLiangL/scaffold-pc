<template>
  <div id="navbar-header">
    <div :class="$style['page-navbar']">
      <!-- 两种状态的logo展示 -->
      <div :class="isCollapse ?
                   [$style.closeLogo, $style['page-logo']] :
                   [$style.openLogo, $style['page-logo']]">
        <h1 v-if="isCollapse">金</h1>
        <h1 v-else>金地物业</h1>
      </div>
      <div :class="$style['navbar-left']">
        <div :class="$style['navbar-collapse']">
          <span :class="$style['menu-fold']" @click="toogleCollapse">
            <i v-if="!isCollapse" class="iconfont el-icon-s-fold"></i>
            <i v-else class="iconfont el-icon-s-unfold"></i>
          </span>
        </div>
        <!-- 顶部进行菜单的切换路由展示 -->
        <heard />
      </div>
      <div :class="$style['navbar-right']">
        <span :class="$style['navbar-news-icon']">
          <i class="iconfont el-icon-bell"></i>
        </span>
        <el-avatar :class="$style['navbar-user-icon']" :src="userInfo && userInfo.avatar"></el-avatar>
        <el-dropdown :class="$style['navbar-dropdown']" @command="handleCommand">
          <span :class="$style['el-dropdown-link']">
            <span style="padding-top: -10px">{{ (userInfo && userInfo.userName) || '暂未登录' }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- <TagsView /> -->
  </div>
</template>

<script lang="ts">
import { Vue, Emit, Prop, Component } from 'vue-property-decorator'
import { UserInfo } from '@/common/interfaces'
import heard from './heard.vue'

@Component({
  components: { heard },
})
export default class NavBar extends Vue {
  @Prop({ default: true }) private isCollapse!: boolean

  get userInfo(): UserInfo | undefined {
    return this.$store.getters.userInfo || undefined
  }

  @Emit('toogle-collapse')
  toogleCollapse() {}

  public handleCommand(key: string) {
    switch (key) {
      case 'user':
        this.$router.push('/user/center')
        break
      case 'loginout':
        this.userLoginOut()
        break
      default:
        console.error('无操作')
    }
  }

  // 退出登陆
  private userLoginOut() {
    console.log(this.$store, 'this.$store')
    this.$store
      .dispatch('user/loginOut')
      .then((res: any) => {
        if (res.success) {
          this.$router.push('/login')
        }
      })
      .catch((err: any) => {
        console.log(err)
        this.$message.error('退出登陆失败')
      })
  }
}
</script>

<style module lang="scss">
.page-navbar {
  height: 36px;
  padding: 10px 20px;
  background: $--color-background;
  .openLogo {
    margin-left: -260px;
    width: 240px;
    h1 {
      width: 240px;
    }
  }
  .closeLogo {
    margin-left: -85px;
    width: 65px;
    h1 {
      width: 65px;
    }
  }
  .page-logo {
    margin-top: -10px;
    height: 56px;
    float: left;
    background: #001529;
    h1 {
      height: 56px;
      text-align: center;
      line-height: 56px;
      font-size: 20px;
      color: $--color-primary;
    }
  }
  .navbar-left {
    width: 50%;
    height: 36px;
    line-height: 36px;
    float: left;
    .navbar-collapse {
      width: 24px;
      height: 24px;
      float: left;
      margin-left: -10px;
      i {
        margin-top: 6px;
      }
    }
  }
  .navbar-right {
    float: right;
    height: 36px;
    line-height: 36px;
    .navbar-news-icon {
      padding-top: 4px;
      height: 24px;
      margin: 0 20px;
      float: left;
      cursor: pointer;
      .iconfont {
        font-size: 20px;
        color: #b2b0c7;
        transition: all 1s;
      }
      &:hover {
        .iconfont {
          color: $--color-primary;
        }
      }
    }
    .navbar-user-icon {
      width: 36px;
      height: 36px;
      float: left;
    }
    .navbar-dropdown {
      height: 36px;
      line-height: 40px;
      padding-left: 5px;
    }
  }
  .menu-fold {
    cursor: pointer;
    i {
      font-size: 24px;
      color: #999;
    }
  }
}
.navbar-collapse {
  margin-right: 20px;
}
</style>
