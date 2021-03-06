const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "./",
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/crm": {
        // target: "168.12.2.1",
       target: "http://192.168.20.85:9090",
       //  target: "http://192.168.20.100:8000",
        changeOrigin: true,
        pathRewrite: {
          '^/crm': '/crm'
        }
      }
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('vue$','vue/dist/vue.esm.js' )
      .set("@", resolve("/src"))
      .set("assets", resolve("/src/assets"))
      .set("components", resolve("/src/components"))
      .set("public", resolve("/public"));
  }
};
