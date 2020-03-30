import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import Test2 from '../views/Test2.vue'
// import login from '../components/login.vue'
// import register from '../components/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
	history: false,//这个参数改为false就可以了
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "test" */ '../views/Test.vue')
  },
  {
    path: '/work',
    name: 'work',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "work" */ '../views/Work.vue')
  },
  {
    path: '/require',
    name: 'require',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "require" */ '../views/Require.vue')
  },
  {
    path: '/star',
    name: 'star',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "star" */ '../views/Star.vue')
  },
  {
    path: '/test2',
    name: 'test2',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "test2" */ '../views/Test2.vue'),
	/*
	children : [
		{
			path: '/test2/login',
			name: 'login',
			component: login
		},
		{
			path: '/test2/register',
			name: 'register',
			component: register
		}
	]*/
  },
  {
	path: '/test/:id',
	name: 'detail',
	// route level code-splitting
	// this generates a separate chunk (about.[hash].js) for this route
	// which is lazy-loaded when the route is visited.
	component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue')  
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
