// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBckn0Pwl-6oRTeFfi_DvaJIlgG8H1HHIk",
  authDomain: "booktickets-a4286.firebaseapp.com",
  projectId: "booktickets-a4286",
  storageBucket: "booktickets-a4286.firebasestorage.app",
  messagingSenderId: "62175013627",
  appId: "1:62175013627:web:45bd5f3aa8035b4df55e5e",
  measurementId: "G-WNBGWB4VN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth()
export const provider=new GoogleAuthProvider()
export default app