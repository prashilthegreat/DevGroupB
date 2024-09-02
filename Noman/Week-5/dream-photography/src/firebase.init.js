// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCcYg360IDYLUByJmZ52rjx7xCZVR5I2f4",
    authDomain: "dream-photography.firebaseapp.com",
    projectId: "dream-photography",
    storageBucket: "dream-photography.appspot.com",
    messagingSenderId: "326735067165",
    appId: "1:326735067165:web:bccc7b4e8c4bd693f5eef4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;