<template>
  <div>
    <table-filter :data="filterOptions" @handleFilter="handleFilter">
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
    </table-filter>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import tableFilter from 'core/src/components/table-filter/index.vue'

@Component({
  name: 'demoTable',
  components: { tableFilter },
})
export default class Table extends Vue {
  tableData: Array<object> = [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    }, {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄',
    }, {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄',
    }, {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄',
    },
  ]

  filterOptions: Array<object> = [
    {
      label: '活动名称',
      key: 'name',
      value: 'username',
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
      label: '地区',
      key: 'area',
      itemType: 'cascader',
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
      label: '插槽',
      key: 'url',
      slot: 'url',
    },

  ]

  addForm: string = ''

  handleFilter (form: object) {
  // TODO，获取form作为参数
    console.log({ ...form, addForm: this.addForm })
  }
}
</script>
<style lang="scss" module>
.item {
  display: flex;
  margin-bottom: 16px;
  :global .el-form-item__label {
    font-size: 12px;
  }
  :global .el-form-item__content {
    flex: 1;
  }
}
</style>
