<template lang="pug">
  div.send__wrap
    i.icon.icon__plus
    form.input__wrap(@submit.prevent="addMessage")
      input.send__input(
        type="text"
        placeholder="輸入訊息"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = '輸入訊息'"
        v-model="newMessage"
        :class="{ hasMessage: newMessage !== '' }"
      )
    template(v-if="newMessage === ''")
      i.icon.icon__camera
      i.icon.icon__mic
    template(v-else)
      button.icon.icon__send(@click="addMessage()")
</template>

<script>
import database from '@/firebase/init'
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      newMessage: '',
      feedback: null
    }
  },

  computed: {
    ...mapState([
      'userInfo'
    ])
  },

  methods: {
    ...mapActions([
      'sendMessages'
    ]),

    addMessage () {
      if (this.newMessage) {
        // 匿名大廳模式
        if (this.$route.query.mode === 'hall') {
          // firebase 對應的資料庫上添加內容
          database.collection('messages').add({
            content: this.newMessage,
            name: this.$route.query.userName,
            timestamp: Date.now()
          }).catch(err => {
            console.log(err)
          })
        } else if (this.$route.query.mode === 'personal') {
          // 個人聊天模式
          this.sendMessages({
            messages: {
              text: this.newMessage,
              from: 'me',
              timestamp: Date.now()
            },
            // 聊天對象的 key
            otherKey: this.$route.query.key
          })
        } else {
          console.log('施工中')
        }
        this.newMessage = ''
        this.feedback = null
      }
      this.handleScroll()
    },
    handleScroll () {
      setTimeout(() => {
        let item = document.querySelector('.send__wrap').scrollTop
        window.scrollTo(0, item)
      }, 100)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style'
</style>
