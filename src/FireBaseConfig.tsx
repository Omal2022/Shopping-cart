// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLFoARu0UcsR-qD-P06ev2RSksPLydf9A",
  authDomain: "react-firebase-auth-4c860.firebaseapp.com",
  projectId: "react-firebase-auth-4c860",
  storageBucket: "react-firebase-auth-4c860.firebasestorage.app",
  messagingSenderId: "219746095888",
  appId: "1:219746095888:web:a6e8ed4b958511470c8b95",
  measurementId: "G-R2MGNFYH3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)