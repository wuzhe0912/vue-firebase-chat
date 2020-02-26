import * as firebase from 'firebase/app'
import 'firebase/firestore'

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

export default firebaseApp.firestore()
