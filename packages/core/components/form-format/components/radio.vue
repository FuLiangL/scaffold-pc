<template>
  <el-radio-group v-model="form[item.key]">
    <el-radio
      v-for="option in item.options"
      :key="option.value"
      :label="option.value"
      :disabled="option.disabled"
    >
      {{option.label}}
    </el-radio>
  </el-radio-group>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Radio extends Vue {
  @Prop(Object) form!: object

  @Prop(Object) item!: object
}
</script>
<style lang="scss" module>
</style>
