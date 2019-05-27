module.exports = {
  pwa: {
    themeColor: 'rgba(70, 15, 2, 0.932)'
  },

  pluginOptions: {
    quasar: {
      treeShake: true
    }
  },

  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ]
}
