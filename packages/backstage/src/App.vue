<template>
  <div id="app">
    <component :is="layout">
      <router-view v-if="isRouterAlive" />
    </component>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {
  private isRouterAlive: boolean = true

  @Provide() reload = this.reloadFun

  get layout() {
    return `${this.$route.meta.layout || 'common'}-layout`
  }

  reloadFun() {
    this.isRouterAlive = false
    this.$nextTick(() => {
      this.isRouterAlive = true
    })
  }
}
</script>

<style lang="scss"></style>
