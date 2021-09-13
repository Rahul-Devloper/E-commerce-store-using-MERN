// Import the functions you need from the SDKs you need

//in firebase version 8, firebase imports are like the below code.
//if you encounter errors in importing, search for firebase import errors depending on the firebase version you're using
import firebase from "firebase/app";
import "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU0QQy3QqCHMCzQHUCw8hrvTsiicKmZrk",
  authDomain: "ecommerce-1be4d.firebaseapp.com",
  projectId: "ecommerce-1be4d",
  storageBucket: "ecommerce-1be4d.appspot.com",
  messagingSenderId: "352261423142",
  appId: "1:352261423142:web:45cef3f5617d6d45e666e7",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
