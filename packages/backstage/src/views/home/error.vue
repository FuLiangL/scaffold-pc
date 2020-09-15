<template>
  <el-row :class="$style['error']">
    <div :class="$style['error-box']">
      <div :class="$style['error-img']">
        <img src="@/assets/images/404.png" />
      </div>
    </div>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'error',
})
export default class error extends Vue {}
</script>

<style lang="scss" module>
.error {
  color: #8492a6;
  width: 100%;
  height: calc(100vh - 145px);
  position: relative;
  .error-box {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -400px;
    margin-top: -200px;
    width: 800px;
    height: 400px;
    .error-img {
      width: 800px;
      height: 400px;
      img {
        width: 800px;
        height: 400px;
      }
    }
  }
}
</style>
