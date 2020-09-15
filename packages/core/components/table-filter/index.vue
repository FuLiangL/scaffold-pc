<template>
  <el-form
    ref="form"
    :class="$style.form"
    :model="form"
    label-position="left"
    size="small"
  >
    <el-row :gutter="20">
      <template v-for="item in data">
        <el-col
          :key="`main-${item.key}`"
          :span="item.span || 4"
        >
          <el-form-item
            v-if="!item.slot"
            :label="item.label"
            :class="$style.item"
            :prop="item.key"
            :rules="item.rules"
          >
            <component
              :is="formItem[item.itemType || 'input']"
              :form="form"
              :item="item"
            />
          </el-form-item>
          <div v-else :class="$style.slot">
            <slot :item="item" />
          </div>
        </el-col>
      </template>
      <div :class="$style.btnGroup">
        <el-button
          size="small"
          type="primary"
          @click="handleFilter"
        >查询</el-button>
      </div>
    </el-row>
  </el-form>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import formItem from '../form-format/components/index'

interface form {
  [key: string]: any // 此处form对象要动态添加属性，必须为any，否则报错
}

@Component({
  name: 'tableFilter',
})
export default class TableFilter extends Vue {
  @Prop(Array) data!: Array<object>

  private form: form = {}

  private formItem = formItem

  handleFilter () {
    this.$emit('handleFilter', this.form)
  }
}
</script>
<style lang="scss" module>
.form {
  .btnGroup {
    float: right;
    padding-right: 10px;
  }
  :global .el-form-item--small.el-form-item {
    margin-bottom: 16px;
  }
  .item {
    display: flex;
    margin-bottom: 16px;
    :global .el-form-item__label {
      font-size: 12px;
      width: auto;
    }
    :global .el-form-item__content {
      flex: 1;
      .el-select, .el-cascader {
        width: 100%;
      }
    }
    :global .el-date-editor--datetimerange.el-input,
    :global .el-date-editor--datetimerange.el-input__inner {
      width: 100%;
    }
  }
}
</style>
