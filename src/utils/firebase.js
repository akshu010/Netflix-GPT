// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCK-hpbzSilZqLIawUuRUgUgZ0sreGo7Q",
  authDomain: "netflixgpt-9a0e0.firebaseapp.com",
  projectId: "netflixgpt-9a0e0",
  storageBucket: "netflixgpt-9a0e0.appspot.com",
  messagingSenderId: "600954031480",
  appId: "1:600954031480:web:8f1a1ec903c60523e44c8d",
  measurementId: "G-E2706J2MMK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
