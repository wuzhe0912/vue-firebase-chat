<template lang="pug">
  div.chat__wrap
    modeHall(v-if="checkMode === 'hall'")
    modePersonal(v-else)
</template>

<script>
import modeHall from '@/components/mode-hall'
import modePersonal from '@/components/mode-personal'

export default {
  name: 'Chat',
  components: {
    modeHall,
    modePersonal
  },

  data () {
    return {
      checkMode: this.$route.query.mode
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
