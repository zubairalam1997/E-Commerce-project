// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7i4pfWpqVLY9nlCtwm5gDAhmaS4oERu8",
  authDomain: "fullstackecomm.firebaseapp.com",
  projectId: "fullstackecomm",
  storageBucket: "fullstackecomm.appspot.com",
  messagingSenderId: "1095062730305",
  appId: "1:1095062730305:web:0b7bcf5b7f2831822a78c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)
export {fireDB , auth};