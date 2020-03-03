<template lang="pug">
  div.chat.container
    h2.center.teal-text 皮特der聊天室
    div.card
      div.card-content
        div.loading(v-if="isLoading")
          span(v-for="node in loadingList")
        ul.messages(v-if="!isLoading" v-chat-scroll)
          li.message-list(v-for="node in message" :key="node.id")
            div.message-wrap
              div.teal-text.message-name {{ node.name }}
              div.grey-text.text-darken-3.message-content {{ node.content }}
            div.grey-text.time {{ node.timestamp }}
      div.card-action
        NewMessage(:name="name")
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
      message: [],
      loadingList: 7,
      isLoading: true
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
        this.isLoading = false
      })
    })
  }
}
</script>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading span {
  width: 60px;
  height: 180px;
  margin: 0 10px;
  background: #009688;
  animation: animate 1.4s linear infinite;
}
.loading span:nth-child(1) {
  animation-delay: 0s;
}
.loading span:nth-child(2) {
  animation-delay: .2s;
}
.loading span:nth-child(3) {
  animation-delay: .4s;
}
.loading span:nth-child(4) {
  animation-delay: .6s;
}
.loading span:nth-child(5) {
  animation-delay: .8s;
}
.loading span:nth-child(6) {
  animation-delay: 1s;
}
.loading span:nth-child(7) {
  animation-delay: 1.2s;
}
@keyframes animate {
  0% {
    box-shadow: 0 0 0 rgba(0, 0, 0, .5);
    opacity: 0;
    transform: translateX(-50px) scale(1);
  }
  50% {
    box-shadow: 0 20px 50px rgba(0, 0, 0, .5);
    opacity: 1;
    transform: translateX(0px) scale(1.2);
  }
  100% {
    box-shadow: 0 0 0 rgba(0, 0, 0, .5);
    opacity: 0;
    transform: translateX(50px) scale(1);
  }
}
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
.messages li {
  margin-top: 20px;
}
.message-list {
  display: flex;
  flex-direction: column;
  line-height: 24px;
}
.message-wrap {
  display: flex;
}
.message-name,
.message-content {
  font-size: 20px;
}
.message-content {
  margin-left: 8px;
}
.time {
  display: flex;
  font-size: 12px;
}
</style>
