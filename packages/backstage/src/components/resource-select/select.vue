<template>
  <Dialog
    title="资源选择器"
    :custom-class="$style.resourceSelect"
    :visible.sync="visible"
  >
    <Tabs v-model="currentTab" @tab-click="handelTabClick">
      <template v-for="(item, index) of tabs">
        <TabPane :key="index">
        </TabPane>
      </template>
    </Tabs>
    <Dialog
      title="信息填写"
      :visible.sync="extraVisible"
      :show-close="true"
      :before-close="(done) => { extraVisible = false; done() }"
    >
      <div>
        填写额外信息
      </div>
      <template slot="footer">
        <Button @click="handleExtraCancel">取消</Button>
        <Button type="primary" @click="handleExtraConfirm">确定</Button>
      </template>
    </Dialog>
    <template slot="footer">
      <Button @click="handleCancel">取消</Button>
      <Button type="primary" @click="handleConfirm">确定</Button>
    </template>
  </Dialog>
</template>

<script lang="ts">
import {
  Vue,
  Emit,
  Prop,
  Model,
  Component,
} from 'vue-property-decorator'
import {
  Tabs,
  Dialog,
  TabPane,
} from 'element-ui'

import ResourceType from './enum'

interface SelectedValue {
  value: string
}

const components = {
  Tabs,
  Dialog,
  TabPane,
}

@Component({ components })
export default class ResourceSelect extends Vue {
  @Model('change', {
    type: Boolean,
    required: true,
  }) visible: boolean = false

  @Prop() types: ResourceType[] = []

  private value: SelectedValue | undefined = undefined

  private currentTab: string | undefined = undefined

  private extraVisible: boolean = false

  created () {
    // TODO: 获取需要展示的标签
  }

  handleTabClick (tab: string) {
    this.currentTab = tab
  }

  private handleExtraCancel () {
    this.extraVisible = false
  }

  /** 填写额外信息提交 */
  @Emit('ok')
  private handleExtraConfirm () {
    this.$emit('change', false)
    this.extraVisible = false
    return this.value
  }

  /** 关闭资源选择器 */
  @Emit('cancel')
  private handleCancel () {
    this.value = undefined
  }

  /** 选择资源确认 */
  private handleConfirm () {
    this.extraVisible = true
    // FIXME: 填充具体值
    this.value = { value: 'placeholder' }
  }
}
</script>

<style lang="scss" module>
.resourceSelect {
  display: block;
}
</style>
