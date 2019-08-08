import Vue from 'vue'
import Router from 'vue-router'
// import { firebase_app } from '../firebase_config'
import NoConnection from "../views/NoConnection.vue"

Vue.use(Router)

const router = new Router({
	// mode: 'hash',
	// linkActiveClass: 'open active',
	routes: [
		{
            path: "/",
            name: "",
            // component: Home
			redirect: '/admin/home',
			component: () => import('../views/admin/Admin')            
        },
        {
			path: '/login',
			name: 'login',
			component: () => import('../views/admin/Login')
		},
		{
			path: '/no-connection',
			name: 'no-connection',
			component: NoConnection
		},
		{
			path: '/admin',
			name: 'admin',
			redirect: '/admin/home',
			component: () => import('../views/admin/Admin'),
			children: [
				{
					path: '/admin/home',
					name: 'home',
					component: () => import('../views/admin/pages/Home')
                },
                {
					path: '/admin/upload',
					name: 'upload',
					component: () =>
						import('../views/admin/pages/Upload')
                },
                {
					path: '/admin/chat',
					name: 'chat',
					component: () =>
						import('../views/admin/pages/Chat')
				}
			]
		}
	]
})

router.beforeResolve((to, from, next) => {
    // console.log(firebase_app.auth().currentUser)
	if (router.app.$current_user || to.name == 'no-connection' || to.name == 'login') {
		next()
	} else {
		// try {
			//await store.dispatch('auth/' + GET)
			next('login')
		// } catch (error) {
		// 	next('no-connection')
		// }
	}
})

export default router
