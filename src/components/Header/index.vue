<template lang="pug">
  div.header__wrap
    div.header__icon.back__arrow(@click="routerAction()")
    header(v-if="$route.query.mode === 'personal'") {{ $route.query.roomName }}
    header(v-else) {{ pageName }}
    template(v-if="$route.name === 'Chat'")
      div.header__icon.mobile
      div.header__icon.down__arrow
    template(v-else-if="$route.name === 'Mode'")
      span.header__txt.header__register(v-if="!userInfo.userId" @click="goRegister('register')") 註冊
      span.header__txt.header__login(v-if="!userInfo.userId" @click="goRegister('login')") 登入
      span.header__txt.header__login(v-else @click="logout()") 登出
</template>

<script>
import { TITLE_LIST } from '@/configs/site.js'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {}
  },

  computed: {
    ...mapState([
      'userInfo'
    ]),
    pageName: function () {
      let target = TITLE_LIST.find(node => node.route === this.$route.name)
      if (target) return target.name
      else return this.$route.name
    }
  },

  methods: {
    ...mapActions([
      'logoutUser'
    ]),

    routerAction () {
      this.$router.go(-1)
    },

    goRegister (val) {
      this.$router.push({ name: 'Register', query: { userStatus: val } })
    },

    logout () {
      this.logoutUser()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
