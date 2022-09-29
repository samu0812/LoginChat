// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdfEOfYW96gHEq15-Z0xumV803624uum8",
  authDomain: "chat-poo-f89eb.firebaseapp.com",
  projectId: "chat-poo-f89eb",
  storageBucket: "chat-poo-f89eb.appspot.com",
  messagingSenderId: "379816808363",
  appId: "1:379816808363:web:040934424962d4d0270cee",
  measurementId: "G-HQNK5SW0QM"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);