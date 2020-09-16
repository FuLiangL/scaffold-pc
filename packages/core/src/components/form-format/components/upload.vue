<template>
  <el-upload
    :action="item.action"
    :show-file-list="!!item.showFileList"
    :on-success="uploadSuccess"
    :on-remove="onRemove"
    :before-upload="item.beforeUpload"
    :headers="item.headers"
    :data="item.data"
    :class="item.type === 'uploadImg' && $style.uploadImg"
  >
    <!-- 图片预览 -->
    <template v-if="item.type === 'uploadImg'">
      <img
        v-if="imageUrl"
        :src="imageUrl"
        :class="$style.img"
      />
      <i v-else :class="$style.uploadIcon" class="el-icon-plus"></i>
    </template>
    <template v-else>
      <el-button slot="trigger" size="small" type="primary">上传附件</el-button>
    </template>
  </el-upload>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

interface res {
  // TODO 请求返回类型暂未可知
  responseCode: number,
  responseMessage: string,
  data: object
}
interface file {
  name: string
  percentage: number
  raw: object
  response: res
  size: number
  status: string
  uid: number
}
interface item {
  onSuccess: Function
  itemType: string
}
@Component({})
export default class Upload extends Vue {
  @Prop(Object) form!: object

  @Prop(Object) item!: object

  private imageUrl: string = ''

  private uploadSuccess (res: res, file: file) {
    this.$message.success('上传成功')
    if ((this.item as item).itemType === 'uploadImg') {
      this.imageUrl = URL.createObjectURL(file.raw)
    }
    if ((this.item as item).onSuccess) (this.item as item).onSuccess()
  }

  private onRemove (file:res) {
    // TODO 删除已上传图片回调
    return file
  }
}
</script>
<style lang="scss" module>
.uploadImg {
  width: 178px;
  height: 178px;
  border: 1px dashed $--border-color-base;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.img {
  width: 178px;
  height: 178px;
}
.uploadIcon {
  font-size: 28px;
  text-align: center;
  line-height: 178px;
  width: 178px;
  height: 178px;
  color: $--color-info;
}
</style>
