import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseAuth, firebaseDB } from '@/firebase/init'

Vue.use(Vuex)

/*
  vuex 運作流程
  1. components(組件) => 執行 actions
  2. actions 呼叫遠端API資料
  3. actions 拿到的資料會 commit => mutations
  4. 透過 mutations 的 mutate => 改變 state 資料狀態

  getter 方法 => 類似 computed
*/
export default new Vuex.Store({
  // 類似 data，資料的初始化
  state: {
    userInfo: {}
  },
  // 類似 methods，執行方法 => 操作行為
  actions: {
    // register
    // payload => 載荷，使用者從外部傳入的參數
    registerUser (state, payload) {
      return new Promise((resolve, reject) => {
        firebaseAuth.createUserWithEmailAndPassword(
          payload.email, payload.password
        ).then(res => {
          console.log(2)
          let userId = firebaseAuth.currentUser.uid
          firebaseDB.ref('users/' + userId).set({
            name: payload.name,
            email: payload.email,
            password: payload.password
          })
          return resolve()
        }).catch(err => {
          console.log(err.message)
          return reject(err)
        })
      })
    },
    loginUser (state, payload) {
      return new Promise((resolve, reject) => {
        firebaseAuth.signInWithEmailAndPassword(
          payload.email, payload.password
        ).then(res => {
          console.log(3)
          this.$router.push({ name: 'Mode' })
          // let userId = firebaseAuth.currentUser.uid
          // firebaseDB.ref('users/' + userId).once('value', snapshot => {
          //   let userDetail = snapshot.val()
          //   commit('SET_USER_INFO', {
          //     name: userDetail.name,
          //     email: userDetail.email,
          //     userId: userId
          //   })
          // })
          return resolve
        }).catch(err => {
          console.log(err)
          return reject
        })
      })
    }
  },
  // 改變資料內容的方法 => 操作狀態
  mutations: {
    SET_USER_INFO (state, payload) {
      console.log(3, payload)
      state.userInfo = payload
    }
  }
  // modules: {
  // }
})
