<template>
  <el-select
    v-model="form[item.key]"
    :placeholder="item.placeholder || `请选择${item.label}`"
  >
    <el-option
      v-for="option in item.options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    />
  </el-select>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class formSelect extends Vue {
  @Prop(Object) form!: object

  @Prop(Object) item!: object
}
</script>
<style lang="scss" module>
</style>
