const url = 'http://www.dayilb.com/';
let ROOT;
if (process.env.NODE_ENV === 'production') {
  //生产环境下的地址
  ROOT = url;
} else {
  //开发环境下的代理地址，解决本地跨域跨域，配置在config目录下的index.js dev.proxyTable中
  ROOT = "/"
}

exports.PROXYROOT = url; //代理指向地址
exports.ROOT = ROOT;
