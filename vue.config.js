'use strict'
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）（默认dist）
  outputDir: 'dist',
  // 用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: 'static',
  // 是否开启eslint保存检测，有效值：ture | false | 'error'
  lintOnSave: process.env.NODE_ENV === 'development',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/name.scss";
        `
      },
      scss: {
        prependData: `@import "~@/variables.scss";`
      },
      less:{
        globalVars: {
          primary: '#fff'
        }
      }
    }, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.
  },
  // webpack-dev-server 相关配置
  devServer: {
    // host: '192.168.4.183',
    host: 'localhost',
    port: '8080',
    proxy: {
      '/': {
        // target: 'http://localhost:8080/police_system',
        target: 'http://50.75.56.40:8080', //孙
        // target: 'http://119.3.111.214:8080', //孙
        // target: 'http://192.168.3.100:8080',//冯
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      }
      // [process.env.VUE_APP_BASE_API]: {
      //   target: 'http://119.3.10.67:8080',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     ['^' + process.env.VUE_APP_BASE_API]: ''
      //   }
      // }
    },
    disableHostCheck: true
  },
  configureWebpack: {
    name: '物联网智能云柜管理平台',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
