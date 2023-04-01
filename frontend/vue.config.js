const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    id: '/',
    name: 'PWA App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      start_url: '/'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swDest: 'service-worker.js',
      swSrc: './src/sw.js'
    },
    shortName: 'App'
  }
})
