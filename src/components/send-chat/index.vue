<template lang="pug">
  div.send__wrap
    i.icon.icon__plus
    form.input__wrap(@submit.prevent="addMessage")
      input.send__input(
        type="text"
        placeholder="輸入訊息"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = '輸入訊息'"
        v-model="sendMessage"
        :class="{ hasMessage: sendMessage !== '' }"
      )
    template(v-if="sendMessage === ''")
      i.icon.icon__camera
      i.icon.icon__mic
    template(v-else)
      button.icon.icon__send(@click="addMessage()")
</template>

<script>
import database from '@/firebase/init'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      sendMessage: '',
      feedback: null
    }
  },

  computed: {
    ...mapState([
      'userInfo'
    ])
  },

  methods: {
    addMessage () {
      if (this.sendMessage) {
        // firebase 對應的資料庫上添加內容
        database.collection('messages').add({
          content: this.sendMessage,
          name: this.$route.query.userName,
          timestamp: Date.now()
        }).catch(err => {
          console.log(err)
        })
        this.sendMessage = ''
        this.feedback = null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style'
</style>
