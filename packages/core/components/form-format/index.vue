<template>
  <el-form
    ref="form"
    :model="form"
    :class="$style.form"
    label-position="left"
    size="small"
  >
    <el-row :gutter="20">
      <template v-for="item in data">
        <!-- 标题行 -->
        <el-col
          v-if="item.frontTitle"
          :key="`title-${item.key}`"
          :span="24"
        >
          <div :class="$style.title">
            {{item.frontTitle}}
          </div>
        </el-col>
        <!-- 按钮组 -->
        <el-col
          v-if="item.itemType === 'btnGroup'"
          :key="`btn-${item.key}`"
        >
          <div :class="$style.btnGroup">
            <el-button
              v-for="btn in item.options"
              :key="btn.key"
              :type="btn.type"
              size="small"
              @click="handleClick($event, btn)"
            >{{btn.text}}</el-button>
          </div>
        </el-col>
        <!-- 表单项 -->
        <el-col
          v-else
          :key="`main-${item.key}`"
          :span="item.span || 6"
        >
          <template v-if="item.key">
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
          </template>
        </el-col>
        <!-- 分隔行 -->
        <el-col
          v-if="item.bottomLine"
          :key="`bottom-${item.key}`"
          :span="24"
        >
          <div :class="$style.bottom"></div>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import formItem from './components/index'

interface item {
  frontTitle?: string // 前置标题
  label: string // 表单
  key: string // 表单key值，唯一
  slot?: string // 插槽key值，唯一
  itemType?: string // 表单类型
  options: Array<object> // select、radio、checkbox、cascader选择项或btn组按钮项
  rules: Array<rules> // 检验规则
  placeholder?: string,
  value?: Array<string | number> | string | number | Object // 默认值
  bottomLine?: boolean // 是否有底部分隔行
  // ...其他element自带配置
}
interface rules {
  required?: boolean,
  message: string,
  trigger?: string,
  type?: string
}
interface form {
  [key: string]: any // 此处form对象要动态添加属性，必须为any，否则报错
}
interface btn {
  btnType: string // 按钮类型，一般为submit或reset
  type: string // 按钮type
  key: string // 按钮key值，唯一
  text: string // 按钮文案
  onSuccess: Function // 提交按钮校验成功回调
  onClick: Function // 按钮点击回调
}

@Component({
  name: 'formFormat',
})
export default class FormFormat extends Vue {
  @Prop(Array) data!: Array<item>

  private form: form = {}

  private formItem = formItem

  // 提交校验
  private submitForm (btn: btn) {
    (this.$refs.form as HTMLFormElement).validate((valid: boolean) => {
      if (valid) {
        if (btn.onSuccess) {
          btn.onSuccess(this.form)
        }
      }
      return false
    })
  }

  private handleClick (event:object, btn: btn) {
    if (btn.onClick) {
      btn.onClick()
    }
    if (btn.btnType === 'submit') {
      this.submitForm(btn)
    } else if (btn.btnType === 'reset') {
      (this.$refs.form as HTMLFormElement).resetFields()
    }
  }

  created () {
    this.data.forEach((item: item) => {
      if (item.value) {
        this.$set(this.form, item.key, item.value)
      } else if (item.itemType === 'checkbox') {
        this.$set(this.form, item.key, [])
      }
    })
  }
}
</script>
<style lang="scss" module>
.form {
  line-height: 22px;
  :global .el-col {
    min-height: 50px;
  }
  .title {
    font-size: 16px;
    margin-bottom: 24px;
  }
  .slot {
    margin-bottom: 16px;
  }
  .bottom {
    height: 1px;
    border-bottom: 1px dashed $--border-color-base;
    margin-bottom: 24px;
    margin-top: 8px;
  }
  .btnGroup {
    padding-left: 80px;
  }
  :global .el-form-item--small.el-form-item {
    margin-bottom: 16px;
  }
  .item {
    display: flex;
    margin-bottom: 16px;
    :global .el-form-item__label {
      font-size: 12px;
      width: 80px;
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
    :global .el-upload-list {
      width: 178px;
    }
  }
}
</style>
