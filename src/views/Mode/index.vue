<template lang="pug">
  div.mode__wrap
    div.btn__list
      p.btn__title *貼心小提醒：
        span.title__txt 選擇模式後，點擊下方開始聊天，即可進入聊天室
      button.btn.mode__btn(
        v-for="(node, i) in btnList"
        :class="{ 'has__selected': isSelected === i }"
        @click="selectBtn(node.code, i)"
      ) {{ node.name }}
        router-link.go__register(v-if="node.code !== 'hall'" :to="{ name: 'Register' }") (僅限註冊會員使用)
      button.btn.start__btn(@click="goChat()") 開始聊天
      p.warn__txt(v-if="feedback") {{ feedback }}
      p.register__txt(v-if="registerFeedback") {{ registerFeedback }}
        router-link.tip__txt(:to="{ name: 'Register' }") 立即註冊！
</template>

<script>
export default {
  name: 'Mode',
  data () {
    return {
      btnList: [
        { code: 'hall', name: '大廳' },
        { code: 'one', name: '一對一' },
        { code: 'custom', name: '自創聊天室--開發中' }
      ],
      isSelected: '',
      mode: '',
      feedback: null,
      registerFeedback: null,
      isLogin: false
    }
  },

  watch: {
    isSelected (newVal, oldVal) {
      if (newVal !== '') this.feedback = null
    }
  },

  methods: {
    selectBtn (node, val) {
      this.mode = node
      this.isSelected = val
    },
    goChat () {
      /*
        1. 檢查是否選中模式
          1.1 沒有 => feedback
          1.2 有 => 進入狀態判斷函數
        2. 檢查登入狀態
          2.1 沒有
            2.1.1 大廳 => 直接進入
            2.1.2 非大廳 => feedback 提醒註冊
          2.2 有
            2.2.1 大廳 => router 參數 userName 需替換為登入帳戶名稱
            2.2.2 一對一 => 進入會員列表
      */
      if (this.isSelected !== '') {
        this.checkStatus()
      } else this.feedback = '請選擇任一模式'
    },
    checkStatus () {
      if (this.isLogin) {
        // 登入
      } else {
        // 未登入
        if (this.mode === 'hall') {
          this.$router.push({
            name: 'Chat', query: { mode: this.mode, userName: this.$route.query.userName }
          })
        } else this.registerFeedback = '還沒註冊嗎？'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
