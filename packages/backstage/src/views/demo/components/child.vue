<template>
  <div :class="$style.demo">
    <button type="button" @click="handleclick">{{user.name}}</button>
    <div :class="$style.line">clickTime: {{times}}</div>
  </div>
</template>
<script lang="ts">
import {
  Vue, Component, Prop, Emit, Watch,
} from 'vue-property-decorator'

interface user {
  name: string,
  birthday: string,
  logo: string,
}
@Component({
  name: 'child',
})
export default class Child extends Vue {
  @Prop(Object) user!: user

  @Prop(Number) clickTimes!:number // !和?号相对，?允许值不存在，!号强制必须有值

  times:number = 0

  @Emit('on-child-click')
  handleclick() {
    return this.user.name
  }

  @Watch('clickTimes')
  showClickTime(val: number) {
    this.times = val
  }
}
</script>
<style lang="scss" module>
.demo {
  line-height: 1.5;
  .line {
    color: $--color-primary;
  }
}
</style>
