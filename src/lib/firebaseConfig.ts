// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "link-shearing-app.firebaseapp.com",
  projectId: "link-shearing-app",
  storageBucket: "link-shearing-app.appspot.com",
  messagingSenderId: "856553980086",
  appId: "1:856553980086:web:a63a3748c17c355b97a617",
  measurementId: "G-RJGJ52CJWT"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app)
export {app, auth};



