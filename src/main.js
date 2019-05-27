import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import { firebase_app, firebase } from './firebase_config'

import VueFire from 'vuefire'
import './registerServiceWorker'
//************** vue-material */
import {
    MdAvatar,
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
    defaultCover: 'https://firebasestorage.googleapis.com/v0/b/crlpapp-9ec26.appspot.com/o/md-logo.jpg?alt=media&token=00839891-7b65-4c22-8f36-24f6aa2a566d',
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
Vue.use(MdAvatar)
/************** end vue-material */

/******************** i18n */ 
var en_labels = require('./assets/json/i18n/' +
	process.env.VUE_APP_DEFAULT_LANGUAGE +
    '.json')
import VueI18n from 'vue-i18n'

import './styles/quasar.styl'
import '@quasar/extras/material-icons/material-icons.css'
import {
  Quasar, 
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
} from 'quasar'

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
  },
  directives: {
  },
  plugins: {
  }
 })
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

/**
 * NOTIFICATIONS REQUEST
 */
const messaging = firebase.messaging()
// Add the public key generated from the console here.
messaging.usePublicVapidKey("BFfO45SXyqJKPi3UzyAhRqsde8nBt5r50_3cFguwDvFVPVcuzYWdcaIi8qMhrp7m83IRPy-vUDpVeRoZ6K6Ymtw")
messaging.requestPermission().then(() => {
    console.log('Notification permission granted.');
    messaging.getToken().then(function(currentToken) {
        if (currentToken) {
            console.log('Got FCM device token:', currentToken);
            // Save the device token to the Realtime Database.
            // firebase.database().ref('/fcmTokens').child(currentToken)
            //     .set(firebase.auth().currentUser.uid);
        } else {
            // Need to request permissions to show notifications.
            requestNotificationsPermissions();
        }
    }).catch(function(error){
        console.error('Unable to get messaging device token:', error);
    });
}).catch((err) => {
    console.log('Unable to get permission to notify.', err);
})

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function() {
    messaging.getToken().then(function(currentToken) {
        if (currentToken) {
            console.log('Got FCM device token refreshed:', currentToken);
            
            // Save the device token to the Realtime Database.
            // firebase.database().ref('/fcmTokens').child(currentToken)
            //     .set(firebase.auth().currentUser.uid);
        } else {
            // Need to request permissions to show notifications.
            requestNotificationsPermissions();
        }
    }).catch(function(error){
        console.error('Unable to get messaging device token:', error);
    });
});

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.setBackgroundMessageHandler` handler.
messaging.onMessage(function(payload) {
    console.log('Message received. ', payload);
    // ...
});
/********************************** */
  

new Vue({
    router,
    i18n,    
	render: h => h(App)
}).$mount('#app')