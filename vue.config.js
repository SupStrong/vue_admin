// module.exports = {
  // outputDir: 'dist',
  // publicPath: ''
// }
module.exports = {
    lintOnSave: false
}
module.exports = {
  devServer: {
      proxy: {
        '/api': {
            target: process.env.NODE_ENV == 'prod' ? 'http://101.200.61.236:7001' : 'http://127.0.0.1:7001',//后端接口地址
            changeOrigin: true,//是否允许跨越
            pathRewrite: {
              '^/api/': '' 
            }
            
        }
      }
  },
}