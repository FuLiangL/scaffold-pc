<template>
  <el-upload
    action="#"
    list-type="picture-card"
    accept="image/*"
    :class="$style.upload"
    :aspect-ratio="aspectRatio"
    :multiple="false"
    :on-change="handleChange"
    :show-file-list="false"
    :auto-upload="false"
  >
    <div v-if="imageUrl" class="el-upload__item">
      <img :src="imageUrl" class="el-upload__item-thumbnail">
    </div>
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    <el-dialog
      title="图片裁剪"
      append-to-body
      :custom-class="$style.dialog"
      :visible.sync="cropperVisible"
    >
      <Cropper
        ref="cropper"
        :src="imgSrc"
        alt="Source Image"
      />
      <div slot="footer">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </el-upload>
</template>

<script lang="ts">
import {
  Vue,
  Emit,
  Prop,
  Component,
} from 'vue-property-decorator'
import Cropper, { VueCropperMethods } from 'vue-cropperjs'
import { MessageBox } from 'element-ui'

import 'cropperjs/dist/cropper.css'

const components = {
  Cropper,
}

interface UploadFile extends File {
  url?: string
}

@Component({ components })
export default class ImageUpload extends Vue {
  private imageUrl: string = ''

  private imgSrc: string | ArrayBuffer | null = null

  private cropperVisible: boolean = false

  @Prop({
    default: () => [
      '.png',
      '.jpg',
      '.jpeg',
    ],
  }) accepts!: string[]

  @Prop() aspectRatio!: number

  @Prop() minCropBoxWidth!: number

  @Prop() minCropBoxHeight!: number

  handleChange (file: UploadFile) {
    if (
      file?.url
      && this.accepts.some((v) => file.name.endsWith(v))
    ) {
      this.imgSrc = file.url
      this.cropperVisible = true
    } else {
      // FIXME: 确定文案及类型范围
      MessageBox.alert('文件类型有误')
    }
  }

  @Emit('cancel')
  handleCancel () {
    this.cropperVisible = false
  }

  @Emit('confirm')
  handleConfirm () {
    this.cropperVisible = false
    const croppedCanvas = (this.$refs.cropper as unknown as VueCropperMethods)?.getCroppedCanvas()
    const dataURL = croppedCanvas.toDataURL('image/png')
    this.imageUrl = dataURL
    return dataURL
  }
}
</script>

<style lang="scss" module>
.upload {
  :global {
    .el-upload__item {
      &-thumbnail {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
