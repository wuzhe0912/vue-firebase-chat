import * as firebase from 'firebase/app'
import 'firebase/firestore'

// Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/database'

// Initialize Firebase
var firebaseConfig = {
  apiKey: 'AIzaSyD5DySnnviyf_nGbRREUnTsZ8U7g-n6uT4',
  authDomain: 'vue-chat-6a66d.firebaseapp.com',
  databaseURL: 'https://vue-chat-6a66d.firebaseio.com',
  projectId: 'vue-chat-6a66d',
  storageBucket: 'vue-chat-6a66d.appspot.com',
  messagingSenderId: '614325823198',
  appId: '1:614325823198:web:be3fd5b19f19c6046e444f',
  measurementId: 'G-53M6WC55E9'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()
const firebaseDB = firebaseApp.database()

export default firebaseApp.firestore()
export { firebaseAuth, firebaseDB }
