<template lang="pug">
  div.header__wrap
    div.header__icon.back__arrow(@click="routerAction()")
    //- header(v-if="$route.query.userName !== ''") one
    //- header(v-else-if="$route.query.roomName !== ''") roomname
    header {{ pageName }}
    template(v-if="$route.name === 'Chat'")
      div.header__icon.mobile
      div.header__icon.down__arrow
</template>

<script>
import { TITLE_LIST } from '@/configs/site.js'

export default {
  name: 'Header',
  data () {
    return {
    }
  },

  computed: {
    pageName: function () {
      let target = TITLE_LIST.find(node => node.route === this.$route.name)
      if (target) return target.name
      else return target.route
    }
  },

  methods: {
    routerAction () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
