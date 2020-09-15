// import slideMenu from '@/router/menu-config'
const slideMenu = require('./_menu-config.js')

module.exports = {
  /*
    SUCCESS(200, "操作成功"),
    FAILED(500, "操作失败"),
    VALIDATE_FAILED(400, "参数检验失败"),
    UNAUTHORIZED(401, "暂未登录或token已经过期"),
    FORBIDDEN(403, "没有相关权限"),
    CHECK_NONCE_ERROR(510, "暂未登录或token已经过期"),
    CHECK_TIME_STAMP_ERROR(511, "暂未登录或token已经过期"),
    REQUEST_INVALID(512, "暂未登录或token已经过期"),
    API_FAILED(600, "API业务操作失败");
  */
  'POST /api/login': {
    code: 200,
    responseMsg: '登录成功',
    data: {
      token: 'N007rvrX7QxtwMVPRC9M5gsXRMir0ewfPrlMnWKj',
      userInfo: {
        userName: 'admin',
        nickName: '超级管理员',
        avatar: '@/assets/images/user.jpg',
      },
    },
  },
  '/api/login': {
    code: 200,
    responseMsg: '登录成功',
    data: {
      token: 'N007rvrX7QxtwMVPRC9M5gsXRMir0ewfPrlMnWKj',
      userInfo: {
        userName: 'admin',
        nickName: '超级管理员',
        avatar: '@/assets/images/user.jpg',
      },
    },
  },
  'POST /api/getMenuInfo': {
    code: 200,
    responseMsg: '登录成功',
    data: slideMenu,
  },
  '/api/getMenuInfo': {
    code: 200,
    responseMsg: '登录成功',
    data: slideMenu.slideMenu,
  },
}
