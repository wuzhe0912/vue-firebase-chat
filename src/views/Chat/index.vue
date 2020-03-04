<template lang="pug">
  div.chat__wrap
    hallMode
</template>

<script>
import hallMode from '@/components/hall-mode'

export default {
  name: 'Chat',
  components: {
    hallMode
  },

  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
