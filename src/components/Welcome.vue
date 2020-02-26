<template lang="pug">
  div.welcome.container
    div.card
      div.card-content.center-align
        h2.teal-text Welcome
        form(@submit.prevent="enterChat")
          label(for="name") Enter your name：
          input(type="text" name="name" v-model="name")
          p.red-text(v-if="feedback") {{ feedback }}
          button.btn.teal Enter
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      name: '',
      feedback: null
    }
  },
  methods: {
    enterChat () {
      if (this.name) {
        this.$router.push({ name: 'Chat', params: { name: this.name } })
      } else this.feedback = 'You must enter name'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .welcome {
    max-width: 500px;
    margin-top: 100px;
  }
  .welcome h2 {
    font-size: 3em;
  }
  .welcome button {
    min-width: 150px;
    min-height: 50px;
    margin-top: 20px;
    font-size: 24px;
  }
</style>
