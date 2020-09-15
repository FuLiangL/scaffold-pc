<template>
  <el-input
    v-model="form[item.key]"
    :placeholder="item.placeholder || `请输入${item.label}`"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Input extends Vue {
  @Prop(Object) form!: object

  @Prop(Object) item!: object
}
</script>
<style lang="scss" module>
</style>
