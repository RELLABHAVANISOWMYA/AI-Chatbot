// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG_BiChIaY4vONJ58RVBkh06gnYjZ7fyc",
  authDomain: "ai-chatbot-66dc4.firebaseapp.com",
  projectId: "ai-chatbot-66dc4",
  storageBucket: "ai-chatbot-66dc4.appspot.com",
  messagingSenderId: "619876766509",
  appId: "1:619876766509:web:d7eb50ffa6588faa7ff9a4",
  measurementId: "G-9GCG4LXKNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {app,auth,firestore};
