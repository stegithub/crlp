/* This is the Firebase configuration file */
import firebase from 'firebase'
import config from './config'

var storage, mediaRef, chatRef, artistsRef, usersRef, firebaseApp

function firebaseInit() {
    let firebase_app = firebase.initializeApp(config)

     storage = firebase_app.storage();

    let database = firebase_app.firestore()
    database.settings({ timestampsInSnapshots: true })
    let db = database
     mediaRef = db.collection('media')
     chatRef = db.collection('chat')
     artistsRef = db.collection('artists')
     usersRef = db.collection('users')
     firebaseApp = firebase_app
    return firebase_app
}

export { firebaseInit, firebase, storage, firebaseApp,
    mediaRef,
    chatRef,
    artistsRef,
    usersRef }
