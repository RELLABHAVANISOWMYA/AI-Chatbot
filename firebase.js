// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArfiwvyczaDvB20YQT_HqyHw8zd98iccA",
  authDomain: "ai-chatbot1-6872c.firebaseapp.com",
  projectId: "ai-chatbot1-6872c",
  storageBucket: "ai-chatbot1-6872c.appspot.com",
  messagingSenderId: "835678810705",
  appId: "1:835678810705:web:10af375adf3f04cd36fe70",
  measurementId: "G-M67YT91SX3"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export {app,auth,firestore};
