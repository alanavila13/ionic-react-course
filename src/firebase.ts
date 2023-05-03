import firebase from 'firebase/app';
import "firebase/auth"
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyALoJ5oUdYRlZsBYST4zVVfAInsfBBdVJI",
    authDomain: "daily-moments-2cdeb.firebaseapp.com",
    projectId: "daily-moments-2cdeb",
    storageBucket: "daily-moments-2cdeb.appspot.com",
    messagingSenderId: "792610575788",
    appId: "1:792610575788:web:233f4e543a9f69106d5609"
  };

const app =  firebase.initializeApp(firebaseConfig)
export const auth = app.auth()
export const firestore = app.firestore()
