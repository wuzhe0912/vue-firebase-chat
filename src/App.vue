<template lang="pug">
  div#app
    Header.layout__header(v-if="$route.meta.hasHeader")
    .layout__wrap
      router-view
</template>

<script>
import Header from '@/components/Header'

export default {
  components: {
    Header
  },

  data () {
    return {
    }
  }
}
</script>

<style>
</style>
