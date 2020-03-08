<template lang="pug">
  div#app
    bodyHeader(v-if="$route.meta.hasHeader")
    .layout__wrap(:class="{ noHeader: !$route.meta.hasHeader, noChat: !$route.meta.hasChat }")
      router-view
    bodyChat(v-if="$route.meta.hasChat")
</template>

<script>
import bodyHeader from '@/components/header'
import bodyChat from '@/components/send-chat'
import { mapActions } from 'vuex'

export default {
  components: {
    bodyHeader,
    bodyChat
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions([
      'handleAuthStateChanged'
    ])
  },
  mounted () {
    this.handleAuthStateChanged()
  }
}
</script>

<style>
</style>
