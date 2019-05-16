import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from '@/components/App'

import style from './style.styl'

let cu = 0
Vue.prototype.$cu = {
  update: (width) => {
    if (width >= 992) {
      cu = 1.5 * width * 0.01
    } else {
      cu = 2.5 * width * 0.01
    }
    document.documentElement.style.setProperty('--cu', `${cu}px`)
  },
  get: () => cu
}

Vue.use(BootstrapVue)

new Vue({
  render: createElt => createElt(App)
}).$mount('#app-container')


