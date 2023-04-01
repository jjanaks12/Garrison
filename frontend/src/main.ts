import Vue from 'vue'
// import VuePwaInstallPlugin from 'vue-pwa-install'

import '@/assets/scss/main.scss'

import App from '@/App'
import router from '@/router'
import store from '@/store'
// import CardHeaderIntersectionObserver from './core/Intersection';
// import register from './service-worker/register-service-worker'

Vue.config.productionTip = false
// Vue.use(VuePwaInstallPlugin)

new Vue({
  router,
  store,
  render: h => h(App),
  // watch: {
  //   '$route'() {
  //     CardHeaderIntersectionObserver()
  //   }
  // }
}).$mount('#app')
// register()

if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_PWA_LOCAL_SERVE === 'true') {
  console.log(`PWA Local Serve: ${process.env.VUE_APP_PWA_LOCAL_SERVE}`) // eslint-disable-line no-console
  console.log(`Node Env: ${process.env.NODE_ENV}`) // eslint-disable-line no-console
}
