// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth'
import {getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASTOsCLCEKkl5b88BIi4e0H7N4smqhyKA",
  authDomain: "podcast-platform-b6257.firebaseapp.com",
  projectId: "podcast-platform-b6257",
  storageBucket: "podcast-platform-b6257.appspot.com",
  messagingSenderId: "128257314590",
  appId: "1:128257314590:web:9b9c5f0bb4ab0fe149430f",
  measurementId: "G-MYXV6Z6F04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app)
const auth = getAuth(app);

export {db,auth,storage};