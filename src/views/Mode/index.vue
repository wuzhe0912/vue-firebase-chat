<template lang="pug">
  div.mode__wrap
    div.btn__list
      button.btn.mode__btn(v-for="node in btnList") {{ node.name }}
    button.btn.start__btn 開始聊天
</template>

<script>
export default {
  name: 'Mode',
  data () {
    return {
      btnList: [
        { code: 'hall', name: '大廳' },
        { code: 'one', name: '一對一(開發中)' },
        { code: 'custom', name: '自創聊天室(開發中)' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
