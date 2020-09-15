<template>
  <el-row :class="$style['no-auth']">
    <div :class="$style['no-auth-box']">
      <div :class="$style['no-auth-img']">
        <img src="@/assets/images/401.gif" />
      </div>
      <div :class="$style['no-auth-msg']">{{msg}}</div>
    </div>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'noAuth',
})
export default class NoAuth extends Vue {
  private msg = '没有权限查看，请联系管理员!'
}
</script>

<style lang="scss" module>
.no-auth {
  color: #8492a6;
  width: 100%;
  height: calc(100vh - 145px);
  position: relative;
  .no-auth-box {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -156px;
    margin-top: -280px;
    width: 313px;
    height: 480px;
    .no-auth-img {
      width: 313px;
      height: 428px;
      img {
        width: 313px;
        height: 428px;
      }
    }
    .no-auth-msg {
      width: 313px;
      height: 30px;
      font-size: 16px;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>
