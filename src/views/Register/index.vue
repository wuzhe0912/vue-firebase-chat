<template lang="pug">
  .container
    template(v-if="checkUserStatus === 'register'")
      form.register__wrap(v-loading="loading" @submit.prevent="submitRegisterForm")
        label.form__item
          input.register__input(
            type="email"
            v-model="registerFormData.email"
            placeholder="電子郵件"
            @blur="$v.registerFormData.email.$touch()"
            :class="{ danger: $v.registerFormData.email.$error }"
          )
          template(v-if="$v.registerFormData.email.$error")
            span.form__error(v-if="!$v.registerFormData.email.email") 請確認 Email 格式
            span.form__error(v-if="!$v.registerFormData.email.required") 此欄位必填
        label.form__item
          input.register__input(
            type="text"
            v-model="registerFormData.name"
            placeholder="我們該如何稱呼你？"
            @blur="$v.registerFormData.name.$touch()"
            :class="{ danger: $v.registerFormData.name.$error }"
          )
          template(v-if="$v.registerFormData.name.$error")
            span.form__error(v-if="!$v.registerFormData.name.minLength") 最小長度需2個字
            span.form__error(v-if="!$v.registerFormData.name.required") 此欄位必填
        label.form__item
          input.register__input(
            type="password"
            v-model="registerFormData.password"
            placeholder="密碼"
            @blur="$v.registerFormData.password.$touch()"
            :class="{ danger: $v.registerFormData.password.$error }"
          )
          template(v-if="$v.registerFormData.password.$error")
            span.form__error(v-if="!$v.registerFormData.password.minLength") 最小長度需6個字
            span.form__error(v-if="!$v.registerFormData.password.required") 此欄位必填
        label.form__item
          input.register__input(
            type="password"
            v-model="registerFormData.passwordCheck"
            placeholder="確認密碼"
            @blur="$v.registerFormData.passwordCheck.$touch()"
            :class="{ danger: $v.registerFormData.passwordCheck.$error }"
          )
          template(v-if="$v.registerFormData.passwordCheck.$error")
            span.form__error(v-if="!$v.registerFormData.passwordCheck.sameAsPassword") 請確認密碼是否相同
            span.form__error(v-if="!$v.registerFormData.passwordCheck.required") 此欄位必填
        button.btn.register__btn(v-loading="loading") 註冊
        .status__txt 已有帳號？立刻
          span.status__subTxt(@click="changeStatus('login')") 登入
    template(v-else)
      form.register__wrap(v-loading="loading" @submit.prevent="submitLoginForm")
        label.form__item
          input.register__input(
            type="email"
            v-model="loginFormData.email"
            placeholder="電子郵件"
            @blur="$v.loginFormData.email.$touch()"
            :class="{ danger: $v.loginFormData.email.$error }"
          )
          template(v-if="$v.loginFormData.email.$error")
            span.form__error(v-if="!$v.loginFormData.email.email") 請確認 Email 格式
            span.form__error(v-if="!$v.loginFormData.email.required") 此欄位必填
        label.form__item
          input.register__input(
            type="password"
            v-model="loginFormData.password"
            placeholder="密碼"
            @blur="$v.loginFormData.password.$touch()"
            :class="{ danger: $v.loginFormData.password.$error }"
          )
          template(v-if="$v.loginFormData.password.$error")
            span.form__error(v-if="!$v.loginFormData.password.minLength") 最小長度需6個字
            span.form__error(v-if="!$v.loginFormData.password.required") 此欄位必填
        button.btn.register__btn 登入
        .status__txt 還沒有帳號？立刻
          span.status__subTxt(@click="changeStatus('register')") 註冊
        .error__txt(v-if="errorMessage") 請檢查帳號密碼資訊是否正確
</template>

<script>
import { mapActions } from 'vuex'
import { checkEmail, name, password, passwordCheck } from '@/validators/config'

export default {
  name: 'Register',

  components: {
    checkEmail,
    name,
    password,
    passwordCheck
  },

  validations: {
    registerFormData: {
      email: checkEmail,
      name: name,
      password: password,
      passwordCheck: passwordCheck
    },
    loginFormData: {
      email: checkEmail,
      password: password
    }
  },

  data () {
    return {
      registerFormData: {},
      loginFormData: {},
      checkUserStatus: '',
      loading: false,
      errorMessage: ''
    }
  },

  created () {
    this.init()
    this.checkUserStatus = this.$route.query.userStatus
  },

  methods: {
    ...mapActions([
      'registerUser',
      'loginUser'
    ]),

    init () {
      this.registerFormData = {
        email: '',
        name: '',
        password: '',
        passwordCheck: ''
      }
      this.loginFormData = {
        email: '',
        password: ''
      }
    },

    async submitRegisterForm () {
      // 前端進行驗證檢查
      this.$v.registerFormData.$touch()
      if (this.$v.registerFormData.$error) return
      this.loading = true
      await this.registerUser(this.registerFormData)
      await this.loginUser(this.registerFormData)
      this.loading = false
      this.$router.push({ name: 'Mode' })
    },

    async submitLoginForm () {
      this.$v.loginFormData.$touch()
      if (this.$v.loginFormData.$error) return
      this.loading = true
      await this.loginUser(this.loginFormData).then((res) => {
        this.loading = false
        this.$router.push({ name: 'Mode' })
      }).catch((err) => {
        this.errorMessage = err
        this.loading = false
      })
    },

    changeStatus (val) {
      this.checkUserStatus = val
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
