import Vue from 'vue'
import Vuex from 'vuex'
import Files, { MODULE_NAME as MODULE_NAME_FILES } from './modules/files'
import Artists, { MODULE_NAME as MODULE_NAME_ARTISTS } from './modules/artists'
import router from '../router'
import VuexEasyFirestore from 'vuex-easy-firestore'
import { firebaseInit, firebase } from '../firebase_config'
import { OPEN_DB, CLOSE_DB } from './action-types'

Vue.use(Vuex)

const easyFirestore = VuexEasyFirestore(
    [Files, Artists],
    {logging: true, FirebaseDependency: firebase}
)

const store = new Vuex.Store({
	plugins: [easyFirestore]
})

firebaseInit().auth().onAuthStateChanged((user) => {
    if(!Vue.prototype.$current_user && user) {
        Vue.prototype.$current_user = user
        router.replace('admin')
        store.dispatch(`${MODULE_NAME_ARTISTS}/${OPEN_DB}`)
    } else {
        store.dispatch(`${MODULE_NAME_ARTISTS}/${CLOSE_DB}`, {
            clearModule: true
        })
        store.dispatch(`${MODULE_NAME_FILES}/${CLOSE_DB}`, {
            clearModule: true
        })
    }
})

export default store
