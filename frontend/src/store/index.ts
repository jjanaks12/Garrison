import Vue from 'vue'
import Vuex from 'vuex'

import modules from './modules'
import localStorage from '@/services/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  strict: process.env.NODE_ENV !== 'production',
  plugins: [localStorage]
})