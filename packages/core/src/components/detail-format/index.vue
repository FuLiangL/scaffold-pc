<template>
  <div :class="$style.detail">
    <el-row :gutter="20">
      <template v-for="(item, index) in data">
        <el-col
          v-if="item.frontTitle"
          :key="`title-${index}`"
          :span="24"
        >
          <div :class="$style.title">
            {{item.frontTitle}}
          </div>
        </el-col>
        <el-col :key="`main-${index}`" :span="item.span || 6">
          <div v-if="!item.slot" :class="$style.item">
            <div :class="$style.label">{{item.label}}：</div>
            <div :class="$style.value">{{item.value}}</div>
          </div>
          <div v-else :class="$style.slot">
            <slot :item="item" />
          </div>
        </el-col>
        <el-col
          v-if="item.bottomLine"
          :key="`bottom-${index}`"
          :span="24"
        >
          <div :class="$style.bottom"></div>
        </el-col>
      </template>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

interface item {
  frontTitle?: string,
  label: string,
  value?: string,
  slot?: string
  bottomLine?: boolean,
}
@Component({})
export default class DetailFormat extends Vue {
  @Prop(Array) data!: Array<item>
}
</script>
<style lang="scss" module>
.detail {
  line-height: 22px;
  .title {
    font-size: 16px;
    margin-bottom: 24px;
  }
  .item {
    display: flex;
    margin-bottom: 16px;
    .label {
      color: $--color-info;
    }
    .value {
      flex: 1;
    }
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
}
</style>
