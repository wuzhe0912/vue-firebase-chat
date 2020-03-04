<template lang="pug">
  div.send__wrap
    i.icon.icon__plus
    div.input__wrap
      input.send__input(
        type="text"
        placeholder="輸入訊息"
        onfocus="this.placeholder = ''"
        onblur="this.placeholder = '輸入訊息'"
        v-model="sendMessage"
        :class="{ hasMessage: sendMessage !== '' }"
      )
    template(v-if="sendMessage === ''")
      i.icon.icon__camera
      i.icon.icon__mic
    template(v-else)
      i.icon.icon__send
</template>

<script>
export default {
  data () {
    return {
      sendMessage: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style'
</style>
