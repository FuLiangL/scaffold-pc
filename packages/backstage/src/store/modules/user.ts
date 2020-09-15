import { MutationTree, ActionTree } from 'vuex'
import { getToken, setToken, removeToken } from '@/common/constant/auth'

interface StateInterface {
  userInfo: object | null;
  menu: Array<any>;
  token: string | null | object;
}

const userState: StateInterface = {
  userInfo: null,
  menu: [],
  token: getToken(),
}

const mutations: MutationTree<any> = {
  SAVE_TOKEN (state, key: string): void {
    state.token = key
    setToken(key)
  },
  SAVE_USER_INFO (state, data: object) {
    state.userInfo = data
  },
  SAVE_MENU (state, data: object) {
    state.menu = data
  },
  CLEAR_USER (state) {
    state.userInfo = null
    removeToken()
  },
}

const actions: ActionTree<any, any> = {
  saveToken ({ commit }, data: { token: string }) {
    return new Promise((resolve) => {
      commit('SAVE_TOKEN', data.token)
      resolve({ success: true })
    })
  },
  saveUserInfo ({ commit }, data: object) {
    return new Promise((resolve) => {
      commit('SAVE_USER_INFO', data)
      resolve({ success: true })
    })
  },
  setMenu ({ commit }, data: Array<any>) {
    return new Promise((resolve) => {
      commit('SAVE_MENU', data)
      resolve({ success: true })
    })
  },
  clearUser ({ commit }) {
    return new Promise((resolve) => {
      commit('CLEAR_USER')
      resolve({ success: true })
    })
  },
}
export default {
  namespaced: true,
  state: userState,
  mutations,
  actions,
}
