<template>
  <detail-format :data="detailOption">
    <template slot-scope="scope">
      <div v-if="scope.item.slot === 'img'">
        <img :src="scope.item.value" alt="">
      </div>
      <div v-if="scope.item.slot === 'checkbox'">
        <el-checkbox></el-checkbox>
      </div>
    </template>
  </detail-format>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import detailFormat from 'core/src/components/detail-format/index.vue'

@Component({
  name: 'DemoDetail',
  components: { detailFormat },
})
export default class Detail extends Vue {
  detailOption: Array<Object> = [
    {
      frontTitle: '基本信息',
      label: '姓名',
      value: '张三',
    },
    {
      label: '手机号',
      value: '13800138000',
    },
    {
      label: '性别',
      value: '男',
    },
    {
      label: '手机号',
      value: '13800138000',
    },
    {
      label: '性别',
      value: '男',
    },
    {
      label: '图片',
      value: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599048000308&di=17d4f373d59ace94e00fd8e5fda22bab&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F52%2F52%2F01200000169026136208529565374.jpg',
      slot: 'img',
      bottomLine: true,
      span: 18,
    },
    {
      frontTitle: '基本信息',
      label: '姓名',
      value: '张三',
    },
    {
      label: '手机号',
      value: '13800138000',
    },
    {
      label: '性别',
      value: '男',
    },
    {
      label: '图片',
      value: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1599048000308&di=17d4f373d59ace94e00fd8e5fda22bab&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F52%2F52%2F01200000169026136208529565374.jpg',
      slot: 'checkbox',
      span: 24,
    },
  ]
}
</script>
<style lang="scss" module>
</style>
