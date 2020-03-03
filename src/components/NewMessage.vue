<template lang="pug">
  div.new-message
    form(@submit.prevent="addMessage")
      label(for="new-message") New Message (Enter to add)：
      input(type="text" name="new-message" v-model="newMessage")
      p.red-text(v-if="feedback") {{ feedback }}
      //- button.btn.teal(@click="addMessage") Press
</template>

<script>
import db from '@/firebase/init'

export default {
  name: 'NewMesssage',
  props: ['name'],
  data () {
    return {
      newMessage: null,
      feedback: null
    }
  },
  methods: {
    addMessage () {
      if (this.newMessage) {
        // 新增集合
        db.collection('messages').add({
          content: this.newMessage,
          name: this.name,
          timestamp: Date.now()
        }).catch(err => {
          console.log(err)
        })
        this.newMessage = null
        this.feedback = null
      } else this.feedback = 'You must enter a message in order to send one'
    }
  }
}
</script>

<style scoped>

</style>
