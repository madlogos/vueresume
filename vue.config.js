const path = require('path')
const cdn = {
  dev: {
    css: [
      'https://cdn.bootcss.com/font-awesome/5.12.1/css/fontawesome.min.css',
      'https://cdn.bootcss.com/font-awesome/5.12.1/css/solid.min.css',
      'https://cdn.bootcss.com/font-awesome/5.12.1/css/brands.min.css',
      'https://cdn.bootcss.com/font-awesome/5.12.1/css/svg-with-js.min.css',
      'https://cdn.bootcss.com/element-ui/2.13.0/theme-chalk/index.css',
      'https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/display.css',
    ],
    js: []
  },
  prod: {
    css: [
      'https://cdn.bootcss.com/font-awesome/5.12.1/css/fontawesome.min.css',
      'https://cdn.bootcss.com/font-awesome/5.12.1/css/solid.min.css',
      'https://cdn.bootcss.com/font-awesome/5.12.1/css/brands.min.css',
      'https://cdn.bootcss.com/font-awesome/5.12.1/css/svg-with-js.min.css',
      'https://cdn.bootcss.com/element-ui/2.13.0/theme-chalk/index.css',
      'https://unpkg.com/element-ui@2.13.0/lib/theme-chalk/display.css',
    ],
    js: [
      'https://cdn.bootcss.com/vue/2.6.11/vue.runtime.min.js',
      'https://cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
      'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
      'https://cdn.bootcss.com/echarts/4.6.0/echarts.min.js',
      'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
      'https://cdn.bootcss.com/vue-i18n/8.15.4/vue-i18n.min.js',
      'https://cdn.bootcss.com/element-ui/2.13.0/index.js',
    ]
  }
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vueresume/'
    : '/',
  // Work on Mac
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/styles/_color.scss";
          @import "~@/styles/_size.scss";
        `
      }
    }
  },
  // Work on Win10, Not working on Mac
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, './src/styles/_color.scss'),
        path.resolve(__dirname, './src/styles/_size.scss'),
      ]
    }
  },
  chainWebpack: config => {
    // IE compatible
    config.entry('index').add('@babel/polyfill')
    config.plugin('define').tap(args => {
      const argv = process.argv
      const mode = argv[argv.indexOf('--project-mode') + 1]
      args[0]['process.env'].MODE = `"${mode}"`
      args[0]['process.env'].BASE_API = '"http://localhost:8000"'
      return args
    })
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
        args[0].cdn = cdn.prod
      }
      if (process.env.NODE_ENV === 'development') {
        args[0].cdn = cdn.dev
      }
      return args
    })
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // import cdn
      config.externals = {
        vue: 'Vue',
        vuex: 'Vuex',
        'vue-router': 'VueRouter',
        axios: 'axios',
        echarts: 'echarts',
        'element-ui': 'ELEMENT',
        i18n: 'i18n'
      }
    }
    if (process.env.NODE_ENV === 'development') {
      config.devServer = {
        disableHostCheck: true
      }
    }
  }
}
