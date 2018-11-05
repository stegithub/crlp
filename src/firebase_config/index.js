/* This is the Firebase configuration file */
import firebase from 'firebase'
import config from './config'

let firebase_app = firebase.initializeApp(config)

let storage = firebase_app.storage();

let database = firebase_app.firestore()
database.settings({ timestampsInSnapshots: true })
let db = database
let mediaRef = db.collection('media')
let chatRef = db.collection('chat')
let artistsRef = db.collection('artists')
let usersRef = db.collection('users')

export { db, firebase_app, firebase, usersRef, storage, mediaRef, chatRef, artistsRef }
