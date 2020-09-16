<template>
  <formFormat :data="formOption">
    <el-form-item
      slot-scope="scope"
      :label="scope.item.label"
      :prop="scope.item.key"
      :class="$style.item"
      :rules="scope.item.rules"
    >
      <el-input v-if="scope.item.slot === 'url'" placeholder="请输入内容" v-model="addForm">
        <template slot="prepend">Http://</template>
      </el-input>
    </el-form-item>
  </formFormat>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import formFormat from 'core/src/components/form-format/index.vue'

@Component({
  name: 'DemoForm',
  components: { formFormat },
})
export default class Form extends Vue {
  formOption: Array<object> = [
    {
      frontTitle: '基本信息',
      label: '活动名称',
      key: 'name',
      rules: [ { required: true, message: '请输入活动名称' } ],
    },
    {
      label: '活动类型',
      key: 'type',
      options: [
        {
          label: '推广',
          value: 1,
        },
        {
          label: '运营',
          value: 2,
        },
      ],
      itemType: 'select',
    },
    {
      label: '活动时间',
      key: 'date',
      itemType: 'datePicker',
      type: 'datetimerange',
    },
    {
      label: '特殊资源',
      key: 'resource',
      itemType: 'radio',
      options: [
        {
          label: '备选1',
          value: 1,
        },
        {
          label: '备选2',
          value: 2,
        },
      ],
    },
    {
      label: '发布场景',
      key: 'scene',
      itemType: 'checkbox',
      options: [
        {
          label: '备选1',
          value: 1,
        },
        {
          label: '备选2',
          value: 2,
        },
      ],
    },
    {
      label: '地区',
      key: 'area',
      itemType: 'cascader',
      value: 'jiaohu',
      options: [ {
        value: 'ziyuan',
        label: '资源',
        children: [ {
          value: 'axure',
          label: 'Axure Components',
        }, {
          value: 'sketch',
          label: 'Sketch Templates',
        }, {
          value: 'jiaohu',
          label: '组件交互文档',
        } ],
      } ],
    },
    {
      label: '上传图片',
      key: 'img',
      itemType: 'upload',
      type: 'uploadImg',
      action: 'https://jsonplaceholder.typicode.com/posts/',
      span: 24,
      beforeUpload: (file: any) => {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      onSuccess: () => {
        this.$message.success('上传成功触发回调')
      },
    },
    {
      label: '上传附件',
      key: 'file',
      itemType: 'upload',
      type: 'uploadFile',
      action: 'https://jsonplaceholder.typicode.com/posts/',
      showFileList: true,
      span: 24,
      beforeUpload: (file: any) => {
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isLt2M
      },
      onSuccess: () => {
        this.$message.success('上传成功触发回调')
      },
    },
    {
      label: '插槽',
      key: 'url',
      slot: 'url',
    },
    {
      span: 18,
    },
    {
      label: '活动名称',
      key: 'textarea',
      itemType: 'textarea',
    },
    {
      key: 'btnGroup',
      itemType: 'btnGroup',
      options: [
        {
          btnType: 'submit',
          type: 'primary',
          key: 'submit',
          text: '提交',
          onSuccess: (form: any) => {
            // TODO，发起请求
            console.log(form)
          },
        },
        {
          btnType: 'reset',
          key: 'reset',
          text: '重置',
        },
        {
          key: 'back',
          text: '返回',
          onClick: () => {
            this.$router.replace('/demo')
          },
        },
      ],
    },
  ]

  addForm: string = ''
}
</script>
<style lang="scss" module>
.item {
  display: flex;
  margin-bottom: 16px;
  :global .el-form-item__label {
    font-size: 12px;
    width: 80px;
  }
  :global .el-form-item__content {
    flex: 1;
  }
}
</style>
