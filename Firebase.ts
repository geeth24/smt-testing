// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyMhX6NGu7MMEWL-3vThXPpTIzALa9XK8",
  authDomain: "smt-testing-rad.firebaseapp.com",
  projectId: "smt-testing-rad",
  storageBucket: "smt-testing-rad.appspot.com",
  messagingSenderId: "416308551327",
  appId: "1:416308551327:web:d8dcf5f769d9bdcaef0caa",
  measurementId: "G-WJ4885Y7C0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app);
