import Vue from 'vue'
import Vuex from 'vuex'

import {getUserInfo} from '@/api/api'

Vue.use(Vuex)

const state ={
  userInfo:"",
}

const mutations = {
  saveUserInfo(state, userInfo){
    state.userInfo = userInfo;
  }
}
const actions = {
   getUserData({commit}){
    try{
       getUserInfo().then(res=>{
         if (res.data.success) {
           commit('saveUserInfo', res.data.data);
         }else{
           throw new Error(res)
         }
       })
    }catch(err){
      console.log(err)
      console.log('您尚未登陆或者session失效')
    }
  }
}


export default new Vuex.Store({
  state,
  mutations,
  actions,
})
