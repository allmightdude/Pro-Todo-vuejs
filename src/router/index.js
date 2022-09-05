import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,

    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/logIn.vue"),
    meta: {
      hideForAuth: true,
    },
  },
  {
    path: "/signup",
    name: "signup",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/signup.vue"),
    hideForAuth: true,
  },
  {
    path: "/:notFound(.*)",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    next({ path: "/login" });
  } else if(to.meta.hideForAuth && store.getters.isLoggedIn) {
    next({path : '/'});
  }else{
    next();
  }
});

export default router;
