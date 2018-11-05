import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import { firebase_app } from './firebase_config'

import VueFire from 'vuefire'
import './registerServiceWorker'
//************** vue-material */
import {
	MdButton,
	MdContent,
	MdCard,
	MdField,
	MdProgress,
    MdSnackbar,
    MdToolbar,
    MdIcon,
    MdApp,
    MdList,
    MdDrawer,
    MdMenu,
    MdTable,
    MdRipple,
    MdCheckbox,
    MdTooltip
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import Notifications from './views/admin/components/Notification'
Vue.use(Notifications)

import VueAPlayer from '@moefe/vue-aplayer'
Vue.use(VueAPlayer, {
    defaultCover: 'https://github.com/u3u.png',
    productionTip: true,
  });

Vue.use(VueI18n)

// import VueMaterial from 'vue-material'
// import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default-dark.css' // This line here

// Vue.use(VueMaterial)
Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdCard)
Vue.use(MdField)
Vue.use(MdProgress)
Vue.use(MdSnackbar)
Vue.use(MdToolbar)
Vue.use(MdIcon)
Vue.use(MdApp)
Vue.use(MdList)
Vue.use(MdDrawer)
Vue.use(MdMenu)
Vue.use(MdTable)
Vue.use(MdRipple)
Vue.use(MdCheckbox)
Vue.use(MdTooltip)
/************** end vue-material */

/******************** i18n */ 
var en_labels = require('./assets/json/i18n/' +
	process.env.VUE_APP_DEFAULT_LANGUAGE +
    '.json')
import VueI18n from 'vue-i18n'
const i18n = new VueI18n({
    locale: process.env.VUE_APP_DEFAULT_LANGUAGE, // set locale
    messages: {
        en: {
            message: en_labels
        }
    } // set locale labels
})

Vue.config.productionTip = false

Vue.use(VueFire)

firebase_app.auth().onAuthStateChanged((user) => {
    // console.log(user)
    if(!Vue.prototype.$current_user && user) {
        Vue.prototype.$current_user = user
        router.replace('admin')
    }
    
	// if (user) {
	// 	// User is signed in.
	// 	var displayName = user.displayName
	// 	var email = user.email
	// 	var emailVerified = user.emailVerified
	// 	var photoURL = user.photoURL
	// 	var isAnonymous = user.isAnonymous
	// 	var uid = user.uid
	// 	var providerData = user.providerData
	// 	// ...
	// } else {
	// 	// User is signed out.
	// 	// ...
	// }
})


new Vue({
    router,
    i18n,    
	render: h => h(App)
}).$mount('#app')