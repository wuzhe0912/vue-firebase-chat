<template lang="pug">
  .wrap
    .header
      .header-logo
      .header-rightmenu
        nav.nav
          transition(name='fade',mode='out-in')
            i.material-icons(v-if='!show', @click='show = !show', key='menu') menu
            i.material-icons(v-else='', @click='show = !show', key='clear') clear
          |
          transition(name='fade')
            ul.nav-ul(v-if='show')
              li.nav-li(v-for="todo in todos" v-html="todo.text" @click="A1(todo.text)")
                |{{ todo.text }}
      .header-list
        .app-1
          ul
            li.app-2(v-for="todo in todos" v-html="todo.text" @click="A1(todo.text)" ":class"="{active: tag===todo.text}")
              |{{ todo.text }}

    // gamelist
    .flex-container
      template(v-for="node in list2")
        .flex-item
          img(":src"="node.src")

    // backtop-img
    .backtop
      button.backtop-img(@click="B1")
        .backtop-shape
        |TOP
</template>

<script>
export default {
  name: "hello123",
  data () {
    return {
      msg: "",
      todos: [
        {text: '<i class="material-icons">search</i>'},
        {text: "ALL"},
        {text: "最新"},
        {text: "推荐"},
        {text: "热门"}
      ],
      show: false,
      list: [
        {name: "森林泰后", src: "static/img/ic1.png",onenew: true},
        {name: "狼月", src: "static/img/ic2.png",onenew: true},
        {name: "武聖", src: "static/img/ic3.png",onenew: true},
        {name: "通天神探狄仁傑", src: "static/img/ic4.png",recommend: true},
        {name: "火燒連環船", src: "static/img/ic5.png",recommend: true},
        {name: "甜蜜蜜", src: "static/img/ic6.png",recommend: true},
        {name: "恭賀新禧", src: "static/img/ic7.png",hot: true},
        {name: "福爾摩斯", src: "static/img/ic8.png",hot: true},
        {name: "鑽石水果王", src: "static/img/ic9.png",hot: true},
        {name: "森林泰后", src: "static/img/ic1.png",onenew: true},
        {name: "狼月", src: "static/img/ic2.png",onenew: true},
        {name: "武聖", src: "static/img/ic3.png",onenew: true},
        {name: "森林泰后", src: "static/img/ic1.png",onenew: true},
        {name: "狼月", src: "static/img/ic2.png",onenew: true},
        {name: "武聖", src: "static/img/ic3.png",onenew: true},
        {name: "通天神探狄仁傑", src: "static/img/ic4.png",recommend: true},
        {name: "火燒連環船", src: "static/img/ic5.png",recommend: true},
        {name: "甜蜜蜜", src: "static/img/ic6.png",recommend: true},
        {name: "通天神探狄仁傑", src: "static/img/ic4.png",recommend: true},
        {name: "火燒連環船", src: "static/img/ic5.png",recommend: true},
        {name: "甜蜜蜜", src: "static/img/ic6.png",recommend: true},
        {name: "恭賀新禧", src: "static/img/ic7.png",hot: true},
        {name: "福爾摩斯", src: "static/img/ic8.png",hot: true},
        {name: "鑽石水果王", src: "static/img/ic9.png",hot: true},
        {name: "恭賀新禧", src: "static/img/ic7.png",hot: true},
        {name: "福爾摩斯", src: "static/img/ic8.png",hot: true},
        {name: "鑽石水果王", src: "static/img/ic9.png",hot: true}
      ],
      tag: "ALL",
    }
  },

  computed: {
    list2 () {
      // 處理 獲取or設置函數
      if (this.tag === "ALL") {
        return this.list
      }
      if (this.tag === "最新") {
        // 宣告newArray為空數組，在函數內滿足參數條件，則導入數組
        const newArray = []
        this.list.forEach(function (a1) {
          if (a1.onenew === true) newArray.push(a1)
        })
        return newArray
      }

      if (this.tag === "推荐"){
        const recommendArray = []
        this.list.forEach(function(a1){
          if(a1.recommend === true) recommendArray.push(a1)
        })
        return recommendArray
      }

      if (this.tag === "热门"){
        const hotArray = []
        this.list.forEach(function(a1){
          if(a1.hot === true) hotArray.push(a1)
        })
        return hotArray
      }
    }
  },

  // 初始化自動執行的method
  mounted () {
    this.$nextTick(function(){
      })
  },

  methods: {
    A1 (val) {
      this.tag = val
    },
    B1 (){
      let istop = true;
      // 進入頁面後觸發捲軸函數
      // 捲軸正常滑動時設為true值
      window.onscroll = function(){
        // 取反值時啟動clearInterval
        if (!istop){
          clearInterval(gotop);
        }
        istop = false;
      }

      let gotop = setInterval(function(){
      // document.body.scrollTop chrome偵測不到高度
      let obtn = document.body.scrollTop || document.documentElement.scrollTop;
      // console.log(obtn);  //記錄頁面當前高度
      let speed = Math.floor(-obtn / 4); //math.floor無條件捨去計算後的小數點
      document.body.scrollTop = document.documentElement.scrollTop = obtn + speed; //賦值scrollTop高度
      console.log(obtn + speed);

        istop = true;
        if(obtn === 0){
          clearInterval(gotop);
        }
      },30);
    },
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
