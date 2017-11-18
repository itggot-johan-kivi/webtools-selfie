// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './state'
import VueAnalytics from 'vue-analytics'
import VueSocketio from 'vue-socket.io';

Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-66586414-1',
  checkDuplicatedScript: true
})

let socketUrl = `localhost:3001`;
Vue.use(VueSocketio, socketUrl);

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  store,
  sockets:{
      connect() {
          console.log('socket connected')
      },
      pickNameRemote(val){
        if(this.$store.state.remote.code === val.room && this.$store.state.remote.active ){
          app.$children[0].$children[0].getName();
        }
      }
  },
  template: '<App/>',
  components: { App }
})
