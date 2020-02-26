module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = '皮特der聊天室'
        return args
      })
  }
}
