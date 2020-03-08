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
    userInfo: {},
    userList: {},
    messageData: {}
  },
  // 改變資料內容的方法 => 操作狀態
  mutations: {
    SET_USER_INFO (state, payload) {
      state.userInfo = payload
    },
    SET_USER_LIST (state, payload) {
      Vue.set(state.userList, payload.userKey, payload.userDetail)
    },
    SET_USER_STATUS (state, payload) {
      // Object.assign(state.userList[payload.userId], payload.userDetail)
    },
    SET_MESSAGES (state, payload) {
      Vue.set(state.messageData, payload.messageKey, payload.messageDetails)
    }
  },
  // 類似 methods，執行方法 => 操作行為
  actions: {
    // 註冊
    // payload => 載荷，使用者從外部傳入的參數
    registerUser (state, payload) {
      return new Promise((resolve, reject) => {
        firebaseAuth.createUserWithEmailAndPassword(
          payload.email, payload.password
        ).then(res => {
          const userId = firebaseAuth.currentUser.uid
          firebaseDB.ref('users/' + userId).set({
            name: payload.name,
            email: payload.email
          })
          return resolve()
        }).catch(err => {
          console.log(err.message)
          return reject(err)
        })
      })
    },
    // 登入
    loginUser (state, payload) {
      return new Promise((resolve, reject) => {
        firebaseAuth.signInWithEmailAndPassword(
          payload.email, payload.password
        ).then(res => {
          return resolve()
        }).catch(err => {
          console.log(err)
          return reject(err)
        })
      })
    },
    // 登出
    logoutUser () {
      firebaseAuth.signOut()
    },
    // 檢查使用者登入狀態
    handleAuthStateChanged ({ commit, dispatch, state }) {
      firebaseAuth.onAuthStateChanged(node => {
        if (node) {
          // 使用者處於登入狀態 => sign in
          const userId = firebaseAuth.currentUser.uid
          // 進行快照，確認用戶資料
          firebaseDB.ref('users/' + userId).once('value', snapshot => {
            const userInfo = snapshot.val()
            // 變更用戶資訊狀態
            commit('SET_USER_INFO', {
              name: userInfo.name,
              email: userInfo.email,
              userId: userId
            })
          })
          // 用戶登入後，改變資料庫中用戶的狀態
          dispatch('updateUser', {
            userId: userId,
            updateStatus: {
              online: true
            }
          })
          // 當資料庫改變，重新取得用戶列表
          dispatch('getUserList')
        } else {
          // 用戶登出前，先更新資料庫狀態，再初始化帳戶資訊
          dispatch('updateUser', {
            userId: state.userInfo.userId,
            updateStatus: {
              online: false
            }
          })
          // 使用者處於未登入狀態或是登出 => sign out
          commit('SET_USER_INFO', {})
        }
      })
    },
    // 檢查會員當前是否登入狀態
    updateUser (state, payload) {
      // 若用戶登入，則幫用戶更新狀態為 true，反之，登出則更新為 false
      firebaseDB.ref('users/' + payload.userId).update(payload.updateStatus)
    },
    // 檢查資料庫中最新的會員列表
    getUserList ({ commit }) {
      firebaseDB.ref('users').on('child_added', snapshot => {
        let userDetail = snapshot.val()
        let userKey = snapshot.key
        commit('SET_USER_LIST', {
          userDetail,
          userKey
        })
      })
      // 檢查資料庫中會員登入狀態是否有變化
      firebaseDB.ref('users').on('child_changed', snapshot => {
        let userDetail = snapshot.val()
        let userKey = snapshot.key
        commit('SET_USER_STATUS', {
          userDetail,
          userKey
        })
      })
    },
    // 送出個人聊天的資料
    sendMessages ({ state }, payload) {
      /*
        當我送出訊息時 =>
        1. 在 database 中建立 chats 作為上層目錄
        2. 將我登入帳號的 key 作為第二層結構
        3. 最後將聊天對象的 key 綁為第三層結構
        反之同時，在聊天對象的 database 中 =>
        2. 聊天對象的 key 會成為第二層結構
        3. 而我的帳號 key 則是第三層結構
      */
      let userId = state.userInfo.userId
      firebaseDB.ref('chats/' + userId + '/' + payload.otherKey).push(payload.messages)
      // 將訊息的來源轉為對方後，再存入資料
      payload.messages.from = 'them'
      firebaseDB.ref('chats/' + payload.otherKey + '/' + userId).push(payload.messages)
    },
    // 取得個人聊天的資料
    getMessages ({ commit, state }, otherKey) {
      let userId = state.userInfo.userId
      firebaseDB.ref('chats/' + userId + '/' + otherKey).on('child_added', snapshot => {
        let messageDetails = snapshot.val()
        let messageKey = snapshot.key
        console.log('messageDetails', messageDetails)
        console.log('messageKey', messageKey)
        commit('SET_MESSAGES', {
          messageDetails,
          messageKey
        })
      })
    }
  },
  getters: {
    userList: state => {
      // 過濾登入者自己，避免出現在會員列表中
      let userFiltered = {}
      Object.keys(state.userList).forEach(node => {
        if (node !== state.userInfo.userId) {
          userFiltered[node] = state.userList[node]
        }
      })
      return userFiltered
    }
  }
  // modules: {
  // }
})
