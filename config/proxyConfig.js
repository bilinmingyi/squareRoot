var config= require("../src/fetch/config");
module.exports = {
  proxy: {
    [config.ROOT]: {
      target: config.PROXYROOT,  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        [`^/`]: ''
      }
    }
  }
}
