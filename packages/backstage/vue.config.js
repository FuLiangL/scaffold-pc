/* eslint-disable */
const path = require('path')
const setupMockServer = require('dev-utils/mock-server')

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  lintOnSave: true,
  devServer: {
    // 错误提示
    overlay: {
      warnings: true,
      errors: true,
    },
    progress: false,
    host: '',
    proxy: {
      '/dev': {
        // 找的一个mock链接
        target: 'https://result.eolinker.com/G6Vp1bS7f5a9c23b26b7fd29c177572be8cef29caaa6500?uri=',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/dev': '',
        },
      },
    },
    before (app) {
      setupMockServer(app)
    },
  },
  css: {
    sourceMap: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': '@/assets',
        '@components': '@/components',
        '@views': '@/views',
        '@common': '@/common',
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/common/style/mixins/*.scss'), // 需要全局引入的混入
        path.resolve(__dirname, './src/common/style/variables/*.scss'), // 需要全局导入的变量
      ],
    },
  },
}
