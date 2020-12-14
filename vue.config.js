// module.exports = {
//   outputDir: 'dist',
//   publicPath: ''
// }
module.exports = {
    lintOnSave: false
}
module.exports = {
  devServer: {
      proxy: {
        '/api': {
            target: 'http://localhost:7001',//后端接口地址
            changeOrigin: true,//是否允许跨越
            pathRewrite: {
              '^/api/': '/' 
            }
        }
      }
  },
}