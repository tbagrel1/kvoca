import Vue from 'vue'

import App from '@/components/App'

new Vue({
    render: createElt => createElt(App)
}).$mount('#app-container')


