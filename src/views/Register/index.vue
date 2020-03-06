<template lang="pug">
  div.container
    template(v-if="checkUserStatus === 'register'")
      form.register__wrap(@submit.prevent="submitRegisterForm")
        input.register__input(type="email" v-model="formData.email" placeholder="電子郵件")
        input.register__input(type="text" v-model="formData.name" placeholder="我們該如何稱呼你？")
        input.register__input(type="password" v-model="formData.password" placeholder="密碼")
        input.register__input(type="password" v-model="formData.passwordCheck" placeholder="確認密碼")
        button.btn.register__btn 註冊
    template(v-else)
      form.register__wrap login
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Register',
  data () {
    return {
      formData: {
        email: '',
        name: '',
        password: '',
        passwordCheck: ''
      },
      checkUserStatus: ''
    }
  },

  computed: {
  },

  created () {
    this.checkUserStatus = this.$route.query.userStatus
  },

  methods: {
    ...mapActions([
      'registerUser',
      'loginUser'
    ]),
    async submitRegisterForm () {
      console.log(1)
      await this.registerUser(this.formData)
      console.log(4)
      // this.$router.push({ name: 'Mode' })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
