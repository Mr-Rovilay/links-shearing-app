import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
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
console.log('Firebase app initialized:', app);

const auth = getAuth(app);

// Set persistence to local storage
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase authentication persistence set to local storage.");
  })
  .catch((error) => {
    console.error("Error setting persistence:", error);
  });

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
