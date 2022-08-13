module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    port: '8080', // 设置端口号
    proxy: {
      '/api': {
        target: 'http://10.179.125.198:3000', //API服务器的地址
        ws: true, //代理websockets
        changeOrigin: true, // 是否跨域，虚拟的站点需要更管origin
        pathRewrite: {
          // '^/api'是一个正则表达式，表示要匹配请求的url中，全部'http://localhost:8081/api' 转接为 http://localhost:8081/
          '^/api': '',
        },
      },
    },
  },
}
