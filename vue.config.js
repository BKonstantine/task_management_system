const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/main.scss";`,
      },
    },
  },
  pluginOptions: {
    svgSprite: {
      dir: "./src/assets/icons",
      test: /\.svg$/,
      loaderOptions: {
        extract: false,
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule("svg-sprite")
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader");
  },
});
