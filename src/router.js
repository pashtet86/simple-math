import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const params = {
  mode: 'history',
  linkActiveClass: 'active',
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
];

const router = new Router({
  routes,
  ...params,
});

export default router;

