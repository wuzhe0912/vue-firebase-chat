<template lang="pug">
  div.chat__wrap
    ul.room__container(v-loading="loading")
      li.room__list(v-for="node in messageData" :class="{ from__me: node.from === 'me' }")
        div.list__wrap
          div.list__name
            span(v-if="node.from === 'them'") {{ $route.query.roomName.charAt(0) }}
            span(v-else) {{ userInfo.name.charAt(0) }}
          div.list__content
            div.list__txt {{ node.text }}
            div.list__time {{ momentFormatter(node.timestamp) }}
</template>

<script>
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'mode-personal',
  data () {
    return {
      loading: false
    }
  },

  watch: {
    userInfo (newVal, oldVal) {
      if (newVal.userId) {
        this.loading = false
        this.getMessages(this.$route.query.key)
      }
    },
    messageData (newVal, oldVal) {
      setTimeout(() => {
        let item = document.querySelector('.chat__wrap').scrollHeight
        window.scrollTo(0, item)
      }, 100)
    }
  },

  computed: {
    ...mapState([
      'messageData',
      'userInfo'
    ])
  },

  mounted () {
    this.getMessages(this.$route.query.key)
  },

  methods: {
    ...mapActions([
      'getMessages'
    ]),

    momentFormatter (val) {
      return moment(val).format('lll')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
