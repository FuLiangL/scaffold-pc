<template>
    <el-cascader
      v-model="form[item.key]"
      :options="item.options"
      :show-all-levels="!!item.showAllLevels"
      :placeholder="item.placeholder || `请选择${item.label}`"
      :props="{
        emitPath: false,
        ...item.props,
      }"
    />
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Cascader extends Vue {
  @Prop(Object) form!: object

  @Prop(Object) item!: object
}
</script>
<style lang="scss" module>
</style>
