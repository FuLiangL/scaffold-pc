// 保存的用户信息
export interface UserInfo {
  userName: string;
  nickName: string;
  avatar: string;
  phone?: string;
  token?: string;
}
// 接口路由返回的格式
export interface MenuInterFace {
  path: string,
  title: string,
  isHide?: boolean,
  isBlank?: Boolean,
  icon?: string,
  zIndex?: number,
  children?: MenuInterFace[],
}
