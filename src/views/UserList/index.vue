<template lang="pug">
  div.list__wrap(v-loading="loading")
    ul.list__container
      li.list__content(v-if="node.name" v-for="(node, index) in userList" @click="goPersonalChat(index, node.name)")
        div.list__name
          span.name__icon {{ node.name.charAt(0) }}
          span.name__txt {{ node.name }}
        span.online__txt(:class="{ offline__txt: !node.online }") {{ statusFormatter(node.online) }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserList',

  data () {
    return {
      loading: true
    }
  },

  computed: {
    ...mapGetters([
      'userList'
    ])
  },

  created () {
    setTimeout(() => {
      this.loading = false
    }, 1500)
  },

  methods: {
    statusFormatter (val) {
      if (val) return 'Online'
      else return 'Offline'
    },

    goPersonalChat (val, node) {
      this.$router.push({ name: 'Chat', query: { mode: 'personal', key: val, roomName: node } })
    }
  }

}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
