<template lang="pug">
  .wrap
    .header
      .header-logo
      .header-rightmenu
        i.material-icons  reorder
      .header-list
        .app-1
          ul
            li.app-2(v-for="todo in todos" v-html="todo.text " @click="A1(todo.text)")
              |{{ todo.text }}

    // gamelist
    .flex-container
      template(v-for="node in list2")
        .flex-item
          img(":src"="node.src")
</template>

<script>
export default {
  name: "hello123",
  data () {
    return {
      msg: "",
      todos: [
        {text: '<i class="material-icons">search</i>'},
        {text: "ALL", class: "ALL"},
        {text: "最新"},
        {text: "推荐"},
        {text: "热门"}
      ],
      list: [
        {name: "森林泰后", src: "static/img/ic1.png", all: true,new: true},
        {name: "狼月", src: "static/img/ic2.png", all: true,new: true},
        {name: "武聖", src: "static/img/ic3.png", all: true,new: true},
        {name: "通天神探狄仁傑", src: "static/img/ic4.png",all: true,recommend: true},
        {name: "火燒連環船", src: "static/img/ic5.png",all: true,recommend: true},
        {name: "甜蜜蜜", src: "static/img/ic6.png",all: true,recommend: true},
        {name: "恭賀新禧", src: "static/img/ic7.png",all: true,hot: true},
        {name: "福爾摩斯", src: "static/img/ic8.png",all: true,hot: true},
        {name: "鑽石水果王", src: "static/img/ic9.png",all: true,hot: true}
      ],
      tag: 'ALL'
    }
  },

  computed: {
    list2 () {
      // 處理
      if (this.tag == 'ALL') console.log('不做處理')
      if (this.tag == '最新') console.log('丟出最新')
      return this.list
    }
  },
  mounted () {
    this.$nextTick(function () {

    })
  },
  methods: {
    A1 (val) {
      this.tag = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~material-design-icons/iconfont/material-icons.css";
@import "hello.scss";
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
