// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrz29c-YH-Z1K1Nndhdcgwzox2aPAOcak",
  authDomain: "taxtt-h5fyu.firebaseapp.com",
  projectId: "taxtt-h5fyu",
  storageBucket: "taxtt-h5fyu.firebasestorage.app",
  messagingSenderId: "887880629897",
  appId: "1:887880629897:web:fb7f29f7e43686e7065058",
};

console.log("Firebase Config:", firebaseConfig);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };