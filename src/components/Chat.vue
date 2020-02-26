<template lang="pug">
  div.chat.container
    h2.center.teal-text Chat
    div.card
      div.card-content
        ul.messages(v-chat-scroll)
          li.message-list(v-for="node in message" :key="node.id")
            div.message-wrap
              span.teal-text {{ node.name }}
              span.grey-text.text-darken-3.message-content {{ node.content }}
            span.grey-text.time {{ node.timestamp }}
      div.card-action
        NewMessage(:name="name")
        //- input(type="text")
</template>

<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'Chat',
  props: [
    'name'
  ],

  components: {
    NewMessage
  },

  data () {
    return {
      message: []
    }
  },

  created () {
    const ref = db.collection('messages').orderBy('timestamp')

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(val => {
        const doc = val.doc
        this.message.push({
          id: doc.id,
          name: doc.data().name,
          content: doc.data().content,
          timestamp: moment(doc.data().timestamp).format('lll')
        })
      })
    })
  }
}
</script>

<style scoped>
.chat h2 {
  font-size: 2.6em;
  margin-bottom: 40px;
}
.messages {
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow: auto;
}
.message-list {
  display: flex;
  flex-direction: column;
}
.caht span {
  font-size: 1.4em;
}
.message-content {
  margin-left: 5px;
}
.time {
  display: flex;
  font-size: 1.2em;
}
</style>
