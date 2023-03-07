const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: process.env.OUTPUT_DIR,
  indexPath: process.env.INDEX_HTML_PATH,
  devServer: {
    proxy: {
      "^/api": {
        target: process.env.PROXY_TARGET,
        changeOrigin: true,
        secure: false,
      },
      "^/ws": {
        target: process.env.SOCKET_PROXY_TARGET,
        changeOrigin: false,
        secure: false,
        ws: true,
        onProxyReq: function (request) {
          request.setHeader("origin", process.env.PROXY_TARGET);
        },
      },
    },
    // disableHostCheck: true,
  },
});
