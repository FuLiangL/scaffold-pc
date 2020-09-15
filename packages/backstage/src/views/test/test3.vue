<template>
  <div :class="$style.test3">
    <filterSearch :searchContents="searchContents" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import filterSearch from './filter-search.vue'
import searchContents from './config'

@Component({
  name: 'Test3',
  components: { filterSearch },
})
export default class Test3 extends Vue {
  public searchContents = searchContents

  private mounted () {
    // 一上来应该有一个默认数据进行展示的
    console.log('mounted')
  }
}
</script>
<style lang="scss" module>
.test3 {
  width: 100%;
  height: auto;
  background: white;
  overflow: hidden;
}
</style>
