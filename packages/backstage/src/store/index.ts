import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', true, /\.ts$/)
const modules: any = {}
modulesFiles.keys().forEach((key: any) => {
  modules[key.replace(/(\.\/|\.ts)/g, '')] = modulesFiles(key).default
})

export default new Vuex.Store({
  getters,
  modules,
})
