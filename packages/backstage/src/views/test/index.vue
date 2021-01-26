<template>
  <div :class="$style.test">
    <el-button type="primary" @click="editSure('1')" v-if="!isEdit">编辑</el-button>
    <el-button type="primary" @click="editSure('0')" v-else>提交</el-button>
    <el-button type="primary" @click="jumpFun('0')">跳转</el-button>
    <mapBaidu
      :secRingArr="secRingArr"
      ref="mapGetPath"
      :isEdit='isEdit' />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import mapBaidu from '@/components/map-baidu/index.vue'

@Component({
  name: 'Test',
  components: { mapBaidu },
})
export default class Test extends Vue {
  public isEdit: boolean = true

  public secRingArr: Array<any> = []

  private mounted() {
    // 一上来应该有一个默认数据进行展示的
    this.secRingArr = [
      { lng: 114.052, lat: 22.550 },
      { lng: 114.060, lat: 22.570 },
      { lng: 114.052, lat: 22.570 },
      { lng: 114.040, lat: 22.550 },
    ]
  }

  private jumpFun() {
    this.$router.push({ path: '/eCommerceBackstage/test1/test2' })
  }

  public editSure(type: string) {
    if (type === '0') {
      // 提交的时候的操作
      // this.$refs.mapGetPath.getPath()
      const resData = (this.$refs.mapGetPath as Vue & { getPath: Function }).getPath()
      console.log(resData, '提交的时候得到对应数据')
    } else if (type === '1') {
      // 编辑点击的操作
      console.log('开始进行编辑的操作')
    }
    this.isEdit = !this.isEdit
  }
}
</script>
<style lang="scss" module>
.test {
  width: 100%;
  height: auto;
  background: white;
  border-radius: 20px;
  overflow: hidden;
}
</style>
