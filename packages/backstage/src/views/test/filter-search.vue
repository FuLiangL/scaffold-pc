<template>
  <el-row :class="$style.filterSearch">
    <el-col :span="item.span || 8" v-for="item in searchContents" :key="item">
      <sapn :class="$style.spanName">{{item.name}}</sapn>
      <el-select v-model="item.value" placeholder="请选择">
        <el-option
          v-for="oneItem in item.options"
          :key="oneItem.value"
          :label="oneItem.label"
          :value="oneItem.value">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({ name: 'filterSearch' })
export default class FilterSearch extends Vue {
  private value:string = '11'

  private options:object[] = [
    { value: '11', label: '11' },
    { value: '22', label: '22' },
  ]

  @Prop(Array) searchContents!:[]

  mounted () {
    console.log(this.searchContents, 123456)
  }
}
</script>

<style lang="scss" module>
.filterSearch {
  background: red;
  border-radius: 0px;
}
.spanName {
  width: 100px;
  display: inline-block;
}
</style>
