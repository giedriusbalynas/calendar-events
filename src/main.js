import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import Home from './components/Home';
import vuetify from './plugins/vuetify';
import Events from './components/Events';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  {path: '/events', component: Events, name: 'events', props: true},
  {path: '/', component: Home, props: true}
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
