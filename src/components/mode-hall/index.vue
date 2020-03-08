<template lang="pug">
  div.chat__wrap
    //- div(@click="handleScroll()") 123
    ul.room__container(v-loading="loading")
      li.room__list(v-for="node in messageData" :key="node.id")
        div.list__wrap
          //- charAt() 返回字串中的對應位數文字，根據()中的參數決定
          div.list__name
            span {{ node.name.charAt(0) }}
          div.list__content
            div.list__txt {{ node.content }}
            div.list__time {{ node.timestamp }}
</template>

<script>
import database from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'mode-hall',
  data () {
    return {
      messageData: [],
      loading: false
    }
  },

  created () {
    this.getHallMessageData()
  },

  methods: {
    getHallMessageData () {
      this.loading = true
      // 從 firebase 取資料，並依照時間排序
      let ref = database.collection('messages').orderBy('timestamp')
      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(val => {
          let doc = val.doc
          this.messageData.push({
            id: doc.id,
            name: doc.data().name,
            content: doc.data().content,
            timestamp: moment(doc.data().timestamp).format('lll')
          })
          if (this.messageData.length > 1) {
            this.loading = false
          } else this.loading = true
        })
        setTimeout(() => {
          let item = document.querySelector('.chat__wrap').scrollHeight
          window.scrollTo(0, item)
        }, 100)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
