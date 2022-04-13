import firebase from 'firebase/compat/app';
// import 'firebase/firestore';
// import 'firebase/firestore';
// import 'firebase/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// import 'firebase/storage'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration 
const firebaseConfig = {
  apiKey: "AIzaSyDo311JxHSaGWEZRTZpN4LPwhIflknEsgo",
  authDomain: "connect-e97ab.firebaseapp.com",
  projectId: "connect-e97ab",
  storageBucket: "connect-e97ab.appspot.com",
  messagingSenderId: "229702469026",
  appId: "1:229702469026:web:a0928dd68762a0610d1efb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
export  {
  storage, firebase as default
}
