import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  // 作为模块 集合引入
  modules: {
    tab,
    user
  }
})
