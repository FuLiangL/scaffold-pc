<template>
  <div :class="$style.demo">
    <div :class="$style.line">{{clickTimes}}</div>
    <el-button type="primary">aaa</el-button>
    <child :user="user" :clickTimes="clickTimes" @on-child-click="getChildClick" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import child from './components/child.vue'

@Component({
  name: 'Demo',
  components: { child },
})
export default class Demo extends Vue {
  clickTimes: number = 0

  user: object = {
    name: 'username',
    birthday: '2000.01.01',
    logo: '',
  }

  getChildClick(msg:string) {
    this.clickTimes += 1
    console.log('getChildClick')
    console.log('parent get message: ', msg) // 获取emit参数
  }
}
</script>
<style lang="scss" module>
.demo {
  line-height: 1.5;
  .line {
    color: $--color-primary;
  }
}
</style>
