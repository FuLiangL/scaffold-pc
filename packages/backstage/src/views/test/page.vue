<template>
 <div id="basic-form">
   <div class="page-header">
     <h2>基础表单</h2>
     <p>表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。</p>
   </div>
   <div class="content">
     <div class="pad24 form-content" flex="main:center cross:center">
       <el-form ref="basicForm" :model="basicForm" :rules="basicFormRules" label-width="100px">
         <el-form-item label="活动名称：" prop="title">
           <el-input v-model="basicForm.title" placeholder="请填写标题关键字"></el-input>
         </el-form-item>
         <el-form-item label="活动时间：" prop="timeData">
           <el-date-picker
             v-model="basicForm.timeData"
             type="daterange"
             align="right"
             value-format="yyyy-MM-dd"
             unlink-panels
             range-separator="至"
             start-placeholder="开始日期"
             end-placeholder="结束日期"
             @change="pickChange">
           </el-date-picker>
         </el-form-item>
         <el-form-item label="活动区域：" prop="region">
           <el-select v-model="basicForm.region"
                      clearable placeholder="请选择活动区域"
                      style="width: 100%">
             <el-option label="深圳" value="sz"></el-option>
             <el-option label="成都" value="chengdu"></el-option>
             <el-option label="北京" value="beijing"></el-option>
             <el-option label="上海" value="shanghai"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="活动简介：" prop="desc">
           <el-input
             type="textarea"
             :rows="4"
             placeholder="请输入活动简介"
             v-model="basicForm.desc">
           </el-input>
         </el-form-item>
         <el-form-item label="活动类型：">
           <el-radio-group v-model="basicForm.type">
             <el-radio :label="1">户外活动</el-radio>
             <el-radio :label="2">室内活动</el-radio>
           </el-radio-group>
         </el-form-item>
         <el-form-item label="活动标签：">
           <el-checkbox-group v-model="basicForm.labels">
             <el-checkbox label="1">体育活动</el-checkbox>
             <el-checkbox label="2">聚餐活动</el-checkbox>
             <el-checkbox label="3">相亲活动</el-checkbox>
           </el-checkbox-group>
         </el-form-item>
         <el-form-item>
           <el-button type="primary" @click="onSubmit">立即创建</el-button>
           <el-button>取消</el-button>
         </el-form-item>
       </el-form>
     </div>
   </div>
 </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

interface InterFaceBasicForm {
  title: string;
  startTime: string;
  endTime: string;
  region: string;
  type: number;
  labels: string[];
  desc?: string;
  timeData: string[];
}
@Component({ name: 'basicForm' })
export default class BasicForm extends Vue {
  protected basicForm: InterFaceBasicForm = {
    title: '',
    startTime: '',
    endTime: '',
    region: '',
    type: 1,
    labels: [],
    timeData: [],
  };

  protected basicFormRules: object = {
    title: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      {
        min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur',
      },
    ],
    timeData: [
      { required: true, message: '请选择活动时间', trigger: 'change' },
    ],
    region: [
      { required: true, message: '请选择活动区域', trigger: 'change' },
    ],
    desc: [
      { required: true, message: '请输入活动简介', trigger: 'change' },
    ],
  };

  @Watch('timeData')
  protected onTimeChange (value: any) {
    if (value.length) {
      const startTime = value[0]
      const endTime = value[1]
      this.basicForm.startTime = startTime
      this.basicForm.endTime = endTime
    }
  }

  protected onSubmit () {
    (this.$refs.basicForm as Vue & { validate: Function }).validate((valid: any): void => {
      if (valid) {
        this.$message.success('提交成功')
      } else {
        console.log('error submit!!')
      }
    })
  }

  protected pickChange (value: any): void {
    if (value === null) {
      this.basicForm.startTime = ''
      this.basicForm.endTime = ''
    } else {
      const [ one, two ] = value
      this.basicForm.startTime = one
      this.basicForm.endTime = two
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding:0 24px;
}
.form-content {
  background: #fff;
  width: 100%;
  .el-form {
   width: 600px;
    .el-date-editor {
      width: 100%;
    }
  }
}
</style>
