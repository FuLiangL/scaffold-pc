const loginFormRuleFun = (type: boolean) => {
  let obj = {}
  obj = {
    username: [
      {
        required: type,
        message: '请输入用户名',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: type,
        message: '请输入登录密码',
        trigger: 'blur',
      },
      {
        min: 6,
        max: 12,
        message: '长度在6到12个字符',
        trigger: 'blur',
      },
    ],
    phoneNum: [
      {
        required: !type,
        message: '请输入手机号码',
        trigger: 'blur',
      },
    ],
    vercode: [
      {
        required: !type,
        message: '请输入手机号码',
        trigger: 'blur',
      },
    ],
  }
}
export default loginFormRuleFun