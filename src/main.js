import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './assets/style.css';

Vue.config.productionTip = false

new Vue({
  icons: {
    iconfont: 'md',
  },
  vuetify,
  render: h => h(App)
}).$mount('#app')
