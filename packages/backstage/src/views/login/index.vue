<template>
  <div :id="$style.login" class="flex flex-align-center flex-pack-center">
    <div :class="$style.loginBox" class="flex flex-align-center flex-pack-center">
      <div :class="$style.loginContainer">
        <div :class="$style.loginTitle">
          <h1>商家后台管理系统</h1>
          <p>学拼乐</p>
        </div>
        <div :class="$style.loginForm">
          <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules">
            <el-form-item prop="userName">
              <el-input v-model="loginForm.username" placeholder="用户名：admin">
                <i slot="prefix" class="el-input__icon el-icon-user" />
              </el-input>
            </el-form-item>
            <el-form-item prop="userPassword">
              <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="密码：lazy.admin"
              >
                <i slot="prefix" class="el-input__icon el-icon-lock" />
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="flex-pack-justify flex-align-center">
                <el-checkbox v-model="isAutoLogin">自动登录 </el-checkbox>
                <el-button type="text" class="floatR" @click="$router.go(0)">
                  忘记密码？
                </el-button>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button  type="primary"
                          :class="$style.loginBtn"
                          :loading="btnLoading"
                          @click="submitForm('loginForm')"
              >查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { login } from './api'

@Component({
  name: 'Login',
})
export default class Login extends Vue {
  loginForm: object = {
    username: 'admin',
    password: 'lazy.admin',
  };

  loginFormRules: object = {
    username: [ { required: true, message: '请输入用户名', trigger: 'blur' } ],
    password: [
      { required: true, message: '请输入登录密码', trigger: 'blur' },
      {
        min: 6,
        max: 12,
        message: '长度在6到12个字符',
        trigger: 'blur',
      },
    ],
  };

  isAutoLogin: boolean = false;

  btnLoading: boolean = false;

  submitForm (formName: string) {
    console.log(formName, 'formName123')
    const formRef: any = this.$refs[formName]
    formRef.validate((valid: any) => {
      if (valid) {
        this.userLogin()
      } else {
        this.$message.error('填写的信息有误')
      }
    })
  }

  async userLogin () {
    this.btnLoading = true
    try {
      const res = await login(this.loginForm)
      console.log(res, 123)
      if (res.code === 200) {
        // 登录成功将信息存储在vuex中
        this.$store.dispatch('user/saveToken', res.data)
        this.$store.dispatch('user/saveUserInfo', res.data.userInfo)
        this.$message.success({
          message: '登录成功，正在进入首页面~',
          duration: 800,
          onClose: () => {
            this.$router.push('/')
          },
        })
      } else {
        this.$message.error(res.msg)
      }
      this.btnLoading = false
    } catch (err) {
      console.log(err)
      this.btnLoading = false
    }
  }
}
</script>
<style lang="scss" module>
#login {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url("~@assets/images/login_bg.svg");
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  background-color: #f0f2f5;
}
.loginBox{
  width: 500px;
  height: 450px;
  background: #fff;
  border-radius: 20px;
}
.loginContainer {
  width: 368px;
  .loginTitle {
    text-align: center;
    h1 {
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
      font-size: 32px;
    }
    p {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
      margin-top: 12px;
    }
  }
}
.loginForm {
  margin-top: 40px;
  .el-form-item { // 看看这个是否生效的
    margin-bottom: 24px;
  }
}
.loginBtn {
  display: block;
  width: 100%;
}
</style>
