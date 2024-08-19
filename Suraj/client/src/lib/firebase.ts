// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApnee2e8k0TDeJOuwTV_WN3S4I035rrnE",
  authDomain: "chocowhop-d6e7c.firebaseapp.com",
  projectId: "chocowhop-d6e7c",
  storageBucket: "chocowhop-d6e7c.appspot.com",
  messagingSenderId: "611189427856",
  appId: "1:611189427856:web:db889e898e464c3e905215",
  measurementId: "G-NMS8CY44F4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();