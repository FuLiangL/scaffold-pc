<template>
  <div :class="$style.layout">
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class pop extends Vue {

}
</script>
<style lang="scss" module>
.layout {
  color: $--color-primary;
}
.page-layout {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: $--color-light-white;
}
</style>
