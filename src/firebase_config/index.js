/* This is the Firebase configuration file */
import firebase from 'firebase'
import config from './config'

let firebase_app = firebase.initializeApp(config)

let storage = firebase_app.storage();

let database = firebase_app.firestore()
database.settings({ timestampsInSnapshots: true })
let db = database
// let pagesRef = db.collection('pages')

export { /*pagesRef,*/ db, firebase_app, storage }
