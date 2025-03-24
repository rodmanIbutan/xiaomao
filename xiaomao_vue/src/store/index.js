import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
      // 就是公共的数据，所有的组件都可以直接使用
      baseURL:"http://localhost:8080",
  },
  mutations:{
    
  }
})
export default store