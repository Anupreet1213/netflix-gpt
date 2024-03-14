// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCi9lJCWDAoAPfdYfBAZtuVud6khngGx2k",
  authDomain: "netflixgpt-2ead2.firebaseapp.com",
  projectId: "netflixgpt-2ead2",
  storageBucket: "netflixgpt-2ead2.appspot.com",
  messagingSenderId: "789548738556",
  appId: "1:789548738556:web:f1897888a639c2f1217479",
  measurementId: "G-1ST0XH7YYK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
