<template>
  <el-input
    v-model="form[item.key]"
    :rows="item.row || 3"
    type="textarea"
    :resize="item.resize || 'none'"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Textarea extends Vue {
  @Prop(Object) form!: object

  @Prop(Object) item!: object
}
</script>
<style lang="scss" module>
</style>
