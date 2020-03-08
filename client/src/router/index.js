import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import SignUp from '../views/SignUp.vue';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

//for users that are already logged in
function loggedInRedirect(to, from, next){
  if(localStorage.token){
    next('/dashboard');
  }
  else {
    next();
  }
}

//for users that need to log in
function loginRedirect(to, from, next){
  if(localStorage.token){
    next();
  }
  else {
    next('/login');
  }
}

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: loggedInRedirect,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: loginRedirect,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
