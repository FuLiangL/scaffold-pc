<template>
  <div :id="$style.login" class="flex flex-align-center flex-pack-center">
    <div :class="$style.loginBox" class="flex flex-align-center flex-pack-center">
      <div :class="$style.loginContainer">
        <div :class="$style.loginTitle">
          <h1>商家后台管理系统</h1>
          <p>学拼乐</p>
        </div>
        <div :class="$style.loginForm">
          <el-tabs v-model="loginModeSwitch">
            <el-tab-pane label="账号密码登录" name="usernamePassword"></el-tab-pane>
            <el-tab-pane label="手机号码登录" name="phoneVercode"></el-tab-pane>
          </el-tabs>
          <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules">
            <div v-if="loginModeSwitch === 'usernamePassword'">
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
            </div>
            <div v-if="loginModeSwitch === 'phoneVercode'">
              <el-form-item prop="phoneNum">
                <el-input v-model="loginForm.phoneNum" placeholder="手机号码：phone">
                  <i slot="prefix" class="el-input__icon el-icon-mobile-phone" />
                </el-input>
              </el-form-item>
              <el-form-item prop="vercode">
                <el-input
                  style="width:70%;float:left;"
                  v-model="loginForm.vercode"
                  type="password"
                  placeholder="验证码：vercode"
                >
                  <i slot="prefix" class="el-input__icon el-icon-chat-dot-square" />
                </el-input>
                <div :class="$style.countDown" type="primary">
                  <u v-if="isGetCode">获取验证码</u>
                  <span v-else>60s</span>
                </div>
              </el-form-item>
            </div>
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
import loginFormRuleFun from './rules'

@Component({
  name: 'Login',
})
export default class Login extends Vue {
  private loginModeSwitch = 'phoneVercode'; // usernamePassword、phoneVercode

  private isGetCode = true; // 在获取手机验证码

  private loginForm: object = {
    username: 'admin',
    password: 'lazy.admin',
  };

  private loginFormRules = loginFormRuleFun(
    this.loginModeSwitch === 'usernamePassword'
  );

  savePassword: boolean = false;

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
  margin-top: 20px;
  .el-form-item { // 看看这个是否生效的
    margin-bottom: 24px;
  }
  .el-tabs__nav-wrap::after{
    display: none;
  }
}
.loginBtn {
  display: block;
  width: 100%;
}
.countDown {
  width: 20%;
  height: 40px;
  float: right;
  text-align: center;
  line-height: 40px;
}
</style>
