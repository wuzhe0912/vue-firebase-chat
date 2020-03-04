<template lang="pug">
  div.mode__wrap
    div.btn__list
      button.btn.mode__btn(
        v-for="(node, i) in btnList"
        :class="{ 'has__selected': isSelected === i }"
        @click="selectBtn(node.code, i)"
      ) {{ node.name }}
    button.btn.start__btn(@click="goChat()") 開始聊天
    p.warn__txt(v-if="feedback") {{ feedback }}
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
      ],
      isSelected: '',
      mode: '',
      feedback: null
    }
  },

  watch: {
    isSelected (newVal, oldVal) {
      if (newVal !== '') this.feedback = null
    }
  },

  methods: {
    selectBtn (node, val) {
      this.mode = node
      this.isSelected = val
    },
    goChat () {
      if (this.isSelected !== '') {
        this.$router.push({ name: 'Chat', query: { mode: this.mode } })
      } else this.feedback = '請選擇任一模式'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
