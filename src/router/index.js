import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,

    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',

    component: () => import(/* webpackChunkName: "about" */ '../views/logIn.vue'),
    meta: {
      hideForAuth: true
    }
  },
  {
    path: '/signup',
    name: 'signup',

    component: () => import(/* webpackChunkName: "about" */ '../views/signup.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login' , '/signup'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if(authRequired && !loggedIn){
    next('/login');
  }else{
    next();
  }
});

export default router
