<template>
  <el-date-picker
    v-model="form[item.key]"
    :type="item.type"
    :picker-options="item.pickerOptions"
    range-separator="-"
    :placeholder="item.placeholder || `请选择${item.label}`"
    :start-placeholder="item.startPlaceholder || '开始时间'"
    :end-placeholder="item.endPlaceholder || '结束时间'"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class DatePicker extends Vue {
  @Prop(Object) form!: object

  @Prop(Object) item!: object
}
</script>
<style lang="scss" module>
</style>
